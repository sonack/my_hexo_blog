---
title: Machine Learning Techniques Summary
pid: Machine-Learning-Techniques-Summary
categories:
  - Machine Learning
tags: [Machine Learning,note]
date: 2017-02-12 18:50:33
---

<center>机器学习技法相关算法和理论的总结整理，
  该课是在Coursera上由NTU的林轩田老师讲授的。</center>

<!-- more -->

---

## Lecture 0 Intro

主要继续围绕 **特征转换(feature transforms)** 的3种主要技术进行探讨：
1. 运用更高纬度的特征转换及控制复杂度，如何利用巨量的特征
  -- SVM模型
2. 寻找具有预测性质的特征，如何混合特征让整个model的表现更好
  -- 逐步增强法(Adaptive Boosting)模型
3. 提取隐含特征，如何识别和学习隐含的特征
  -- 深度学习(Deep Learning)模型

---
<big> Embedding Numerous Features:  Kernel Models </big>
## Lecture 1 Linear Support Vector Machine

### Large-Margin Separating Hyperplane
首先来看一个问题，如果要用一条线来进行二元分类，以下哪一条线最好呢？

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcoxr4uhlpj30b003jgls)

大部分人可能感觉最右边的线最好，怎么解释？
因为最右边的线离最近点的距离更大，对点的noise更鲁棒、强壮。


![](http://upload-images.jianshu.io/upload_images/4774497-034cd19f4a1ab916?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

假设noise服从高斯分布，则将来测试样本点x'≈x(可能x'就是x，只是因为测量误差等原因造成约等于)的话，那么分类结果应该一致。

三条线对测量误差的容忍度不同，容忍度越大则对过拟合overfitting更加robust(因为测量误差也是一种Noise，而Noise会引起Overfitting)。

用线距离最近点的距离来衡量这个属性。

换种描述，我们叫线有多“胖”，即线往两侧最大扩展多远才会碰到最近的点。


**目标：找到最胖的分割线(超平面)。**

问题描述为：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcoy8xnrwtj30bg02qjrz)

正式定义（Large-Margin Separating Hyperplane）：

胖是一种非正式的描述，正式名称为margin。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcoybexy8cj30bi02uq3j)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcoydlbvoej30bl02wwey)

### Standard Large-Margin Problem

#### 如何计算点到直线的距离？

distance(Xn,W)

为了计算距离的方便，将W的表示形式进行缩短，去掉截距项W0，输入样本特征的X0=1也去掉。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcoyoh9zofj30b703ot8x)

h(x) = sign(W’X + b)

因此用distance(X,b,W)代表点X到平面W’X+b=0的距离。

*注意：在本文中用大写英文字母表示矩阵或向量，如X、W，用W’表示矩阵的转置,用小写字母表示标量。*

![](http://upload-images.jianshu.io/upload_images/4774497-67da75d11920ad10?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

考虑平面上的两个点X和X`，则满足平面方程，有：

    W'X = -b
    W'X`= -b

则

    W'(X`-X) = -b - (-b) = 0

而X\`-X是平面上的一个向量，对于任意考虑的两个点X和X\`，W与(X\`-X)的内积都是0，所以W垂直于这个平面，W是法向量。

所以点到平面的距离等于点到平面上任意一点的距离投到法向量的投影长度。

所以距离公式为：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcoz71de3kj30bw0253yq)

#### 化简标准问题

我们只考虑可以完美分隔XX和OO的线，它有性质：

对于每一个n，yn*(W'Xn + b) > 0


因为|yn|=1，所以绝对值可以脱掉

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcoz9yzn2dj309801j3yk)

现在的最佳化问题如下：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcozbqck8rj30cl030mxp)

其实这个世界上可能没有那么多条线，比如
  W`X + b = 0 和 3W'X + 3b = 0 表示的是同一条直线，也就是说法向量的长度不影响线的表示。

所以我们可以利用特别的放缩，使得

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcozf6rtlpj305m01dmx3)

所以我们可以只考虑由特殊的(b,W)表达的分隔线，满足以上条件，则

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcp5wzgmm0j305101e0sm)

则最优化问题可以简化为：

![](http://upload-images.jianshu.io/upload_images/4774497-82b2fdee0e5c926b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

而min=1同时也意味着every>0，第一个条件可以删去而不影响结果。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcp618xjdtj30bs01pwen)

但问题仍然不好解，主要因为条件有个min操作，是否可以把条件放松一点呢？

条件放松，需要证明最优解一样。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcp67s6el5j30g3059tai)

满足原始条件必然满足放松条件(必要条件)，而通过反证法可以证明满足放松条件的也一定满足原始条件，因此两个条件等价。

问题可以表述如下：

![](http://upload-images.jianshu.io/upload_images/4774497-5b38342eba158bb2?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将讨厌的max改为min，将W的模方的开方根号去掉，补充一个便于后续计算的常数1/2，得到最终的问题表述。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcp6f7sorxj308y023mxb)

该问题称为“标准问题”(Standard Problem).

### Support Vector Machine


#### 名称解释
最胖的那条线g(svm)就叫做支撑向量机(SVM)

![](http://upload-images.jianshu.io/upload_images/4774497-91d84db4c18ef4a4?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用方框圈起的是离线最近的那些点，有趣的是，如果删去其他不是方框框住的点，所找出的最胖的线仍然不变，所以这些最近的点已经足够告诉我们最胖的线长什么样子，而其他的点不重要。

我们称这些方框圈住的最近的点，告诉我们最胖的线在哪的这些点，为支撑向量\[候选者] (Support Vector[candidate])。

所以support vector machine（SVM）就是在support vectors的帮助下，学习找出最胖的分割超平面。

#### 求解一般SVM问题

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcp6f7sorxj308y023mxb)

该最优化问题不适合梯度下降法，因为有约束，也不便于直接手动求解，但幸运的是，该问题属于一类已知的最优化类型。

它的最小化目标是一个二次函数（convex），它的所有约束条件都是W和b的一次式，有这样性质的最佳化问题，一般称为“二次规划”(Quadratic Programming)。


做数值最佳化的人发现这样的问题很容易解决，并已有多种求解QP问题的软件工具，因此我们需要将该问题表示成QP的标准形式，再输入到算法中，即可求解最优解。

##### 二次规划的标准形式

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcp73rbl5xj307h03tt96)

目标是最小化向量U的二次函数，二次项的系数放在矩阵Q中，一次项的系数放在向量P中。

条件是U向量的线性约束，共有M个条件，每个条件的一次式的系数放在向量Am中，常数项放在常数cm中，把所有的向量Am集合起来到一个矩阵A中，把所有的常数cm放到一个向量C中。

我们的当前问题描述为：

![](http://upload-images.jianshu.io/upload_images/4774497-a0b265e99733fa24?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将b和W集成一个向量U

系数表示如下

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcp7bdw0ddj30e202w3z3)

注意要阅读QP算法的相关手册说明。

所以求解一般SVM问题的步骤如下：

