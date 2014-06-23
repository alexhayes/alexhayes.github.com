---
layout: post
title: "Integrate Hamster with Trac"
description: ""
category: 
tags: []
---
{% include JB/setup %}
For a long time now I've used [Project Hamster](http://projecthamster.wordpress.com/) on [Ubuntu Linux](http://www.ubuntu.com/) to keep track of time I spend on (mainly) development tasks - starting back in the good old Gnome 2.x days and now within Gnome 3.x.

I've also always liked [Trac](http://trac.edgewall.org/) for project management - I've used and enjoyed [Unfuddle](https://unfuddle.com/) and other project management apps but I've always liked the simplicity and features of Trac and the raft of excellent plugins - for instance the [Timing and Estimation plugin](http://trac-hacks.org/wiki/TimingAndEstimationPlugin).

So... I wanted to track my time with Hamster and have it create a time entry on a Trac ticket.

I built two two components to accomplish this;

- [hamster-trac-syncr](https://github.com/alexhayes/hamster-trac-syncr) - sync's time entries in hamster to Trac
- [trac-hamster-plugin](https://github.com/alexhayes/trac-hamster-plugin) - Trac plugin that hamster-trac-syncr talks to.

For those on Gnome 3.x once you've installed both of the above, you'll probably also want to install the [Project Hamster Extension](https://extensions.gnome.org/extension/425/project-hamster-extension/) for Gnome shell integration.

The dev team at my work and myself have been using the above since early 2013 however if you have any issues or suggestions please feel free to fork it and create a push request. 