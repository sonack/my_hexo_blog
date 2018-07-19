---
title: git笔记总结
pid: git-note
categories:
  - 笔记
tags: [tools,git]
date: 2016-10-15 21:44:19
---
Git是当代最流行的版本控制系统，这是我在阅读了[廖雪峰的Git基础教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)后所作的笔记和总结，希望能对你有帮助。

<!-- more -->

##  <center>Git概述</center>

Git是一个分布式版本控制系统。就是基于它，著名的GitHub网站才能为开源项目免费提供Git存储，即Git的远程仓库服务。Git是完全免费的，GitHub对于开源仓库也是免费的。其他的免费的版本控制系统(Version Control System，即VCS)还有CSV，SVN等，它们都是集中式的，速度慢，而且还必须联网才能使用。

Git的产生原因是由于维护Linux项目需要一个VCS的支持。起初BitKeeper(属于BitMover公司)被授予Linux社区免费使用，而后来有人因试图破解BitKeeper而使BitMover公司撤回了对Linux社区的授权，Linus就趁机写了自己的Git来取代BitKeeper的版本控制功能。

那么集中式VCS和分布式VCS各自都有什么特点呢？

集中式是指版本库集中放在中央服务器中，每次工作都需要从中央服务器中取得最新的版本，在本机上进行修改，然后推送到远程的中央服务器上。中央服务器就好比是一个图书馆。必须联网才能工作。

分布式是指并没有中央服务器，每个人的电脑上都是一个完整的版本库，只互相推送各自的修改。因为两人电脑通常不在一个局域网内，两台电脑互相访问不了或者没有开机等等，导致在两人之间的电脑上无法推送版本库的修改，所以通常也有一台充当“中央服务器”的电脑，方便“交换”大家的修改。

常见的版本控制系统有CVS，它是免费和开源的、集中式版本控制系统。由于CVS自身设计问题，会造成提交文件不完整，版本库莫名其妙损坏的情况。同样开源免费的SVN就修正了CVS的一些稳定性问题，是目前用的最多的集中式版本库控制系统。

收费的集中式版本控制系统有IBM的ClearCase、微软的VSS(集成在Visual Studio中)等。分布式版本控制系统有Git、BitKeeper、Mercurial、Bazaar等。

##  <center>安装Git</center>

Linux系统（我的是Ubuntu14.04）可以直接使用命令 `sudo apt-get install git` 来安装。这里是在默认的软件仓库中安装，版本比较低，如果需要安装较新版本的Git，输入以下命令

```
$ sudo add-apt-repository ppa:git-core/ppa
$ sudo apt-get update
$ sudo apt-get install git

```

注意，在老版本的debian或者ubuntu linux,要用 `sudo apt-get install git-core`安装，因为有个软件(<span class="ic">GNU Interactive Tools</span>)也叫GIT,所以git只能叫<span class="ic">git-core</span>，但现在Git名气实在太大，后来就把<span class="ic">GNU Interactive Tools</span>改名为<span class="ic">gnuit</span>了，<span class="ic">git-core</span>正式改为<span class="ic">git</span>。

如果要通过Git的源码安装，就要走经典的 `./config` 、 `make` 、 `sudo make install` 三部曲了。

除了CLI的Git，还有一些图形化的Git工具，比如gitg，安装命令如下

```
$ sudo apt-get install gitg

```

安装完成后要配置自己的个人信息，在你的shell或git bash中输入以下命令，配置自己的用户名和邮箱

```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

```

其中<span class="ic">--global</span>参数代表该配置对所有本机的Git仓库都生效，这些配置都被保存在用户目录下的<span class="ic">.gitconfig</span>文件中，如果不加<span class="ic">--global</span>参数，则必须要在Git仓库目录中配置，该配置仅在该Git仓库中有效，配置文件在`.git/config`中。

配置Git使用的默认文本编辑器，使用

