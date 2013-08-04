---
layout: page
title: Hello World!
tagline: Never stop trying... 
---
{% include JB/setup %}

## Who am I?

My name is Jack Wu, a programmer now working at [Ctrip](http://www.ctrip.com).
I majored in Computer Science at NJU which is a proud in my life.


**You can find me at:**

+ [<img src="./images/weibo.png" alt="Weibo" style="width: 40px;"/>](http://weibo.com/1921727853/profile) [`Weibo`](http://weibo.com/1921727853/profile)

+ [<img src="./images/facebook.png" alt="Facebook" style="width: 40px;"/>](http://www.facebook.com/wei.wu.353250) [`Facebook`](http://www.facebook.com/wei.wu.353250)

+ [<img src="./images/github.png" alt="Github" style="width: 40px;"/>](https://github.com/JackWuCode) [`Gitub`](https://github.com/JackWuCode)

+ [<img src="./images/douban.png" alt="Douban" style="width: 40px;"/>](http://www.douban.com/people/38501585/) [`Douban`](http://www.douban.com/people/38501585/)


**Also you can contact me at:**  

+ **<wuwei4455@gmail.com>**
    
## Blogs

I write blogs on github pages, which is a delight for guys like me who can't care less about building a website.

Topics in the posts includes computer knowledge, essays, and reviews. Recording my learning process is main  motivation for updating the blog, sharing knowledge is another one.

Enjoy your trip here.

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
