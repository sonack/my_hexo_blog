---
title: numpy用法记录
pid: numpy用法记录
categories:
  - 杂项
tags: [python]
date: 2017-09-17 15:46:52
---
<center>Numpy中的一些小技巧，小笔记。</center>

<!-- more -->


<!--

### numpy.

#### 函数原型:

#### 主要功能：

#### 参数说明：

#### 返回值

****

-->
### numpy.loadtxt

#### 函数原型:

numpy.loadtxt(fname, dtype=<type 'float'>, comments='#', delimiter=None, converters=None, skiprows=0, usecols=None, unpack=False, ndmin=0)

#### 主要功能：

从文本文件中读取数据，每行必须有相同数量的值。

#### 参数说明：

fname: file, str, or pathlib.Path 如果后缀名是.gz或者.bz2，则会被先解压。

dtype: data-type resulting array的数据类型，默认为float.

comments: str or sequence 注释的指示字符

delimiter: str 用来分割值的字符串，默认是任何的空白符

converters: dict  一个字典mapping，把列的值通过一个函数转换为float值。

skiprows: int 跳过最初的skiprows行

usecols: int or sequence   指定只读某些列

unpack: bool  如果是True，则返回的数组会被转置

ndmin: int 返回的数组至少会有ndmin维，否则单独的维度会被压缩。 合理的值如0(default),1或者2

#### 返回值

ndarray  从文本文件中读取的数据

如果要处理缺失值，可以使用更复杂的`genfromtxt`函数

***

### numpy.argmax

#### 函数原型:

numpy.argmax(a,axis=None, out=None)

#### 主要功能：

返回沿axis轴最大值的下标

#### 参数说明：

a: array_like object  输入的数组

axis: int 可选 默认情况下，下标是针对展开平铺的数组(numpy.flatten)，否则是针对指定的轴

out: array 如果提供，结果将会被插入到这个数组中，它应该有合适的shape和dtype

#### 返回值

index_array: int的ndarray

它有和a.shape去掉axis轴一样的形状


类似的函数还有`argmin`、`amax`、`unravel_index`等

注意: 如果有多个最大值，则返回第一次出现位置。

****



### numpy.sum

#### 函数原型:

numpy.sum(a,axis=None,dtype=None,out=None,keepdims=<class numpy._globals._NoValue>)

#### 主要功能：

在给定的一个轴上求数组中元素的和

#### 参数说明：

axis: None、int、tuple of ints

默认None 求所有元素的和
如果axis是负数，它会从最后一个轴开始数

dtype: 返回数组的类型

out: 返回数组可以存放至此

keepdims: bool

如果是True, 会保留维度，只有一个元素。

#### 返回值

sum_along\_axis : ndarray

****

### numpy.argsort

#### 函数原型:

numpy.argsort(a, axis=-1, kind='quicksort', order=None)

#### 主要功能：

返回下标数组，使其能间接排好原数组。

#### 参数说明：

axis: 默认值是-1， 指的是最后一个axis，如果是None，则使用flattened数组。

kind: {'quicksort','mergesort','heapsort'}

order: str or str列表 指定第一关键，第二关键字

#### 返回值

index_array

****


### numpy.pad

#### 函数原型:

numpy.pad(array, pad_width, mode, **kwargs)


#### 主要功能：

填充数组

#### 参数说明：

pad_width: sequence,array\_like,int

每个轴的边缘上填充的值的数量

((before_1, after\_1),...,(before\_N, after\_N)) 指定了每个轴不同的填充宽度
((before, after),)每个轴都使用相同的填充宽度
(pad,) 或者 int 是指的before=after=pad宽度(对每个轴)。


mode: str or function

'constant': 填充常数
'edge': 填充边缘值

....


#### 返回值

****

### numpy.transpose

#### 函数原型:

numpy.transpose(a, axes=None)

#### 主要功能：

重新排列换位一个矩阵中的维度

#### 参数说明：

axes: list of ints

#### 返回值

ndarray

****