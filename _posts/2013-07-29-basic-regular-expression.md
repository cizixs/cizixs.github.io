---
layout: post
title: "Basi Regular Expression"
description: ""
category: 
tags: []
---
{% include JB/setup %}

### 1.	What is Regular Expression and Why? 
Regular Expression(Regex for simplicity) is a sequence of characters that forms a search pattern, mainly for use in pattern matching with string, or string matching.

There is a very famous quote about regex by [Jamie Zawinski](http://www.jwz.org/):
> Some people, when confronted with a problem, 
> think “I know, I'll use regular expressions.”   
> Now they have two problems.

The quote shows two main features of regex: powerful but difficult. When faced with tricked or unbelievable hard problems, regex is always a way. When you decide to use regex, itself becomes a problem due to its difficult to code, understand and maintain.

So, before moving to regex, make sure there is no other easy way to tackle your problem. 

### 2.	Conventions
Before further introduction, we need to make some conventions here. Because many programming language(like perl, python, ruby, perl...) have built-in regex, and the definition and usage diff from each other in some detail. Content below doesn't specify any language, only concerns simple and mutal regex knowledge.

A string is a bunch of words between ", like "I am too poor to buy a Macbook."; A regex is embedded in //, like /[1-4].*/.

### 3.	Basic Matching
Regex only does one thing: match a given string, return matched position if matched successufully or nil otherwise.
  	
	| symbol	| matches                          |
	|  ------   | -------------------------------  |
	| .	        | any character                    |  
	| *	        | zero or more repetition          |  
	| ?	        | zero or one repetition           |
	| {m,n}	    | at least m, at most n repetition |  
	| []	    | any characters in []             |
	| ^         | the start of line                |
	| $         | the end of line                  |
  


### 4. More powerful
* grouping
* repetition
* more conventions


### 5. Interesting tricks
* one-line regex
	- [/ -~/](http://www.catonmat.net/blog/my-favorite-regex/) matches all ASCII characters from the space to the tilde which are all printable characters!
	- [/\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/](http://www.regular-expressions.info/email.html) matched valid email address
	- [/^1?$|^(11+?)\1+$/](http://coolshell.cn/articles/2704.html) matches all prime numbers.