![](http://upload-images.jianshu.io/upload_images/4774497-8680fce1556c4e5b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

hard-margin（硬边界）：不允许任何点违反“胖分割线”。

linear：在X原始空间中直接使用Xn向量，没有经过任何特征转换，如果要使用非线性的分割线（即X空间的曲线），可以考虑使用Z=Φ(X)转换。

### 为什么要使用最大边界的分隔超平面？

最开始的理由：“胖”一点的分割线对测量误差的容忍度更好

**与regularization的对比：**

|技术|最小化目标|约束条件|
|:---:|:---:|:---:|
|regularization|Ein|W’W<=C|
|SVM|W’W|Ein=0 [and more]|

所以SVM其实就是一种regularization，只是它regularization的解释是边界Margin要尽可能大，以能够抵抗一些测量误差。
即也是一种“weight-decay regularization within Ein = 0”(保证Ein为0的权重衰减正则化方法)，因此SVM可以一定程度上防止overfitting。

**从VC维度解释**
从另一个角度解释，利用导入VC维度时引入的二划分(dichotomy)概念，考虑这样一种“large-margin”演算法A(ρ)：

  如果存在一条线g满足margin(g)>=ρ时，返回g；否则如果不存在则返回0.

这样的演算法在某一种特定的资料上，到底能够产生多少种OO和XX的排列组合(即dichotomies)呢？

![](http://ww1.sinaimg.cn/large/006cbtZIly1fctw7bixb1j30e306kwg1)

越少的dichotomies ==> 越小的'VC维度'(有效的VC维度) ==> 更好的泛化(generalization)性能

#### 演算法的VC维度

之前所说的VC维度都是指假设空间（即一堆hypotheses）的VC维度，这里给出演算法的VC维度概念。

演算法的VC维度和资料相关(data-dependent)，比如上述的Aρ。

例如：

假设在2维平面上有一个单位圆，当数据从单位圆内取值时

![](http://ww1.sinaimg.cn/large/006cbtZIly1fctwfxhcj8j303j02mjr9)

* 当ρ=0时，等价于PLA，因此dVC=3
* 当ρ>√3/2时，并不能shatter任意的3个点，因此dVC<3 【因为任何3个点中总有两个点的距离小于√3，】

一般地，当数据点取值在一个半径为R的超球体内时，有：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fctwslnrqrj309001pq33)

#### Large-Margin Hyperplanes 的好处

||Large-margin hyperplanes|hyperplanes|hyperplanes + 特征转换Φ|
|:---:|:---:|:---:|:---:|
|数量#|甚至更少|很少|很多|
|边界线|简单|简单|复杂|

* 数量#少比较好，因为可以控制dVC，优化泛化性能
* 边界复杂比较好，可能会有更好的Ein


原来我们只能做好其中之一，但如果把large-margin和feature transform合起来考虑，就可能两者都做好。

即我们有了一种新的可能选择：非线性SVM

||large-margin hyperplanes + numerous feature transform Φ|
|:---:|:---:|
|数量#|很少|
|边界线|复杂|

---

### Mind Map Summary

![](http://ww1.sinaimg.cn/large/006cbtZIly1fctxgkvoadj30tk0a5js0)


## Lecture 2 Dual Support Vector Machine

### 对偶问题的动机
原来的SVM如果要进行非线性变换，需要在转换后的Z空间(假设为d~维度)内进行linear SVM的求解，则在Z空间里的线性分类对应到原来的X空间可能就是一个non-linear的复杂边界。

**问题**：Z空间的QP问题有d~+1个变量、N个约束。如果d~非常大甚至无穷大，就很难甚至不可能求解。


**目标**：让SVM模型的求解不再依赖转换后的空间维度d~，以能够使用非常多的、非常复杂的特征转换。

将original问题转换为dual(对偶)问题，该问题与原问题等价即可。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcunajyvr4j30dt03agmf)

**基本工具**: Lagrange Multipliers

将Lagrange Multipliers当做变量求解，SVM中的每一个条件都会对应一个Lagrange Multiplier，所以共有N个变量。


*注意*:在SVM的文献中通常把Lagrange Multipliers的λ叫做α。

### 出发点

将有约束优化问题转换为无约束的优化问题。

原始问题：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcunjy9dr1j305f02i74c)

定义Lagrange Function:

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcunkw51igj307502emxe)

则原始问题等价于

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcunmbgjwpj306k01gmx6)

如何证明两个问题的解一样？

考虑两种情况：

* 如果某个(b,W)不满足原始问题的N个条件之一，即某个1-yn(W’Zn+b)＞0，则内部的Max操作会将αn推向无穷大，在min操作中会被淘汰。
* 如果某个(b,W)满足原始问题的所有约束，则内部Max将所有的αi都推向0，即内部的max结果就是目标的1/2W’W的值，在外部的min操作中就会取得满足条件的(b,W)中目标函数最小的组合，和原始问题一样。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcunsiku3rj30dq03gta2)

本质上就是把条件藏在了max操作里面，不满足条件的(b,W)一定不会被选择。

现在我们有了新的问题，它有哪些性质呢？



对于任何确定的α'【满足每一个元素α'n>=0】，则有

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuny6wc3hj308h01p3ym)

因为对于某一个(b,W)，内部的max(L)始终大于等于L，则左边的最低点也一定大于等于右边的最低点。
简单地说，因为max>=any。

因为对于任何α'都有上式成立，所以

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuo29sswgj30af0293yw)

因为最大的是任意的α'中的某一个。

观察发现，只不过是把min和max操作交换了顺序，称该问题为Lagrange对偶问题。

只要我们解决了Lagrange Dual Problem，就得到了original problem的一个下限。

#### 对偶性的强弱


![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuo6mjh6ej30ah02g0t8)

* '>='：弱对偶性(weak duality)
* '=': 强对偶性(strong duality)

由最优化理论可得：
  对于QP问题，如果满足：
  1. 原始问题是凸型的 convex primal
  2. 原始问题是有解的(如果Φ转换后数据点是线性可分的，则成立) feasible primal
  3. 线性约束条件
称为 '条件资格' (constraint qualification)。

则对偶问题是强对偶问题，即存在原始-对偶最优解(b,W,α)在两侧都能最优。


#### 化简对偶问题

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuodmp9c3j309x02yaae)

inner problem：里面的问题，即min操作，是没有条件约束的，因此在最优点上，满足：

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuofzkk7cj305z0130sp)

因此，加上该条件的最优解不变。

加上该条件，可以把变量b消去。

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuoir2wy9j30hf02aq3p)

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuoj0sktyj30e00203yz)

同理，对W进行类似的处理：

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuom5a2s6j30gz02lq47)

把最优解的条件加在对偶问题上：

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuoo8mluyj30gh03xabe)

#### 求解b和W(KKT条件)

现在最佳化问题只有变量α了，其他变量b和W根据和α的关系被α所表示。
求得α后，再根据这些关系求出b和W。

这些关系，我们一般叫做KKT最优条件(KKT Optimality Conditions)
KKT是三个做最优化的研究者的名字首字母(Karush-Kuhn-Tucker)。

如果原始-对偶最优解(b,W,α)：

  ![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuov64hi9j30gw04w763)

其中第4个条件，一般称为互补松弛条件(complementary slackness)

以上的推导说明KKT条件是最优解的必要条件[necessary]，但也可以证明对于我们的问题来说，它也是充分的[sufficient]。


因此我们可以利用KKT条件根据最优的α来求解(b,W)。


### Standard Hard-Margin SVM dual

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcup8blrruj30bd01p3yq)


再做一些微小的改写：

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcup961yn4j30ad041q3e)

该问题称为“标准硬边界SVM的对偶问题”。


该问题仍然是一个QP凸问题，有N个变量(α1..N)，N+1个条件(一个=0，N个>=0)。

仍然使用QP Solver求解。

#### QP系数


![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuph6ks8ij30hk08qdin)

*注意：很多QP程序可以很方便的直接特殊处理等式(A>=、A<=)或者边界类条件(an>=0)，这样可以保证它们的数值稳定性*


Q矩阵中的元素q(n,m)一般非0，是稠密矩阵(dense)，且N大时，Q矩阵很大。

因此需要特殊的求解QP的程序(专门为SVM设计的)，不存储整个Q矩阵，或者利用SVM的一些特殊条件来加速求解。

因此在实践中，我们通常最好使用特别为SVM设计的QP求解算法。


#### 获得b和W

利用KKT条件：

得到W:

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcupr40tfqj303800r744)

得到b:

和b有关的约束
![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuprooucoj306s00qjrc)
只能告诉我们一个b的范围

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcupsfha70j30ax014aa9)

如果某个αn>0 ==> (1 - yn(W’Zn + b)) = 0 
两边都乘上yn，得
(yn - (W’Zn + b)) = 0
即
b = yn - W’Zn


上式告诉我们 yn(W’Zn + b) = 1，说明该点在胖胖的边界上，即是一个支撑向量(Support Vector)。

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcupzv7u5gj3079013wel)


### 支撑向量的确切定义


我们把αn>0的点(Zn,yn)叫做support vectors，即支撑向量。

它一定在胖胖的边界上，但不是所有在胖胖的边界上的点都是SV，它们都是support vectors candidate。
即
![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuq64ur5bj3073019dfx)


#### SV的性质


计算W和b时，只需要用到支撑向量SV的点。

所以SVM是一种利用求解对偶问题的最优解，找出支撑向量来学习出最胖的分隔超平面的过程。

#### 最胖分隔超平面的表示形式

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuqadlpq0j30hk04tab8)

即W是ynZn的线性组合。

这对于当W0=0时，使用GD/SGD的LogReg或者LinReg也成立。

称作 W 能够被 数据点 所表示(represented)。

SVM: 只需要SV就可以线性表示出W。

PLA: 只需要犯错的点就可以线性表示W。


#### Hard-Margin SVM的两种形式

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuqfg5kljj30hw09ddjz)

两者最终都是得到最优的假设函数：

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuqfuuv93j307n01474d)

我们真的做到脱离d~了吗？

其实没有，计算Q矩阵时，每个q(n,m)都需要计算Zn'Zm，这是一个在R(d~)空间中的两个向量的内积，需要时间至少为O(d~)。

因此我们要想办法避开计算转换后的高维空间中向量的内积。

这部分内容需要利用kernel function的威力，我们在下一讲进行探讨。

---

### Mind Map Summary

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcuqskkdrdj30ik0920t7)


## Lecture 3 Kernel Support Vector Machine

经过上一章的推导，我们的SVM对偶问题已经是这个形式了

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv1geihyij30ay03dq3f)

这个问题的瓶颈在于矩阵Q的计算，而q(n,m)=yn*ym*Zn’*Zm，需要计算R(d~)空间内的两个向量的内积，并没有摆脱d~的依赖。


**问题**：我们如何才能快速计算Zn’Zm=Φ(Xn)’Φ(Xm)呢？如何才能比O(d~)快呢？

