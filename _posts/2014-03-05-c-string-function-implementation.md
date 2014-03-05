---
layout: post
title: "c string function implementation"
description: ""
category: 程序技术
tags: [C, string]
---
{% include JB/setup %}


本文主要讲述一下c语言里的字符串常用的函数以及一些经典的实现，讲解了数组和指针的用法。

## C 中的字符串
文字的处理是计算机重要的功能之一，C语言自然也提供了完备的机制。

### 字符串 VS 数组
c语言中并没有字符串类型，使用的字符串都是用数组实现的。比如，下面定义的str字符串，

```
char str[] = "Hello,world!"
```

实际上是如下的数组：

```
——————————————————————————————————————————————————————
| h | e | l | l | o | , | w | o | r | l | d | ! | \0 |
——————————————————————————————————————————————————————

```

注意到末尾的`\0`，这是C语言用来标识字符串结束位置的字段，这样在处理字符串的时候就能避免超出范围的操作。所以，字符串占用的长度是`strlrn + 1`。

> **NOTE**： 定义字符串时，系统会自动在末尾添加`\0`。但有些时候需要自己处理，请不要忘记，否则就会产生意想不到的错误。

### 字符串 VS 指针
在C语言中，数组和指针在使用上有很夺相似之处，可以简单地认为数组是一种特殊的指针：一旦赋值就不能再指向其他的地址。

可以用数组的方式访问字符串里的内容，
```
str[0] = 'H';
```

但是下面的方法是错误的：

```
str++;
```

指针的话就比较灵活：

```
char * p = str;
*++p = 'E';
```

## 字符串函数
在C语言的头文件`<string.h>`里定义了常用的字符串操作的函数，下面列出一些比较常用的，我们会在后面给出其实现。

函数原型                            |      说明
-----------------------             |  ------------------------
size_t strlen(const char \* s)       | 计算字符串的长度
char \*strcpy(char \*dest, const char \*src) | 把src的内容复制到dest。
char \*strncpy(char \*dest, const char \*src, size_t n) | 把src最多n个字符复制到dest
char \*strcat(char \*dest, const char \*src) | 把src的内容连接到dest的尾部
char \*strncat(char \*, const char \*, size_t) | 把src的最多前n个字符连接到dest的尾部
int strcmp(const char \*cs, const char \*ct) | 按照字典方式比较字符串cs和ct
int strncmp(const char \*cs, const char \*ct, size_t count) | 同上，最多比较前n个字符
char \*strchr(const char \*s, int c) | 返回字符c在字符串s中第一次出现的指针
char \*strrchr(const char \*, int c) | 返回字符c在字符串s中最后一次出现的指针
char \*strstr(const char \*cs, const char \*ct) | 返回指向字符串ct第一次出现在字符串cs中位置的指针
char \*skip_spaces(const char \*str) | 返回指向str第一个不为空格字符的指针
char \*strim(char \*s) | 去除字符串s的前后空格，然后返回
char \*strpbrk(const char \*cs, const char \*ct) | 返回指向ct字符串中任何字符在cs中第一次出现的位置指针
char \*strsep(char \*\*s, const char \*ct) | 把字符串按照ct中的字符分割，并返回




## linux中的实现

下面的代码来源于[github上linux](https://github.com/torvalds/linux)的`lib\string.c`文件，使用或者转载请注明来源。

### strlen：计算字符串的长度



    size_t strlen(const char *s){
        const char *sc；
        for(sc = s; *sc != '\0'; sc++)
        ;

        return sc - s;
    }


### strcpy： 拷贝字符串


```
char *strcpy(char *dest, const char *src){
    char *temp = dest;

    while((*dest++ = *src++) != '\0')
    ;

    return temp;
}

char *strncpy(char *dest, const char *src, size_t count){
    char *tmp = dest;

    while(count){
        if((*tmp = *src) != 0)
            src++;
        tmp++;
        count--;
    }

    return dest;
}
```

### strcmp：比较字符串


```
int strcmp(const char *cs, const char *ct){
    unsigned char c1, c2;

    while(1){
        c1 = *cs++;
        c2 = *ct++;
        if(c1 != c2)
            return c1 < c2 ? -1 : 1;
        if(!c1)
            break;
    }

    return 0;
}


int strncmp(const char *cs, const char *ct, size_t count){
    unsigned char c1, c2;

    while(count){
        c1 = *cs++;
        c2 = *ct++;

        if(c1 != c2)
            return c1 < c2 ? -1 : 1;
        if(!c1)
            break;
        count--;
    }

    return 0;
}

int strcasecmp(const char *cs, const char *ct){
    int c1, c2;

    do{
        c1 = tolower(*cs++);
        c2 = tolower(*ct++);
    }while(c1 == c2 && c1 != '\0');

    return c1 - c2;
}
```

### strcat：拼接字符串

```
char *strcat(char *dest, const char *src){
    char *tmp = dest;

    while(*dest)
        dest++;
    while((*dest++ = *src++) != '\0')
    ;

    return tmp;
}

char *strncat(char *dest, const char *src, size_t count){
    char *tmp = dest;

    while(count){
        while(*dest)
            dest++;
        while((*dest++ = *src++) != '\0'){
            if(--count == 0){
                *dest = '\0';
                break;
            }
        }
    }

    return tmp;
 }
```


### strchr：查找字符串里的字符

```
char *strchr(const char *s , int c){
    for( ; *s != (char)c; ++s)
        if(*s == '\0')
            return NULL;

    return (char *)s;
}

char *strnchr(const char *s, size_t count, int c){
    for(; count-- && *s ! = (char)c; ++s)
        if(*s == '\0')
            return NULL;

    return (char *)s;
}

char *strrchr(const char *s, int c){
    const char *p = s + strlen(s);
    do{
        if(*p == c)
            return (char *)p;
    }while(--p >= s);

    return NULL;
}
```

### strstr：查找字符串里的子字符串
```
char *strstr(const char* s1, const char *s2){
    size_t l1, l2;

    l2 = strlen(l2);

    if(!l2)
        return (char *)s1;

    l1 = strlen(s1);
    while(l1 > l2){
        l1--;
        if(!memcpmp(s1,s2,l2))
            return (char *)s1;
        s1++;
    }

    return NULL;
}


char *strnstr(const char *s1, const char *s2, size_t len){
    size_t l2 = strlen(s2);

    if(!l2)
        return (char *) s1;

    while(len > l2){
        len--;
        if(!memcmp(s1,s2,l2))
            return (char *) s1;
        s1++;
    }

    return NULL;
    }
}
```

### space_handle：处理字符串里的空格
```
char *skip_spaces(const char *s){
    while(isspace(*s)){
        s++;
    }

    return (char *)s;
}

char *strim(char *s){
    size_t size;
    char *end;

    size = strlen(s);
    if(!size)
        return s;

    end = s + size - 1;
    while(end >= s && isspace(*end))
        end--;
    *(end+1) = '\0';

    return skip_spaces(s);
}
```
> Written with [StackEdit](https://stackedit.io/).
