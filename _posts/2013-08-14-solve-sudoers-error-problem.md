---
layout: post
title: "solve sudoers error problem"
description: ""
category: 
tags: []
---
{% include JB/setup %}

###Tricky Problem
Today I tried to install openstack in my ubuntu12.04 with [devstack](www.devstack.org).
It should be simple, but a lot of trouble occured while doing it. The main one is about privileges.
As I only work in ubuntu default user, and use 'sudo' somtimes, I know little about how linux manage group, users and 
permissions and mod. I never used 'root' user as I was told not to.

In order to grant some users root privilege, I changed /etc/sudoers file with **visudo** command. Unfortunately,
there is an error in my modified file which caused the problem that 'sudo' won't work. Whenever I type 'sudo' command, 
it prints out the following error:

    sudo: >>> /etc/sudoers.d/README: syntax error near line 1 <<<
    sudo: parse error in /etc/sudoers.d/README near line 1
    sudo: no valid sudoers sources found, quitting
    sudo: unable to initialize policy plugin

Yep, I have to edit 'sudoers' file, but it requires root privilege. There are 2 ways to perform as root:  
+ login as root -> but I don't know the password
+ using 'sudo' and become root for once -> sudo didn't work because of /etc/sudoers


###How to solve?
I was desperate for a solution, and started turning to google for help. The 
first idea is find [default ubuntu root password](http://www.liberiangeek.net/2012/07/question-what-is-the-root-default-password-in-ubuntu-12-04),
and become root. Sad news: 

    the root user doesn’t have a password by default. In fact, the root account is disabled by default when you install Ubuntu.
    To reset the root password, you need 'sudo passwd root'.

All right, let's find another way. Change root password, is it possible to do this without knowing root account? Doesn't fit linux way of users. 
Actually, it could be done! The answer is in the [post](http://askubuntu.com/questions/24006/how-do-i-reset-a-lost-administrative-password).
Mainly, the following steps give a perfect solution to the problem:  

1. reboot ubuntu, when enter grub screen, hit _left_ shift, get into advanced ubuntu mode and select **Recovery Mode**.
2. Scroll down to root menu, and hit enter.
3. enter "mount -rw -o remount /" to get write permission.
4. enter "passwd root" to change root password.


###Not again
You never want this to happen again! Now I have access to root user, but remember how linux works: 

    Don't use root account unless you knoe exactly what you're doing.

That doesn't mean throwing away root like I did in the past. **Root** is the superhero who'll come to rescue when some shit happens.