从Z空间的角度看，这就是两个d~维向量的内积，不可能快于O(d~)。
但如果从原始的X空间来看，这一步其实是两步：我们首先把原始资料(Xn,yn)通过转换Φ映射到空间Z，再计算内积。
如果我们能直接在X空间内完成这两步，应该可以快于O(d~)。


### Kernel Trick

#### 简单的例子

首先考虑一个简单的二次多项式转换Φ2，设原始X空间的维度是d，即原始资料有d个特征。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv1pu6kfaj30de00zdg0)

*注意：为了简单起见，该转换函数同时包含了相同的x1\*x2和x2\*x1*

我们尝试推导直接在X空间内完成以上两步(映射、内积)所对应的函数是怎么样的

我们在X空间内任意选取两个特征向量X和X’

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv1vlrp6lj309s03xjs0)

发现Z空间内的内积，可以由X空间内的内积表达出来。

这样我们不用先花O(d^2)的力气进行转换，再花O(d^2)的力气进行内积计算，我们可以直接先花O(d)的力气算出在X空间内的内积，在计算中再把它平方就好了，这样花费的时间不过是O(d)的复杂度。


我们把这个“转换”和“内积”合二为一的函数叫做**核函数**(kernel function)，所以某个特征转换就对应到某个kernel function，我们希望kernel function比较容易计算。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv22s826sj30bk01dt96)

有了kernel function后，我们可以把求解SVM的对偶问题时，需要计算Zn’Zm的地方都换成kernel function表示的形式。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv2899qrmj30d405lq4j)

注意W可以由ynZn的α线性组合得到，W’Z同样包含Zn’Z，因此也可以利用kernel function快速计算。

这种技巧就叫做kernel trick，它的核心是通过利用一个X空间内的计算高效的kernel function的计算，来映射到经过特征转换到Z空间后的两个向量的内积结果。
由于核函数的计算是在X空间内完成的，它就避免了对Z空间的高维度d~的依赖。


#### Kernel Hard-Margin SVM Algorithm

我们称这种利用了kernel trick进行高维度特征转换的SVM为kernel SVM，它的一般求解过程如下：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv2g3l33mj30ds056q4r)

它的时间复杂度

1. 计算N*N的矩阵Q，时间复杂度是O(N^2)*O(kernel function)
2. QP求解，只有N个变量，N+1个条件
3. & 4. O(#SV)*O(kernel function) [#SV代表SV的数量]

因此，只要kernel function的求解和d~无关，可以很快算出来，那么以上步骤就可以很快地、和d~无关地计算出来。


所以，kernel SVM本质上就是把原来SVM的瓶颈部分，利用了核函数这种计算上的便捷方法，从而避免了对d~的依赖的一种SVM，它同样只需要支撑向量SV点就可以进行新数据的预测。

### 多项式核

上一节中作为例子的二次多项式转换并不是唯一的二次多项式转换，下面介绍一些常用的多项式转换及其对应的核函数。

如果我们把所有的一次项都放缩√2倍，则
![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv32wp47wj30dm00qglr)
如果我们把二次项和一次项再一并进行γ倍的放缩，则
![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv33t2uvvj30dn01caa9)
即
![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv34h1vuwj3075014mx4)

这样经过适当放缩后的多项式转换的核函数，其数学表达形式看起来更加整洁一点，这是大家平常比较常用的一种形式，也比较容易延伸到更高次方的多项式。

其实放缩前的蓝色的Φ2和放缩后的绿色的Φ2的特征转换空间的能力是一样的，它的缩放系数最终会被线性函数的W中的元素的放缩所包含，但它们确实是不同的转换，最终算出来的形式不一样，是因为它们定义了不同的内积，在内积空间中，不同的内积，就代表不同的距离，不同的距离就有不同的几何特性，对于SVM算出的Margin就不一样，就可能会得到不同的边界。

因为绿色的Φ2比较简单，我们一般直接把它叫做K2，相对比较常用。

#### 不同kernel的几何表现
![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv3lycm60j30dm059wg3)


因此不同的二次多项式转换，g(svm)可能不同，支撑向量SVs也不同。

在学习之前，很难说究竟哪一个更好。

因此，kernel的改变，同时就意味着margin距离的几何定义的改变。

我们需要选择kernel，就像之前对转换Φ做选择，因为转换现在已经包含在kernel里面了。


#### 常用一般多项式核

对于原来的K2，我们还可以加一个自由度ζ，来表示常数项的放缩。

对应的转换为

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv48yo798j308v00rglo)

推广到3次方、4次方......Q次方

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv3u8fhsqj308r02w0tc)

我们将转换ΦQ嵌入到（γ，ζ）这些参数的选择中，这样就允许我们计算非常高次的多项式转换的空间中的large-margin问题，该问题不再依赖于转换空间的维度d~。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcv40b0eodj305n06rdgs)

SVM + 多项式核 = 多项式SVM


*注意：有时候转换比较简单时，直接求解原始的SVM问题反而更加简单有效，而不必利用kernel求解SVM的对偶问题，比如linear kernel K1，我们之前说过，应该首先尝试简单的线性模型。*


### 高斯核

我们之前使用kernel function来将到Z空间的转换和内积合成一步，形成了一个X空间内的函数，从而节省了力气，如果我们能够找到一个映射到无限多维的Z空间的核函数，是不是意味着我们可以使用无限多维的转换呢？


#### 一维特征

我们先考虑简单情况，假设输入特征只有一个维度，即X=(x)，我们考虑一个特别的函数K(x,x’)

 ![](http://ww1.sinaimg.cn/large/006cbtZIly1fcvpfqm4uhj30dv05ptah)

注意第三步用到了泰勒公式在0点处的展开，即麦克劳林展开，e^x的麦克劳林展开如下：

根据泰勒公式
![](http://ww1.sinaimg.cn/large/006cbtZIly1fcvphmbf1nj30eo02rwei)
![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcvpi6tnvuj30kf02jjrg)

 这样我们就得到K(x,x’)就是经过这个无限多维转换Φ(x)的核函数。

**一般的高斯核**

更一般地，X有多个维度，有γ放缩的高斯函数都可以这样表达核函数

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcvpn22rvdj309a01dweq)


#### RBF核

我们来观察一下Gaussian SVM的Hypothesis是什么形式

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcvppcl2hgj30am03fmxk)

不难发现g(svm)是很多 中心在支撑向量SV Xn 上面的高斯函数的线性组合。
因此，很多人也把高斯核叫做Radial Basis Function (辐射状(类似高斯函数的形状)的基函数(用来作线性组合的函数) Kernel，即RBF Kernel。


因此，Gaussian SVM就是找到对中心在Xn上的高斯函数进行线性组合的系数αn，并满足在无限多维空间里面最大margin的要求。


#### 高斯SVM的几何表现

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcvq0087yrj30e204yabv)

![](http://ww1.sinaimg.cn/mw690/006cbtZIly1fcvq1qlizyj305m01k0si)

γ变大，相当于高斯函数的标准差σ变小，Gaussians就变得尖了，线性组合后曲线就会不均匀，变得不平滑甚至产生孤岛。

虽然有large margin的保证可以尽量避免overfit，但如果γ选取的不好(过大)，还是可能overfit。

因此，使用Gaussian SVM时候，要慎重选择参数γ，通常不建议使用太大的γ。

#### 无限大的γ

如果γ->∞，那么K(x,x')=exp(-γ|x-x'|^2)会趋向于什么呢？

如果x=x'，则不论γ为多少，K(x,x')=1。
如果x!=x'，则当γ->∞时，K(x,x')->0。

因此K(limit)好像是一个脉冲函数，它是当γ趋向于∞时，高斯函数变得尖尖的极端情况。

因此K(limit)=[[ x=x' ]] ，[[ ]]表示布尔运算。



### 不同Kernel的优缺点

#### linear kernel

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcvqnua7wdj303c015mwz)

优点：

  1. 简单、安全，应该首先尝试
  2. 有专门针对primal问题设计的QP Solver，比较快，没必要解对偶问题
  3. 模型可解释性好，W和支撑向量SV可以告诉我们模型认为哪些feature或者data point是重要的。


缺点：
  
  1. 应用场所有限，如果数据不是线性可分，就不可用

#### Polynomial Kernel

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcvqo2ybicj306m01ugll)

优点：

  1. 比linear的应用限制更少，可以解决non-linear separable的数据
  2. 可以通过Q很强地控制模型的物理意义，比如你知道数据的关系是几次方，则可以直接通过Q来表达这种信息。

缺点：

  1. kernel function的计算在数值上有困难，当Q变大时
  * 如果|ξ+γX’X'|<1，则K->0
  * 如果|ξ+γX’X'|>1，则K->big
  2. 有三个参数(γ,ξ,Q)需要选择，选择上比较困难


因此，Polynomial Kernel通常只会用在你已经大概知道要用的Q是多少，且Q不是很大。
有时，当Q比较小时，直接把Z空间展开，解primal SVM也很有效率。

