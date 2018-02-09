---
title: DataMining Introduction
pid: DataMining_Introduction
categories:
  - courses
  - data mining
tags: [data mining, 数据挖掘]
date: 2017-11-22 22:44:22
---

![](https://www.bme.ufl.edu/labs/fang/courses/CAP5771/2017sp/images/data-mining.jpg)
<center>数据挖掘绪论</center>

<!-- more -->

# Big Data Era

## 什么是大数据

是一个相对的概念
Collections of data sets that cannot be processed in reasonable time using currently available hardware/software resources and state-of-the-art techniques.

4V属性:

1. Volumn 规模大,维度高
2. Velocity 高产生速度
3. Variety 异构数据源, 各样的数据类型
4. Value 低价值密度(相对于庞大的数据规模)

## 为什么要进行数据挖掘


商业角度:
1. 大量的数据被收集或存储在数据仓库中(电子商务数据\银行交易信息等)
2. 计算机越来越便宜,越来越强大
3. 竞争压力,为了提供更好,更个性化的服务

科研角度:
卫星\望远镜\扫描仪\科学模拟都会产生大量的数据, 传统技术已经不再可行, 通过数据挖掘可能帮助科学家classify and segment data, 建立假设

对大规模数据进行挖掘的动机:

1. 数据中通常会有不容易直接被观察到的隐藏的信息
2. 人类手动分析耗时耗力
3. 大量数据从未被分析过

Data Gap

## 什么是数据挖掘

存在很多定义

- Non-trivial extraction of implicit, previously unknown and potentially useful information from data
- Exploration & analysis, by automatic or semi-automatic means, of large quantities of data in order to discover meaningful patterns

是一个从Data --> Knowledge的过程

在电话本里查找电话号码,这属于一个QP(Query Processing)过程, 可以轻易使用SQL语言来完成, 就不属于数据挖掘;
在Web搜索引擎上搜索关键字"Amazon",这属于IR(Information Retrieval), 只是把网页按照相关度呈现出来, 并没有获得新的知识, 也不属于数据挖掘.

而获取关于在美国的某些州某些名字更为流行的知识,将文本按照内容聚类为相似的主题等, 属于数据挖掘.






## Data Mining Tasks

* Prediction Methods
* Description Methods

eg:
1. Association Rule Mining(descriptive)
2. Anomaly Detection(predictive)

### Classification

### Clustering

Market Segmentation
Document Clustering


### Association Rule Discovery

### Regression

### Deviation/Anomaly Detection





# Data Preprocessing

## Data

Data Objects + Attributes

Attributes and Attribute Values

Types of Attributes:

1. Nominal(名词性词) (Categorical) eg: ID numbers, eye color, zip codes           [dis]
2. Ordinal(顺序的) (Categorical) eg: rankings {1...10}, grades {A, B, C, D}, height in {tall, medium, short}     [dis & order]
3. Interval(区间的) (Numeric) eg: calendar dates, temperatures in Celsius or Fahrenheit      [dis & order & add]  差是有意义的, 存在单位量
4. Ratio(比率) (Numeric) eg: 开尔文温度, 长度, 时间      [dis & order & add & mul] 差和比都有意义

Attribute Values Properties:

* distinctness: ＝ ≠
* order: \< \>
* addition: + -
* multiplication: * /


Transformations:

Nominal: Any Permutation of values
Ordinal: 偏序关系保持的操作 ie new_value = f(old\_value), 其中f是单调函数
Interval: new_value = a(unit\_size\scale) * old\_value + b(zero shift), 线性运算不改变差   eg. 摄氏度和华氏度的unit size和zero point value不同
Ratio: new_value = a * old\_value, eg.长度可以用米或厘米来衡量


Discrete and Continuous Attributes

离散属性: 值只有有限个或可数无穷多个, 经常用整数变量来表示, 二元属性是其特例
连续属性: 可以有实数作为属性值, 实践中, 实数值只能被表示和测量为有限位数的数字, 经常用浮点变量来表示


## Types of Data Sets


* Record Data (Data consists of a collection of records, each of which consists of a fixed set of attrs)
  - Data Matrix (mxn, #objs = m, #attrs = n)
  - Document Data (attr是lexcion, rols是documents, value是出现次数)
  - Transaction Data (特例of record data, 每条记录都有a set of items)
* Graph Data (eg. Social Networks, knowledge base(RDF), generic graph and HTML links)
  - WWW 万维网
  - 化学分子式结构
* Ordered Data
  - 空间数据
  - 时间数据
  - 序列数据
  - 基因序列数据

  结构化数据的重要特性:

  1. 维度(dimensionality)

  2. 稀疏性(sparsity)

  3. 分辨率(resolution)



## Summary Statistics


numbers that summarize properties of the data, include frequency, location(mean) and spread(standard deviation)
most summary stats can be calc in a single pass through the data


### Frequency and Mode

一个属性值的frequency是该值出现在数据集中的次数的百分比(如对于性别属性, 男女各占50%)
一个属性的mode是最frequent的属性值

frequency和mode的概念通常用在categorical data中.



### Percentiles(百分位数)

对于continuous数据, percentile的概念更有用.

pth percentile是一个值 Xp, 使得p%的数据都小于Xp. eg, the 50th percentile就是中位数(对于长度为奇数的数据序列)

Quartiles(四分位数): 
1st quartile = 25th percentile
2nd quartile = 50th percentile
3rd quartile = 75th percentile

### Five-Number Summary

- 最小值
- 1st quartile
- 中位数
- 3rd quartile
- 最大值


#### 箱子图

Box Plots展示了数据的分布


![box plot example](http://of1cz7dcw.bkt.clouddn.com/2017-12-18%2017-02-00%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

### Measure of Location

mean(sensitive to outliers) and median(中位数)/trimmed mean(去掉最高分\最低分)

### Measure of Spread

Range(极差=最大值-最小值) and Variance(or standard deviation, var(x) = 1/**(m-1)** ... )

also sensitive to outliers, so other measures such that 

![](http://of1cz7dcw.bkt.clouddn.com/2017-12-18%2017-09-32%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

interquartile 四分位距


## Data Visualization

### Histograms

展示一个变量的数值分布, 将values划分为不同的bins, 每个Bin中的数量越多, bar plot越高, 直方图的形状受bins数量的影响. bin越多, 越精细.

#### 2D Histogram

展示了两个变量的joint distribution

### Box Plots

可用来比较不同属性

### Scatter Plots

属性值决定了点的位置, 2D最常用, 但也有3D散点图
额外的不同属性可以用点的不同size, shape, color等来表示区分
当有arrays of scatter plots(diagonal always empty)时十分有用, 它紧凑地描述了不同属性对之间的关系.


### Contour Plots

轮廓线图/等高线图,

### Matrix Plots

can plot the data matrix, useful when obj are sorted according to class, attrs are typically normalized to prevent one from dominating the plot,

### Parallel Coordinates

each obj is represented as a line

## Data Quality

ex of problems:

- noise (modification of original values, )
- outliers (considerably different than most of the other data objs in the data set)
- missing value (原因: 人们不愿提供相关信息, 某些属性对某些obj不适用, 处理方法: 消除data object, 消除缺失值, 分析时忽略缺失值, 替换为可能值)
- duplicate data (major issue when merging data from heterogenous sources)


### Measures of Data Quality

* Accuracy
* Completeness
* Consistency
* Timeliness
* Believablity
* Interpretability


Major tasks in data preprocessing

* Data Cleaning
* Data Integration
* Data Reduction(维度,数量约减)
* Data Transformation and Data Discretization



## Data Reduction:

### Dimensionality Reduction: PCA, feature subset selection/feature creation, wavelet transform 
curse of dimensionality:

当维度增加时, 数据变得越来越稀疏
密度和距离的定义,对clustering和outlier detection十分关键, 也开始变得没有意义.

假设D维数据实际上分布在或近似分布在维度为d(<D)的子空间中, 这个子空间的轴就是这些数据的有效率的表示.

"rank" is "Dimensionality" 

rank ==> # linear independent columns ==> basis

purpose:

- 避免维度诅咒
- 减少数据挖掘算法的时空消耗
- 更容易可视化
- 可能帮助减少噪声或不相干的特征

techniques:

- PCA
- SVD
- others: supervised and non-linear techniques

PCA: find a projection that captures the largest amount of variation in data

find the eigenvectors of the covariance matrix, and these eigenvecs define the new space.

cov matrix: 每一个元素(i,j)是随机变量的维度i和维度j的协方差, 即E[(Xi-μi)(Xj-μj)], 它的标准计算方法需要先normalization(减去均值向量),再转置乘以自身(row vector), 这里简化为X'X可以看做和真正的协方差矩阵Σ成比例, 实对称矩阵的不同特征值对应的特征向量是正交的


Attribute Subset Selection:

redundant attributes: duplicate
irrelevant attributes: 针对data mining task at hand没有帮助


Heuristic Search in Attribute Selection

d个属性, 有2^d种可能的属性集合,典型的启发式搜索属性选择方法:

1. Best single attr 
2. Best step-wise feature selection
3. Step-wise attribute elimination
4. Best combined attr selection and elimination
5. Optimal branch and bound


Attribute Creation(Feature Generation)

1. attr extraction
2. mapping data to new space
3. attr construction
### Numerosity Reduction: Regression and Log-Linear Models, Histograms, clustering, sampling, Data cube aggregation

减少数据的体积,通过选择替代品,更小的数据表示形式

参数方法: 

eg: regression, log-linear model -> 

假设数据符合某些模型, 估计模型的参数, 仅仅保存这些模型参数, 丢弃原始数据(除了可能的outliers)

非参数方法: 不假设模型, 主要的系列有: 直方图, 聚类, 抽样 ... 


Data Compression



Data transformation

normalization

min-max normalization  

z-score normalization
normalization by decimal scaling [-1,1]


discretization

divide the range of a continuous attribute into intervals

binning


similarity and dissimilarity
[0,1]         [0,x)

proximity






# Association Rule Mining


itemset: a collection of one or more items

k-itemset

support count:  frequency(count) of occurrence of an itemset

support: fraction

frequent itemset: itemset whose support >= minsup threshold


Association Rule: X->Y  where X and Y are itemsets

implication means co-occurrence, not causality.


Rule Evaluation Metrics:

Support(s): 同时包含X和Y的transaction的fraction  包含X,Y / 总数
Confidence(c): 包含X,Y / 包含X

关联规则挖掘的目标:

找到所有的rule:

1. support > minsup
2. confidence > minconf 


算法:

如果rules的{X,Y}相同, 则support相同, 但confidence可能不同, 因此我们分别处理support和confidence

1. Two-Step Approach

* frequent itemset generation: support >= minsup (still expensive, d items, 2^d itemsets)
* rule generation: from each frequent itemset generate high conf rules where each rule is a binary partition of a frequent itemset


频繁项集产生:

Brute-force approach:

O(NwM) M=2^d M=#candidate  N=#transaction

tot possible rules: 

R = 3^d - 2^(d+1) + 1


## reduce # of candicates

Apriori Principle:

If an itemset if frequent, then all of its subsets must also be frequent.


因为support有以下性质(anti-monotone property):

任意X,Y: X包含于Y ==> S(X) >= S(Y)


# Apriori Algorithm

产生k-itemset,逐个验证

k = 1

repeat until no new frequent itemsets are identified:
  generate k+1 from k
  prune candidates itemsets containing subsets of k that are infrequent
  count the sup of each candidate by scanning DB
  eliminate candidates that are infrequent, leaving only those that are frequent.


one word: 前路不通, 及时止损

笛卡尔乘积

# reduce # of comparisons

store the candidate in a hash structure

generate hash tree

* hash function
* max leaf size


alternatives:

general-to-specific: frequent itemset border
specific-to-general
bidirectional
equivalent classes: prefix, suffix tree


traversal of Itemset Lattice(格子): Breadth first, Depth first



# FP-growth Algorithm

FP: frequent pattern
conditional pattern base: 条件模式基
use a compressed representation of the database using an FP-tree.

once FP-tree constructed, use a recursive divide-and-conquer approach to mine the frequent itemsets.


## FP-tree construction

1. scan DB once, find frequent 1-itemset
2. sort frequent items in frequency descending order, F-list
3. scan DB again, construct FP-tree

参考

<iframe src="//www.slideshare.net/slideshow/embed_code/key/o52FA89HxE1WMp" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/waynechung944/fp-growth-intro" title="FP - growth / FP 演算法簡介" target="_blank">FP - growth / FP 演算法簡介</a> </strong> from <strong><a href="https://www.slideshare.net/waynechung944" target="_blank">Wayne Chung</a></strong> </div>



# Tree Projection Algorithm


Set Enumeration Tree

Tree Projection: 

- items are listed in lexicographic order
- each node P stores the following info:
  * itemset for node P
  * list of possible lexicographic extensions of P: E(P)
  * pointer to projected database of its ancestor node
  * bitvector containing information about which trans in the projected database contain the itemset


projected database

T = T ∩ E(A) [T包含A]
否则为 {}


# ECLAT Algorithm

for each item, store a list of trans ids (tids)
vertical data layout


determine任何k-itemset的support, 通过∩ tid-lists of 2 its (k-1) subsets.

top-down\buttom-up\hybrid

pros: very fast support counting
cons: intermidiate tid lists may become too large for memory


# Compact Representation of Frequent Itemsets



Maximal Itemsets: an itemset is maximal frequent if none of its immediate supersets is frequent  (在frequent itemsets border上)

Close Itemsets: an itemset is closed if none of its immediate supersets has the same support as the itemset


Frequent Itemsets > Close FI > Maximal FI

# MaxMiner Algorithm

expand

global pruning techniques


# CLOSET Algorithm


- Creating F-list 
- Divide Search Space
- Find Frequent closed Pattern recursively
- 
