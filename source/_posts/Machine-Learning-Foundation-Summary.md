---
title: Machine Learning Foundation Summary
pid: Machine Learning Foundation Summary
categories:
  - 杂项
tags: []
date: 2017-08-20 20:49:40
---

<center>机器学习基石总结，该课为Coursera上由林轩田老师讲授。</center>

<!-- more -->

## Lecture 1

### Course Introduction

机器学习是一门理论和实践并存的学科。

学习目标:
When/Why/How/How Better to use ML?

### What is Machine Learning

学习： acquiring **skill** with **experience** accumulated from **observations**.
机器学习: acquiring skill with experience accumulated/computed from **data**.

ML: an alternative route to build complicated systems.

Use Scenarios:

1. 人类无法手动编程(如火星上导航)
2. 人类不能简单定义求解(语音/视觉识别)
3. 需要人类无法做到的快速决策(high-frequency trading)
4. 需要大规模面向用户的个性化决策(特定目标消费市场)

**机器学习的三个关键**

1. 存在某种潜在的模式可以学习
2. 不容易显式编程定义
3. 存在相关数据data

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fiqhwbv2p1j30fb03yaae.jpg
)


### 机器学习与其他领域的关系

机器学习： use data to compute hypothesis g that approximates target f
数据挖掘： use (huge) data to find properly that is interesting, efficient computation in large database
人工智能： compute something that shows intelligent behavior, ML can realize AI.
统计学： use data to make inference(推论) about an unknown process, Statistics can be used to achieve ML.



## Lecture 2

### Perceptron 感知器模型

features of customer , 计算一个加权和

