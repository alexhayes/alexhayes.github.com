Title: Reducing Boiler Plate in your Redux Reducers
Slug: reducing-boiler-plate-in-your-redux-reducers
Date: 2017-08-05 08:14
Category: Javascript
Tags: javascript, redux, react
Author: Alex Hayes 
Summary: Redux doesn't promote boilerplate - you're doing it wrong!

I've been focusing a lot on [react](https://facebook.github.io/react/) apps that make use of [redux](http://redux.js.org/) lately and I've noticed something that frustrates me: there is often so much boilerplate in `reducer.js` files. It seems to be a common criticism of redux however in my opinion the issue is nothing to do with redux at all and it's most likely you just aren't structuring your code in a [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) way. Perhaps the following is all common knowledge but if it is then I'm certainly not seeing it practiced by industry, tutorials, open source or starter kits.

Typically I see something like this in say `books/reducer.js`;

```javascript
const REQUEST_BOOKS = 'REQUEST_BOOKS';
const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

export function getBooks() {
  return dispatch => {
    dispatch({type: RECEIVE_BOOKS});
    return fetch('/books/')
      .then(response => {
        dispatch({type: RECEIVE_BOOKS, payload: response.data});
      });
  };
}

// Reducer
const INITIAL_STATE = {
  books: {},
  fetchingBooks: false,
};

function reduce(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_BOOKS:
      return {
        fetchingBooks: true,
      };

    case RECEIVE_BOOKS:
      return {
        fetchingBooks: false,
        books: action.payload,
      };

    default:
      return state;
  }
}

export default function reduceWrapper(state, action) {
  const rv = reduce(state, action);
  return rv === state
    ? state
    : defaults(rv, state);
}
```

I see this same code or slight variations of it littered throughout so many reducers – it actually creates more work for developers, testers et al and makes your JS bundles larger. So, let's make it DRY.

Firstly, that `reduceWrapper` function can be put into a utils file somewhere so let's modify that it into something that takes an input that is more composable. Something like the following is pretty popular and I usually put it somewhere the implies it can be reused, such as `utils/reducer.js`.

```javascript
export function reducer(initialState, actionHandlers) {
  return (state = initialState, action) => {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
  }
}

```

And then in the `books/reducer.js`;

```javascript
import { reducer } from 'utils/reducer';

const actionHandlers = {
    [REQUEST_BOOKS]: (state, action) ({
        ...state,
        fetchingBooks: true,
    }),
    [RECEIVE_BOOKS]: (state, action) ({
        ...state,
        books: action.data,
        fetchingBooks: false,
    }),
};

export default reducer(initialState, actionHandlers);
```

But we can do much better than this, but we need to take a diverge slightly into how you go about mounting your redux store.

## App layout & mounting your redux store

I like to break up my mount points so they correspond with some piece of functionality. For instance, if I have a route that displays a list of books I'll have an individual mount point called something like `books`. For instance, in `apps/books/list/index.js` I'll have something like as follows;

```javascript
import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'books/',
  getIndexRoute(nextState, cb) {
    require.ensure([], require => {
      const BookListView = require('./views/BookListView').default;

      const reducer = require('./reducer').default;
      injectReducer(store, { key: 'books', reducer }); 

      cb(null, {
        component: BookListView,
      });
    }, 'books');
  },
});
```

The `apps/books/reducer` required above has a single responsibility - fetching a list of books and putting them in the redux store. It doesn't do creation of books, retrieval of single books, book updates or anything like that, that is the responsibility of `apps/books/create/reducer`, `apps/books/get/reducer` and `apps/books/update/reducer` respectively.    

This means that throughout an app I can have lots of mount points but importantly it means I can **reuse reducers across mount points** because I know that the state they return won't conflict because the mount point only deals with this small part of my application. 

## Reusing reducers

Our `reducer` function above can take an object as input – this object can be composed thus why not have a function that creates some of these reducers for us;
 
```javascript
// utils/reducers/fetchData.js

export function fetchDataActionTypes(prefix) {
    const prefixUpper = prefix.toUpperCase();
    return {
        REQUEST: `${prefixUpper}_REQUEST_DATA`,
        RECEIVE: `${prefixUpper}_RECEIVE_DATA`,
    };
}

export function fetchDataInitialState() {
    return {
        loading: false,
        data: null,
    }
}

export function fetchDataReducer(prefix) {
    const { REQUEST, RECEIVE } = fetchDataActionTypes(prefix);
    return {
        [REQUEST]: (state, action) ({
            ...state,
            loading: true,
        }),
        [RECEIVE]: (state, action) ({
            ...state,
            data: action.data,
            loading: false,
        }),
    };
}
```

And then in our `apps/books/list/reducer.js`;

```javascript
// apps/books/list/reducer.js

import { fetchDataActionTypes, fetchDataInitialState, fetchDataReducer } from 'utils/reducers/fetchData.js';

const PREFIX = 'books';
export const { REQUEST, RECEIVE } = fetchDataActionTypes(PREFIX);

const initialState = fetchDataInitialState();
const actionHandlers = fetchDataReducer(PREFIX);

export default reducer(initialState, actionHandlers);
```

But what if want some other `actionHandlers` that are specific to our listing of books? For instance, you want to display a checkbox next to each book and when the user clicks the box and it populates the book id in the state. Because `reducer` takes an object this becomes trivially easy;

```javascript
// apps/books/list/reducer.js

import { fetchDataActionTypes, fetchDataInitialState, fetchDataReducer } from 'utils/reducers/fetchData.js';

const PREFIX = 'BOOKS';
export const { REQUEST, RECEIVE } = fetchDataActionTypes(PREFIX);

export const SELECT = `${prefix}_SELECT`;

const initialState = {
    ...fetchDataInitialState(),
    selected: [],
};
const actionHandlers = {
    ...fetchDataReducer(PREFIX),
    [SELECT]: (state, action) => ({
        ...state,
        selected: state.selected.concat([action.payload.id]),
    }),
};

export default reducer(initialState, actionHandlers);
```

Boom, composability of your action handlers to the rescue. Of course, if selection of things is something that happens a lot in your application then you can move this out also;

```javascript
// utils/reducers/selectData.js

export function selectDataActionTypes(prefix) {
    const prefixUpper = prefix.toUpperCase();
    return {
        SELECT: `${prefixUpper}_SELECT`,
    };
}

export function selectDataInitialState() {
    return {
        selected: [],
    }
}

export function selectDataReducer(prefix) {
    const { SELECT } = fetchDataActionTypes(prefix);
    return {
        [SELECT]: (state, action) ({
            ...state,
            seleted: state.selected.concat([]),
        }),
    };
}

```