```
$ git config --global core.editor "subl -w"  # 配置Sublime
$ git config --global core.editor "vim"      # 配置vim   

```

注意subl程序要在PATH路径下，加<span class="ic">-w</span>参数是为了让Sublime在文件被保存后再返回。

**个性化Git配置**

让Git显示颜色

```
$ git config --global color.ui true

```

配置别名alias

```
$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
$ git config --global alias.unstage 'reset HEAD'
$ git config --global alias.last 'log -1'   # 显示最后一次提交
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

```

其中<span class="ic">--global</span>参数是全局参数，也就是说这些配置在这台电脑的所有Git仓库下都可用。

##  <center>Git基本操作</center>

### git init

```
$ mkdir learngit
$ cd learngit
$ pwd
$ git init  # 把当前目录变成Git可以管理的Git仓库

```

<span class="ic">.git</span>目录是git来跟踪管理版本库的，也可以在非空目录下建立git仓库。
也可以在一个Git仓库中再次使用`init`命令，会重新初始化已存在的Git仓库。
**如果你使用Windows系统，确保仓库路径名不包含中文。**

其实，所有的版本控制系统，只能跟踪文本文件的改动，比如TXT文件、网页、程序代码等等。
图片视频等二进制文件，虽然也能由版本控制系统管理，但无法跟踪文件的变化，只能把二进制文件每次的改动串起来，比如只能知道图片从100KB改成了120KB，但到底改了啥，VCS无法知道。

### git add & git commit

使用下列命令来将<span class="ic">readme.txt</span>文件添加进暂存区，并提交为一个版本<span class="ic">commit</span>。

```
$ git add readme.txt
$ git commit -m "wrote a readme file"

```

<span class="ic">-m</span>参数后紧跟本次提交的说明信息，你可以多次add，然后用一次commit提交很多文件，如

```
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."

```

`git add -n .`只显示将要添加的文件，而并不实际添加到index，也可以用`git add --dry-run .`。`git add . -v`将会显示详实信息。`git add . -i`交互式地添加文件。`git add -A`添加工作区中所有的文件到index。

