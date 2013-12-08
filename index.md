---
layout: page
title: Write, Code and Love
tagline:
---
{% include JB/setup %}

<p align="right"> <h4>  与你那时的面貌相比，我更爱你现在备受摧残的面容。 </h4> </p>
<p align="right"> 【杜拉斯】《情人》 </p>
{% for post in site.posts offset: 0 limit: 5 %}
<div class="customed_post">
    <div class="post_info">
        <span class="post_title">{{ post.date | date_to_string }}</span>
    &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
    </div>
    <div class="post_content">
        {{ post.content }}
    </div>
</div>
{% endfor %}

<div class="continue">
    <a href="/pages/archive.html"><i class="fa fa-hand-o-left fa-2x"></i> Read All </a>
</div>
