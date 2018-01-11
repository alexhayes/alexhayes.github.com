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