#### Gaussian Kernel

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcvqx5acg9j307p023weh)

优点：

  1. 比linear/poly都更加powerful
  2. kernel function的范围在[0,1]，因此数值计算上的困难度比poly要低
  3. 只有一个参数γ需要选择，比poly在参数选择上更加简单

缺点：

  1. 比较难于解释--没有计算出来W
  2. 比linear要更慢
  3. 过于powerful，容易overfit


Gaussian Kernel是最常用的SVM Kernel之一，但是使用时要小心选择参数。

#### 其他合理的Kernels

Kernel代表什么？

Kernel代表内积，其实就是代表Z空间内的两个向量Φ(x)和Φ(x’)的相似性，因此我们可以直接从相似性衡量的效果出发，定义出自己的Kernel。

但并不是所有相似性衡量都可以是Kernel，需要数学上证明。

##### Mercer's Condition
Valid Kernel的必要条件：

  * 对称矩阵，因为向量内积是对称的
  * 考虑矩阵K，其中Kij=K(Xi,Xj)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcvrbktf61j30at03qab8)

K = Z*Z’，是两个Z矩阵的相乘，根据线性代数的理论，K一定是半正定(positive semi-definite)的。

以上两个条件，被数学家证明还是充分条件，这两个条件是否满足就代表着你定义的kernel function是否合法，这两个条件就叫做**Mercer's Condition**。

定义自己的kernel虽然可能，但是很难。

---

我们目前从SVM的Primal问题推导到了Kernel，但是还没有解决如果Z空间内的数据点不是linear-separable的问题，我们坚持所有的OO和XX必须用一个超平面完美分割，这样可能会造成问题，比如模型可能去fit Noise等等，容易过拟合，我们能否把像Gaussian SVM里面的这种overfitting的情形再用一些方式控制解决，这需要将目前的Hard Margin改为Soft Margin，允许一些点可以出错，我们将在下一章探讨Soft Margin SVM的问题。

### Mind Map Summary

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcvs0vvg2qj30qh0braar)

## Lecture 4 Soft Margin Support Vector Machine

### 引入Soft Margin的动机

利用上一章所讲的Kernel，我们可以利用很多复杂的模型，比如Gaussian Kernel允许我们进行无限多维度的特征转换，虽然有Large Margin的控制来减少VC维度，但还是可能Overfitting。产生过拟合的原因，一方面是因为我们的模型实在太powerful，另一方面与我们坚持要求分隔界限必须完美划分OO和XX的Hard Margin要求也密不可分，如果我们能够放松要求，允许一些点被划分错误，也可能会少fit一些Noise，减少一些Overfitting的可能。


#### Give Up On Some Examples

在《机器学习基石》中，我们学到的第一个模型是Pocket，它的思想是当没有办法完美分开OO和XX时，我们找一条犯错误最少的线就好。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcwwmsolohj306a02st8r)


再看Hard-Margin SVM的要求，它的要求更加苛刻，除了要全划分对，还要选W最短的，即
 
![](http://ww1.sinaimg.cn/large/006cbtZIly1fcwwrq3a2hj306f02saa7)


类似的，我们将两者相结合

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcwwurosy5j30nj05c40u)

系数C用来衡量Large-Margin和犯错误之间的相对重要性。

该问题就是我们的新问题，即Soft-Margin SVM。

#### 化简Soft Margin SVM

将正确分类的点的要求和错误分类的点的要求写成一个式子，如下

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcwwxcmopcj30k903yabj)

注意这里有个问题，这里的运算包含一个[[]]布尔操作，它不是线性约束，所以问题也不再是QP问题，也不再能用之前所推导的对偶问题、Kernel Trick等技法。

而且，这里也没办法区分错误的大小，到底错误点的偏离程度有多大。

下面用一个新式子来表达这种带有错误衡量的Soft Margin SVM问题，而且该问题还是一个QP的形式。

我们用ξn来代表(Xn,yn)离正确分类的yn一侧的胖胖的边界线的错误偏离程度。即如果是正确的点，应该满足yn(W’Zn+b)>=1，且左侧的值越大，则点离线W’Zn+b=0越远，最近的点，即margin上的点，满足yn(W’Zn+b)=1；而错误的进入了软性的margin内，甚至到达反向的对侧的点，yn(W’Zn+b)肯定都严格小于1，且越小偏离越远，我们用一个ξn来衡量这种偏离度，即使得yn(W’Zn+b)>=1-ξn一直成立，同时要求ξn>=0尽可能小，这样对于正确的点，本来就大于1，ξn自然为0；而错误的点则需要1-正数ξ来纠正偏离，ξn就衡量了点犯错误的大小程度。我们之前的式子，用犯错的点的总个数来衡量错误，现在的式子用每个点的犯错程度的总和来衡量，而且形式也是一个二次规划QP的形式，新的式子如下：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcwxrkccfrj30fi02jq3m)


参数C：large margin和margin violation的trade-off

* C很大：margin-violation的惩罚很大，尽可能少犯错误
* C很小：margin大一点，很多点犯错没什么大关系，因为惩罚很小

该QP问题有d~+1+N个变量，其中d~+1是之前的W和b，增加的N个是记录每个点的犯错程度的ξn；有2N个约束，增加的N个约束是ξn>=0。


下一步，我们将仿照之前推导Dual SVM的方法，重新推导Soft Margin SVM的对偶问题，并尝试利用kernel trick移除对d~的依赖。


### Soft Margin SVM的对偶问题


原始问题：
![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwy6bdxp4j30b601zaab)

原来变量的约束还是用αn来代表其lagrange multipliers，我们用βn来代表新增加的变量约束ξn>=0的lagrange multipliers，得到Lagrange Function如下：

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwyb6vhjzj30bo02ot91)

其对应的Lagrange Dual问题如下：

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwycg8x90j306y018dfv)

代入Lagrange Function，如下

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwyfjy8qij30ba02et91)

对变量ξn偏微分，

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwygv2yhnj307p01kwel)

所以，我们可以把βn换成C-αn，再满足条件βn>=0，则有αn<=C，加上原来的条件αn>=0，则得到0<=αn<=C，这样就完全不用考虑β了。

用C-αn消去β后，化简后如下

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwym902cfj30ah02kglz)

发现，所有的ξn也被消掉了，就像之前在Hard-Margin SVM Dual的问题中，把b消去一样。

式子变简单了，如下

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwyq1aq82j30kk02kt9q)

发现这个式子和之前Hard Margin SVM的Lagrange Dual基本一样，只是多了αn<=C的条件，接下来按照之前的步骤化简，对b微分，消去b,对W微分，用αn对ynZn的线性表示替换W，变成只有一个变量α的最优化问题，比较简单，请参考前面推导Hard Margin SVM Dual的过程。

最终会得到Soft Margin SVM Dual的标准形式。

#### Standard Soft-Margin SVM Dual

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwyx01zj5j30ad05q752)

唯一的差别就是增加了条件αn<=C和隐式的βn=C-αn的条件。

这是另外一个QP问题，有N个变量，2N+1个条件，它也是个convex的问题。

### Kernel Soft-Margin SVM

#### 基本过程

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwz2u1wjej30bf04pabj)

基本和Hard-Margin一样，但是比Hard-Margin更加灵活，因为可以控制参数C。
而且Soft-Margin不论是Primal还是Dual总是有解，而不像Hard-Margin的问题需要数据linear-separable，因此在实践中Soft-Margin经常使用。

#### 如何算b?

对于Hard-Margin SVM，我们利用互补松弛条件和一个SV就可以算出b

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwz6kq4g3j306404g0t5)

对于Soft-Margin SVM，也有类似的complementary slackness条件

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwzant1x0j306204jjrz)

所以，要解出唯一的b，需要找一个自由支撑向量(Xs,ys)，即0<αs<C，则

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwzc6kdr4j306k01daa0)

如果没有free SV（极少数的情况下），则b只能被一堆不等式所表示，只要不等式范围内的b满足所有的KKT条件，则这些b都是可以的。


#### 实际的Soft-Margin Gaussian SVM

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwzipg54mj30cs04qq4g)

灰色的部分代表margin内部，越大的C，对错误的惩罚就越大，就尽可能少犯错，就越可能fit Noise，对Noise的容忍度就越小，就越可能Overfit。

*注意：如果参数调节不好，就算是Soft-Margin SVM还是有可能产生Overfit的!*

因此，对于Soft-Margin Gaussian SVM，我们需要仔细地选择参数(γ,C)。

#### αn的物理含义

哈利波特条件(Complementary Slackness):

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwznbxc4gj305n01mwem)

之所以叫哈利波特条件，是因为左边的两个括号，如果一个不为0，另一个一定为0，就像哈利波特和伏地魔两者至少必有一个死亡。

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcwzopqoq0j3049047t8u)

可以把点分成3类：

