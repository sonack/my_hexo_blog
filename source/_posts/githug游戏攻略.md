---
title: githug游戏攻略
pid: fuck-githug
categories:
  - 攻略
tags: [game,git,githug]
date: 2016-10-22 15:46:53
---
Github我知道是什么，那么Githug这又是个啥？其实Githug是一个练习Git技能的命令行游戏，这里是它的[GitHub仓库](https://github.com/Gazler/githug)。
<!-- more -->
### 安装方法

Github需要事先安装Ruby 1.8.7+，Ubuntu自带的Ruby版本就是1.9.3，所以可以直接通过以下命令安装。Windows系统或者Mac系统的小伙伴可以查看上述GitHub地址，来获取更加详细的安装方法。

```
$ gem install githug

```

安装完成后，到你想要的目录下，输入`githug`命令，按要求创建一个git_hug目录，进入该目录，即可开始游戏。

### 游戏命令

1.  play 默认命令，检查是否过关
2.  hint 提示
3.  reset 重置本关或到其他关
4.  levels 查看所有关卡

通过`git levels`发现一共有55关，真是任重而道远啊。

### 攻略

#### init

一个新的目录'git_hug'被创建成功，要求初始化该目录为一个仓库。

```
$ git init

```

* * *

#### config

设置自己在Git中的名字和Email，这十分重要，因为它们被用来标识你的提交。

```
$ git config user.name 'sonack'
$ git config user.email 'my_email@qq.com'

```

也可以加上<span class="ic">--global</span><spa></spa>参数来全局设定。

* * *

#### add

在你的目录中有一个叫做<span class="ic">README</span>的文件，你应该把它添加到你的暂存区(staging area)中，

```
$ git add README 

```

* * *

#### commit

<span class="ic">README</span>文件已经被加入你的暂存区中，现在提交(commit)它！

```
$ git commit -m 'add a README'

```

* * *

#### clone

克隆仓库 https://github.com/Gazler/cloneme

```
$ git clone https://github.com/Gazler/cloneme

```

* * *

#### clone_to_folder

克隆仓库 https://github.com/Gazler/cloneme 到 'my_cloned_repo'中。

```
$ git clone https://github.com/Gazler/cloneme my_cloned_repo

```

* * *

#### ignore

vim编辑器为所有当前打开的文件都生成了以<span class="ic">.swp</span>结尾的交换文件，我们不希望它们污染我们的仓库，让这个仓库忽略<span class="ic">.swp</span>文件。

```
$ echo "*.swp" >> .gitignore 

```

<span class="ic">.gitignore</span>文件定义了忽略文件的规则。

* * *

#### include

注意到一些文件以<span class="ic">.a</span>为后缀名，我们想要git忽略除了<span class="ic">lib.a</span>之外的所有<span class="ic">.a</span>文件。

```
$ echo '!lib.a' >> .gitignore 
$ echo '*.a' >> .gitignore

```

* * *

#### status

仓库中有一些文件，其中之一没有被Git跟踪管理(untracked)，找出它来！

```
$ git status

```

发现`database.yml`没有被跟踪。

* * *

#### number_of_files_committed

仓库中有一些文件，有多少文件会被提交(commit)呢？

```
$ git status 

```

发现有两个文件要被提交。

* * *

#### rm

一个文件已经从工作区中被删除了，但它还没有从仓库中删除，找到这个文件并彻底删除它！

```
$ git status
$ git add .
$ git commit -m '删除'

```

或者使用`git rm .`也可。

* * *

#### rm_cached

一个文件无意间被添加进了你的暂存区中，找出它并将它从暂存区中移出。

```
$ git rm --cached deleteme.rb 

```

因为是初始提交，所以使用`git rm`，否则一般使用`git reset HEAD`。

* * *

#### stash

你已经做了一些更改，然后想以后再继续工作。你应该保存它们，但不要提交。

```
$ git stash

```

* * *

#### rename

我们有一个叫做<span class="ic">oldfile.txt</span>的文件，现在我们想要重命名它为<span class="ic">newfile.txt</span>并且存储这次改变。

```
$ git mv oldfile.txt newfile.txt

```

自动处于staged状态。

* * *

#### restructure

你在仓库中添加了几个文件，但是现在却意识到你的工程需要重新组织结构。创建一个新文件夹<span class="ic">src</span>，并使用Git来移动所有<span class="ic">.html</span>文件到<span class="ic">src</span>中。

```
$ mkdir src
$ git mv *.html src

```

使用`git mv`来重命名或者移动文件。

* * *

#### log

最近提交的hash值是多少？为此你可能需要查看log信息。

```
$ git log --pretty=format:"%h" -1

```

* * *

#### tag

我们现在有一个Git仓库，我们想给当前提交加上一个标签“new_tag”。

```
$ git tag new_tag

```

默认标签就是加在最新提交上的。

* * *

#### push_tags

当前分支有一些还没有推送到远程仓库的tags，现在推送它们。

```
$ git push origin --tags

```

一次性推送所有尚未推送的本地标签到远程仓库。

* * *

#### commit_amend

<span class="ic">README</span>文件已经被提交了，但是似乎<span class="ic">forgotten_file.rb</span>被忘记提交了。添加上这个文件，然后修正你的上一次提交，将它也提交进去。

```
$ git add forgotten_file.rb
$ git commit --amend

```

* * *

#### commit_in_future

以一个未来的日期来提交你的更改（比如，明天）。

```
$ git commit --date="2099-9-1"

```

* * *

#### reset

有两个文件要被提交，我们想单独提交它们，然而它们却意外地都被添加到了index中，利用reset命令先将文件<span class="ic">to_commit_second.rb</span>从index中撤出(注意不要commit)。

```
$ git reset HEAD to_commit_second.rb

```

* * *

#### reset_soft

你刚刚提交了不久，现在你想要撤销最后一次提交，但是保留index中的内容。

```
$ git reset --soft HEAD^

```

* * *

#### checkout_file

一个文件已经被修改了，但是你不想保留这次更改。将<span class="ic">config.rb</span>文件从上一次提交中checkout。

```
$ git checkout -- config.rb

```

* * *

#### remote

项目有一个远程仓库，找出它。

```
$ git remote

```

发现远程仓库的名字是<span class="ic">my_remote_repo</span>。

* * *

#### remote_url

远程仓库有其相关联的URL，请输入远程仓库<span class="ic">remote_location</span>的URL地址。

```
$ git remote -v

```

发现<span class="ic">remote_location</span>的URL是https://github.com/githug/not_a_repo。

* * *

#### pull

你需要从origin远程仓库拉取更新。

```
$ git pull origin master

```

* * *

#### remote_add

添加一个叫作<span class="ic">origin</span>的远程仓库，URL地址是https://github.com/githug/githug。

```
$ git remote add origin https://github.com/githug/githug

```

* * *

#### push

你的本地<span class="ic">master</span>分支和远程<span class="ic">origin/master</span>分支分叉了，在<span class="ic">origin/master</span>的基础上rebase你的commit,然后推送到远端。

```
$ git rebase origin/master
$ git push origin master

```

有关rebase的详细内容，请参阅博文<a href="">git rebase的用法</a>。

* * *

#### diff

自从你上次commit后，<span class="ic">app.rb</span>文件又被修改了，找出它的哪行被修改了。

```
$ git diff

```

发现第26行被修改了，关于git diff的格式如何理解，请参阅博文<a href="">git diff格式解析</a>

* * *

#### blame

某人在<span class="ic">config.rb</span>文件中放入了一个密码，找出来他是谁。

```
$ git blame -- config.rb

```

发现是Spider Man放入了密码i<3evil。

git blame会给出文件每行的commit SHA1，commiter，commit time and line number.
可以通过<span class="ic">-L</span><spa></spa>参数指定开始行和结束行，如

```
$ git blame -L 5,+2 F1.txt

```

会显示F1.txt的第5,6行

```
$ git blame -L 5,-2 F1.txt

```

会显示F1.txt的第4,5行

```
$ git blame -L n,m F1.txt

```

会显示F1.txt的第min(n,m)到第max(n,m)行(闭区间)。

* * *

#### branch

你想要做一些危险的代码编辑工作，创建一个叫<span class="ic">test_code</span>的分支。

```
$ git branch test_code

```

* * *

#### checkout

创建并切换到一个叫作<span class="ic">my_branch</span>的新分支，你可能会像上一关一样创建一个分支。

```
$ git checkout -b my_branch

```

* * *

#### checkout_tag

你需要在版本<span class="ic">v1.2</span>上修复一个BUG，切换到标签<span class="ic">v1.2</span>

```
$ git checkout v1.2

```

* * *

#### checkout_tag_over_branch

你需要在版本<span class="ic">v1.2</span>上修复一个BUG，切换到标签<span class="ic">v1.2</span>。(注意：还有一个叫作<span class="ic">v1.2</span>的分支)

```
$ git checkout tags/v1.2

```

使用<span class="ic">tags/v1.2</span>来指定切换到tag而不是branch。

* * *

#### branch_at

你在上一次提交之前，忘记创建分支了，直接提交在了本分支上。现在你要在上一次提交之前创建一个<span class="ic">test_branch</span>分支。

```
$ git branch test_branch HEAD^

```

即根据某个提交创建新分支

* * *

#### delete_branch

你创建了太多的分支，现在你的仓库中有一个叫作<span class="ic">delete_me</span>的老分支，你应该删除它。

```
$ git branch -d delete_me 

```

* * *

#### push_branch

你在本地仓库做了一些修改，希望与他人共享，但是并没有准备合并到master分支上。只推送给远程仓库<span class="ic">test_branch</span>这个分支。

```
$ git push origin test_branch

```

或者

```
$ git push origin test_branch:test_branch

```

* * *

#### merge

我们在<span class="ic">feature</span>分支中有一个文件，让我们把它合并到<span class="ic">master</span>分支上。

```
$  git merge feature 

```

* * *

#### fetch

看起来一个新分支已经被推送到我们的远程仓库中了，取得这些修改，不要把它们合并到本地仓库中。

```
$ git fetch origin

```

其实，`git pull` 就是 `git fetch` 和 `git merge` 的合体。

* * *

#### rebase

我们正在使用git freebase，<span class="ic">feature</span>分支已经准备好要合并进<span class="ic">master</span>分支中了，让我们rebase这个<span class="ic">feature</span>分支到<span class="ic">master</span>分支上。

```
$ git rebase master feature
$ git checkout master
$ git merge feature ## ff

```

`git rebase --onto <newbase> --root [<branch>]` ，有关git rebase的详细内容，请参阅博文<a href="">git rebase的用法</a>。

* * *

#### repack

优化你的仓库打包方式，以使得冗余的包裹(packs)被移除。

```
$ git repack -a -d

```

* * *

#### cherry-pick(择优选择)

你的新feature失败了，你想要删除它。但是它有一个commit，其中填充了<span class="ic">README</span>文件，你想要这个commit保留在<span class="ic">master</span>分支上。

```
$ git log --all  # 查看feature填充README的commit SHA为ca32...
$ git cherry-pick ca32

```

这样子，可以应用其他分支的某一个commit的修改到另外的分支上。

* * *

#### grep

你的项目deadline即将到来，你应该评估你的代码中还有多少TODOs了。

纯linux方法:

```
$ cat * | grep TODO | wc -l  # 得出有4个TODO

```

git grep方法:

```
$  git grep TODO | wc -l

```

在代码中根据正则表达式和条件进行搜索，功能十分强大。

* * *

#### rename_commit

更正你的第一个提交(非根提交)的提交信息中的错误。

```
$ git rebase -i 046edb

```

046edb是根提交的SHA1值。

修改为

```
reword 4e8470d First coommit
pick 72ef1a3 Second commit

```

然后再修改提交信息即可。

当涉及修改commit时，使用`git rebase -i`命令，它接受一个参数(commit SHA)，它将罗列出此提交之后的所有提交，然后根据提示来对每个提交依次进行操作。

* * *

#### squash(压扁)

你提交了好几次，但是你想让它们都合并成一个提交。

```
$ git rebase -i e7757aff

```

修改为

```
pick 0559c6b Adding README
s 4c7e618 Updating README (squash this commit into Adding README)
s c0668f7 Updating README (squash this commit into Adding README)
s 9c4d834 Updating README (squash this commit into Adding README)

```

s(quash)表示使用该提交的修改，但和前一个提交融合。
然后输入新的提交信息即可。

或者使用f，和s相似，不同只是f直接丢弃被合并的commit的提交信息，直接使用Adding README。

* * *

#### merge_squash

合并所有<span class="ic">long-feature-branch</span>分支上的commit为一个单独的commit。

```
$ git merge --squash long-feature-branch
$ git commit -m 'merge long-feature-branch'

```

压缩提交，不会更新HEAD，将所有变更都放入<span class="ic">index</span>中。

* * *

#### reorder

你提交了几次，但是提交顺序错了。请更正你的提交的顺序。

```
$ git rebase -i 61d9af6c02b7df

```

调整顺序即可。

* * *

#### * bisect(二分debug)

在工作过程中，一个BUG产生了。你知道运行`ruby prog.rb 5`应该输出15，你也可以运行`make test`。请回答引入bug的commit的Hash值的前7位字符是什么？

```
$ git bisect start HEAD f608824
$ git bisect run make test

```

HEAD是当前有BUG的commit，f608824是<span class="ic">First commit</span>，没有BUG的节点，在两者之间查找。

得到

```
18ed2ac1522a014412d4303ce7c8db39becab076 is the first bad commit

```

所以答案是<span class="ic">18ed2ac</span>。

* * *

#### stage_lines

你修改了一个同时属于两个不同<span class="ic">feature</span>的文件，但是它们都还没有被staged。请只Stage属于第一个<span class="ic">feature</span>的变化。

```
$ git add -p feature.rb 
diff --git a/feature.rb b/feature.rb
index 1a271e9..4a80dda 100644
--- a/feature.rb
+++ b/feature.rb
@@ -1 +1,3 @@
 this is the class of my feature
+This change belongs to the first feature
+This change belongs to the second feature
Stage this hunk [y,n,q,a,d,/,e,?]? 
$ e
# Manual hunk edit mode -- see bottom for a quick guide
@@ -1 +1,3 @@
this is the class of my feature
+This change belongs to the first feature
# ---
$ git diff
diff --git a/feature.rb b/feature.rb
index 3bccd0e..4a80dda 100644
--- a/feature.rb
+++ b/feature.rb
@@ -1,2 +1,3 @@
 this is the class of my feature
 This change belongs to the first feature
+This change belongs to the second feature

```

由`git diff`的结果可以看到<span class="ic">feature1</span> 的修改已经被staged进index中了。

git add -p(--patch):交互式地选择调整由index到working tree的patch，然后把它们添加进index中。它给了用户在添加修改内容到index中时的一个复查审阅不同的机会。

使用`git add --interactive`命令也能选择patch操作，两者是等价的。

* * *

#### find_old_branch

你一直在某个分支上工作，但是中途被一次问题修复給搞乱了，忘记了之前分支的名字。请重回那个分支。

```
$ git reflog

```

发现之前从solve_world_hunger分支跳转到BUG修复分支。

```
$ git checkout solve_world_hunger

```

`git reflog`记录了每一次重要的ref发生变更时候的操作。

* * *

#### revert

你提交了若干次，但现在想撤销中间一次提交的操作。所有的commits都已经推送了，所以你不能更改已经存在的历史。

```
$ git revert d0aaaacf11dd19c54928

```

`git revert`只会撤销某一次commit的修改，并不影响其后的commit，因此可能会产生冲突，届时需要手工解决。

* * *

#### restore

你决定通过运行`git reset --hard HEAD^`命令来删除你的上一次提交(并不是个好方法)，但是你突然改变了主意，想要让那个commit回来。请恢复被删除的commit。

```
$ git reflog
$ git reset --hard 14bd03f

```

通过`git reflog`找到之前commit的SHA，即可通过`git reset`恢复。

* * *

#### conflict

你需要合并<span class="ic">mybranch</span>分支到当前分支(<span class="ic">master</span>分支)。但是在<span class="ic">mybranch</span>中似乎有一些可能会造成冲突的不正确的修改。解决你遇到的任何合并冲突，完成合并操作。

```
$ git merge mybranch
$ vim poem.txt
$ git add poem.txt
$ git commit -m '合并'

```

注意冲突文件的格式。

```
Humpty dumpty
<<<<<<< HEAD
Categorized shoes by color
=======
Sat on a wall
>>>>>>> mybranch
Humpty dumpty
Had a great fall

```

其中<span class="ic"><<<<<<< HEAD</span>到<span class="ic">=======</span>之间的内容代表<span class="ic">HEAD</span>的修改，<span class="ic">=======</span>到<span class="ic">>>>>>>> mybranch</span>之间的内容代表<span class="ic">mybranch</span>的修改。手工修改，保留mybranch修改，删除HEAD修改，然后使用`git add`确认修改即可。

* * *

#### submodule

你想要包含仓库https://github.com/jackmaney/githug-include-me中的文件到一个<span class="ic">./githug-include-me</span>文件夹中。不要用克隆仓库的方式或者直接拷贝的方式来完成它。

```
$ git submodule add https://github.com/jackmaney/githug-include-me ./githug-include-me

```

submodule是一种很方便地将一个仓库分解为多个子模块的命令，特别是项目比较大且依赖于其他git项目时，比如cocos2d-x。

* * *

#### contribute

这是最后一关，目的是通过在Github上提起一个pull request来为这个项目仓库贡献源码。请注意，这一关只是为了鼓励你去为Githug项目做点贡献，并不是测试你去提起一个pull request的能力。可能被接受的贡献种类是关卡、BUG修复或者是文档完善。

* * *

至此，所有关卡已经完成。如果本文有什么错误或者问题，欢迎讨论！
如果你对git的基本知识还不熟悉，欢迎参考我的另一篇博文[git笔记总结](http://sonack.top/2016/10/note/git-note.html)。

参考资料：

1.  [「Githug」Git 游戏通关流程](http://www.jianshu.com/p/482b32716bbe)