![](https://latex.codecogs.com/gif.latex?%5Csum_%7Bi%3D1%7D%5Edw_ix_i%20%3E%20threshold)


Y: {+1(good), -1(bad)}

![](https://latex.codecogs.com/gif.latex?h%28x%29%20%3D%20sign%28%28%5Csum_%7Bi%3D1%7D%5Edw_ix_i%29%20-%20threshold%29)

令w0 = -threshold, x0=+1, 则可以简写成

![](https://latex.codecogs.com/gif.latex?h%28x%29%20%3D%20sign%28w%5ETx%29)

perceptrons = linear (binary) classifiers



算法: 不断调整线，以纠正一些错误。

1. 找到某个wt的错误(xn_t,yn_t)
2. ![](https://latex.codecogs.com/gif.latex?w_%7Bt&plus;1%7D%20%3D%20w_t%20&plus;%20y_t%5En%20*%20x_t%5En)


linear separable <==> exists perfect wf such that yn = sign(wfxn)

so ![](https://latex.codecogs.com/gif.latex?y_%7Bn%28t%29%7Dw_f%5ETx_%7Bn%28t%29%7D%20%5Cgeq%20%5Cmin_n%20y_nw_f%5ETx_n%20%3E%200)

其中![](https://latex.codecogs.com/gif.latex?x_%7Bn%28t%29%7D)和![](https://latex.codecogs.com/gif.latex?y_%7Bn%28t%29%7D)是第t轮的错误样例。

则利用向量内积来衡量wf和wt+1的接近程度

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fir6i1pdgkj308g02vjrd.jpg)

考虑模的影响

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fir6ke0fvfj30by03wt8w.jpg)


所以，PLA算法会中止

![](https://latex.codecogs.com/gif.latex?w_f%5ETw_T%20%5Cgeq%20w_f%5ETw_%7BT-1%7D%20&plus;%20%5Cmin_n%20y_nw_f%5ETx_n%20%5Cgeq%20T%20%5Cmin_n%20y_nw_f%5ETx_n)

![](https://latex.codecogs.com/gif.latex?%5Cleft%20%5C%7C%20w_T%20%5Cright%20%5C%7C%5E2%20%5Cleq%20%5Cleft%20%5C%7C%20w_%7BT-1%7D%20%5Cright%20%5C%7C%5E2%20&plus;%20%5Cmax_n%20%5Cleft%20%5C%7C%20x_n%20%5Cright%20%5C%7C%20%5Cleq%20T%20%5Cmax_n%20%5Cleft%20%5C%7C%20x_n%20%5Cright%20%5C%7C)

∴ ![](https://latex.codecogs.com/gif.latex?%5Cleft%20%5C%7C%20w_T%20%5Cright%20%5C%7C%20%5Cleq%20%5Csqrt%7BT%7D%20%5Cmax_n%20%5Cleft%20%5C%7C%20x_n%20%5Cright%20%5C%7C%5E)

∴ ![](https://latex.codecogs.com/gif.latex?%5Cfrac%7Bw_f%5Enw_T%7D%7B%5Cleft%20%5C%7Cw_f%5Cright%20%5C%7C%20%5Cleft%20%5C%7C%20w_T%20%5Cright%20%5C%7C%7D%20%5Cgeq%20%5Cfrac%7BT%20%5Cmin_n%20y_nw_f%5ETx_n%7D%7B%5Csqrt%7BT%7D%5Cmax_n%20%5Cleft%20%5C%7C%20x_n%20%5Cright%20%7C%5C%20%5Cleft%20%5C%7C%20w_f%20%5Cright%20%5C%7C%7D%20%3D%20%5Csqrt%7BT%7D%20%5Cfrac%7B%5Crho%7D%7BR%7D)

其中
![](https://latex.codecogs.com/gif.latex?%5Crho%20%3D%20%5Cmin_n%20y_n%5Cfrac%7Bw_f%5ET%7D%7B%5Cleft%20%5C%7C%20w_f%5Cright%20%5C%7C%7D%20x_n)

![](https://latex.codecogs.com/gif.latex?R%20%3D%20%5Cmax_n%20%5Cleft%20%5C%7C%20x_n%5Cright%5C%7C)

PLA
优点: simple to implement, fast, works in any dimension d
缺点: assumes "linear separable" to halt, not fully sure how long halting takes(bcz wf unknown).

Not Linear Separable???

Find a line with noise tolerance

![](https://latex.codecogs.com/gif.latex?w_g%20%5Cleftarrow%20argmin_w%20%5Csum_%7Bn%3D1%7D%5EN%20%5Cleft%20%5B%20y_n%20%5Cneq%20sign%28w%5ETx_n%29%29%20%5Cright%20%5D)

这是一个NP难问题，转而求解近似解。

**Pocket Algorithm**

if w_t+1 makes fewer mistakes than w‘, replace w’ by w_t+1.

## Lecture 3

### 输出空间

前面学习的是简单的二元分类(binary classification)，如何进行multiclass classification呢？


二元分类: Y = {-1, +1}
多类别分类: Y = {1, 2, ... , K}
回归regression: Y = R
structured learning: Y = structures

### 数据标签

监督学习: all yn
无监督学习: no yn
半监督学习: some yn
增强学习: 通过goodness(yn~)的隐式的yn

### 学习策略

batch learning: learn from all known data
online learning: hypothesis 'improves' through receiving data instances sequentially(循序渐进地).
active learning: question asking(sequentially), query the yn of the chosen xn

### 输入空间

concrete features: sophisticated and related physical meaning.
raw features: often need human or machines to convert to concrete ones.
abstract features: no(or little) physical meaning

## Lecture 4

### 学习的可行性

No Free Lunch


如果对于f没有某种假设，那么我们什么都学不到。

### Hieffding不等式

![](https://latex.codecogs.com/gif.latex?%5Clarge%20P%5Cleft%20%5B%20%5Cleft%20%7C%20%5Cnu%20-%20%5Cmu%20%5Cright%20%7C%3E%20%5Cright%20%5Cepsilon%20%5D%20%5Cleq%202%20exp%28-2%5Cepsilon%5E2N%29)

 v = μ 是 probably approximately correct (PAC)

 for any **fixed** *h*, in 'big' data(N large):

 in-sample error Ein(h) is PAC out-of-sample error Eout(h) (within /epsilon)

no need to know Eout(h), ie. f and P can stay unknown

**Multiple h**


BAD Sample

Eout(h) and Ein(h) far away


## Lecture 5

Training versus Testing

当M无限大时，是否可以用有限的mH来代替M。

union bound(non-overlapping, overestimate)

### can we group similar hypothesis by kind?

在R2空间中有多少条线呢？

无穷?

一个点：  2种线
两个点：  4种线
三个点：  8种线(always?)
如果三点共线，则只有6种线。
四个点：  14种(most，去掉XOR情形)，如果四点共线或者重叠degenerate，会更少。
五个点： 22种

effective #line <==> 对于N个输入点时，最多的不同种线的数量 

≤ 2 ^ N (有限值)

是否可以用effective(N)来替代M呢？

### Dichotomies: Mini-hypotheses

Dichotomies:  h(x1,x2,...,xN) = (h(x1), h(x2), ... , h(xN)) ∈ {o,x}^N

hypothesis limited to the eyes of x1, x2, ... , xN

|H(x1,x2,...,xN)| 来替代 M?

depend on inputs (x1, x2, ... , xN)
growth function:
mH(N) = max|H(x1,x2,...,xN)|

mH有限，上界为2^N。

### How to calc mH?


1. positive rays

h(x) = sign(x-a)    mH = N + 1 << 2^N

2. positive intervals

h(x) = +1 iff x ∈ [l,r), -1 otherwise

mH = C(N+1,2) + 1 = 0.5N^2 + 0.5N + 1 << 2^N
其中1对应两个端点在同一个区块，即全部为xx

3. convex sets

every dichotomy can be implemented

mH = 2^N <==> 称这N个输入 "shattered by H"

4. decision stump(positive and negative rays)

mH = 2N

如果mH是多项式，则称其为good,如果是指数式，则称bad.

那么perceptron是good还是bad?


### break point

break point: K，使得任何K个点无法被shattered。
如果k是break point,则k+1,k+2...都会是break points
我们只研究最小的break point

如对于2D Perceptron， break point是4

positive rays breakpoint is 2
positive intervals breakpoint is 3
convex sets no break point


猜测： 如果break point是K，则成长函数是O(N^(k-1))

如何证明？

## Lecture 6

**泛化理论**

### Restriction of Break Point

minimum break point K = 2

means

N = 1, every mH = 2 by definition

what about N = 3?

不能shatter任何2个点 ==> mH = 4

如果可以证明：

mH(N) <= 给定k后最大的可能的mH(N) <= poly(N)


### Bounding Function

B(N,k): maximum possible mH(N) when break point = k

与具体的H不再有关系，比如B(N,3)同时限制了positive intervals和1D perceptrons

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fis9blzumaj30d006nmxa.jpg)

如何填B(4,3)?

和B(3,*)有关系

下一步： 规约B(4,3)到B(3,*)

写程序枚举2^16个子集发现B(4,3)是11

不难推测 11 = 4 + 7

拆成pairs 和 single

11 = 2α+β

α+β <= B(3,3)

α <= B(3,2)

所以B(4,3) <= B(3,3) + B(3,2)

不难推广得到

B(N,k) <= B(N-1,k) + B(N-1,k-1)


![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fis9k7l1moj30fj04yaa9.jpg
)

类似杨辉三角是上限函数B(N,k)的上限

而杨辉三角是多项式

可以从下列等式证明：

![](https://latex.codecogs.com/gif.latex?B%28N%2Ck%29%20%5Cleq%20%5Csum_%7Bi%3D0%7D%5E%7Bk-1%7D%5Cbinom%7BN%7D%7Bi%7D)

最高项是N^(k-1)

利用数学归纳法不难证明。

其实可以证明<=是严格=。


### Last Step


我们最初期望

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fitmz1meegj30fz01jweh.jpg)

实际上，我们能做到的是

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fitmzud8hcj30fx01l74b.jpg)

多了一些常数

证明方式比较有技巧，简单说明一下：


### Step 1

P[BAD] = P[exist h ∈ H s.t. |E(h)in - E(h)out| > epsilon]


Ein有限多种(mH(N))，但是Eout有无限多个

首先，替换Eout为有限个

有限多个点来推断Eout ==> verification set D' (of size N) to calculate E'in

E'in 取代 Eout?

BAD h of Ein -- Eout  ==>(probably)  BAD h of Ein - E'in


![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fitn6tpaqsj309206it8u.jpg)


如果Ein和Eout隔得很远，则E'in和Ein也会有1/2的概率离得很远。

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fitn93z6agj30a302njre.jpg
)

E' ghost data

### Step 2

Ein with D
E'in with D'

现在H变成有限多种，即|H(x1,...,xN,x'1,...,x'N)|

最多有mH(2N)种

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fitngka0k2j30d302hwel.jpg)


### Step 3

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fitnlz57q0j309003jaae.jpg
)

Hoeffding without replacement

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fitnnzpyqjj30d702oaa7.jpg)

**Vapnik-Chervonenkis(VC) bound**

## Lecture 7

The VC Dimension

N^k-1 要比 B(B,k)大很多

这个上限可能是很松的 (for N >=2, k >= 3)

### VC Dimension

the formal name of maximum non-break point

dvc(H) = largest N for which mH(H) = 2^N


if N>=2, dvc>=2, mH(N) <= N^dvc

好的hypotheses set ==> dvc 有限

### VC Dimension of Perceptrons

1D Perceptron  dvc = 2
2D Perceptron  dvc = 3
...
dD Perceptron  dvc = d+1?

#### dvc ≥ d+1

当输入为

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fitocncberj30ct04iq2w.jpg)

注意X可逆

shatter ==>

sign(Xw) = y   <== (Xw) = y

∴ dvc >= d+1


#### dvc ≤ d+1

对所有的d+2都不能shatter

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fitoh8tiysj309i046weh.jpg
)

线性相关 限制 了dichotomy

d-D维的资料

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fitoinn3z4j30gf0500t2.jpg)

### VC Dimension Explanation

dvc = free parameters

hypotheses 的 自由度

w = (w0, w1, ... , wd)

dvc = d + 1

dvc(H): powerfulness of H

### Vc Bound Rephrase

P[BAD] < δ

P[GOOD] > 1-δ

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fitozfyo2gj306401i744.jpg)

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fitp1uw90kj30g601tgln.jpg)

根号部分就是模型复杂度的penalty，记作Ω(N,H，δ)

sample complexity: 
need N ≈ 10000dvc in theory

practical rule of thumb:
N = 10 dvc often enough

∴dvc 非常宽松

为何宽松？

1. 不关心未知的Eout  any distribution, any target
2. 用mH(H)来代替了|H(x1,...,N)|
3. 用N^dvc来代替了mH(H)  any 'H' of same dvc
4. union bound on worst cases   any choice made by A


but hardly better, and 'similarity loose for all models'


## Lecture 8


### Noise and Error

probabilistic(noisy) marbles:

* marble x ~ P(x)
* probabilistic color [y ≠ h(x)] with y ~ P(y|x)

same nature:  can estimate P[orange] if ~ i.i.d.(独立同分布)


x.y ~ P(x,y) ==>(i.i.d) VC Bound Still Works

Target Distribution P(y|x):  ideal mini-target + 'noise'

deterministic target f :

P(y|x) = 1 for y = f(x)
p(y|x) = 0 for y ≠ f(x)

mini-target

goal of learning: predict ideal mini-target(w.r.t(with respect to) P(y|x)) on often-seen inputs(w.r.t P(x))

### Error Measure


error measure E(g,f)

classification error : **0/1 error**

err : pointwise error measure

**squared error**

err(y~ , y) = (y~ - y) ^ 2

often for regression

0/1 error:  最大概率对应的mini-target
squared error: weighted mean from P(y|x)
absolute value error: weighted median from P(y|x) [when the accumulated probability is 0.5]

### Choice of Error Measure

eg: fingerprint verification

two types of error:

1. false accept
2. false reject


supermarket vs CIA

错误(成本)表 cost/loss/error matrix

err is application/user-dependent

plausible:

0/1: minimum 'flipping noise' - NP hard
squared: minimum Gaussian noise


friendly: easy to optimize for A

closed-form solution
convex objective function


### weighted classification


weighted pocket algorithm

virtual copying

1. check -1 example mistakes with 1000 times more probability
2. weighted pocket replacement

unbalanced data ==> adjust weight
 
skewed class(偏斜类)

precision(查准率) && recall(召回率)

Actualclass        1             0

Predicted   1  true positive false positive

Class       0  false negative true nagativae


## Lecture 9

linear regression

是非题 ==> 填空题

output is real number

### Hypothesis

h(x) = wTx

like perceptron, but without sign

find line/hyperplances with small **residuals**

### The Error Measure

err(y^,y)=(y^-y)^2

### Matrix Form of Ein(w)

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fivx3jz584j30cm09kq3d.jpg)


