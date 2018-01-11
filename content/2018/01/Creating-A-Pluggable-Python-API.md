Title: Creating a Pluggable Python API
Slug: creating-a-pluggable-python-api
Date: 2018-01-11 09:00:00
Category: Programming
Tags: programming, api, python
Author: Alex Hayes 
Summary: Importing modules and classes dynamically to create a pluggable Python API.  

Imagine you're building a framework or library and you want to give developers 
the ability to "break in" or hook into some particular component so they can 
implement their own functionality or behaviour. 

You don't want them to have to submit a PR exposing their projects super secret 
IP or have them maintain their own fork! Heavens murgatroyd!

So what do you do? Well, in Python you can use the [`importlib`](https://docs.python.org/3/library/importlib.html).

This is an example of why I love Python – batteries included and first class function support. 

## Our Framework

Let's build a (very) basic text processing framework which takes some data, 
processes it line by line, then outputs it.

Let's call it **For The Win** (henceforth referred to as **ftw**).

ftw is a command line script that reads from stdin and writes to stdout.

```python
# -*- coding: utf-8 -*-
"""
    ftw
    ~~~

    Takes stdin, processes it line by line and returns stdout.

    Usage: echo "Hello" | python ftw.py
"""
import sys


def main():
    for line in sys.stdin:
        sys.stdout.write(line)


if __name__ == 'main':
    main()
``` 

Let's create some data;

```bash
echo "eggs" >> data.txt
echo "chicken" >> data.txt
echo "salad" >> data.txt
echo "sausage" >> data.txt
echo "pizza" >> data.txt
echo "cream" >> data.txt
```

And test this thing out;

```bash
⇒  cat data.txt| python ftw.py
eggs
chicken
salad
sausage
pizza
cream
```

Amazing!!!

OK, so not really that amazing yet, bare with me. Let's give users the ability
to `title` the input.

```python
def main():
    for line in sys.stdin:
        sys.stdout.write(line.title())
``` 

And;

```bash
⇒  cat data.txt| python ftw.py
Eggs
Chicken
Salad
Sausage
Pizza
Cream
```

WOW. Oh wait. No, what if users don't want their stuff to be passed through 
`title`?

## The Non Extendable Way

So, let's parse some arguments to discover what filters to apply to the text.

```python
# -*- coding: utf-8 -*-
"""
    ftw
    ~~~

    Takes stdin, processes it line by line and returns stdout.

    Usage: echo "Hello" | python ftw.py [filter1] [filter2] [...]
"""
import sys


def main():
    # Get arguments after our script
    filters = sys.argv[1:]

    for line in sys.stdin:

        for filter in filters:
            # Get the method on our str instance
            filter_method = getattr(line, filter)
            # Call the method on that str instance
            line = filter_method()

        sys.stdout.write(line)


if __name__ == '__main__':
    main()
``` 

And hey presto;

```bash
⇒  cat data.txt| python ftw.py title swapcase
eGGS
cHICKEN
sALAD
sAUSAGE
pIZZA
cREAM
```

Now we're cooking! However we can only use filters that are defined as methods
on the `str` object (in this case, our `line` variable).

So, what do we do? We want to encourage a rich community that makes lots of 
money selling `ftw` plugins however right now it's not going to happen.

If only there was a way to allow external parties to "hook" into our code.

## `importlib` ftw

It turns out there is a way – let's talk about [`importlib`](https://docs.python.org/3/library/importlib.html).

It's part of the Python standard library and among other things, it allows you 
to do the following;

```python
import json
```

But do it programmatically (or dynamically if you will...);

```python
import importlib

json = importlib.import_module('json')
```

Of course, you're not going to start doing this instead of just using the 
`import` statement however it is really useful in some situations.

## Pluggable FTW

So, let's refactor our ftw library so that files can be magically processed by 
any function that conforms to some kind of interface. First up tho, let's 
define a few plugins in `plugins.py`;

```python
def title(line: str) -> str:
    return line.title()


def swapcase(line: str) -> str:
    return line.swapcase()
```

Not exactly very awesome, but it will illustrate the point...

Now let's modify ftw so that it can use these functions;

```python
# -*- coding: utf-8 -*-
"""
    ftw
    ~~~

    Takes stdin, processes it line by line and returns stdout.

    Usage: echo "Hello" | python ftw.py [path.to.filter1] [path.to.filter2] [...]
"""
import importlib
import sys
import typing


def get_filter(path: str) -> typing.Callable[[str], str]:
    """
    Given a string return a callable that is (hopefully) a function that takes a string and returns a string.
    """
    module, fun = path.rsplit('.', maxsplit=1)
    module = importlib.import_module(module)
    filter = getattr(module, fun)
    return filter


def main():
    # Get arguments after our script
    filters = [
        get_filter(path)
        for path in sys.argv[1:]
    ]

    for line in sys.stdin:
        for filter in filters:
            # filter is a function which should take the line as input and return the modified line.
            line = filter(line)

        sys.stdout.write(line)


if __name__ == '__main__':
    main()

```

So, what did we do here;

1. We defined a function `get_filter` which given the Python path to a function 
   will return that function.
2. At the start of `main` we create a `filters` list, which is simply a list of 
   the filter functions that we are going to process the line with.
3. For each `line` we simply process the line using the `filter` which is an actual function.

Allakhazam!

```bash
⇒  cat data.txt| python ftw.py plugins.title plugins.swapcase
eGGS
cHICKEN
sALAD
sAUSAGE
pIZZA
cREAM
```

## Extendability FTW

So, now our library can use any importable function that takes a string and 
returns a string. Let's test that out.

First off, let's add a couple of plugins;

```python
def strip(line: str) -> str:
    return line.strip()


def newline(line: str) -> str:
    return f"{line}\n"
```

Then, let's add some more data;

```bash
echo "spag bol" >> data.txt
echo "mutton chops" >> data.txt
echo "beef stroganoff" >> data.txt
```

Finally, let's install Django so we can make use of it's useful `slugify` method;

```bash
pip install Django
```

And now, witness the magic ftw!

```bash
⇒  cat data.txt| python ftw.py plugins.strip django.utils.text.slugify plugins.newline
eggs
chicken
salad
sausage
pizza
cream
spag-bol
mutton-chops
beef-stroganoff
```

FTW!
