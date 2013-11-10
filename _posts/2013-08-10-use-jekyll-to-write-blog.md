---
layout: post
title: "Use Jekyll to Write Blog"
description: ""
category: 
tags: [jekyll, blog]
---
{% include JB/setup %}

##Quick Start
Use jekyll to write posts is as easy as play Fruit Ninja, there is barely learning process.
To create a new post:

    rake post title="post title"

It will automatically create a post under _post folder with format 'date-title.md'.

![jekyll]

To create a new page:

    rake page name='page name'

You can specify the path of the page, like /about.md, pages/about.md.

[jekyll]: http://blog.paulisageek.com/images/jekyll.png
