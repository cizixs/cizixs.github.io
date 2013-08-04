---
layout: post
title: "Several Problems Working with Github+Jekyll bootstrap"
description: ""
category: Blog
tags: [Error, Learning, Github Pages, Jekyll]
---
{% include JB/setup %}

##Declaration
Github Pages really helps me a lot with this blog. It relieves me of so much trouble struggling with 
html, css etc. Despite of all benefits, it also strikes some know-nothing-about-jekyll-and-html guys like me.

During the period of setting up and using the blog, I've encountered several problems which give me 
headache. Some of the problems are solved while others remain. This post aims to record them lest someone met the same
problems as me.

##Problems
#### [github pages build failure][1]
Yep, the first thing that bugs me. Due to build failure, blog won't update. This is caused mainly by syntax error in
my posts and pages. Actually, github will email if such thing happens(I didn't realize this until a day after the problem),
just keep an eye on your email.

The best way to avoid this is to build your blog locally before you deploy it to github. Ruby + Jekyll will do, make sure to 
fix all the problems.

#### github images won't show  

![weibo logo](/images/weibo.png)

[Markdown syntax][] demonstrates to use images in two ways:

    + ![alt text] (/path/to/image.jpg)  
    + ![alt text][id]  
    [id]: url/to/image "Option title attribute"

But github works in a mysterious way. When I use './images/img.jpg' under my root directory of blog, it works out well.
When I refer to '../images/img.jpg' under '_posts' directory, it fails. It bugs me all day, and it's still there.

Then I turn to absolute image url that I deployed to github, it failed too.
I googled the problem and find [this answer][], and replace the image url to:  

    https://github.com/user/repository/raw/branch/filename.

#### github repository and github pages diff from each other.  
I don't know why, the correct layout in repository will be a mess viewed from blog page itself.

[1]: https://help.github.com/articles/pages-don-t-build-unable-to-run-jekyll
[Markdown syntax]: http://daringfireball.net/projects/markdown/syntax#img
[this answer]: http://stackoverflow.com/questions/10935763/github-picture-path