1. free SV：0 < αn < C，ξn = 0，可以用来确定b，可以算出yn(W’Zn+b)=1，意味着点(Xs,ys)在胖胖的边界上，在上图中用□代表。
2. non SV：αn = 0，ξn = 0，意味着没有犯错，大部分可能落在胖胖的边界的正确一侧的外面，极少数可能刚刚好落在胖胖的边界上，在上图中它们就是不用□或者△圈出的点。
3. bounded SV：αn = C，则ξn = 1 - y(W’Zn+b)，即ξn = violation amount，在上图中用△代表。极少数的情形，点刚刚好在边界上，大部分来说，只要看到αn=C，就意味着它违反了胖胖的边界。

注意：violation有两种，一种是小小的违反，只是进入margin而没有跨过中线，虽然有小小的违反，但是没有造成我们的分类错误；还有一种是大大的违反，已经跨过中线，造成分类错误。

因此，利用αn可以帮助我们进行数据的分析。


bounded SV是唯一可能造成Ein错误的点，如果ξn>=1，意味着这种violation造成了0/1分类错误，如果0<=ξn<1，就不会造成0/1分类错误。因此，Ein的可能范围在0.0000<=Ein(gsvm)<=#(bounded SVs)/N

### 实践需要：模型选择

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcx07tjnxgj30d30cuagf)

上图9个全部都是Soft-Margin Gaussian SVM，横轴是使用了不同的参数C，纵轴是使用了不同的参数γ。

**如何选择哪组参数对应的模型最好呢?**

之前《机器学习基石》课程告诉我们最简单好用的工具就是**Validation**。

#### V折交叉验证

利用Cross Validation的值选择

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcx0bgmehnj30cv0cm0xx)

我们能不能做最优化？

不能。因为对于每个(C,γ)，Ecv(C,γ)不是(C,γ)的平滑函数，很难最优化，通常只能送进去几个不同的(C,γ)值，看看哪一个最好。

我么可以用V-fold cross Validation在几个不同的(C,γ)上选择最合适的model。

对于SVM来说，Cross Validation是一个非常常用的方式来选择适当的参数。

#### Leave-One-Out CV

V-fold的极限：E(loocv) = E(cv) with N folds

LOO在SVM有一个有趣的结果：

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcx0hlg220j302e00xq2r)

证明：对于点(Xn,yn)，如果刚好最优αn=0，即说明该点不是SV，则对于去掉点(Xn,yn)后的数据集，(α1，α2，α3....αn-1，αn+1,...,αN)这一组α仍然是去掉点后的数据集的最优解，假设不是最优解，存在更好的解，把αn=0加回去，则构造了最开始数据集的一个更优解，矛盾。

则对SVM来说,g-=g（当去掉一个non-SV点后）

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcx0pghhx8j305w01njre)

而e(SV) <= 1

则不难得到以上bound，即E(loocv) <= #SV/N


所以，我们可以近似用这个做模型的选择

利用#SV做模型的选择

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcx0skmejyj30d00co0wk)

数字是SV的数量。

**注意：#SV只是一个上限，并不代表真正的loocv。**

常用#SV来**排除**一些危险的模型，再做cross validation选择一个最适合的参数。即#SV常用来做安全检查(safety-check)，如果计算Ecv太过于耗时。

### Mind Map Summary

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcx16dib3rj30kd09xt9d)

---

我们从最开始的Linear Hard-Margin SVM开始推导，研究了它的Dual Problem，并利用Kernel Trick简化了transform + inner product的运算，这一讲又讨论了在实践中最常用的Soft-Margin SVM的问题，但这些都是在做最基本的binary classification，下一讲我们将把学过的SVM模型应用到更多的问题上，比如soft binary classification，即logistic regression问题，敬请关注。

---

## Lecture 5 Kernel Logistic Regression

### Soft-Margin SVM as Regularized

#### 两个open source机器学习库

NTU的林智仁(Chih-Jen Lin)开发的针对linear SVM的**LIBLINEAR**和针对non-linear的dual\kernel SVM的**LIBSVM**库。

#### 松弛变量ξn

*注意:以后直接使用score来代表某个点在线性分类器下的得分，即score(Xn)=W’Zn+b。*

给定任何一个边界(b,W)，ξn = margin violation = max(1-yn(score),0)

因为一个点有两种可能：

* (Xn,yn) 确实违反了边界，则ξn = 1- yn(score) >= 0
* (Xn,yn) 没有违反边界，则ξn = 0

#### 无约束形式

因此，可以把SVM(以后若不指明，特指使用最多的soft-margin SVM)写成以下'unconstrained'形式：

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy3czq5iej308901f74b)

ξn不再是变量，而是根据(b,W)算出来的结果。

这个式子有点熟悉，和以前我们所做的Regularization的形式很类似：

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy3fdu8j4j304v01ja9y)

所以我们可以把SVM看成L2 regularization，只是有很小的细节不太一样

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy3hybiyoj305u036glx)

既然是一个正则化的问题，那么为什么不直接用regularization的求解方法求解呢？

因为

1. 不是QP问题，也不容易使用kernel trick
2. 错误衡量里面有一个max(□,0)的操作，不可微分，很难求解


#### 作为正则化模型的SVM

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy3re6qrbj30cs03j3zd)

我们不难得到，C和λ的关系是![](http://latex.codecogs.com/gif.latex?C%3D%5Cfrac%7B1%7D%7B2%5Clambda%20%7D)

large margin <==> fewer hyperplanes <==> L2 regularization of short **W**

soft margin <==> special err~
\
larger C <==> smaller λ <==> less regularization

为什么要把SVM看成regularized model?

因为我们想要把SVM延伸扩展到其他的学习模型，比如logistic regression、linear regression等。

### SVM versus Logistic Regression

#### SVM算法中的错误衡量

设linear score **s** = **W’** Zn + b

则

* err\[0/1\](s,y) = [[ ys <= 0 ]]
* err\[svm\](s,y) = max(1 - ys , 0)，叫做 hinge error measure，由于它在SVM的算法中使用，也叫作algorithmic error measure，由下图可知，它是err\[0/1\]的一个凸的上限。

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy4dalby0j304r040aa1)


#### SVM和Log Reg的联系

log reg的错误衡量

* err\[SCE\](s,y) = log2(1+exp(-ys))

它是err\[0/1\]的另一个上限。

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy4i653gvj304u040wej)

由上图可以看出，其实SVM的hinge err和Log Reg的sce err还蛮像的，从两个方向来看

| -∞            |<--   ys    -->|      +∞  |
|:-------------:|:-------------:|:-----:|
| ≈-ys      | err\[svm\](s,y) | =0 |
| ≈-ys      | (ln2)*err\[sce\](s,y) | ≈0 |


所以SVM≈L2 regularized logistic regression


#### 二元分类的线性模型

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy4xyll1lj30d5074419)

regularized LogReg ==> approximate SVM √

SVM ==> approximate LogReg ?


### 把SVM用在Soft Binary Classification


#### 简单想法

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy54ik4kdj30610600th)

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy57eiby0j3062061758)

如何把两者的特性融合在一起呢？

#### Two-Level Learning

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy5a25j96j306w00uaa0)

SVM flavor： 通过W\[svm\]固定了超平面的方向-->利用了kernel
LogReg flavor： 通过LogReg的训练去微调超平面以满足最大似然性(maximum likelihood)，通过A放缩和B平移。

* 通常A>0，如果W[svm]做得比较好
* 通常B≈0，如果b[svm]做得比较好

**新的LogReg问题如下：**

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy5fmoigbj30ce020aac)

可以把W[svm]’Φ(Xn)+b[svm]看成一个特别的转换Φ\[svm\](Xn)，它是从多维转到一维的转换。

所以可以分为两个阶段学习：

1. 做SVM，结果作为转换，将数据转换到1维空间
2. 做1维空间内的简单的LogReg问题

#### Probabilistic SVM

在SVM领域，这是一个非常常用的方法，它一开始由John Platt提出，叫做Probabilistic SVM的Platt's Model。

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy5o871w4j30ck041dhq)

这样得到的soft binary classifer可能和原来的SVM的结果的边界不一定一样，因为有参数B可以平移边界。

如何解LogReg?可以用梯度下降法GD、随机梯度下降法SGD或者专门的更简单的方法(因为只有两个变量)。


kernel SVM ==> approx. LogReg in Z-space

我们并没有真的在Z空间里面找LogReg最好的解，而是利用SVM与LogReg的相似性，利用SVM的kernel trick在Z空间内解SVM，再做一些AB参数的微调以使其更满足LogReg的要求。

如果我们真的要找在Z空间里面最好的LogReg的解该怎么做呢？这是我们下一小节的课题。

### Kernel Logistic Regression

#### Kernel Trick奏效的关键

我们在SVM问题中是怎么做的？

二次规划QP->对偶->Z空间内积->kernel...

最优的W* = ∑βZn，我们才能W*’Z = ∑βZn’Z = Σβ K(Xn,X)

**重点是，W能表示成一些Z的线性组合，这是我们能够用kernel的关键！**

