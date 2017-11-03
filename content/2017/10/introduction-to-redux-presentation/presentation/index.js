// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Notes
} from "spectacle";

// Import image preloader util
// import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
// require("../assets/prism-ghcolors.css");
require("spectacle/lib/themes/default/index.css");


// const images = {
//   city: require("../assets/city.jpg"),
//   kat: require("../assets/kat.png"),
//   logo: require("../assets/formidable-logo.svg"),
//   markdown: require("../assets/markdown.png")
// };
//
// preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});


const style = {
  marginBottom: '2rem',
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["fade"]} transitionDuration={500} theme={theme}>
        <Slide bgColor="primary">
          <Heading style={style} size={1} fit caps lineHeight={1}>
            Introduction to Redux
          </Heading>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Redux attempts to make state mutations predictable.</Quote>
            <Cite>http://redux.js.org/docs/introduction/Motivation.html</Cite>
          </BlockQuote>
          <Notes>
            <BlockQuote>
              <Quote>Redux attempts to make state mutations predictable.</Quote>
            </BlockQuote>
            <p>It does this by providing an API to manage an applications state which sets limitations
              on when and how we can interact with that state.</p>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1} caps>Why?</Heading>
          <Heading style={style} size={6}>(SPA FTW⸮)</Heading>
          <List>
            <ListItem>We're now often managing lots of state on the frontend.</ListItem>
            <ListItem>Often this state is interdependent.</ListItem>
            <ListItem>Reasoning, especially with interdependency, is hard.</ListItem>
            <ListItem>Reproduction of bugs is very difficult.</ListItem>
            <ListItem>Inevitably you end up with highly coupled mess of spaghetti.</ListItem>
          </List>
          <Notes>
            <p>Read slide then;</p>
            <p>As an example - that simple add to cart button now probably does the following;</p>
            <ol>
              <li>Update cart totals.</li>
              <li>Update item totals.</li>
              <li>Update items in cart.</li>
              <li>Changes colours.</li>
              <li>Flashes rainbows across the screen.</li>
              <li>Flying ponies, crocs and pigeons.</li>
            </ol>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1} caps>3 Core Principles</Heading>
          <List ordered>
            <ListItem>Single source of truth</ListItem>
            <ListItem>State is read-only</ListItem>
            <ListItem>Changes are made with pure functions</ListItem>
          </List>
          <Notes>
            <ol>
              <li>All application state is stored in one big object - in redux this is called a store.</li>
              <li>You change state by dispatching an 'action' - essentially an object that describes what happened.</li>
              <li>The state is transformed by pure functions called reducers - a reducer takes the previous state and
                an action and returns the new state.</li>
            </ol>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Reducers*</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/concept-reducer.example")} />
          <p>* just the concept, not a dinky-di redux reducer</p>
          <Notes>
            <ol>
              <li>Just illustrating the concept</li>
              <li>A reducer is a pure function, it takes input and returns output and has no side effects.</li>
              <li>Reducers should never mutate existing state.</li>
              <li>In this example the action defines what <em>happened</em>, not the value, however you can also pass
                values into your reducer - which we'll get to later.</li>
            </ol>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1}>In use</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/concept-usage.example")} />
          <p>* this is not how you actually call your reducer...</p>
          <Notes>
            <ol>
              <li>Not actually how you call your reducer... just illustrating essentially what happens in the guts of redux.</li>
              <li>At some stage your state is initialized</li>
              <li>You trigger actions</li>
              <li>Your state changes</li>
            </ol>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Dinky-Di Use</Heading>
          <List ordered>
            <ListItem>Store</ListItem>
            <ListItem>Action types & creators</ListItem>
            <ListItem>Reducers</ListItem>
            <ListItem>Dispatch actions from components</ListItem>
          </List>
          <Notes>
            <p>In use there are essentially two units of work.</p>
            <ol>
              <li>You define your store and provide it to a top level component - pretty much set and forget.</li>
              <li>On a regular basis, as in, when you implementing a new feature, you will define action types, action
                creators and reducers. You then call, or dispatch, these action creators from your components.</li>
            </ol>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Action Types</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/action-types.example")} />
          <Notes>
            <p>Essentially just a constant - not really needed unless you want to be DRY</p>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Action Creators</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/action-creators.example")} />
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Reducer</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/reducer.example")} />
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Store</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/store.example")} />
        </Slide>
        <Slide>
          <Heading style={style} size={1}>AppContainer.js</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/AppContainer.example")} />
        </Slide>
        <Slide>
          <Heading style={style} size={1}>main.js</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/main.example")} />
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Connecting</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/connect.example")} />
          <Notes>
            <ol>
              <li>In order for your components to "listen" to changes in the redux store you need to connect your
                components to the store.</li>
              <li>The first argument to <code>connect</code>, called <code>mapStateToProps</code> should be a function
                that will be called with the current values in your store.</li>
              <li>This function can map values in your store and supply them as props for your component</li>
              <li>The second argument to <code>connect</code>, called <code>mapDispatchToProps</code> can be supplied
                in several different forms however generally you supply an object where the attribute becomes a prop in
                your component and the value is a function, for instance an action creator, that is then wrapped inside
                a dispatch.</li>
              <li>Dispatching action creators is the react-redux is the way you trigger changes to your store.</li>
            </ol>
          </Notes>
        </Slide>
        <Slide>
          <Heading style={style} size={1}>Component</Heading>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./examples/Toggle.example")} />
          <Notes>
            <ol>
              <li>Our <code>Toggle</code> component takes two props - active and toggle.</li>
              <li><code>active</code> is our boolean flag in our store.</li>
              <li><code>toggle</code> is our action creator wrapped by a redux dispatch function.</li>
              <li>We define the function <code>toggle</code> which calls <code>this.props.toggle()</code></li>
              <li>Using the value of our <code>active</code> prop we echo our either 'Active' or 'Inactive'</li>
            </ol>
          </Notes>
        </Slide>
      </Deck>
    );
  }
}
