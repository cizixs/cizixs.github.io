---
layout: post
title: "apt 背后的故事"
description: "how apt works"
category: 程序技术
tags: [linux, ubuntu, apt, sources.list, mirrors]
---
{% include JB/setup %}

这篇文章介绍的是ubuntu系统的apt-get软件包的格式、管理，和其他系统可能会有出入。
### 1. debian sources list 格式

sources.list是debian系统用来指定软件源的文件，它的基本格式为：
> deb uri distribution [component1] [component2] [...]

我们使用国内的[163源](http://mirrors.163.com/)来说明每一行的具体含义
下面是来自[163源ubuntu帮助页面](http://mirrors.163.com/.help/ubuntu.html)的条目：

```
deb http://mirrors.163.com/ubuntu/ precise main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ precise main restricted universe multiverse
```

1. deb： deb指明二进制包的位置，deb-src则是源码包。
    每个档案可以有deb或者deb-src，或者兼而有之，但是两者必须分开声明。

2. uri： 比如这里的 `http://mirrors.163.com/ubuntu/`， 是所有存档的根目录。
    这个目录没有规定，可以是任意的文件夹。

3. distribution：发行版。
    $ARCHIVE_ROOT/dists下面的子文件夹，可以使用嵌套的文件夹，比如`other/ubuntu`。发行版对应Release文件里的套件(suite)或者代号(codename)，这个后面会详细解释。
    debian体系的发行版本包括：wheezy、squeeze等，每个版本有stable、testing、unstable等。
    而ubuntu的发型版本对应于每半年发布系统代号：raring、precise、saucy等

4. 组件
    标准的debian组件包括：main、contrib、non-free、non-us。
    + main: Debian 里最基本及主要且符合自由软件规范的软件 ( packages )。
    + contrib: 软件本身免费，但依赖的软件包不免费。
    + non-free: 非自由软件
    + non-us: 非美国地区，可能有加密、专利等
    
    而ubuntu的组件与之不同：main, restricted, universe, multiverse.
    + main： ubuntu支持的免费软件包
    + restricted： 不免费，但是正规支持的
    + universe：免费，但不是正规支持的
    + multiverse：不免费，不支持
    

### 2. debian repository 目录结构

下面是简化的Ubuntu源的目录结构。

![repo file tree](http://cizixs.u.qiniudn.com/ARCHIVE_tree.jpg)

> **NOTE**：
> 
> 1. 所有的兄弟文件夹（父目录相同的文件夹）都只展开第一个
> 
> 2. Pool文件夹的四个子文件夹里，存放的是按照字母顺序分类的各个软件包
> 
> 3. 每个repo的文件夹会有出入，实际以你使用的为准

### 重要的文件(夹)和解释

+ 根目录下至少有两个文件夹：`dists`和`pool`。`dists`文件夹里存储的是关于软件包的信息数据，包括：文件名称、大小、位置、校验码等。而`pool`文件下是具体的软件包存放位置，单独把文件放在`pool`文件夹里是为了防止文件的重复。

+ Release/InReleas
    
    文件位于`$ARVHIVE_ROOT/dists/$DISCTRIBUTION` 文件夹内，InRelease文件是内部自认证的，而`Release`文件需要伴随`Release.gpg`文件出现。这个文件包含该发布版（所在的文件夹）的索引文件和对应的hash。内部所列文件的位置是相对该文件的。比如上面的的source.list内容，为了获取main组件，apt会扫描`http://mirrors.163.com/ubuntu/dists/precise/Release`文件得到`main/binary-amd64/Packages.gz`组合成最终的地址`http://mirrors.163.com/ubuntu/dists/precise/main/binary-amd64/Packages.gz`。这里面就是precise发布版里main组件的所有软件索引。
    
    以`binary-$arch`命名的文件夹里是二进制文件的目录，源文件的目录在`source`文件夹。
    Package列出的文件是相对于`$ARCHIVE_ROOT`的。

+ Packages 和 Sources目录是是控制文件，包括索引、翻译和差异等。
+ `.deb`文件是debian的包文件
+ `.dsc`是debian的源码描述文件
+ `.tar`是打包的文件
+ `.gz`和`.bz2`是压缩的文件

### Release 文件的内容

上面已经说到，release文件就是索引文件。除了具体文件的hash和位置之外，一般还有其他的信息。

下面是release为文件的截图，注意：这只截取了开头的部分，完整的内容请参看实际的文件。

![release](http://cizixs.u.qiniudn.com/release.jpg)

+ 可选项，这些提供了一些repo的基本信息
    + Description： 描述
    + Origin：repo的来源
    + Label：标签说明 
    + Suite： 套件，就是前面说的distribution
    + Codename： 发布的代号
+ 决定repo布局的选项
    + Components： 对应前面的组件
    + Architectures：系统的架构 
+ 功能性的选项
    + Date：release文件的创建日期
    + Valid-Util：保质期
    + MD5Sum, SHA1, SHA256： 指使文件的位置和认证索引文件的真伪，包括：
        + checksum
        + 文件大小
        + 文件名

其中四个选项是server端必须的：

1. SHA256
2. Suite and/or Codename
3. Architectures
4. Components

### Package文件的内容

![package](http://cizixs.u.qiniudn.com/package.png)

文件`dists/$DIST/$COMP/binary-$ARCH/Packages`是二进制包的索引。这个文件分成很多段，每一段是一个具体文件包的说明，上图是一个包的完整实例。其中包括的选项有：

+ Filename：文件名，相对于$ARCHIVE_ROOT的路径（必须）
+ Size： 文件大小，byte为单位（必须）
+ MD5Sum， SHA1，SHA256：加密hash，验证wfjm（推荐）
+ Description-md5（可选）

### Sources文件的内容
![sources](http://cizixs.u.qiniudn.com/sources.png)

文件`$DIST/$COMP/source/Sources`被称为源码文件索引。它们和Packages文件相似，分为很多段，每一段描述一个源码文件包。
几个重要的选项有：

+ Directory： 文件包所在的目录
+ Package: 文件名
+ version： 版本号
+ Priority： 优先级，包括source、optional等选项
+ Files: 包括的文件
+ Checksums-Sha1(256): 校验和

### 3. apt-get 的流程

了解到上面各个文件和文件夹的用处和内容之后，apt的工作流程也就很好理解了。

1. apt程序解析source.list，根据后面的uri和发行版得到release的文件的位置
2. dns解析url的ip，请求release文件，解析组件的release文件和package文件，根据package文件里的内容找到所要装的文件包，并验证所有文件的合法性。
3. 如果文件包有依赖（depends），继续使用上述的方法定位到依赖的安装包。安装所有依赖后，再安装该软件包。
4. 如果文件包没有依赖，直接安装。

### 4. 定制自己的source.list文件

1. 找到repo的根目录（$ARCHIVE_ROOT），就是包含`dists`和`pool`目录的那个目录，记为
2. 打开`dists`目录，记下其中的子目录名称，找到自己要使用的版本名
3. 打开`pool`目录，找到里面的组件名称
4. 编写自己的`source.list`，格式为`deb url codename component`。
5. 更新一下：`sudo apt-get update`。


---------------
### 参考资料
+ [Debian Repository HOWTO ](https://www.debian.org/doc/manuals/repository-howto/repository-howto)
+ [Debian Repository Format](https://wiki.debian.org/RepositoryFormat)
+ [debian软件源source.list文件格式说明](http://www.cnblogs.com/beanmoon/p/3387652.html)
+ [Ubuntu Repository Wiki](https://help.ubuntu.com/community/Repositories/Ubuntu)
+ [difference between Debian's contrib and non-free sections](http://askubuntu.com/questions/27513/what-is-the-difference-between-debian-contrib-non-free-and-how-it-corresponds)
+ [debian repository](http://ftp.debian.org/debian/)
+ [ubuntu codename wiki](https://wiki.ubuntu.com/DevelopmentCodeNames)
+ [debian release](https://wiki.debian.org/DebianReleases)

 

> Written by [cizixs](cizixs.github.io/about) with [StackEdit](https://stackedit.io/).
> 
> [帮助博主娶老婆](https://me.alipay.com/cizixs)