之前讨论过一些方法，它们的最佳的W可以表示成一堆Z的线性组合

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy6579421j30jb05u0uw)

那么什么时候最好的W可以被Zn线性表示呢？

#### Representer Theorem

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy6bl8vaoj30bb02rwev)

反证法容易证明：

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy6g2eu14j30if05oacu)

因此，任何L2-regularized的linear model都是可以被kernelized的！

#### Kernel Logistic Regression

问题：
![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy6jpq983j30cy03cq3k)

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy6ldjpayj30iv03ggn8)

一共有N个变量β，和Z空间的维度就没有关系了。

如何解呢？

这是一个关于β的无条件的最佳化问题，可以利用GD/SGD等方法求解。

这通常叫做**kernel logistic regression**，即根据**representer theorem**利用kernel trick求解L2-regularized logistic regression。

#### Another View about KLR

![](http://ww1.sinaimg.cn/large/006cbtZIgy1fcy6y1ria5j30jc09r79n)
如果把KLR看成β的线性模型，则任意一个X，它都会被转换成(K(X1,X), K(X2,X), K(X3,X) ... K(Xn,X))，这是一个N维空间。


**注意：和SVM中的线性组合系数α不一样，KLR中的系数β通常都不是0！**

---

### Mind Map Summary

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcy7fl7oawj30w00c8wf4)

---

这一章我们讲述了kernel如何应用在logistic regression问题上，下一章我们将继续探讨如何将kernel trick应用到更一般的regression上面，敬请关注！


## Lecture 6 Support Vector Regression

### Kernel Ridge Regression

利用representer theorem可以把kernel ridge regression problem描述如下：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz8nw6xlnj30ea02yjs2)

化简得

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz8u0pm1vj30fc03rabf)

kernel ridge regression就是利用representer theorem，将kernel trick应用到ridge regression问题上。

怎么解β？

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz8v8w9kxj30db01kglw)

不难发现问题就是β的一个二次式，且问题是无条件最佳化问题，可以使用梯度为0求解，类似ridge regression可以直接得到analytic solution。

类比于单变量微积分求导法则，不难得到梯度的表达式如下：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz8zi5wr1j30fg01djrr)

若要▽E\[aug\](β)=0，一个解析解是使((λI+K)β-y)=0，即
![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz92db1s6j304500vwec)

矩阵的逆是否一定存在呢？

如果λ>0(对ridge regression一定满足λ>0)，则一定存在逆，因为K是半正定的(Mercer's Condition)，加上一个正的λI，一定是可逆的。
求逆需要时间O(N^3)，且K矩阵是稠密矩阵。

#### linear versus kernel ridge regression

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz99cynw9j30ck04374k)

原来的linear ridge regression:

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz9gt6e1ij307504gjs8)

注意X矩阵是d*N维度的。

现在的kernel ridge regression:

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz9hxoakcj307a04oaat)

linear的效率比较高，而kernel更加灵活flexible。

### Support Vector Regression

之前讲过ridge regression也可以用作classification，那么kernel ridge regression当然也可以做classification，它的名称叫做least-squares SVM(LSSVM)，即kernel ridge regression for classification。

#### Soft-Margin SVM versus Least-Squares SVM

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz9ne34goj30ef04ewfi)

两者边界类似，但是右边的support vectors数量明显更多，每一个都是SV。

SV太多==>预测越慢，β稠密，g很肥大

dense β：LSSVM、kernel LogReg

sparse α：standard SVM

**目标**：想让β也变得稀疏，就像标准SVM中的α矩阵一样。


#### Tube Regression

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz9tkx1k5j304t04rjrk)

我们允许一个中立区，当点落在蓝色区域内时，我们就不再考虑该点的错误。如果点在外面，就考虑错误点到中立区域的距离。

即错误衡量为：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcz9wpljugj309a03i74m)

通常叫该error measure为ε-insensitive error。(ε>0)

接下来，求解L2-regularized tube regression去得到稀疏的β。



##### Tube error vs Squared error

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcza0hdgfoj30fm051aay)


![](http://ww1.sinaimg.cn/large/006cbtZIly1fcza22v3doj304y03raa1)

当|s-y|比较小时，两者相似。但当差别比较大时，tube error受到的影响更小，比较不容易受到noise的影响而迁就。


##### L2-Regularized Tube Regression

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcza4ipx7oj30ay01mmxc)


虽然是无约束问题，但是函数max不可微分，不好求解。

对比之前的标准SVM的求解方法，得到思路

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcza7fcqjlj30f604gwgm)

模仿standard SVM形式：

改写系数、分离w0为b等微小改写操作

![](http://ww1.sinaimg.cn/large/006cbtZIly1fcza9o8zufj30bq01omxd)

这还不是一个QP问题，因为条件中含有绝对值操作，并不是一个线性运算。


如何拆开绝对值？

把绝对值按照正负，拆成两个部分，用两个变量来记录，一个代表箭头往上的错误衡量、另一个代表箭头往下的错误衡量。当一个方向的tube violation不是0时，另一个方向的tube violation一定为0。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczaiboua7j307y04naaq)

这是一个QP问题，有d~+1+2N个变量，有4N个条件。

这就是标准的Support Vector Regression(SVR) primal problem。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczajon198j30fh01hq3n)


* 参数C：regularization和tube violation的折中。
* 参数ε：tube的竖直高度，对错误有多宽容。

SVR比SVM多一个参数ε可以选择。
下一步，通过转换SVR primal为SVR的dual问题，使用kernel trick，移除对Z空间维度d~的依赖。


### SVR Dual

#### Lagrange Multipliers α↑ 和 α↓

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczayb46wjj30de034t9n)

对于条件ξn>=0的算子就不写了，因为类似于之前推导Soft Margin SVM的过程中，这样的multipliers β可以用C-α来表示。

推导过程类似以上所有SVM Dual的推导过程，min(max(L)) <==> max(min(L))、KKT条件等等。

这里直接给出几个KKT条件结果：

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczbbl5ekvj30fl040abc)

#### SVM Dual && SVR Dual

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczbjfxor0j30fb09gmzp)

对偶问题有2N个变量，N个αn↑和N个αn↓。

#### SVR解的稀疏性

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczbko5hwyj30c504gwf8)

* 严格在tube里面，即|W’Zn+b-yn| < ε ==> εn↑ = εn↓ = 0 ==> αn↑ = αn↓ = 0 ==> βn = 0 ==>
* SVs(β!=0)：刚好在tube边界上或者在外边。

这就说明了β是稀疏的。


### Summary Of Kernel Models

#### Map of Linear Models

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczbwer38qj30fo077q5q)

#### Map of Linear/Kernel Models

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczc115ffnj30fu0a9q6t)

* 第一行中的方法由于表现比较差，在实践中比较少用。
* 第三行中的方法由于稠密矩阵β，在实践中也比较少用。

#### Kernel Models

可能的kernel:

* Polynomial
* Gaussian
* Your Design Kernel (with Mercer's Condition)

**With great power comes great responsibility!!!**

### Mind Map Summary

![](http://ww1.sinaimg.cn/large/006cbtZIly1fczct1mqrgj30qe09tjsw)

---

这一章我们讲完了Support Vector Regression。至此，我们的第一大部分《embedding numerous features》也到此结束，如果你有很多很多features的时候，可以使用kernel的技巧，使用高维度的特征转换来做到这件事情。
下一章我们开始讲述如果我们有很多机器学习模型可用的时候，是否能把各种不同方法的优缺点结合起来，将不同的学习模型融合起来，得到一个powerful的综合模型呢？这一手段称为aggregation，我们将在后续几章中进行探讨，欢迎关注！

---
<big> Embedding Numerous Features:  Kernel Models **OVER**</big>

<big> Combining Predictive Features:  Aggregation Models </big>
## Lecture 7 Blending and Bagging

Blending和Bagging都是Aggregation里面非常典型的做法。

### Aggregation的动机

#### 日常选股

假设你有T个朋友g1，g2...gT预测某支股票X是否会上涨gt(X)

你会怎么做？

1. 根据他们的**平常表现**选择最可信的朋友---即validation
2. **均衡uniformly**地混合朋友们的预测---让他们一人一票，最后选择票数最多的结果
3. **不均衡non-uniformly**地混合朋友们的预测---每个人的票数不一，让他们投票，而票数的分配和问题有关，比如有人擅长分析科技类股票，有人擅长分析传统产业股票，因此在不同条件下，对不同人的信任度也不同，即如果[t 满足某些**条件**]，则给朋友t多一些票。
4. ...更多方式

对应到机器学习里面，把T个人的意见融合起来以获得更好的表现，就是aggregation模型，即aggregation models = **mix** or **combine** hypotheses for better performance.

#### 数学形式

数学化以上操作：

1. 选择平常表现(val)最好的人

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0efgqg2kj30as00z0sy)

2. 等额投票

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0eh5ha0aj306b0173yk)

3. 不等额投票(包括情形1、2)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0ei1zytkj30990113ym)

