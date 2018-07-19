---
title: .gitignore文件解析
pid: about-git-ignore
categories:
  - Git
tags: [git]
date: 2016-10-31 21:07:47
---
<center><span class="ic">.gitignore</span>文件指定了Git会忽略哪些文件。</center>
<!-- more -->

## 文件位置

### 全局域

在<span class="ic">$HOME/.config/git/ignore</span>文件中指定

### 仓库域

在仓库的<span class="ic">.git/info/exclude</span>文件中或者<span class="ic">.gitignore</span>文件中指定

## 作用描述

<span class="ic">.gitignore</span>文件指定了git不应该追踪哪些文件的管理，之前已经被Git所管理跟踪的文件不受影响。

### 优先级

<span class="ic">.gitignore</span>文件的每一行指定了一个模式(pattern)，git忽略的模式按照以下优先级决定(如果是同级，后面的模式决定结果):

1.  从命令行中读取的命令所指定的模式
2.  从同目录下的<span class="ic">.gitignore</span>文件中读取的模式，或者在任何父目录中(优先级较低)
3.  从<span class="ic">.git/info/exclude</span>文件中读取的模式
4.  从配置变量<span class="ic">core.excludesFile</span>指定的文件中读取的模式

### 选择写入位置

如何决定将规则模式写入哪个文件中呢?

1.  如果模式需要被版本控制，通过克隆分发到其他仓库中，即所有开发者都希望忽略的话，应该写到<span class="ic">.gitignore</span>文件中
2.  与特定仓库相关联，并不需要与其它相关仓库共享的模式(如与特定开发者的工作流相关的辅助文件)，应该写入<span class="ic">.git/info/exclude</span>文件中
3.  用户希望Git永久忽略的文件模式(如由用户编辑器产生的备份或临时文件)，一般写入一个被<span class="ic">core.excludesFiles</span>变量指定的文件中，它的默认值是<span class="ic">$XDG_CONFIG_HOME/git/ignore</span>，如果<span class="ic">$XDG_CONFIG_HOME</span>是空的或者没有设置，<span class="ic">$HOME/.config/git/ignore</span>被替代使用。

## 模式语法

pattern的语法十分简单，总结如下:

1.  #开头的是注释，如果文件真的以#开头，需要用\#转义

2.  前缀!反向了模式，任何之前被排除跟踪的文件，当再次遇到!模式后，又会被Git所管理跟踪。如果父目录被忽略，那么其中的文件不可能再被跟踪了。

3.  如果一个模式以/结尾，那么git会把它当成目录来看待。

4.  如果模式不以/结尾，git会把它当做shell模式来处理，相对于<span class="ic">.gitignore</span>文件的位置查找(如果不是<span class="ic">.gitignore</span>文件指定的则相对于工作目录的顶级目录查找)。

5.  可以使用通配符*

6.  一个前置/匹配路径名的开始。如，<span class="ic">“/*.c“</span>匹配<span class="ic">cat-file.c</span>，但不能匹配<span class="ic">mozilla-sha1/sha1.c</span>

7.  模式中两个连续的星号(**)，能匹配可能有特殊含义的全路径名，如：

    *   前置的<span class="ic">**/</span>能匹配全部目录名，如<span class="ic">"**/foo"</span>能匹配任何目录下的文件或目录<span class="ic">foo</span>，等价于<span class="ic">”foo“</span>。<span class="ic">"***/foo/bar"</span>能匹配任何直接在<span class="ic">foo</span>目录下的<span class="ic">bar</span>文件或目录。

    *   后置的<span class="ic">/**</span>能匹配内部的所有内容

    *   中间的<span class="ic">**</span>能代表任意层目录，如<span class="ic">a/**/b</span>能匹配<span class="ic">a/b</span>、<span class="ic">a/x/b</span>、<span class="ic">a/x/y/b</span>等等。

如果想要让某个已经被跟踪的文件不再被git跟踪，使用`git rm --cached`。

## 一个例子

忽略除了<span class="ic">foo/bar</span>以外的所有文件。

```
/*
!/foo
/foo/*
!/foo/bar

```

注意，如果<span class="ic">/*</span>没有<span class="ic">/</span>，则其也会忽略<span class="ic">foo/bar</span>下的所有内容。
