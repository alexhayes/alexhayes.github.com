# -*- coding: utf-8 -*-
"""
    ftw.plugins
    ~~~~~~~~~~~

    The standard ftw plugins.
"""

def title(line: str) -> str:
    return line.title()


def swapcase(line: str) -> str:
    return line.swapcase()


def strip(line: str) -> str:
    return line.strip()


def newline(line: str) -> str:
    return f"{line}\n"
