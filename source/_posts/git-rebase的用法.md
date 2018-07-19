---
title: git rebase的用法
pid: use-git-rebase
categories:
  - Git
tags: [git]
date: 2016-10-27 21:15:45
copyright: false
---
<center>本文是git rebase的介绍和总结。</center>
<!-- more -->

## git rebase 简介

在Git中，有两种方式可以把一个分支的修改整合到另一个分支，分别是`merge`和`rebase`。
在开发过程中，不同分支的进度往往不同，在同一个节点往后，往往衍生出不同的commit树，如下图所示：

![最初分叉的提交历史](https://git-scm.com/figures/18333fig0327-tn.png)

之前的`merge`方式，会将两个分支最新的快照(C3和C4)以及两者最近公共祖先(C2)进行三方合并，合并的结果是产生了一个新的commit(C5)，如下图所示:

![merge方式](https://git-scm.com/figures/18333fig0328-tn.png)

还有一种方式，你可以将在C3里的变化补丁在C4的基础上重新打一遍，可以把在一个分支里提交的改变迁移衍合到另一个分支里重放一遍。

我们运行：

```
$ git checkout experiment
$ git rebase master

```

原理: 回到LCA，根据当前分支(要进行衍合的分支<span class="ic">experiment</span>)后续的历次提交对象(这里只有一个C3)，生成一系列patch，然后以基地分支(也就是<span class="ic">master</span>分支)的最后一个提交对象(C4)为新的出发点，逐个应用之前准备好的补丁文件，最后生成一个新的commit(C3')，从而改写了<span class="ic">experiment</span>的提交历史，使它成为了<span class="ic">master</span>的直接下游，如下图所示：

![rebase方式](https://git-scm.com/figures/18333fig0329-tn.png)

现在回到<span class="ic">master</span>分支，进行一次快速合并。

![rebase-ff](https://git-scm.com/figures/18333fig0330-tn.png)

现在的C3'，实际上和普通的三方合并(即使用`merge`而产生的C5)的内容已经一模一样了。虽然最终得到的结果没有什么区别，但`rebase`会产生一个更加整洁的提交历史。

## 一个实例

假设你基于远程分支<span class="ic">origin</span>，创建了一个叫<span class="ic">mywork</span>的分支。

```
$ git checkout -b mywork origin

```

![](http://gitbook.liuhui998.com/assets/images/figure/rebase0.png)

在<span class="ic">mywork</span>分支上做一些修改，生成两个提交：

```
$ vi file.txt
$ git commit
$ vi otherfile.txt
$ git commit
...

```

但是，与此同时，别人也在<span class="ic">origin</span>分支上做了修改并且提交到了远程分支上，这意味着<span class="ic">origin</span>和<span class="ic">mywork</span>两个分支各自前进了，他们“分叉”了。

![](http://gitbook.liuhui998.com/assets/images/figure/rebase1.png)

现在，你有两种选择。

1.git merge方式

![](http://gitbook.liuhui998.com/assets/images/figure/rebase2.png)

2.git rebase方式

```
$ git checkout mywork
$ git rebase origin

```

这些命令会把你的<span class="ic">mywork</span>分支的每个提交取消掉，把它们保存为补丁(patch，这些补丁放在<span class="ic">.git/rebase</span>目录中)，然后让<span class="ic">mywork</span>更新到<span class="ic">origin</span>分支，最后把保存的补丁应用到<span class="ic">mywork</span>分支上。

效果如下：

![](http://gitbook.liuhui998.com/assets/images/figure/rebase3.png)

当<span class="ic">mywork</span>更新后，老的提交将会被丢弃，如果运行垃圾收集命令(pruning garbage collection，如git gc)。

使用`merge`和`rebase`所产生的历史的区别：

![git rebase](http://gitbook.liuhui998.com/assets/images/figure/rebase5.png)

在rebase的过程中，可能会出现冲突(conflict)，即两个分支修改了同一文件。
Git会停止rebase并让你去解决冲突，解决完冲突后，使用`git add`命令去更新index，然后，**无需执行`git commit`**，只要执行：

```
$ git rebase --continue

```

Git就会继续应用剩下的补丁。

在任何时候，使用下列命令终止rebase操作，并且<span class="ic">mywork</span>分支会回到rebase开始前的状态。

```
$ git rebase --abort

```

