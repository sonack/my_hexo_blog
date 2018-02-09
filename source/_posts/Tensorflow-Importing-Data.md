---
title: Tensorflow Importing Data
pid: Tensorflow-Importing-Data
categories:
  - tensorflow
tags: [tensorflow]
date: 2017-11-28 12:13:55
---

<center>
  Tensorflow中的 Dataset API 用法总结.
</center>

<!-- more -->


`Dataset` API 引入了两种数据抽象:

*. 一个`tf.data.Dataset`表示一个元素序列,每个元素都包含1个或多个Tensor对象, 比如在一个图片的输入管道(pipline)中, 一个元素可能就是一个训练样本, 有一对tensor分别代表图像数据和标签, 有两种不同的方法来创建一个dataset:
  1. 创建一个源(source, 比如Dataset.from\_tensor\_slices), 以从一个或多个tensor对象中构建一个dataset
  2. 从其他的`tf.data.Dataset`上应用一个数据转换(transformation)以便生成一个新的dataset
*. 一个`tf.data.Iterator`提供了从dataset中抽取元素的主要方式,`Iterator.get_next()`返回的Op被执行时会yield下一个Dataset中的元素,最简单的Iterator是<span class="ic">one-shot iterator</span>,它与一种特别的Dataset相关联,并且只迭代遍历它一次.使用`Iterator.initializer`操作允许你重新初始化和提供参数来生成一个迭代器以便适应不同的datasets,从而可以使你,比如说,在同一个程序中迭代训练集和验证集数次.


# Basic Mechanics

## Dataset structure

Dataset由具有相同结构的元素组成,每个元素有多个分量(component),每个分量都是一个`tf.Tensor`对象,`Dataset.output_types`和`Dataset.output_shapes`允许你检查每个dataset元素的各个分量的推断类型和形状.

*注意: tf.data现在还在tf.contrib.data中*

```python
dataset1 = tf.data.Dataset.from_tensor_slices(tf.random_uniform([4, 10]))
print(dataset1.output_types)  # ==> "tf.float32"
print(dataset1.output_shapes)  # ==> "(10,)" 此处以TensorShape对象表示

dataset2 = tf.data.Dataset.from_tensor_slices(
   (tf.random_uniform([4]),
    tf.random_uniform([4, 100], maxval=100, dtype=tf.int32)))
print(dataset2.output_types)  # ==> "(tf.float32, tf.int32)"
print(dataset2.output_shapes)  # ==> "((), (100,))"

dataset3 = tf.data.Dataset.zip((dataset1, dataset2))
print(dataset3.output_types)  # ==> (tf.float32, (tf.float32, tf.int32))
print(dataset3.output_shapes)  # ==> "(10, ((), (100,)))"

```
给每个element中的每个component命名通常会很有帮助,比如它们代表不同的feature,你可以使用<span class="ic">collections.namedtuple</span>或者dict来将strings映射到tensors

```python
dataset = tf.data.Dataset.from_tensor_slices(
   {"a": tf.random_uniform([4]),
    "b": tf.random_uniform([4, 100], maxval=100, dtype=tf.int32)})
print(dataset.output_types)  # ==> "{'a': tf.float32, 'b': tf.int32}"
print(dataset.output_shapes)  # ==> "{'a': (), 'b': (100,)}"
```

`Dataset`的transformations支持各种结构的datasets,可以使用`Dataset.map()`,`Dataset.flat_map()`和`Dataset.filter()`等.


## Creating an iterator

[TODO]
