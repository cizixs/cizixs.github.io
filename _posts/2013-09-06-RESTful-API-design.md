---
layout: post
title: "RESTful API design"
description: ""
category: 
tags: [RESTful, API]
---
{% include JB/setup %}


这篇文章主要介绍RESTful的基本概念和设计时需要注意的事项。所有的内容仅针对刚接触RESTful的同学，其他人请移步。

### RESTful, WTF? 
如果你遇到问题会主动上网查找的话，你会在[wikipedia](http://en.wikipedia.org/wiki/Representational_state_transfer)上发现这样的定义：

    Representational state transfer (REST) is a style of software architecture for distributed systems such as the World Wide Web. REST has emerged as a predominant web API design model.
    
承认吧，你除了知道REST是什么的缩写之外，还是对它一无所知。这些都是再正确不过的废话，你会经常在中央新闻和课堂上听到。还好，你不是一个人这样想，[stackoverflow](http://stackoverflow.com/)上也有与此相关积分很高的[问题](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)。那么本文就先用最直接的语言告诉你什么是RESTful。

+ REST提供访问网络资源的接口
+ REST是HTTP访问的规范化
+ REST不是具体的东西，而是一种设计思想或者规范

好吧，你还是不理解。先来名词解释：什么是资源？在互联网上一切都是资源，没错，一切你想访问的东西（数据）。知道你想要什么，还需要知道在哪里找到，这就是HTTP协议中url的用处，每个资源都是相对应的url来标识。既然HTTP已经完成工作了，为什么要有REST呢？答案很简单：因为HTTP做的不够好（更确切的说，大家使用HTTP的方式不对）！如果你经常上网的话，一定对下面这样冗长的url链接不会陌生（即使你没有去关注过）。

    http://newswatch.nationalgeographic.com/2013/09/05/masters-of-deception-5-two-faced-species/?utm_source=Twitter&utm_medium=Social&utm_content=link_tw20130905ngnw-twofac&utm_campaign=Content
    
对于资源，一般有固定的可用操作：读取，添加，修改和删除。网站设计者在处理如何提供资源接口给用户的时候，会用自己独特的方式，下面是可能出现的结果：

    /user_create
    /user?id=xxx
    /user_edit?id=xxx
    /user_delete?id=xxx

不同的网站还会使用不同的命名，传递参数的方法也会很不相同，当有新的资源需要被操作的时候，管理起来很不方便，这样就造成了url的混乱和臃肿。RESTful就来拯救世界啦！


###How RESTful is better?
先来看看RESTful的特点，这样就能更好地理解上面的内容：

1. 明确地使用HTTP方法（Use HTTP methods explicitly）
2. 无状态（Be stateless）
3. 把URI组织成目录形式（Expose directory structure-like URIs）
4. 采用XML和JSON传递数据（Transfer XML, JSON, or both）

其实第一条和第三条可以放在一起看，它解决了上面提到的URI混乱的情况，美感顿时而起。对于资源的四种操作，其实在HTTP中已经通过方法定义：GET/POST/PUT/DELETE。需要注意的是，这种对应不是一一对应。比如你可以使用GET方法来新建一个资源。

    GET /adduser?name=jackwu HTTP=/1.1
    
GET只是一条请求，adduser指定具体的行为。
明白了吧，HTTP的这种灵活性造成了这种混乱，除此之外还有上面提到的命名混乱，如下所示：

    /user_create
    /user_add
    /user_new
    /add_user
    /create_user

**RESTful的第一条原则就是：使用GET来读取资源，POST来新建资源，PUT来更新资源，DELETE来删除资源。**这样做，且只能这样做！（好吧，其实你可以不这样做，不过实现的东西就不是RESTful的。）
有了第一条原则之后，操作资源的行为就变得整洁有美感。

    GET /users/jackwu
    GET /users
    POST /users 
    PUT /users/jackwu
    DELETE /users
    DELETE /users/jackwu
只要在调用方法时传递正确的参数就可以了，简单吧！好像满足第三条原则了，真好。

来看第二条，无状态。这当然是针对“有状态”而言的，那么什么是有状态呢？就是在客户端和服务器端通信的时候，服务器端要保存客户端的信息，比如要连续请求多个页面的时候要保存上次请求的是哪个页面，这样下次再有请求的时候，会在之前的基础上进行。

![Stateful design]

无状态自然相反，服务器端不保存任何状态。现在的工作流程是: 客户端需要做某件事时，把所有服务器端需要的参数都一起提供，服务器端完成后返回就行。再拿请求多个翻页来说，以前客户端不断发送getNextPage请求，等待服务器端响应，它并不知道服务器端页数的情况。现在对客户端的要求提高了：你必须知道你想要什么，不可以一直说：我要，我还想要。合理的做法是客户端先发送请求获得服务器端所有页面的索引，然后根据需要请求相应的页面就行啦。

你会问为什么要这样呢？原因有二：
1. 速度： 服务器端要保存的信息越多，处理请求的速度就会越慢。
2. 安全性： 把客户端的信息保留在服务器端是不安全的。

![Stateless design]

最后一个原则是：RESTful提供XML和json两种格式的数据传输，这没什么可说的。

总的来说，RESTful的这些原则都很不错，你也大致对它的优点有了直观的了解，现在总结一下吧：

+ 美感（aesthetic）
+ 可扩展性（scalablility）
+ 普遍性（generality）
+ 更小的延迟，更高的安全性


###设计REST API需要考虑的东西
设计RESTful API一般分为两个步骤：深入理解用户需要哪些数据，都能执行何种操作；将这些功能在RESTful诸原则的指导下实现出来。

![client server]

API就是客户端和服务器端通信的中间人（翻译），设计优美的API会让双方通信更便捷和灵活。为了达到这一目的，通常还需要考虑下面的问题：

+ 怎么描述资源
+ 怎么设计命令行接口
+ 轮询、异步处理
+ 错误RESTful 调用处理

这些就不再这里说啦！

###参考资料
1. [Thoughts on RESTful API Design](https://restful-api-design.readthedocs.org/en/latest/index.html)
2. [Wikipedia definition](http://en.wikipedia.org/wiki/Representational_state_transfer)
3. [Stackoverflow Question: What exactly is RESTful programming?](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)
4. [RESTful Web Service: The basics](http://www.ibm.com/developerworks/webservices/library/ws-restful/)

[Stateful design]: http://www.ibm.com/developerworks/webservices/library/ws-restful/figure1.gif
[Stateless design]: http://www.ibm.com/developerworks/webservices/library/ws-restful/figure2.gif
[client server]: https://restful-api-design.readthedocs.org/en/latest/_images/scope.png