包含了：

* 选择，即αt = [[ Eval(gt)最小 ]]
* 等额: 即αt = 1

4. 根据条件合并预测(包括情形1、2、3)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0ekrclx8j30an00ymxc)

* 包含了不等额投票，即qt(X)=αt。

aggregation model是一个非常丰富的家族。

#### aggregation与selection的对比

selection: 选择出一个strong的hypothesis（强人主导）
aggregation: do better with many (possibly weaker) hypotheses（三个臭皮匠）

#### 为什么aggregation可能会做得更好


1. more power,more strong

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0erswr9uj304q04r749)

如果只用垂直、水平线，怎样都做不太好，而如果能把垂直和水平的线结合起来，则可能会做得比较好。

如果等额混合不同的弱弱的hypotheses，就可能会得到一个比较强的G(x)，比较复杂的边界，类似于之前的feature transform，它也扩展了我们的model的power。

2. more moderate,more regularization

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0eunhrjbj304k04jglt)

有若干条直线可以完美分割OO和XX，PLA会随机选择一条。如果等额混合不同的random-PLA hypotheses，则会收敛于中间那条large margin的直线，比较中庸，具有regularization的效果。因此aggregation具有more powerful和more regularization这两种看似对立的效果。

### Uniform Blending

#### uniform blending for classification

blending: 已知gt。

uniform blending: known gt each with 1 ballot

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0f4vhdudj305t01nwek)

* 如果每个gt都一样(独裁政治)，则G和g的表现是相同的。
* 如果gt各不相同(多样性+民主)，则多数派能纠正少数派。
* 对多类别分类，一样的结果

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0f9jclnrj307c01r3yk)

对于regression如何做呢？

#### uniform blending for regression

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0fb6cfa4j304w01t749)

* 每个gt都一样，融合g效果变化不大
* 每个gt都不太一样，有些gt(x) > f(x)，而有些gt(x) < f(x)，两者抵消，平均值可能会比单一值更加准确稳定。

因此，如果我们的aggregation要起作用，很重要的前提是gt要各不一样，畅所欲言，对于diverse hypotheses，即使使用非常简单的uniform blending，也可以比任何单一的hypothesis表现得更好。

#### uniform blending for regression work的理论保证

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0ffzu1hqj304801p748)


先讨论对于固定的确定的X

随便选一个gt，期望意义下的square error是

将gt的期望错误和G的错误联系在一起。

avg代表![1/T*Σ](http://latex.codecogs.com/gif.latex?%5Cfrac%7B1%7D%7BT%7D%5Csum_%7Bt%3D1%7D%5E%7BT%7D)


![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0fm9bjeaj30cj04jwfm)

推广到所有X上，对X分布取期望，得到

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0fs2g74lj30ak02ljrp)

由此可知，最好的g是否比G好我们不得而知，但平均的g确实没有G表现好，我们的uniform blending对于square error regression确实work了。

#### bias-variance decomposition

考虑一个**虚拟**迭代过程(t = 1,2...T)

1. 第t轮，取得N笔资料Dt,Dt来自分布PN(i.i.d)
2. 通过A(Dt)学习获得gt

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0fwj07fcj30a301njri)

将刚刚得到的式子推广到无穷大

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0g115z04j30f5048wg9)

把一个演算法的表现拆分成**bias-variance decomposition**。
 
而uniform blending就是减少variance，使表现更加稳定。


### Linear and Any Blending

#### linear blending

linear blending: known gt, each to be given αt ballot

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0g7266qtj30ac022aa8)

什么样的α是好的α?

min[αt>=0]Ein(α)

要求解的问题

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0g8gy21nj307z031jrv)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0g8yl6m4j307c02x0t4)

有点类似two-level learning，先得到gt，再做LinReg。

linear blending = LinModel + hypotheses as transform + constraints

唯一的不同是要求αt>=0，而一般的LinReg没有要求Wt>=0。


##### constraints on α

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0gg85gpzj30fd04e75p)

在实际中，我们常常故意忽略掉α的约束，如果αt<0，就把对应的gt想象成gt'=-gt好了，对于regression可能比较奇怪，但是大部分时候constraints放在一边没有什么影响。

##### linear blending versus selection

之前我们都说gt直接给定，那么gt通常是怎么来的呢？

在实践中，常常g1∈H1，g2∈H2 ... gT∈HT，即g是从不同的model通过求最好的Ein来得到的，就像之前在model selection中发生的事情一样。

**recall:**
selection by minimum Ein --- best of best --- best of all

则 dvc = (∪Ht)，这也就是为什么我们要用Eval而不是Ein来做选择。

**recall:**
linear blending 包含了 selection 作为特殊情况
即αt = [[ Eval(gt-) 最小 ]]

如果用Ein来做linear blending，即aggregation of best，模型复杂度代价比best of best还大，>= dvc = (∪Ht).

模型更加危险，因此实践中不建议使用Ein来选α，选择α时让Eval而不是Ein最小，gt-来自最小的E(train)。

#### Any Blending

从某个比较小的D(train)，训练得到g1-,g2-...,gT-，把Dval中的(xn,yn)转换成(Zn=Φ-(xn),yn)，Φ-(X) = (g1-(X), g2-(X) ... gT-(X))。

linear blending

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0gwbn7pmj307u038gm7)

注意最后回传的是Φ而不是Φ-，
![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0gyr2bhpj307800x3yi)

我们不一定要用linear来合并{Zn,yn}，可以用任何方法，即Any Blending，也叫作Stacking.

对Z空间中的资料不一定用Linear model，可用Non-linear model

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0h3yobu5j307n037mxq)

any blending:

* powerful，达成了根据条件来进行blending的目的
* 有overfitting的危险，要小心使用

##### Blending in Practice

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0h8gmq95j30cu03lwff)

资料来临==>学习g==>validation set blending 得到G

* a special any blending model

E\[test\](squared): 519.45 ==> 456.24

* g、G 再做一次 linear blending ，test set blending: linear blending using Etest~

E\[test\](squared): 456.24 ==> 442.06


在实践中，blending是非常有用的，如果不考虑计算负担。

### Bagging(Bootstrap Aggregation)

#### What We Have Done

blending: aggregate **after getting gt**
learning: aggregate **as well as getting gt**

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0hm29hdyj309t02jwf5)

gt的多样性很重要，如何得到不一样的g?

* 通过不同的模型: g1∈H1，g2∈H2 ... gT∈HT
* 同一模型的不同参数: 如GD的不同的η,SVM中不同的C
* 演算法本来就有randomness: 如有不一样的randome seeds的随机PLA
* 资料的randomness: within-cross-validation hypotheses gv-

接下来，我们尝试用同一份资料制造好多g，以产生多样性。

#### Revisit of Bias-Variance

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0hvqgv7sj30eo02d0tl)

* consensus 比直接 A(D) 更加稳定，但是需要很多笔资料
* 我们想要近似的g的平均，要做两个妥协
1. 无限大T(很大的T)
2. 只使用手中资料D，生成T个近似的gt=A(Dt)，其中Dt~PN


我们需要用到统计学中的工具bootstrapping，它做的是从D中重新抽样来模拟Dt。

#### Bootstrap Aggregation

sampling with replacement 有放回的抽样

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0i25dziaj30fk029my8)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0i342t72j30ez05b771)

bootstrap aggregation：我们称为BAGging，一个简单的meta algorithm，在base algorithm A 之上。

#### Bagging Pocket In Action

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0i67g0k5j306505swf5)

每个Pocket演算法跑1000趟，使用25条Pocket线组合而成。

* 每个来自bagging生成的g都很不一样
* aggregation后形成了还算合适的non-linear边界来进行二元分类 

**如果base algorithm*对数据随机性很敏感，则bagging通常工作得很好**

在bootstrapping过程里，原来的N笔资料D里面再重新抽样N个D'，则D'正好为D的可能性是N!/N^N。

### Mind Map Summary

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd0imx3tyij30re0bxq4w)

---

下一章我们讲述是否可以得到比Bagging更加diverse的hypotheses，从而使blending后的G更加strong，即逐步增强法。欢迎关注！

## Lecture 8 Adaptive Boosting

### Motivation of Boosting

#### 一个简单类比

想像一个小学老师教小学生如何分辨一张图片是否是一个苹果的场景，老师在网络上搜集了很多苹果的图片。

10张苹果的图片

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2tdepesrj30ez05xq5f)

10张非苹果的图片

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2tf2yf7cj30f806iad0)

你怎样描述一个苹果的特征？

* Michael:

**苹果是圆形的**

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2tgnvs88j30af05rgn0)

蓝色部分表示错误识别为苹果的例子或者没有正确识别出苹果的例子。

课堂已经获得的特征：

1. 苹果是圆形的(Michael)

老师可能会把错误的例子举出来，把分类正确的例子缩小，把错误的例子放大，投入更大的关注，再寻找特征。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2tjklgcgj30a805sjs6)

* Tina:

