---
title: GAN系列论文笔记
pid: generative-adversarial-networks
categories:
  - gan
tags: [gan,note]
date: 2017-12-03 15:20:45
---

<center>
  Generative Adversarial Networks
</center>

<!-- more -->


# GAN: Generative Adversarial Nets

G and D are both multilayer perceptrons

输入一个噪声的概率分布 pz(Z), 这是先验概率分布.

G接受z, 以Θg为参数, 表示为G(Z:Θg), 这是一个从噪声分布到数据分布的映射函数(可微分).
我们定义另一个多层感知器网络D(X:Θg), 它输出一个标量实数, 代表X来自真实数据而不是Pg的概率.

我们训练D去最大化给真实训练数据和从G抽样来的数据都分配正确的标签的概率, 同时 我们训练G去最小化log(1-D(G(Z))).

换句话说, D和G在玩下列two-player minimax game, 表示为value function V(G,D).

![](http://of1cz7dcw.bkt.clouddn.com/2017-12-03%2016-23-31%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

这个优化问题的最优解会让G的分布去接近真实的数据分布, 假设D有足够的能力(即不受参数的限制), 

在内层循环中将D优化结束在计算上是不可负担的, 且在有限的数据上可能会导致Overfitting, 所以我们只训练k步D, 然后训练1步G, 这导致只要G更新的足够慢, D会接近在它的最优解附近.

在实践中, 刚开始, D能很自信地拒绝掉G, 因为产生的图片和真实图片有很大不同, 所以D(G(Z)很小, log(1-D(G(Z)))是饱和的, 梯度很小, 所以我们让G去最大化 logD(G(Z)) 而不是 最小化 log(1-D(G(Z))), 这个改变不会影响G和D的收敛点, 但是却在训练早期提供了更大的梯度以加速训练.



## 一个toy example

![](http://of1cz7dcw.bkt.clouddn.com/2017-12-03%2016-39-59%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

蓝线代表D, 黑线代表真实数据分布Px, 绿线代表G的分布Pg, 最下面一条横线代表噪声Z被均匀抽样, 上面的横线代表数据X, 向上的箭头代表如何通过函数X = G(Z)从Z映射到X, 以生成Pg. 
G向D的高置信概率区域收缩, 在低概率区域平展 以欺骗D.

(a) 考虑一个已经接近收敛的情况, Pg接近Pdata, D部分准确;
(b) 在内部循环中, 训练D来区分样本是来自G还是真实数据, 最终收敛到D*(x) = pdata(x) / (pdata(x) + pg(x));
(c) 更新G, D的梯度指导G(Z)流向更可能被D判别为真实数据的区域;
(d) 在经过几轮训练后, 如果G和D都有足够的能力, 它们会达到一个平衡点, 两者均不能再提高, 因为pg=pdata, D不能区分两个分布, 即 D(x) = 1/2

## 理论分析

G隐式定义了一个概率分布, 因为z~Pz, G是z的函数, 所以G(z)~Pg, 我们希望它是一个pdata的好的估计,

### 命题1: 当G固定时, 最优的D是


![](http://of1cz7dcw.bkt.clouddn.com/2017-12-04%2015-44-25%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

当G固定时, D的目标是最大化数量函数V(G,D)

![](http://of1cz7dcw.bkt.clouddn.com/2017-12-04%2015-45-12%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

对任何的(a,b) ∈ R2 \ {0,0}, 函数 y = a log(y) + b log(1-y)在 a/(a+b) ∈ [0,1] 处达到最大值, 所以得证.


注意对D的训练目标其实等价于极大似然估计条件概率的对数 log P(Y=y|x), 其中Y指示x是来自真实数据Pdata(此时y=1)还是来自Pg(此时y=0), 可以改写D的目标函数如下:

![](http://of1cz7dcw.bkt.clouddn.com/2017-12-04%2015-55-12%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

### 定义1: C(G)当且仅当Pg = Pdata时达到全局最小值, 此时, C(G)的值达到最小值 -log4.

可以直接验证, 当Pg = Pdata时, 最优的D*(x) = 1/2, 此时V(G,D)=-2log(2), 检验其是否为全局最小值, 注意到

![](http://of1cz7dcw.bkt.clouddn.com/2017-12-04%2016-25-36%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

将其从C(G)中减去, 得到

## 收敛性

### 命题2: 如果G和D都有足够强的能力, 并且在算法1中的每一步, 在给定的G下, D都能达到它的最优点, 并且Pg被更新来min maxV(G,D), 则Pg收敛到Pdata.

[TODO]

