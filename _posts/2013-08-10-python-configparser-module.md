---
layout: post
title: "Python ConfigParser Module"
description: ""
category: 
tags: [python, library, configparser]
---
{% include JB/setup %}

##Python Module
Python has a rich library which is clear, simple and easy-to-use.
It covers all subjects you might think of, from text process to network parser, from email to UI.
About python libraries and modules, you can refer to [python wiki](http://wiki.python.org/moin/UsefulModules), and [Python Module of the Module](http://pymotw.com/2/).


##About ConfigParser
ConfigParser is a relatively simple module, it involves standard read, write ,remove and  udpate functions.

###What does it do?
ConfigParser handles config file that stores useful and simple data for program to use when running.
It follows certain format which makes it much simpler to read and write. A configfile might looks like:

    [star]
    name = James Bond
    job = killer
    gender = male

    [movie]
    title : 007
    length : 90min
    director: unknown

Config File consists of many **sections**(annotated by a pair of quare braclet) that gathers a group of data.
Each line is a key-value dict divided by '=' or ':' called **item**. All of keys are **options** of a section.

After understading its content, you might get the idea of its function: stores data in uniform and make it convenient to manage.
Like any kind of data, it provides **read**, **write**, **remove** and **update** methods along with **list values**, **check exists** etc.


###Get Start

    from ConfigParser import SafeConfigParser
    parser = SafeConfigParser()
    parser.read('config.ini')

    parser.get('section', 'key')            #get value of section.key
    parser.set('section', 'key', 'value')   #set section.key as value
    parser.remove_section('section')        #remove whole section content
    parser.remove_option('section', 'key')  #remove a certain item
    parser.add_section('section')           #add a new section