**苹果是红色的**

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2uoij4v5j30as05uq3u)

课堂已经获得的特征：

1. 苹果圆圆的(Michael)
2. 苹果红红的(Tina)


老师继续放大错误的，缩小正确的

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2uqvb0j7j309m05qgm0)

老师：的确，大部分苹果是红色的，但是只靠圆形和红色来区分苹果还是有可能犯错，你有其他的建议吗？Joey?

* Joey:

**苹果也可能是绿色的**

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2utqpkmpj30ah05v74u)

课堂已经获得的特征：

1. 苹果圆圆的(Michael)
2. 苹果红红的(Tina)
3. 苹果可能是绿色的(Joey)

老师继续放大错误的，缩小正确的

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2uvisdwwj30a105o0t3)

* Jessica:

**苹果上面有茎**

课堂已经获得的特征：

1. 苹果圆圆的(Michael)
2. 苹果红红的(Tina)
3. 苹果可能是绿色的(Joey)
4. 苹果上面有茎(Jessica)

通过不断集中于分类不太完美的例子，寻找新的特征描述，我们得到了比原来更加丰富的对苹果的认知，这就是**逐步增强法(adaptive boosting)**的原理所在。

#### Motivation

对应到我们的adaptive boosting algorithm的概念中

学生：代表一些很简单的hypotheses gt(就像垂直/水平分隔线)

班级：整个班级有很多学生，就是一个复杂的hypothesis G(就像下图中黑色的实线)，就是灰线的aggregation。

老师：一个循循善诱的学习算法，它使得学生去专注于犯过错的关键样例中。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2v1biezpj305f055q31)

下一节，我们将介绍逐步增强法的数学形式。

### Diversity of Re-weighting

#### Bootstrapping as Re-weighting Process

Bagging的核心就是bootstrapping

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2v7ndxhaj30av01saam)

在base algorithm中获得gt的要求可能如下

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2v8hf9dgj307b05kaai)

既然两笔(X1,y1)一样，不妨写成更简洁的形式

我们给每笔资料添加一个权重u

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2vaepd7jj307h05taaq)

显然，两种表示方式等价。

这样，Bagging所做的就是通过bootstrapping产生这些u

base algorithm尝试最小化bootstrap-weighted error.

#### Weighted Base Algorithm

Bagging中u都是整数，但既然u是权重，自然可以推广到全体实数。

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2vfnn84aj30ft02u3yu)

如何求解带有权重的Ein最小化问题呢？


##### SVM

比如，在SVM中，我们使用C来表示0/1错误的权重，加上权重u后

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2vhvvobhj307l03e0t7)

un就会跑到αn的上限位置，因此求解weighted SVM是容易的。

##### Logistic Regression

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2vluxmzzj307k03mjs2)

SGD抽样时候的概率大小不同，被抽到的概率与un成正比。

因此，把un放到algorithm中，不是特别困难。如果你学过《机器学习基石》的第8章，可能记得我们讲过class-weighted，不同类别的错误代价不同，现在不是+1或-1哪一种更重要，而是哪一个点更重要，即example-weighted是class-weighted的扩展。

因此，求解weighted base algorithm不是困难点，先想象我们已经会做这件事情了。


#### Re-weighting for More Diverse Hypothesis

既然，我们的base algorithm会根据u回传g，那么，我们希望g越不一样越好，怎样的u能保证这一点？

#### how to re-weight for more diverse hypotheses?

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2vwabe26j30fq05eabh)

如果gt对于u(t+1)表现很差，那么像gt的hypotheses都不会被传回作为g(t+1)，因此g(t+1)和gt差别就很大。

##### 表现很差如何衡量?

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2vydx6jdj30ai02idgc)

gt对u(t+1)的预测错误的概率，和随便猜的几率差不多，即1/2(样本平衡的状态下)。

#### Optimal Re-weighting

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2w61a4hvj30ev02y0tk)

我们需要

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2w8e98jsj30b101paac)

一种可能的方法是重新放缩权重

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2wabipl6j30er02tdhn)

如果第t轮错误率为εt，正确率则为1-εt。

'最优的'重新放缩方法是正确的点所对应的un乘上错误率εt，错误的点的un乘上正确率(1-εt)。

### Adaptive Boosting Algorithm

#### Scaling Factor

定义放缩因子![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2whrzgcjj303101e0sk)

则

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2wixddxlj307s01hmxa)

与上节的放缩效果等价。

◇t告诉了我们更多物理意义，比如如果◇t>=1，则当且仅当εt<=1/2

base algorithm应该比乱猜的效果好，则εt<=1/2，则◇t应该大于1，也就是错误的真的被放大了，正确的真的被缩小了，也就是我们之前讲的"放大错误、缩小正确"，正如刚才的类比中的老师所做的事情。


#### A Preliminary Algorithm

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2wpvk6wmj30cu059abg)

* 希望g1能对Ein最优，即un(1) = 1/N
* G(X)如何aggregate这些g呢？
1. uniform g1做好了D1，但g2在D1上应该做得很糟，一人一票，也许不会做得很好
2. linear,non-linear? as you wish

接下来，介绍一种在计算g中顺便将g线性融合的特殊算法。

#### Linear Aggregation on the Fly

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2wz8i1whj30bs04vt9v)

α怎么计算？

* 希望好的g能多给一点票，即α大一点，而坏的g的α小一点。
* 那么什么是好的g?

好的g，Ein(u)比较小，错误率ε比较小，那么◇比较大，那么αt应该是某个单调函数(◇t)，设计该演算法的人使用了单调函数ln()。

即
![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2x40x71nj304m00x3ye)

如果ε=1/2，则◇t=1 ==> αt = 0 (对于坏的gt的权重为0)
如果ε=0，则◇t=∞ ==> αt = ∞ (好的g有更大的权重)


因此，adaptive boosting = 弱弱的base learning algorithm A(学生) + 最优的重新加权因子◇t(老师) + '神奇的'线性aggregation系数αt(班级)。

#### Adaptive Boosting (AdaBoost) Algorithm

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xbjzqauj30f2080tbf)

AdaBoost：三个臭皮匠，胜过诸葛亮。

#### AdaBoost的理论保证

**VC bound**

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xfrvnvoj30cn02jq3g)

* 第一项可以做得很小，理论已经证明 Ein(G) = 0 after T = O(log N)轮。（如果总有εt<=ε<1/2，即base algorithm比"乱猜"表现好）
* 第二项T很小、N很大，则整体也很小

则Eout(G)也很小，则实际表现很好。

从boosting的角度看待AdaBoost:

只要base algorithm A稍微比"乱猜"好一点，那么通过AdaBoost + A就可以使它变得很强(Ein = 0 && Eout 很小)。

### Adaptive Boosting In Action

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xnu7nbdj30fp01bdge)

#### decision stump

一个流行的选择：决策桩

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xonrm00j305w00yjrb)

它是在某个单一的feature上的正/负向射线，有三个参数(feature i、threshold θ、direction s)。

可以通过枚举(i,θ,s)的组合，真的做到最好。
物理意义：2D平面上的垂直/水平线。
优化效率：O(d*NlogN)

decision stump如果单独用，大部分情况下太弱了，但配合AdaBoost可以变强，且允许有效率地最小化Ein(u)。

#### A Simple Data Set

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xwq0g0nj307g07et8v)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xx0kx1jj3085080wev)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xxu13xvj308407ojrr)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xygiuk4j308b081dg6)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2xzzxxq5j307s07xdga)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2y0frgk4j307s07wgm2)

**'Teacher'-like algorithm works!**

#### A Complicated Data Set

边界是一个类似sin的形状

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2y300eqnj307u07ndi2)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2y3b71fyj308007rdi3)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2y3o2rg2j307z07i40v)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2y42cxu9j307t07ugo1)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2y4fz97cj307v07saci)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2y4slhm5j307v07qwgy)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2yx8ua3qj307j07pq5b)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2yxi0ppbj307n07rq5e)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2yxrs3pdj307o07m76q)

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2yy4urkmj307t07rmzm)

AdaBoost-Stump: non-linear yet efficient

#### AdaBoost-Stump in Application

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2yzswgsrj305y043wff)

世界上第一个'实时'人脸识别程序

* AdaBoost-Stump作为核心模型，从24*24的小图块的162336个可能性中选择出来关键的图案，然后进行线性aggregation，即通过AdaBoost-Stump来进行特征选择。
* 修改了线性融合G，提前排除非人脸部分。

AdaBoost-Stump: efficient **feature selection** and **aggregation**。

### Mind Map Summary

![](http://ww1.sinaimg.cn/large/006cbtZIly1fd2zixhfytj30ke0ep40i)

---

我们讲过了Bagging，它是Learning Uniform Aggregation；我们讲过了AdaBoost，它是Learning Linear Aggregation。在下一章，我们将介绍一种Learning Conditional Aggregation的方法，即**决策树(Decision Tree)**，敬请关注。

## Lecture 9 Decision Tree

### Decision Tree Hypotheses
