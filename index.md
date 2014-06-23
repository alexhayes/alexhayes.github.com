---
layout: page
title: Everything Is Everything!
tagline: Everything and anything I choose to blog about... I'm Alex Hayes and this is my b(l)og.
---
{% include JB/setup %}

Hi. I'm [Alex Hayes](https://en.gravatar.com/alexhayes), a software developer from Melbourne, Australia.

I've got a [github](https://github.com/alexhayes) and [bitbucket](https://bitbucket.org/alexhayes) account.

## Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>