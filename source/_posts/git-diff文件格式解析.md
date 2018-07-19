---
title: git-diff文件格式解析
pid: how-to-read-git-diff
categories:
  - Git
tags: [git]
date: 2016-10-29 21:12:07
---
<center>git diff命令输出的结果看起来十分令人费解，那么它究竟表示什么意思呢？</center>
<!-- more -->

## diff

diff是Unix系统的一个很重要的工具程序，git diff本质上就是diff格式，它的输出用来表示两个<span class="ic">文本文件</span>之间的差异，其基本格式如下:

```
$ diff <文件1> <文件2>

```

**三种格式**

由于历史原因，diff有3种格式，分别是

1.  normal diff
2.  context diff
3.  unified diff

测试文件:

文件f1.txt

```
a
a
a
a
a
a
a

```

文件f2.txt

```
a
a
a
b
a
a
a

```

### normal diff

输出

```
➜  testGit git:(B) ✗ diff f1.txt f2.txt  
4c4
< a
---
> b

```

第一行是一个提示`4c4`，用来说明变动的位置。

第一个4表示f1.txt的第4行有变化，中间的"c"表示变动的种类是<span class="ic">内容改变(change)，
</span>，其他种类还有<span class="ic">a(addtion，增加)</span>、<span class="ic">d(deletion，删除)</span>。第二个4表示变动后，变成f2.txt的第4行。

第二行`< a`，前面的小于号，表示要从f1.txt中去除该行，后面的"a"表示该行的内容。

第三行`---`用来分隔f1.txt和f2.txt。
第四行类似第二行，大于号表示f2增加了该行，后面的"b"表示该行的内容。

最早的Unix(即AT&T版本的Unix)，使用的就是这种格式(normal)的diff。

### context diff

加入<span class="ic">-c</span>参数，代表上下文格式的diff.

```
$ diff -c f1.txt f2.txt

```

显示结果如下:

```
*** f1.txt  2016-10-29 16:51:43.116050085 +0800
--- f2.txt  2016-10-29 16:51:55.480307699 +0800
***************
*** 1,7 ****
  a
  a
  a
! a
  a
  a
  a
--- 1,7 ----
  a
  a
  a
! b
  a
  a
  a

```

分为4个部分。

第一部分，前两行

```
*** f1.txt  2016-10-29 16:51:43.116050085 +0800
--- f2.txt  2016-10-29 16:51:55.480307699 +0800

```

显示了两个文件的基本信息，文件名和上次修改时间。
其中<span class="ic">***</span>表示f1.txt，即变动前的文件，<span class="ic">---</span>表示f2.txt，即变动后的文件。

第二部分是15个星号，用来分隔。

```
***************

```

第三部分显示前一个文件，即f1.txt。

```
*** 1,7 ****
  a
  a
  a
! a
  a
  a
  a

```

这时不仅显示发生变化的第4行，还显示变化行的上下3行的上下文，
因此一共显示7行，前面的`*** 1,7 ****`就表示，显示从第1行到第7行，即如果显示`*** x,y ****`，则y-x一般是6（除非到头）

另外，每一行前面还有一个标志位，如果为空，则表示该行无变化；如果是感叹号(!)，则表示该行有改动(c)，如果是减号(-)，则表示该行被删除(d)，如果是加号(+)，则表示该行为新增(a)。

第四部分显示变动后的文件f2.txt。

```
--- 1,7 ----
  a
  a
  a
! b
  a
  a
  a

```

### unified diff

合并格式，如果两个文件相似度很高，那么context diff就将会显示大量重复的内容。1990年，GNU diff率先推出了unified diff，将f1和f2的上下文合并在一起显示。

加入<span class="ic">-u</span>参数，代表unified。

```
$ diff -u f1.txt f2.txt

```

显示结果如下:

```
--- f1.txt  2016-10-29 16:51:43.116050085 +0800
+++ f2.txt  2016-10-29 16:51:55.480307699 +0800
@@ -1,7 +1,7 @@
 a
 a
 a
-a
+b
 a
 a
 a

```

分为3个部分。

第一部分，显示文件基本信息。

```
--- f1.txt  2016-10-29 16:51:43.116050085 +0800
+++ f2.txt  2016-10-29 16:51:55.480307699 +0800

```

<span class="ic">---</span>表示变动前的文件，<span class="ic">+++</span>表示变动后的文件。

第二部分

```
@@ -1,7 +1,7 @@

```

用两个@来作为起始，中间`-1,7 +1,7`表示显示的范围。

<span class="ic">-1,7</span>分为三个部分，<span class="ic">-</span>表示第一个文件,即f1.txt，<span class="ic">1</span>表示下面输出的从第1行开始，<span class="ic">7</span>表示下面输出的到第7行结束。<span class="ic">+1,7</span>类似。

第三部分是具体的变动内容。

```
 a
 a
 a
-a
+b
 a
 a
 a

```

和context diff类似，除了变动行以外，上下文各多显示3行。它将两个文件相同的上下文合并在了一起，每一行最前面有一个标志位，如果是空表示无变动，减号表示第一个文件删除的行，加号表示第二个文件新增的行。

* * *

## git diff

git使用的是unified diff的变体。

```
$ git diff

```

显示结果如下:

```
diff --git a/f1.txt b/f1.txt
index 01a1025..a4c6987 100644
--- a/f1.txt
+++ b/f1.txt
@@ -1,7 +1,7 @@
 a
 a
 a
-a
+b
 a
 a
 a

```

除了前两行，基本都和unified diff格式一致。

第一行

```
diff --git a/f1.txt b/f1.txt

```

表示结果是git格式的diff，比较的是a版本的f1.txt(变动前)和b版本的f1.txt(变动后)。

第二行

```
index 01a1025..a4c6987 100644

```

表示两个版本的git哈希值，index区域的01a1025对象，与工作目录区域的a4c6987对象进行比较，最后六位<span class="ic">100644</span>是对象的模式，即普通文件，644权限。

第三行

```
--- a/f1.txt
+++ b/f1.txt

```

表示进行比较的两个文件，<span class="ic">---</span>表示变动前的版本，<span class="ic">+++</span>表示变动后的版本。