有关`git add -A`、`git add .`和`git add -u`的区别和在Git不同版本中的表现，参见下图：
![Git1.x中各种add方式的行为](http://of1cz7dcw.bkt.clouddn.com/YfLUZ.jpg "Git 1.x")
![Git2.x中各种add方式的行为](http://of1cz7dcw.bkt.clouddn.com/KwOLu.jpg "Git 2.x")

`git commit -a`可以自动暂存被修改或删除的已跟踪文件，对于Git未跟踪的文件则不会被提交。
`git commit -c <commit sha>`可以在之前某个commit信息的基础上再编辑，作为这次commit的提交信息。

git默认不允许提交空提交，即和父commit完全一样的commit不被允许，但是可以加上<span class="ic">--allow-empty</span>参数来强制提交。
如果你不想写提交信息，使用<span class="ic">--allow-empty-message</span>参数，**强烈不建议！**

如果需要修改上一次commit的信息，可以使用以下命令

```
$ git commit --amend

```

该命令会删除上一次commit，然后用这次commit替换。

### git diff

使用下列命令

```
$ git diff file  可以查看file文件的修改 或者
$ git diff -- file # '--' 可以省略，如果当前文件不存在，则必须加上'--'
$ git diff HEAD [--] readme.txt 查看工作区和版本库里面最新版本的区别
$ git diff test 查看当前工作区和test分支的差别
$ git status 查看仓库当前的状态
$ git diff --stat 不查看具体详细差别，而是查看统计哪些文件被改动，有多少行被改动

```

不加参数的`git diff`会比较当前工作目录中Git所跟踪的尚未暂存的文件和上一次commit版本间的差异(如果已经staged，又进行修改，则比较当前工作目录和index中的差别)，如果要查看已经暂存的文件（如果新文件已经被add进index，则也会被比较）和上一次commit版本间的差异，使用`git diff --cached`命令。使用`git diff HEAD`来查看你当前的工作目录与上一次commit版本之间的所有差别。

```
git diff --cached(--staged同义词) [<commit>] # 比较当前index和commit间的差异，默认commit是HEAD，即上一次提交，如果HEAD不存在（如初始化后未进行任何commit的Git仓库），则显示所有index中的内容。

```

git diff比较分支之间的差别

```
$ git diff master..test  # 比较分支master和test之间的差异(test相对于master的增量)
$ git diff master...test  # 比较master和test的LCA(最近公共祖先)和test的差异(test相对于LCA的增量)
# 即如果A是B的父分支，则git diff A...B会显示出B分支自创建后的改变(因为LCA是A，即B相对于A的增量)，而git diff B...A会显示空，因为A相对于A的增量为0\.     

```

### git reset

Reset current HEAD to the specified state.

```
git reset [-q] [<tree-ish>] [--] <paths>...

```

重置<span class="ic">\<paths\></span>指定的文件在index中的映像为它们在<span class="ic">\<tree-ish\></span>中的样子（不影响工作区或当前分支），这意味着`git reset <paths>`与`git add <paths>`相反。然后使用`git checkout`来将其从index改变到工作区.或者`git checkout`指定<span class="ic">\<tree-ish\></span>来直接一次将某个commit中的文件内容更新到index和工作区。

```
git reset [<mode>] [<commit>]

```

这种形式的命令将当前分支<span class="ic">HEAD</span>指向<span class="ic">\<commit\></span>，根据<span class="ic">\<mode\></span>来更新index或者工作区。<span class="ic">\<mode\></span>的默认值是<span class="ic">--mixed</span>。<span class="ic">\<mode\></span>可以是以下值之一：


1. --soft 
    不改变index和working tree。所有改变都处于'Changes to be commited'状态。
2. --mixed
    更新index，但不更新working tree，所有改变都处于'not marked for commit'状态。
3. --hard
    更新index和working tree，所有从\<commit\>以后的已跟踪文件的修改都将被舍弃。
4. --merge
    重置index，更新工作区中从\<commit\>到HEAD之间不同的文件
5. --keep
    与--merge类似。


### git checkout

```
git checkout [-p|--patch] [<tree-ish>] [--] <paths>...

```

当<span class="ic">\<paths\></span>或者<span class="ic">--patch</span>给定时，`git checkout`不会切换分支。它从<span class="ic">index</span>或者<span class="ic">\<tree-ish\>(通常是一个commit)</span>指定的提交来更新工作区中<span class="ic">\<paths\></span>指定的文件。<span class="ic">\<tree-ish\></span>参数能够被用来指定一个特定的<span class="ic">tree-ish</span>(也就是一个commit、tag或者tree),以便在更新工作区之前先更新index为该<span class="ic">\<tree-ish\></span>的样子。

每一个commit都会对应一个commit id(版本号)，它是由SHA1计算出来的一个非常大的数字，用来标识这次commit。它不仅单纯根据当前版本的文件内容，还包含了这次提交时的一切元数据(meta data)，如提交时间等。

版本回退，用<span class="ic">HEAD</span>表示当前版本 上一个版本是<span class="ic">HEAD^</span>，上上版本是<span class="ic">HEAD^^</span>
往上100个版本写成<span class="ic">HEAD~100</span>。

```
$ git reset --hard HEAD^
$ git reset --hard cce56e9

```

如果上次的提交有错误，想要撤销。可以使用

```
$ git revert HEAD  # 创建一个取消上次提交的commit
$ git revert HEAD^ # 创建一个取消上上次提交的commit，上次提交(HEAD)的修改仍会保留，如果在HEAD^^之后的commit和HEAD^^，双方修改了同一个文件，则会造成冲突，需要解决冲突

```

或者修改提交来修复错误，即利用`--amend`参数。

### git rm

从工作区和暂存区中删除文件

```
$ git rm --cached file # 仅从index中删除文件
$ git rm file # 从working tree和index中都删除，只能通过之前的commit恢复
$ rm file # 仅从working tree删除，可以通过git checkout -- file恢复

```

如果要删除的文件，与HEAD相比做了修改，则要使用`--cached`保留本地文件，或用`-f`强制删除。

### git log

Show commits logs.

```
git log [<options>] [<revision range>] [[\--] <path>...]

```

默认不加任何参数，`git log`会按提交时间从晚到早(从新到旧)列出所有的更新，会显示一个SHA-1校验和，作者名字和邮件地址，提交时间，最后一个缩进段落显示提交说明。

<span class="ic">-p</span>展开显示每次提交和之前上一次提交的内容差异，用<span class="ic">-2</span>仅显示最近两次更新。

```
$ git log -p -2

```

有些时候，行层面的对比满足不了要求，需要单词层面的对比，使用<span class="ic">--word-diff</span>选项。

```
$ git log -U1 --word-diff

```

对比显示在行间，新增加的单词被<span class="ic">[+ +]</span>括起来，被删除的单词被<span class="ic">[- -]</span>括起来。使用<span class="ic">-U1</span>来将上下文行数从默认的3行改为1行。

```
$ git log --stat

```

仅显示简要的增改行数统计。

```
$ git log --pretty=oneline

```

pretty选项指定格式显示历史，如<span class="ic">oneline</span>、<span class="ic">short</span>、<span class="ic">full</span>、<span class="ic">fuller</span>、<span class="ic">format:</span>等。

<span class="ic">--pretty=oneline</span> 每个提交用一行显示 更好看

format选项可以自定制要显示的记录格式，便于后续编程提取分析

```
$ git log --pretty=format:"%h - %an, %ar : %s"

```

常用的格式占位符写法和意义见：[git-log format常用选项](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2#pretty_format)

**作者和提交者有何区别呢？**
作者指的是实际做出修改的人，提交者指的是最后将此工作成果提交到仓库的人。比如，当你为某个项目发布补丁，然后某个核心成员将你的补丁并入项目时，你就是作者，而那个核心成员就是提交者。

--graph选项添加了一些ASCII字符串来形象地展现分支、合并历史等。

其它选项：
1\. <span class="ic">--stat</span>和<span class="ic">--shortstat</span>，显示统计信息。
2\. <span class="ic">--name-only</span>和<span class="ic">--name-status</span>，前者仅显示已修改的文件清单，而后者还显示是M(修改)、A(添加)还是D(删除)。
3\. <span class="ic">--abbrev-commit</span>，仅显示SHA-1的前几个字符，而非完整的40个字符。
4\. <span class="ic">--relative-date</span>，使用较短的相对时间显示(如，“2 weeks ago”)。
5\. <span class="ic">-p</span>，按补丁格式显示每个更新之间的差异。

限制`git log`的输出长度：

```
$ git log -<n> # 展示最近的n条记录
$ git log --since=2.weeks  # 最近两周内的提交
$ git log --since="2008-01-15" # 从2008-01-15以后的提交
$ git log --since="2 years 1 day 3 minutes ago"
$ git log --author snk # 显示作者snk的提交 --committer类似
$ git log --grep search_text  # 搜索commit message中的关键字
$ git log --all-match  # 如果要得到同时满足2个搜索条件的提交，需要用--all-match选项，否则，满足任意一个条件的提交都会被匹配出来
$ git log -Sfunction_name # 找出添加或删除了某些字符串的提交
$ git log -- <path> # 只关心某些文件或目录的历史提交
$ git log --no-merges  # 非合并的提交
$ git log --no-color # 不显示颜色

```

与<span class="ic">--since</span>选项类似的还有<span class="ic">--after</span>、<span class="ic">--until</span>、<span class="ic">--before</span>等。

### git reflog

```
$ git reflog    

```

当你本地仓库中的分支(branch)或者其他引用被更新时，它会记录你的操作。它在帮助其他Git命令确定一个旧引用时十分有用。
使用`git log -g`也可以查看所有的历史操作记录。

##  <center>工作区 && 暂存区</center>

工作区(working directory)：在电脑里能看到的目录
版本库(repository)：<span class="ic">.git</span>文件夹来维护git的版本仓库，存放了很多东西，最重要的是暂存区(<span class="ic">stage</span>、<span class="ic">index</span>)，还有Git自动创建的第一个分支 <span class="ic">master</span> 以及 指向 <span class="ic">master</span> 的一个指针 <span class="ic">HEAD</span>。
`git add`就是把文件修改添加到暂存区，
`git commit`把暂存区的所有内容提交到当前分支。
每次修改，如果不add到暂存区，那就不会加入到commit中。

撤销修改，丢弃工作区的改动

```
$ git checkout -- readme.txt

```

两种情况：

1.  readme.txt自从修改后还没有被放到暂存区，此时撤销修改就回到和版本库一模一样的状态；
2.  readme.txt已经添加到暂存区，又做了修改，此时撤销修改就回到添加到暂存区时的状态。

* * *

```
$ git reset HEAD file

```

可以把送到暂存区的修改撤销掉(unstaged)，重新放回工作区。

删除文件

```
$ git rm file  # 来提交删除到暂存区 或者 直接使用 git add file
$ git commit -m "remove sth."

```

误删恢复:

```
$ git checkout -- file

```

##  <center>远程仓库</center>

### GitHub配置

github网站是用来提供Git仓库托管服务的，那么github网站上的仓库就相当于是一个远程仓库。

本地Git仓库与GitHub仓库之间的传输是通过<span class="ic">SSH</span>加密的。<span class="ic">SSH</span>是
<span class="ic">Secure Shell</span>的缩写，即安全外壳协议，它是建立在应用层和传输层基础上的安全协议。

GitHub验证的验证方式有两种：

1.  基于口令的安全验证 容易受到中间人攻击
2.  基于密钥的安全验证 登录过程较慢

**SSH配置:**

1.创建SSH Key。用户主目录的<span class="ic">.ssh</span>目录下生成<span class="ic">id_rsa</span>和<span class="ic">id_rsa.pub</span>文件，<span class="ic">id_rsa</span>是私钥(不能泄露) <span class="ic">id_rsa.pub</span>是公钥(可以放心地告诉任何人)，如果没有<span class="ic">.ssh</span>目录，需要通过以下命令来创建SSH Key。

```
$ ssh-keygen -t rsa -C "邮件地址"

```

2.登陆github, 在右上角的头像处，点击下拉菜单中的Settings，选择左侧的<span class="ic">SSH and GPG Keys</span>里面设置SSH公钥，点击<span class="ic">new SSH key</span>，在文本域中填入你的<span class="ic">id_rsa.pub</span>文件中的内容，填一个有标志性的title，然后点击<span class="ic">Add SSH Key</span>即可。

Github允许添加多个key,因此可以用若干台电脑(公司、家里等)来往Github推送。

在Github上免费托管的Git仓库，都是公开的，但只有自己可以修改。

如果不想让别人看到Git库，你可以:
1.付费使用GitHub的私有仓库。
2.自己搭建Git服务器。

**SSH警告:**

当第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告。
这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入yes回车即可。
如果担心有人冒充GitHub服务器，输入yes前可以对照 [https://help.github.com/articles/what-are-github-s-ssh-key-fingerprints/](https://help.github.com/articles/what-are-github-s-ssh-key-fingerprints/) 中的GitHub的RSA Key的指纹信息是否与SSH连接给出的一致。

### 相关Git命令

#### 添加远程库

```
$ git remote add [remote-shortname(如origin)] [url(如ssh或https)]

```

git默认使用<span class="ic">origin</span>来标识克隆的原始仓库。

#### 查看所有远程仓库

```
$ git remote [-v]   # --verbose 显示详实信息

```

#### 从远程仓库拉取数据

```
$ git fetch [remote-short-name]

```

从远程仓库remote-short-name中拉取所有你在本地仓库中还没有的数据，运行完成后，你就可以在本地访问该远程仓库中的所有分支，如<span class="ic">remote-short-name/master</span>，你可以合并该分支，也可以切换到这个分支一探究竟。

注意,fetch命令只是将远程仓库的数据拉取到本地仓库，并不自动合并到当前工作分支。当你确实准备好了，请手工合并。

```
$ git pull

```

如果已经设置了某个分支用于跟踪某个远端仓库的分支，可以使用该命令自动抓取数据下来，然后将远端分支自动合并到当前工作分支，实际上`git clone`本质上就是自动创建了本地的<span class="ic">master</span>分支用于跟踪远程仓库中的<span class="ic">master</span>分支。

#### 推送数据到远程仓库

```
$ git push -u [remote-name] [branch-name]

```

把本地的<span class="ic">branch-name</span>分支，推送到<span class="ic">remote-name</span>的服务器上。如果不指定remote-name和branch-name，克隆得到的仓库会自动使用默认的<span class="ic">master</span>和<span class="ic">origin</span>名字。

如果在你推送数据之前，已经有别人推送了若干更新，那么你的推送操作就会被驳回，你必须先把他们的更新拉取到本地，合并到自己的项目中，然后才可以再次推送。

由于远程库是空的，第一次推送master分支时，加上了-u参数，Git不但会把本地master分支内容推送到远程新的master分支，还会把本地的master分支和远程的master分支关联起来，为以后的推送或者拉取时就可以简化命令。以后，只要本地有了新的commit，就可以通过命令:

```
$ git push origin master

```

把本地master分支的最新修改推送至GitHub。

#### 从远程库克隆

从GitHub网站上首先创建一个远程库，再利用命令`git clone`克隆到本地库。

```
$ git clone git@github.com:sonack/RemoteRepo.git

```

如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了。

Git支持多种协议:默认的<span class="ic">git://</span>使用<span class="ic">ssh</span>,但也可以使用<span class="ic">https</span>等其他协议。但是<span class="ic">https</span> 速度慢，并且每次需要输入口令，比较麻烦，但在某些只开放http端口的公司内部就只能使用<span class="ic">https</span>.

#### 分支管理

主分支一般为<span class="ic">master</span>分支，开发分支一般为<span class="ic">dev</span>分支。

严格来说，<span class="ic">HEAD</span>指向<span class="ic">master</span>,<span class="ic">master</span>指向提交<span class="ic">commit</span>。

**命令小结：**

查看分支:

```
$ git branch

```

创建分支:

```
$ git branch <branch-name>

```

切换分支:

```
$ git checkout <branch-name>

```

创建+切换分支:

```
$ git checkout -b <branch-name>

```

合并某分支到当前分支:

```
$ git merge <branch-name>

```

删除分支:

```
$ git branch -d <branch-name>

```

合并方式有<span class="ic">fast-forward</span>，即快速合并(直接把<span class="ic">master</span>指向<span class="ic">dev</span>的当前<span class="ic">commit</span>，速度非常快，时间复杂性是<span class="ic">O(1)</span>级别)。

### 解决冲突

git无法执行快速合并，只能试图把各自的修改合并起来，但这种合并就可能会有冲突。

```
$ git merge feature1

```

提示冲突 也可以用`git status`查看冲突的文件，手动解决冲突后

```
$ git add file
$ git commit -m "conflict fixed"
$ git branch -d feature1

```

git使用 <span class="ic"><<<<<<<</span>、<span class="ic">=======</span>、<span class="ic">>>>>>>></span>标记出不同分支的内容。

用带参数的`git log`命令也可以看到分支的合并情况:

```
$ git log --graph --pretty=oneline --abbrev-commit

```

### 分支管理策略

通常，合并分支时，如果可能，Git会用<span class="ic">fast forward</span>模式，但这种模式下，删除分支后，会丢掉分支信息。
如果强制禁用<span class="ic">fast forward</span>模式，那么Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

```
$ git merge --no-ff -m "merge with no-ff" dev

```

因为这种合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。

**分支策略:**

原则:

1.  master分支应该是非常稳定的，也就是仅用来发布新版本，平时不在上面干活；
2.  在dev分支上干活，dev分支是不稳定的，到某个时候，再把dev分支合并到master分支上。
3.  每个人都在各自的dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并。

BUG分支:
工作还没完成，不能commit,必须要先解决bug.

或者可以用stash功能，把当前工作现场"储藏"起来，等以后恢复现场后继续工作。
在<span class="ic">dev</span>分支上没有被git管理的文件是不能被stash的(只有修改和暂存区等能被管理)

```
$ git stash

```

恢复

```
$ git stash apply   恢复但不删除stash内容
$ git stash drop    删除stash内容

```

或者用一条语句

```
$ git stash pop     恢复的同时把stash内容也删除

```

恢复指定的stash

```
$ git stash apply stash@{0}

```

### 多人协作

当从远程仓库克隆时，实际上Git自动地把本地的<span class="ic">master</span>分支和远程的<span class="ic">master</span>分支对应起来了，并且远程仓库的默认名称为<span class="ic">origin</span>。

查看远程库的信息

```
$ git remote

```

或者用`git remote -v`显示更详细的信息。

其可以显示有权抓取(<span class="ic">fetch</span>)和推送(<span class="ic">push</span>)的<span class="ic">origin</span>的地址，如果没有推送权限，就看不到<span class="ic">push</span>的地址。

**推送分支**

推送分支，就是把该分支上的所有本地提交推送到远程库，推送时，要指定<span class="ic">本地分支</span>，这样Git就会把该分支推送到远程库对应的远程分支上。

```
$ git push origin master
$ git push origin dev

```

或者用

```
$ git push --set-upstream origin dev

```

需要推送的分支:

1.  <span class="ic">master</span>是主分支，因此要时刻与远程同步；
2.  <span class="ic">dev</span>是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
3.  <span class="ic">bug</span>分支只用于在本地修复bug，没必要推送到远程；
4.  <span class="ic">feature</span>分支是否推到远程，取决于是否需要合作开发。

**抓取分支**

克隆别人的库只能看到<span class="ic">master</span>分支，要在<span class="ic">dev</span>分支上开发，必须创建远程<span class="ic">origin</span>的<span class="ic">dev</span>分支到本地，用下面的命令创建本地<span class="ic">dev</span>分支

```
$ git checkout -b dev origin/dev

```

**解决冲突**

拉取远程更新并合并

```
$ git pull

```

如果失败,则可能因为没有指定本地<span class="ic">dev</span>分支和远程<span class="ic">origin/dev</span>分支的链接，使用:

```
$ git branch --set-upstream-to origin/dev dev

```

或者用<span class="ic">--track</span>选项，然后再次`git pull`。

手动解决冲突后，再提交(<span class="ic">push</span>)

```
$ git add conflictFile
$ git commit -m "fix the conflict on dev branch"
$ git push

```

**多人协作的工作模式**

1.  试图用`git push origin <branch-name>`推送自己的修改；
2.  如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3.  如果合并有冲突，则解决冲突，并在本地提交；
4.  没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送分支。

### 标签管理

标签是版本库的一个快照，本质上是指向某个<span class="ic">commit</span>的指针(和分支类似，但分支可以移动，标签不能移动)。

创建标签

```
$ git branch
$ git checkout master    # 切换到需要打标签的分支上
$ git tag v1.0

```

`git tag <tagName>` 默认是将标签打在最新提交的<span class="ic">commit</span>上的，可以使用下面的命令指定<span class="ic">commit</span>

```
$ git tag <tagName> <commit_id>

```

查看所有标签

```
$ git tag

```

<font color="red">_注意标签不是按照时间顺序列出的，而是按照字母序排序的。_</font>

查看标签信息

```
$ git show <tagName>

```

创建带有说明的标签，用<span class="ic">-a</span>指定标签名，<span class="ic">-m</span>指定说明文字，创建用私钥签名的一个标签，用<span class="ic">-s</span>签名采用<span class="ic">PGP</span>签名，因此，必须首先安装<span class="ic">gpg</span>(GnuPG)，如果没有找到gpg，或者没有gpg密钥对，就会报错。

删除标签

```
$ git tag -d v0.1

```

推送标签到远程

```
$ git push origin <tagname>

```

一次性推送全部尚未推送到远程的本地标签

```
$ git push origin --tags

```

删除远程标签

1.  先从本地删除，`git tag -d v0.9`
2.  然后从远程删除，删除命令也是<span class="ic">push</span>，即 `git push origin:refs/tags/v0.9`

## GitHub

在<span class="ic">fork</span>开源仓库后即拥有其读写权限(自己的仓库)，可以通过推送<span class="ic">pull request</span>给官方仓库贡献代码。

## 杂项

### 忽略特殊文件

git工作区的根目录下创建一个特殊的文件<span class="ic">.gitignore</span>文件，详情可以参考我的另一篇博文[.gitignore文件解析](http://sonack.top/2016/10/Git/about-git-ignore.html)或者参考官方文档，[这里](https://github.com/github/gitignore)是一些常用的<span class="ic">.gitignore</span>文件的写法。

忽略文件的原则:

1.  忽略操作系统自动生成的文件，比如缩略图等；
2.  忽略编译生成的中间文件，可执行文件等。
3.  忽略带有自己敏感信息的配置文件，比如存放口令的配置文件等。

然后可以把<span class="ic">.gitignore</span>文件放到版本库里，并且可以对<span class="ic">.gitignore</span>文件做版本管理。

### 搭建Git服务器

1.安装git

```
$ sudo apt-get install git

```

2.创建一个git用户,用来运行git服务

```
$ sudo adduser git

```

3.创建证书登陆

收集所有需要登陆的用户的公钥(<span class="ic">id_ras.pub</span>文件)，把所有公钥导入到<span class="ic">/home/git/.ssh/authorized_keys</span>文件里，一行一个。

4.初始化Git仓库

先选定一个目录作为Git仓库，假定是<span class="ic">/srv/sample.git</span>。
在<span class="ic">/srv</span>目录下输入

```
$ sudo git init --bare sample.git

```

Git就会创建一个裸仓库，没有工作区(bare意为空的，赤裸的)。

因为服务器上的Git仓库纯粹是为了共享，所以不让用户直接登陆到服务器上去改工作区，并且服务器上的Git仓库通常都以<span class="ic">.git</span>结尾。然后把owner改为<span class="ic">git</span>用户

```
$ sudo chown -R git:git sample.git

```

5.禁用shell登陆

6.克隆远程仓库

```
$ git clone git@server:/srv/sample.git

```

管理公钥:

如果团队人员很多，可以用<span class="ic">Gitosis</span>；

管理权限:

Git不支持权限控制，但支持钩子(<span class="ic">hook</span>)机制，所以可以在服务器端编写一系列脚本来控制提交等操作，达到权限控制的目的。<span class="ic">Gitolite</span>就是这种工具。

最后附上一张[GitCheatSheet](http://of1cz7dcw.bkt.clouddn.com/git-cheatsheet-CN-dark.pdf)，愿君学有所成！




