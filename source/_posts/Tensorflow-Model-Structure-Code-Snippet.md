---
title: Tensorflow Model Structure Code Snippet
pid: Tensorflow Model Structure Code Snippet
categories:
  - 杂项
tags: []
date: 2017-11-24 13:14:52
---

![](data:image/jpeg;base64,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)
<center>
  解析<a href='https://gist.github.com/danijar/8663d3bbfd586bffecf6a0094cd116f2'>代码片段</a>
</center>

<!-- more -->

```python
# Working example for my blog post at:
# https://danijar.github.io/structuring-your-tensorflow-models
import functools
import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data


def doublewrap(function):
    """
    A decorator decorator, allowing to use the decorator to be used without
    parentheses if not arguments are provided. All arguments must be optional.
    """
    @functools.wraps(function)
    def decorator(*args, **kwargs):
        if len(args) == 1 and len(kwargs) == 0 and callable(args[0]):
            return function(args[0])
        else:
            return lambda wrapee: function(wrapee, *args, **kwargs)
    return decorator


@doublewrap
def define_scope(function, scope=None, *args, **kwargs):
    """
    A decorator for functions that define TensorFlow operations. The wrapped
    function will only be executed once. Subsequent calls to it will directly
    return the result so that operations are added to the graph only once.
    The operations added by the function live within a tf.variable_scope(). If
    this decorator is used with arguments, they will be forwarded to the
    variable scope. The scope name defaults to the name of the wrapped
    function.
    """
    attribute = '_cache_' + function.__name__
    name = scope or function.__name__
    @property
    @functools.wraps(function)
    def decorator(self):
        if not hasattr(self, attribute):
            with tf.variable_scope(name, *args, **kwargs):
                setattr(self, attribute, function(self))
        return getattr(self, attribute)
    return decorator


class Model:

    def __init__(self, image, label):
        self.image = image
        self.label = label
        self.prediction
        self.optimize
        self.error

    @define_scope(initializer=tf.contrib.slim.xavier_initializer())
    def prediction(self):
        x = self.image
        x = tf.contrib.slim.fully_connected(x, 200)
        x = tf.contrib.slim.fully_connected(x, 200)
        x = tf.contrib.slim.fully_connected(x, 10, tf.nn.softmax)
        return x

    @define_scope
    def optimize(self):
        logprob = tf.log(self.prediction + 1e-12)
        cross_entropy = -tf.reduce_sum(self.label * logprob)
        optimizer = tf.train.RMSPropOptimizer(0.03)
        return optimizer.minimize(cross_entropy)

    @define_scope
    def error(self):
        mistakes = tf.not_equal(
            tf.argmax(self.label, 1), tf.argmax(self.prediction, 1))
        return tf.reduce_mean(tf.cast(mistakes, tf.float32))


def main():
    mnist = input_data.read_data_sets('./mnist/', one_hot=True)
    image = tf.placeholder(tf.float32, [None, 784])
    label = tf.placeholder(tf.float32, [None, 10])
    model = Model(image, label)
    sess = tf.Session()
    sess.run(tf.initialize_all_variables())

    for _ in range(10):
      images, labels = mnist.test.images, mnist.test.labels
      error = sess.run(model.error, {image: images, label: labels})
      print('Test error {:6.2f}%'.format(100 * error))
      for _ in range(60):
        images, labels = mnist.train.next_batch(100)
        sess.run(model.optimize, {image: images, label: labels})


if __name__ == '__main__':
  main()


```

其实这段代码本质上和之前的简单的装饰器一样, 只是比较复杂, 嵌套深度比较深而已.

装饰器doublewrap是一个用来包装装饰器的装饰器, 可以让装饰器不带括号就可以被使用, 同时当给被包装装饰器传入参数的时候, 会传出一个函数, 该函数只接受一个参数, 即被包装的底层函数, 同时把参数都向前传递给装饰器define_scope, 因此在@define\_scope中传递的参数, 都会对应到define\_scope内部的variable\_scope中的\*args和\*kwargs, 从而可以定制一些scope内部的initializer等参数, 且如果提供了scope属性, 则variable\_scope的scope name就使用scope, 否则则用被包装函数的`__name__`属性来代替.

该代码片段的train-test loop写法也很有意思, 可以参考一下.

简单理解:

doublewrap返回define_scope的包装函数, 其可以判断传入的第一个参数是不是callable.
* 如果是, 则是不带参数的@define\_scope, 直接返回包装函数func(args[0]), 这里的func就是原始的define\_scope函数, args[0]就是被包装的函数; 

* 如果不是callable, 则是带参数的@define\_scope(*args, **kwargs), 带参数运行后, 返回的应该是一个一阶装饰器,该装饰器只接受一个参数, 即待包装函数(prediction\optimize\error等最底层函数), 用一个lambda函数来表示, 即`lambda wrapee: function(wrapee, *args, **kwargs)`, 该lambda函数接受wrapee后, 将wrapee和之前的参数都一并传给function(即define\_scope包装器), 实现了参数的向前传递, 如果有参数的名字为scope, 则会为define\_scope中的scope赋值, 其他的参数都传入并作为了`tf.variable_scope()`函数的参数

如果你对Python包装器和用decorator来组织tensorflow代码还不熟悉, 请参考[利用Python装饰器来组织Tensorflow代码的结构](http://sonack.top/2017/11/Tensorflow/python/decorator/best-practice/structure-your-tensorflow-code-with-python-decorators.html).

References:

1. <https://gist.github.com/danijar/8663d3bbfd586bffecf6a0094cd116f2>