Normal Equation

pseudo inverse 

Wlin = X` * y

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fivxfplznpj30460203yd.jpg)


### Is Linear Regression a 'Learning Algorithm'?


expected generalization error: 2(d+1)/N on average


### linear classification vs. linear regression

1. run linReg on binary classification data D?
2. return g(x) = sign(wLinx)


err(0/1) <= err(sqr)


trade bound tightness for efficiency

Wlin: useful baseline classifier or as initial PLA/pocket vector

## Lecture 10


logistic function

θ(s) = e^s/(1+e^s) = 1/(1+e^(-s))

光滑、单调、Sigmoid函数

### 3种线性模型

线性得分函数s = wTx

linear classification:  h(x) = sign(s)  err = 0/1   NP hard
linear regression:   h(x) = s err = squared quadratic convex closed-form solution
logistic regression: h(x) = θ(s)  err = cross-entropy gradient descent

logistic regression的错误衡量？

最大似然估计

g = argmax likelihood(h)

注意到h(x) = θ(wTx)有以下性质：

1 - h(x) = h(-x)

likelihood(logistic h) ∝ π(n=1)^(N){h(yn*xn)}


### Cross-Entropy Error

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj1mazkzffj30a1025jrb.jpg
)

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fj1mbm0a1xj308x021wee.jpg)

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fj1mbyid6kj306d01vq2s.jpg)

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj1mciqymej307j01xglh.jpg)

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj1mdm5xxdj30fb04vdg1.jpg)

cross-entropy error:

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj1mdm5xxdj30fb04vdg1.jpg)

等价于

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/0cb6da032ab424eefdca0884cd4113fe578f4293)



### minimizing Ein(w)

Ein(w) 是 连续的，可微分的，两次可微分的，凸的

只要▽=0即可。

没有closed-from solution

推导GD(利用泰勒展开+贪心)：

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fj1n7anwdaj30gb09cmxx.jpg)


GD on Cross-Entropy: θ-weighted sum of **data vectors**

类比PLA的更新规则


## Lecture 11


Linear Models for Classification

Can linear regression or logistic regression help linear classification?

ys: classification correctness score


scaled ce: err(sce) = log2(1+exp(-ys))

### Stochastic GD


Stochastic gradient = true gradient + zero-mean 'noise' directions

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fj1ov1z396j30at02v3yn.jpg)


SGD logstic regression ≈ soft PLA

### multiclass classification

1. combine binary classifiers   but ties?


2. combine logistic regression(soft)  argmax possibility


One-Verses-All (OVA)
But the data is unbalanced often!



One-Versus-One (OVO)

combine pairwise classifiers


g(x) = 锦标赛冠军(w[k,l]Tx])


## Lecture 12

Nonlinear Transformation

circular separable in X ==> linear separable in Z


vice versa?

lines in Z-space <==> special quadratic curves in X-space


Nonlinear model via nonlinear transformation φ + linear models

not new, not just polynomial:

raw(pixels) --> (domain knowledge) concrete feature


### Computation/Storage Price

Q次多项式的特征转换φQ(x) = (1,
                         x1, x2, ..., xd,
                         x1^2, x1x2, ..., xd^2,
                         ...
                         x1^Q, x1^Q-1x2, ..., xd^Q)


1 + d~ dimensions

1是w0~

1 + d~ = (Q+d, Q) = O(Q^d)
（重复组合公式）


### Model Complexity Price

number of free parameters = d~ + 1

Q large ==> large dvc

dvc <= d~ + 1

any d~ + 2 inputs not shattered in Z

==> any d~ + 2 inputs not shattered in X

### danger of visual choices


1. for high dimensions(eg R10), can you?

2. carefull about your brain's model complexity

for VC-safety, φ shall be decided without 'peeking' data


### Polynomial Transform Revisited

Structured Hypothesis Sets

H0 < H1 < H2 < ... < HQ

structure: 嵌套的Hi
structure: 嵌套的Hi

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj1u3hj83oj3069048q2w.jpg)

so

Linear Model First

if Ein(g1) good enough, live happily :)

otherwise, move right of the curve


## Lecture 13

过拟合的危害

overfitting: low**er** Ein, high**er** Eout.

underfitting: switch from dvc* left to dvc = 1

### Cause of Overfitting

noise + excessive dvc

### Case Study

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fj1ujrbqv2j30d107odgb.jpg)

选择最好的g2∈H2， g10∈H10

那么从g2到g10会不会发生过拟合？


![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj1uktyutij30cy07bt9p.jpg)

两边都发生了Overfitting!!!


### learning curves revisited


![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fj1uoq5nvyj30co05jglu.jpg)


### Impact of Noise and Data Size

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj1v1p91zxj30cr04t0tb.jpg)


4个可能会overfitting的原因:

1. 数据量太少
2. 随机噪声太多
3. 确定性噪声太多
4. 模型能力过强(dvc太大，完全拟合噪声)

目标函数如果太复杂，跟noise也差不多,称为deterministic noise


直观理解：
因为当前模型无法理解这么奇怪的数据，会钻牛角尖拟合某些数据点，造成整体的overfitting，好比有点能力，但又不足以胜任，聪明反被聪明误。


### Driving Analogy Revisited

data cleaning/pruning  <==>  use more accurate road information
data hinting <==> exploit more road information
regularization <==> put the brakes
validation <==> monitor the dashboard


correct the outlier's label(data cleaning)
remove the outlier's example(data pruning)


data hinting: 根据对问题的理解，人工合成更多的数据，比如稍微旋转、平移不改变图片的意义。

需要注意： virtual examples not distributed as P(x,y)

## Lecture 14


Regularization

idea: 'step back' from H10 to H2

name history: function approximation for 'ill-posed problems'

if H2 = H10,

add **constraint** w3 = w4 = ... = w10 = 0

why don't you just use w∈R2+1?

扩展视野

with looser constraint

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fj1vpyplm7j30gi06tjrz.jpg)

more flexible than H2: H2 < H2'
less risky than H10: H2' < H10

但是sparse(有很多0) hypothesis set H2'的求解是NP-hard难度的。

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj1vsbiouaj30g205s0td.jpg)

H(C): 与H2'有重叠

soft and smooth structure over C>0

H(0) < H(0.125) < H(1126) < H(∞) = H10

### Matrix form of regularized regression problem

![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fj1vy3o7zdj30d4018748.jpg)


**The Lagrange Multiplier**

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj1vxqqeg8j306g06i74b.jpg
)

减少方向 -▽Ein(w)

最优解wreg时有

-▽Ein(wreg) ∝ wreg

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj1w7hlzelj30b601swej.jpg
)


![](http://ww1.sinaimg.cn/large/0060lm7Tgy1fj1wx9wppmj30fh07jmxq.jpg)

### regularization and VC theory

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj1x5wgjboj30gg062wfg.jpg)

effective dvc  deff(H,A)


### general regularizers  Ω(w)

sparsity(L1) regularizer Σ|wq|

target-dependent, plausible, friendly

类似error measure

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj1y4soxbtj30g109gt9q.jpg)

L1的解常常是稀疏的

more noise <==> more regularization needed

## Lecture 15

Validation

selecting by Ein is dangerous

### Model Selection by Best Etest

selecting by Etest is infeasible and cheating


something in between: Eval

'clean' if Dval never used by Am before

### Validation Set D(val)


![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fj1zcgen53j30gm0aedhd.jpg)


有限霍夫丁不等式的保证，其中M是hypothesis的数量，K是样例数量。


#### use validation to select between H5 and H10

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj2ty7tw7uj307205agln.jpg)

为什么gm-有可能会比用Ein选择的假设还糟糕？

因为Validation Size K变大，则训练样本的数量减少，则表现可能很糟糕。

validation依赖于以下两个近似等式：

![](http://ww2.sinaimg.cn/large/0060lm7Tgy1fj2u3lts1vj30ct025749.jpg)


实际上，K≈N/5比较常用。
Validation不一定比较慢。


### Extreme Case : K = 1

Eout(g-)≈Eval(g-)

en = err(gn-(xn),yn)
**make en closer to Eout(g)?**


loocv = leave-one-out **cross** validation

cross: 同一笔资料有时候当train，有时候当validation.

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj2ueqjye1j309701kjra.jpg
)


Eloocv(H,A) ≈ Eout(g)

衡量的是假设是否适合数据规律。

![](http://ww3.sinaimg.cn/large/0060lm7Tgy1fj2ulbbynbj30d008kjsa.jpg)


Eloocv much better than Ein



### V-Fold Cross Validation

leave-one-out的缺点： 1. computation heavy 2. stability： due to variance of single-point estimates


except 'special case': linear regression bcz it has a analytic solution


NOT OFTEN USED PRACTICALLY!!!

![](http://ww4.sinaimg.cn/large/0060lm7Tgy1fj2vemumgtj30ej05c74s.jpg)

V一般取10折。


validation still more optimistic than testing


## Lecture 16


Three Learning Principles

### Occam's Razor


Two questions:

#### What is simple model?

simple hypothesis h :  'look' simple   few parameters
simple model H : 'not many', small number of hypotheses

#### Why simple is better?

simple H ==> smaller mh(N) ==> less 'likely' to fit bad data perfectly (mH(N)/2^N) ==> more significant when fit happens

有规律的资料，才能容易被简单的模型拟合，杂乱无章的资料，复杂的模型无法得知。


direct action: linear first


### Samping Bias

if the data is sampled in a biased way, learning will produce a similarly biased outcome.

'minor' VC assumption:

data and testing **both iid from P**

match test scenario as much as possible



### Data Snooping

If a data set has affected any step in the learning process, its ability to assess the outcome has been compromised.


lock your test data in safe 
avoid making modeling decision by data





### Summary

Power of Three

3个相关领域

* Data Mining
* Artificial Intelligence
* Statistics

3个理论保证

1. Hoeffding
2. Multi-Bin Hoeffding
3. VC

3个线性模型

1. PLA/pocket
2. linear regression
3. logistic regression

3个重要工具

1. feature transform
2. regularization
3. validation

3个法则
1. Occam's Razor
2. Samping Bias
3. Data Snooping

3个未来方向
1. more transform
2. more regularization
3. less label












