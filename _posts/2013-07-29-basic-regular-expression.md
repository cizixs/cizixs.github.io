---
layout: post
title: "Basic Regular Expression"
description: ""
category: 
tags: [regex, tutorial]
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


First some definitions and conventions:
<dl>
	<dt>character</dt>
	<dd>Any printable element in ASCII table.</dd>

	<dt>metacharacter</dt>
	<dd>The character that has special meaning in regex, like .,*,?,^,$</dd>

	<dt>(target)? string</dt>
	<dd>The string used for regex to match certain spattern</dd>

	<dt>regex</dt>
	<dd>The special code block used to match pattern in a string</dd>

	<dt>match</dt>
	<dd>The real match between <strong>string</strong> and <strong>regex</strong> is denoted by =~, as used in ruby.</dd>
</dl>


### 3.	Basic Matching
Regex only does one thing: match a given string, return matched position if matched successufully or nil otherwise. If there are more than one matching reuslt, it only returns the first one.


	"Hello, world" =~ /or/			#=> 8  
	"Hello, world" =~ /le/   		#=> nil
	"Hello, world" =~ /l/			#=> 1

In order to better illustrate and understand regex, we put emphisis on the matching part in place of mathcing position,like:  

	"Hello, world" =~ /wo/								#=> Hello, <wo>rld
	"Hello, world" =~ /.l/								#=> H<el>lo, world
	"I'll use regular expressions." =~ /re.*/			#=> I'll use <regular expressions.>
	"Think different!" =~ /if*/							#=> Think d<iff>erent!
	"stay hungry stay foolish" =~ / s[tl]ay/			#=> stay hungry <stay> foolish 
	"stay hungry stay foolish" =~ /^st[aeiou]y/			#=> <stay> hungry stay foolish
	
   
The follow table shows metacharacters and their meaning.
  
| symbol	| matches                          |
|  ------   | -------------------------------  |
| .	        | any character                    |  
| *	        | zero or more repetition          | 
| +         | one or more repetition           | 
| ?	        | zero or one repetition           |
| {m,n}	    | at least m, at most n repetition |
| {m,}      | at least m repetition            |  
| []	    | any characters in []             |
| ^         | the start of line                |
| $         | the end of line                  |

Code above concerns two concepts: **position** and **repetition**. 


While reading, you may wonder: what if I want to match a string in a certain position? What if I want to repeat a string instead of a char? This is where **group** comes to rescue.
 
### 4. More powerful
* grouping
	
* shortcuts

* variables  
	What is you want to use the matched string? The best way is to assign it to certain variables.Fortunately, you don't have to do it by yourself, many languages have built-in variables for this.  
	

### 5. Interesting tricks
* __one-line regex__  
	- [/ -~/](http://www.catonmat.net/blog/my-favorite-regex/)  matches all ASCII characters from the space to the tilde which are all printable characters!
	

	- [/^1?$|^(11+?)\1+$/](http://coolshell.cn/articles/2704.html) matches all prime numbers.
	
* __regex in practice__
  
		email   =>		/\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/
		ip		=>		/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/


