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
		Before further introduction, we need to make some conventions here.

### 3.	Basic Match
		Regex only does one thing: match a given string, return matched position if matched successufully or nil otherwise. 
