---
title: 利用Python装饰器来组织Tensorflow代码的结构
pid: structure-your-tensorflow-code-with-python-decorators
categories:
  - Tensorflow
  - python
  - decorator
  - best practice
tags: [tensorflow, decorator, lazy_loading]
date: 2017-11-23 22:48:28
---

![](data:image/jpeg;base64,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)

<!-- more -->

# 装饰器

## 定义Python装饰器

装饰器是一种设计模式, 可以使用OOP中的继承和组合实现, 而Python还直接从语法层面支持了装饰器.
装饰器可以在不改变函数定义的前提下, 在代码运行期间动态增加函数的功能, 本质上就是将原来的函数与新加的功能包装成一个新的函数wrapper, 并让原函数的名字指向wrapper.

Python中实现decorator有两种方式: 函数方式 和 类方式

### 函数方式

可以用一个返回函数的高阶函数来实现装饰器

简单的无参数装饰器

```python
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
@log
def now():
    print('NOW')
```

在函数fun的定义前面放入@decorator实现的功能相当于`fun=decorator(fun)`,
从而现在调用now()将打印前面的调用信息.

实现带参数的装饰器

只要给装饰器提供参数后,返回的object具备一个无参数装饰器的功能即可.
可以用返回无参数装饰器函数的高阶函数来实现.

```python
def log(text):
    def decorator(func):
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now():
  print("parametric NOW")
```

该语法糖相当于`now=log('execute')(now)`.

如果要保存原函数的`__name__`属性, 使用python的`functools`模块中的`wraps()`装饰器, 只需要将`@functools.wraps(func)`放在`def wrapper()`前面即可.该装饰器实现的功能就相当于添加了`wrapper.__name__ = func.__name__`语句.


### 类方式

Python中的类和函数差别不大, 实现类的`__call__` method就可以把类当成一个函数来使用了.

实现以上带参数装饰器同样功能的装饰器类的代码如下:

```python
class log():
    def __init__(self, text):
        self.text = text
    def __call__(self,func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print("%s %s" % (self.text, func.__name__))
            return func(*args, **kw)
        return wrapper

@log("I love Python")
def now():
    print("class decorator NOW")
```

使用类的好处是可以继承

## 使用场景

装饰器最巧妙的使用场景在Flask和Django Web框架中,它可以用来检查某人是否被授权使用Web应用的某个endpoint(假设是f函数), 下面是一个检查授权的示意性代码片段.

```python
from functools import wraps

def require_auth(f):
  @wraps(f)
  def decorated(*args, **kw):
    auth = request.authorization
    if not auth or not check_auth(auth.username, auth.password):
      authenticate()
    return f(*args, **kw)
  return decorated
```

另一个常见的用处是用于日志记录

```python
from functools import wraps

def logit(func):
    @wraps(func)
    def with_logging(*args, **kwargs):
        print(func.__name__ + " was called")
        return func(*args, **kwargs)
    return with_logging

@logit
def addition_func(x):
   """Do some math."""
   return x + x

result = addition_func(4)
```

是不是超级灵活呢?  虽然装饰器有点难定义, 但是一旦掌握, 它就像不可思议的魔法. Σ(*ﾟдﾟﾉ)ﾉ


# 利用装饰器改善你的Tensorflow代码结构

重头戏终于来了! 当你在写Tensorflow代码时, 定义模型的代码和动态运行的代码经常会混乱不清. 一方面, 我们希望定义compute graph的"静态"Python代码只执行一次, 而相反, 我们希望调用session来运行的代码可以运行多次取得不同状态的数据信息, 而两类代码一旦杂糅在一起, 很容易造成Graph中有冗余的nodes被定义了多次, 感觉十分不爽, 写过那种丑代码的你们都懂.

那么,如何以一种可读又可复用的方式来组织你的TF代码结构呢?

## 版本1

我们都希望用一个类来抽象一个模型, 这无疑是明智的. 但是如何定义类的接口呢? 
我们的模型需要接受input的feature data和target value, 需要进行 training, evaluation 和 inference 操作.

```python
class Model:

    def __init__(self, data, target):
        data_size = int(data.get_shape()[1])   # 假设data的shape为[N,D] N为Batch Size  D是输入维度
        target_size = int(target.get_shape()[1]) # 假设target的shape为[N,K] K是one-hot的label深度, 即要分类的类的数量
        weight = tf.Variable(tf.truncated_normal([data_size, target_size]))
        bias = tf.Variable(tf.constant(0.1, shape=[target_size]))
        incoming = tf.matmul(data, weight) + bias
        self._prediction = tf.nn.softmax(incoming)
        cross_entropy = tf.reduce_mean(-tf.reduce_sum(target * tf.log(self._prediction), reduction_indices=[1]))
        self._optimize = tf.train.RMSPropOptimizer(0.03).minimize(cross_entropy)
        mistakes = tf.not_equal(
            tf.argmax(target, 1), tf.argmax(self._prediction, 1))
        self._error = tf.reduce_mean(tf.cast(mistakes, tf.float32))

    @property
    def prediction(self):
        return self._prediction

    @property
    def optimize(self):
        return self._optimize

    @property
    def error(self):
        return self._error
```

这是最基本的形式, 但是它存在很多问题. 最严重的问题是整个图都被定义在init构造函数中, 这既不可读又不可复用.


# 版本2

直接将代码分离开来,放在多个函数中是不行的, 因为每次函数调用时都会向Graph中添加nodes, 所以我们必须确保这些Node Operations只在函数第一次调用的时候才添加到Graph中, 这有点类似于singleton模式, 或者叫做lazy-loading(使用时才创建).

```python
class Model:

    def __init__(self, data, target):
        self.data = data
        self.target = target
        self._prediction = None
        self._optimize = None
        self._error = None

    @property
    def prediction(self):
        if not self._prediction:
            data_size = int(self.data.get_shape()[1])
            target_size = int(self.target.get_shape()[1])
            weight = tf.Variable(tf.truncated_normal([data_size, target_size]))
            bias = tf.Variable(tf.constant(0.1, shape=[target_size]))
            incoming = tf.matmul(self.data, weight) + bias
            self._prediction = tf.nn.softmax(incoming)
        return self._prediction

    @property
    def optimize(self):
        if not self._optimize:
             cross_entropy = tf.reduce_mean(-tf.reduce_sum(self.target * tf.log(self._prediction), reduction_indices=[1]))
            optimizer = tf.train.RMSPropOptimizer(0.03)
            self._optimize = optimizer.minimize(cross_entropy)
        return self._optimize

    @property
    def error(self):
        if not self._error:
            mistakes = tf.not_equal(
                tf.argmax(self.target, 1), tf.argmax(self.prediction, 1))
            self._error = tf.reduce_mean(tf.cast(mistakes, tf.float32))
        return self._error

```

这好多了, 但是每次都需要if判断还是有点太臃肿, 利用装饰器, 我们可以做的更好!

# 版本3

实现一个自定义装饰器lazy\_property, 它的功能和property类似,但是只运行function一次, 然后将返回结果存在一个属性中, 该属性的名字是 "\_cache\_" + function.\_\_name\_\_, 后续函数调用将直接返回缓存好的属性.


```python
import functools

def lazy_property(function):
    attribute = '_cache_' + function.__name__

    @property
    @functools.wraps(function)
    def decorator(self):
        if not hasattr(self, attribute):
            setattr(self, attribute, function(self))
        return getattr(self, attribute)

    return decorator
```

使用该装饰器, 优化后的代码如下:

```python
class Model:

    def __init__(self, data, target):
        self.data = data
        self.target = target
        self.prediction
        self.optimize
        self.error

    @lazy_property
    def prediction(self):
        data_size = int(self.data.get_shape()[1])
        target_size = int(self.target.get_shape()[1])
        weight = tf.Variable(tf.truncated_normal([data_size, target_size]))
        bias = tf.Variable(tf.constant(0.1, shape=[target_size]))
        incoming = tf.matmul(self.data, weight) + bias
        return tf.nn.softmax(incoming)

    @lazy_property
    def optimize(self):
        cross_entropy = tf.reduce_mean(-tf.reduce_sum(self.target * tf.log(self.prediction), reduction_indices=[1]))
        optimizer = tf.train.RMSPropOptimizer(0.03)
        return optimizer.minimize(cross_entropy)

    @lazy_property
    def error(self):
        mistakes = tf.not_equal(
            tf.argmax(self.target, 1), tf.argmax(self.prediction, 1))
        return tf.reduce_mean(tf.cast(mistakes, tf.float32))

```
注意, 在init构造函数中调用了属性prediction,optimize和error, 这会让其第一次执行, 因此构造函数完成后Compute Graph也就构建完毕了.

有时我们使用TensorBoard来可视化Graph时, 希望将相关的Node分组到一起, 这样看起来更为清楚直观, 我们只需要修改之前的`lazy_property`装饰器, 在其中加上`with tf.name_scope("name")` 或者 `with tf.variable_scope("name")`即可, 修改之前的装饰器如下:


```python
import functools

def define_scope(function):
    attribute = '_cache_' + function.__name__

    @property
    @functools.wraps(function)
    def decorator(self):
        if not hasattr(self, attribute):
            with tf.variable_scope(function.__name__):
                setattr(self, attribute, function(self))
        return getattr(self, attribute)

    return decorator

```

我们现在能够用一种结构化和紧凑的方式来定义TensorFlow的模型了, 这归功于Python的强大的decorator语法糖.

完整的代码在[这里](https://gist.github.com/danijar/8663d3bbfd586bffecf6a0094cd116f2), 有关该代码的详细注释后续将会放出.

References:

1. <https://danijar.com/structuring-your-tensorflow-models/>
2. <https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014318435599930270c0381a3b44db991cd6d858064ac0000>
3. <https://eastlakeside.gitbooks.io/interpy-zh/content/decorators/deco_class.html>
4. <https://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/001386820062641f3bcc60a4b164f8d91df476445697b9e000>
5. <https://www.tensorflow.org/get_started/mnist/beginners?hl=zh-cn#training>
6. <https://mozillazg.github.io/2016/12/python-super-is-not-as-simple-as-you-thought.html>
