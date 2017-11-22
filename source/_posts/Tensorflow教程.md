---
title: Tensorflow教程
pid: Tensorflow_Tutorial
categories:
  - 深度学习
  - 框架
tags: [Deep Learning, Tensorflow, Tutorial]
date: 2017-11-03 12:47:28
---

![](data:image/png;base64,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)

TensorFlow是Google主打的深度学习框架,严格来说,它的功能不仅仅可以满足常规的所有机器学习算法的需求,甚至可以用在求解偏微分方程,数值模拟等多个领域. 它的功能主要来说就是一个自动微分器,其主要的界面语言(interface langauge)为python,用来描述一张计算图(computation graph),然后创建一个会话Session将其传递给后端的高效计算引擎进行求解,其后端代码一般为C++. 

<!-- more -->


由于TF(Tensorflow)功能强大,语法灵活,因此很容易造成自己可以轻易看懂别人的代码,编写代码时却迷失在蹩脚的API中. 因此这篇文章希望能够有条理的整理归纳出使用TF的best practice.

# Overview

Tensorflow中使用数据流图(dataflow graph)来进行数值计算,节点代表运算(Op),边代表传递的数据张量(Tensor),这与一般的computation graph可能有所不同,一般的computation graph可能会用节点node来代表变量,而边代表Op,但两者是等价的.

TF的安装不再赘述,请参考 [官网指南](https://www.tensorflow.org/install/).

## Tensor

Tensor在不同领域中的意义差别较大.

### Math/Physics

在数学或物理学中,Tensor就是标量(scalar)->向量(vectors)->线性算符(linear operators)的扩展概念,可以简单理解为任意维的数组.

### Tensorflow

在TF中,数据都是以Tensor的形式表示的,它的数据类型是唯一确定的,一般用`dtype`来表示.
一个tensor的rank就是它的维度,而对于标量来说,它就是一个rank为0的tensor,它的shape为[].

## Hello World

```python
import tensorflow as tf   # canonical import statement
node1 = tf.constant(3.0, dtype=tf.float32)
node2 = tf.constant(4.0) # also tf.float32 implicitly
print(node1, node2)
```

输出为

```python
Tensor("Const:0", shape=(), dtype=float32) Tensor("Const_1:0", shape=(), dtype=float32)
```

注意,TF并没有打印出来node1和node2所代表的输出结果3.0和4.0,因为它们还没有evaluated.要想对node进行求值,必须要将graph放入一个session中进行fetch该node,一个Session封装了TF的运行时的控制和状态信息.

输出的为描述该操作的一些字符串,

```python
sess = tf.Session() # new a session object
print(sess.run([node1, node2]))
```

```python
[3.0, 4.0]
```

在TF中,一个node代表一个Operation,比如我们可以将node1和node2的输出送入代表加法操作的node3,构建一个Graph

```python
node3 = tf.add(node1, node2)
print('node3:', node3)
print('sess.run(node3):', sess.run(node3))
```

```python
node3: Tensor("Add:0", shape=(), dtype=float32)
sess.run(node3): 7.0
```

其对应的计算图如下所示,可以用tensorflow提供的可视化工具tensorboard进行查看.

![](https://www.tensorflow.org/images/getting_started_add.png)

如果要向graph中传递数据,而不是一直使用constant常量,我们需要用到placeholders

tf.placeholder(dtype, shape=None, name=None)

```python
a = tf.placeholder(tf.float32) # specify data type 
b = tf.placeholder(tf.float32)
adder_node = a + b # + is a shortcut for tf.add(a,b)
```

在调用session的run方法时,需要用到`feed_dict`参数来提供placeholders的输入的具体值.

```python
print(sess.run(adder_node, {a:3, b:4.5}))
print(sess.run(adder_node, {a: [1,3], b:[2,4]}))
```

```python
7.5
[ 3.  7.]
```

注意传入的不论是list还是scalar,其base type都要是能够转换为tf.float32类型的数据,否则会报'Value Error: could not convert xxxx to float: xxxx'.

其数据流图如下,注意placeholder使用小椭圆表示,constant使用小圆圈表示,且有箭头.

![](https://www.tensorflow.org/images/getting_started_adder.png)

placeholder提供了feed input data的入口,但是机器学习模型都带有一些可以训练的参数,这些参数可以用`Variable`来表示,它们的构造函数需要提供dtype和初始值.

以下便构造了一个线性回归的模型:


```python
W = tf.Variable([.3], dtype=tf.float32)
b = tf.Variable([-.3], dtype=tf.float32)
x = tf.placeholder(tf.float32)
linear_model = W*x + b
```

对于constants,一旦调用tf.constant构造完毕后,它们的值就被确定了且永远不会改变.但Variable不同,它们的值需要你在session中执行一个特殊的operation来进行initialization.

```python
init = tf.global_variables_initializer()
print(type(init))
sess.run(init)
```

```python
<class 'tensorflow.python.framework.ops.Operation'>
```

我们可以同时对x的好几个值对模型进行求解

```python
print(sess.run(linear_model, feed_dict={x: [1,2,3,4]}))
```

Variable可以使用`assign`等操作手动改变其值.


## tf.train API

optimizers自动帮你调用`tf.gradients`对模型参数自动求导

```python
optimizer = tf.train.GradientDescentOptimizer(0.01) # learning rate is 0.01
train = optimizer.minimize(loss) # get train op
print(type(train))

sess.run(init)
for i in range(1000):
    sess.run(train, {x: [1,2,3,4], y:[0,-1,-2,-3]})
print(sess.run([W,b]))
```

```python
<class 'tensorflow.python.framework.ops.Operation'>
[array([-0.9999969], dtype=float32), array([ 0.99999082], dtype=float32)]
```
tf.train API是比较低级的API,TF提供了抽象程度更加高级的API来帮你完成更加复杂的机器学习常规任务,但是低级API更加灵活和可控.

## tf.estimator API

tf.estimator是更高层的API,它简化了以下机器学习的机制:

1. 运行training loops
2. 运行evaluation loops
3. 管理数据集

使用tf.estimator完成以上同样的linear model任务的代码如下:

```python
import numpy as np
import tensorflow as tf

a = tf.feature_column.numeric_column('x', shape=[1])
print (type(a))

feature_columns = [tf.feature_column.numeric_column("x", shape=[1])]  # 声明features的list
print (type(feature_columns))
print (type(feature_columns[0]))

estimator = tf.estimator.LinearRegressor(feature_columns=feature_columns)

x_train = np.array([1., 2., 3., 4.])
y_train = np.array([0., -1., -2., -3.])
x_eval = np.array([2., 5., 8., 1.])
y_eval = np.array([-1.01, -4.1, -7, 0.])

# 返回一个函数, 该函数返回'features'和'target',feature的key和输入的dict x的key是相同的
input_fn = tf.estimator.inputs.numpy_input_fn({"x":x_train}, y_train, batch_size=4, num_epochs=None, shuffle=True)

features, target = input_fn()

sess = tf.Session()
print(type(target))
# print(features['x'].eval(session=sess))

train_input_fn = tf.estimator.inputs.numpy_input_fn(
    {"x": x_train}, y_train, batch_size=4, num_epochs=1000, shuffle=False)
eval_input_fn = tf.estimator.inputs.numpy_input_fn(
    {"x": x_eval}, y_eval, batch_size=4, num_epochs=1000, shuffle=False)

# dir(estimator)

estimator.train(input_fn=input_fn, steps=1000)

train_metrics = estimator.evaluate(input_fn=train_input_fn)

eval_metrics = estimator.evaluate(input_fn=eval_input_fn)
```



```python
<class 'tensorflow.python.feature_column.feature_column._NumericColumn'>
<class 'list'>
<class 'tensorflow.python.feature_column.feature_column._NumericColumn'>
INFO:tensorflow:Using default config.
WARNING:tensorflow:Using temporary folder as model directory: /tmp/tmp616blvlv
INFO:tensorflow:Using config: {'_model_dir': '/tmp/tmp616blvlv', '_tf_random_seed': 1, '_save_summary_steps': 100, '_save_checkpoints_secs': 600, '_save_checkpoints_steps': None, '_session_config': None, '_keep_checkpoint_max': 5, '_keep_checkpoint_every_n_hours': 10000, '_log_step_count_steps': 100}
<class 'tensorflow.python.framework.ops.Tensor'>
INFO:tensorflow:Create CheckpointSaverHook.
INFO:tensorflow:Saving checkpoints for 1 into /tmp/tmp616blvlv/model.ckpt.
INFO:tensorflow:loss = 9.0, step = 1
INFO:tensorflow:global_step/sec: 345.526
INFO:tensorflow:loss = 0.0748552, step = 101 (0.290 sec)
INFO:tensorflow:global_step/sec: 313.758
INFO:tensorflow:loss = 0.0178783, step = 201 (0.319 sec)
INFO:tensorflow:global_step/sec: 269.846
INFO:tensorflow:loss = 0.00759357, step = 301 (0.371 sec)
INFO:tensorflow:global_step/sec: 289.275
INFO:tensorflow:loss = 0.00345347, step = 401 (0.346 sec)
INFO:tensorflow:global_step/sec: 303.156
INFO:tensorflow:loss = 0.000279466, step = 501 (0.330 sec)
INFO:tensorflow:global_step/sec: 297.211
INFO:tensorflow:loss = 5.11574e-05, step = 601 (0.336 sec)
INFO:tensorflow:global_step/sec: 304.607
INFO:tensorflow:loss = 3.93152e-06, step = 701 (0.328 sec)
INFO:tensorflow:global_step/sec: 323.773
INFO:tensorflow:loss = 1.23448e-06, step = 801 (0.309 sec)
INFO:tensorflow:global_step/sec: 373.515
INFO:tensorflow:loss = 2.81852e-07, step = 901 (0.268 sec)
INFO:tensorflow:Saving checkpoints for 1000 into /tmp/tmp616blvlv/model.ckpt.
INFO:tensorflow:Loss for final step: 2.63951e-08.
INFO:tensorflow:Starting evaluation at 2017-11-03-06:50:04
INFO:tensorflow:Restoring parameters from /tmp/tmp616blvlv/model.ckpt-1000
INFO:tensorflow:Finished evaluation at 2017-11-03-06:50:06
INFO:tensorflow:Saving dict for global step 1000: average_loss = 1.30013e-08, global_step = 1000, loss = 5.20052e-08
INFO:tensorflow:Starting evaluation at 2017-11-03-06:50:06
INFO:tensorflow:Restoring parameters from /tmp/tmp616blvlv/model.ckpt-1000
INFO:tensorflow:Finished evaluation at 2017-11-03-06:50:08
INFO:tensorflow:Saving dict for global step 1000: average_loss = 0.00253461, global_step = 1000, loss = 0.0101384
```

## A custom model

要想用tf.estimator自定制模型,我们需要使用`tf.estimator.Estimator`类,`LinearRegressor`类其实就是它的子类. 我们可以不必真的编写一个`Estimator`的子类,通过给Estimator提供一个函数`model_fn`,我们可以告诉tf.estimator怎样去评估预测,如何一步步训练以及如何计算loss等,代码如下:

```python
import numpy as np
import tensorflow as tf

def model_fn(features, labels, mode):
    W = tf.get_variable('W',[1],dtype=tf.float64)  # [1] is shape
    b = tf.get_variable('b',[1],dtype=tf.float64)
    y = W*features['x'] + b
    
    loss = tf.reduce_sum(tf.square(y - labels))
    
    global_step = tf.train.get_global_step()  # get global step
    optimizer = tf.train.GradientDescentOptimizer(0.01)
    train = tf.group(optimizer.minimize(loss),tf.assign_add(global_step,1))
    return tf.estimator.EstimatorSpec(mode=mode,predictions=y,loss=loss,train_op=train)

estimator = tf.estimator.Estimator(model_fn = model_fn)

x_train = np.array([1., 2., 3., 4.])
y_train = np.array([0., -1., -2., -3.])
x_eval = np.array([2., 5., 8., 1.])
y_eval = np.array([-1.01, -4.1, -7., 0.])
input_fn = tf.estimator.inputs.numpy_input_fn(
    {"x": x_train}, y_train, batch_size=4, num_epochs=None, shuffle=True)
train_input_fn = tf.estimator.inputs.numpy_input_fn(
    {"x": x_train}, y_train, batch_size=4, num_epochs=1000, shuffle=False)
eval_input_fn = tf.estimator.inputs.numpy_input_fn(
    {"x": x_eval}, y_eval, batch_size=4, num_epochs=1000, shuffle=False)

# train
estimator.train(input_fn=input_fn, steps=1000)
# Here we evaluate how well our model did.
train_metrics = estimator.evaluate(input_fn=train_input_fn)
eval_metrics = estimator.evaluate(input_fn=eval_input_fn)
print("train metrics: %r"% train_metrics)
print("eval metrics: %r"% eval_metrics)
```

```python
INFO:tensorflow:Using default config.
WARNING:tensorflow:Using temporary folder as model directory: /tmp/tmp_jwlizu5
INFO:tensorflow:Using config: {'_model_dir': '/tmp/tmp_jwlizu5', '_tf_random_seed': 1, '_save_summary_steps': 100, '_save_checkpoints_secs': 600, '_save_checkpoints_steps': None, '_session_config': None, '_keep_checkpoint_max': 5, '_keep_checkpoint_every_n_hours': 10000, '_log_step_count_steps': 100}
INFO:tensorflow:Create CheckpointSaverHook.
INFO:tensorflow:Saving checkpoints for 1 into /tmp/tmp_jwlizu5/model.ckpt.
INFO:tensorflow:loss = 17.3073748566, step = 1
INFO:tensorflow:global_step/sec: 575.587
INFO:tensorflow:loss = 0.0216944323678, step = 101 (0.174 sec)
INFO:tensorflow:global_step/sec: 810.713
INFO:tensorflow:loss = 0.00117253952234, step = 201 (0.123 sec)
INFO:tensorflow:global_step/sec: 643.906
INFO:tensorflow:loss = 4.07135742188e-05, step = 301 (0.155 sec)
INFO:tensorflow:global_step/sec: 679.894
INFO:tensorflow:loss = 1.64344624008e-05, step = 401 (0.147 sec)
INFO:tensorflow:global_step/sec: 888.108
INFO:tensorflow:loss = 3.55000210238e-06, step = 501 (0.113 sec)
INFO:tensorflow:global_step/sec: 537.926
INFO:tensorflow:loss = 1.24441839402e-07, step = 601 (0.186 sec)
INFO:tensorflow:global_step/sec: 751.741
INFO:tensorflow:loss = 1.32256919337e-08, step = 701 (0.133 sec)
INFO:tensorflow:global_step/sec: 613.957
INFO:tensorflow:loss = 1.52860294025e-09, step = 801 (0.163 sec)
INFO:tensorflow:global_step/sec: 615.745
INFO:tensorflow:loss = 1.21648003089e-10, step = 901 (0.162 sec)
INFO:tensorflow:Saving checkpoints for 1000 into /tmp/tmp_jwlizu5/model.ckpt.
INFO:tensorflow:Loss for final step: 9.88233969859e-12.
INFO:tensorflow:Starting evaluation at 2017-11-03-07:09:43
INFO:tensorflow:Restoring parameters from /tmp/tmp_jwlizu5/model.ckpt-1000
INFO:tensorflow:Finished evaluation at 2017-11-03-07:09:44
INFO:tensorflow:Saving dict for global step 1000: global_step = 1000, loss = 1.12188e-11
INFO:tensorflow:Starting evaluation at 2017-11-03-07:09:44
INFO:tensorflow:Restoring parameters from /tmp/tmp_jwlizu5/model.ckpt-1000
INFO:tensorflow:Finished evaluation at 2017-11-03-07:09:45
INFO:tensorflow:Saving dict for global step 1000: global_step = 1000, loss = 0.0101004
train metrics: {'loss': 1.1218806e-11, 'global_step': 1000}
eval metrics: {'loss': 0.010100436, 'global_step': 1000}
```

# MNIST

## About MNIST

* 手写数字 0~9
* 28 * 28 = 784
* training set containing 60000 examples
* test set containing 10000 examples

下载并读取MNIST数据集

```python
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/', one_hot = True)
```

```python
Extracting MNIST_data/train-images-idx3-ubyte.gz
Extracting MNIST_data/train-labels-idx1-ubyte.gz
Extracting MNIST_data/t10k-images-idx3-ubyte.gz
Extracting MNIST_data/t10k-labels-idx1-ubyte.gz
```

此处MNIST被分为了3部分

* mnist.train(55000)
* mnist.test(10000)
* mnist.validation(5000)


##  Softmax Regression

```python
import tensorflow as tf
x = tf.placeholder(tf.float32,[None,784])  # None means that a dimension can be of any length

W = tf.Variable(tf.zeros([784, 10]))
b = tf.Variable(tf.zeros([10]))

y = tf.nn.softmax(tf.matmul(x,W) + b)

y_ = tf.placeholder(tf.float32, [None, 10])
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)
sess = tf.InteractiveSession()

tf.global_variables_initializer().run()

for _ in range(1000):
    batch_xs, batch_ys = mnist.train.next_batch(100)
    sess.run(train_step, feed_dict={x:batch_xs, y_:batch_ys})

correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

print (sess.run(accuracy, feed_dict={x:mnist.test.images, y_:mnist.test.labels}))
```

```python
0.9195
```

## CNN

```python
# weight initialization


def weight_variable(shape):
    initial = tf.truncated_normal(shape, stddev = 0.1)
    return tf.Variable(initial)

def bias_variable(shape):
    initial = tf.constant(0.1, shape=shape)
    return tf.Variable(initial)

def conv2d(x, W):
    return tf.nn.conv2d(x, W, strides=[1,1,1,1], padding='SAME')

def max_pool_2x2(x):
    return tf.nn.max_pool(x, ksize=[1,2,2,1], strides=[1,2,2,1], padding='SAME')

W_conv1 = weight_variable([5,5,1,32])  # 5x5 kernel_size  1 input_channel 32 output_channel
b_conv1 = weight_variable([32])

x_image = tf.reshape(x, [-1,28,28,1])

h_conv1 = tf.nn.relu(conv2d(x_image, W_conv1) + b_conv1)
h_pool1 = max_pool_2x2(h_conv1)

W_conv2 = weight_variable([5, 5, 32, 64])
b_conv2 = bias_variable([64])

h_conv2 = tf.nn.relu(conv2d(h_pool1, W_conv2) + b_conv2)
h_pool2 = max_pool_2x2(h_conv2)

W_fc1 = weight_variable([7 * 7 * 64, 1024])
b_fc1 = bias_variable([1024])

h_pool2_flat = tf.reshape(h_pool2, [-1, 7*7*64])
h_fc1 = tf.nn.relu(tf.matmul(h_pool2_flat, W_fc1) + b_fc1)

keep_prob = tf.placeholder(tf.float32)
h_fc1_drop = tf.nn.dropout(h_fc1, keep_prob)

W_fc2 = weight_variable([1024, 10])
b_fc2 = bias_variable([10])

y_conv = tf.matmul(h_fc1_drop, W_fc2) + b_fc2

cross_entropy = tf.reduce_mean(
    tf.nn.softmax_cross_entropy_with_logits(labels=y_, logits=y_conv))
train_step = tf.train.AdamOptimizer(1e-4).minimize(cross_entropy)
correct_prediction = tf.equal(tf.argmax(y_conv, 1), tf.argmax(y_, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

with tf.Session() as sess:
  sess.run(tf.global_variables_initializer())
  for i in range(20000):
    batch = mnist.train.next_batch(50)
    if i % 100 == 0:
      train_accuracy = accuracy.eval(feed_dict={
          x: batch[0], y_: batch[1], keep_prob: 1.0})
      print('step %d, training accuracy %g' % (i, train_accuracy))
    train_step.run(feed_dict={x: batch[0], y_: batch[1], keep_prob: 0.5})

  print('test accuracy %g' % accuracy.eval(feed_dict={
      x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))
```

```python
step 0, training accuracy 0.16
step 100, training accuracy 0.94
step 200, training accuracy 0.92
step 300, training accuracy 0.96
step 400, training accuracy 0.96
step 500, training accuracy 0.98
step 600, training accuracy 0.96
step 700, training accuracy 0.94
step 800, training accuracy 0.98
step 900, training accuracy 0.92
step 1000, training accuracy 0.98
step 1100, training accuracy 0.96
step 1200, training accuracy 0.94
step 1300, training accuracy 0.98
step 1400, training accuracy 0.96
step 1500, training accuracy 0.98
step 1600, training accuracy 0.96
step 1700, training accuracy 0.96
step 1800, training accuracy 0.98
step 1900, training accuracy 0.98
step 2000, training accuracy 0.98
step 2100, training accuracy 0.98
step 2200, training accuracy 0.96
step 2300, training accuracy 0.94
step 2400, training accuracy 0.92
step 2500, training accuracy 0.98
step 2600, training accuracy 1
step 2700, training accuracy 1
step 2800, training accuracy 1
step 2900, training accuracy 0.98
step 3000, training accuracy 0.98
step 3100, training accuracy 1
step 3200, training accuracy 0.98
step 3300, training accuracy 1
step 3400, training accuracy 1
step 3500, training accuracy 1
step 3600, training accuracy 1
step 3700, training accuracy 0.98
step 3800, training accuracy 0.96
step 3900, training accuracy 1
step 4000, training accuracy 0.98
step 4100, training accuracy 1
step 4200, training accuracy 1
step 4300, training accuracy 1
step 4400, training accuracy 0.98
step 4500, training accuracy 0.98
step 4600, training accuracy 1
step 4700, training accuracy 1
step 4800, training accuracy 1
step 4900, training accuracy 1
step 5000, training accuracy 1
step 5100, training accuracy 1
step 5200, training accuracy 0.98
step 5300, training accuracy 0.98
step 5400, training accuracy 1
step 5500, training accuracy 0.96
step 5600, training accuracy 1
step 5700, training accuracy 1
step 5800, training accuracy 0.96
step 5900, training accuracy 1
step 6000, training accuracy 0.96
step 6100, training accuracy 1
step 6200, training accuracy 0.98
step 6300, training accuracy 0.96
step 6400, training accuracy 0.98
step 6500, training accuracy 1
step 6600, training accuracy 0.94
step 6700, training accuracy 1
step 6800, training accuracy 1
step 6900, training accuracy 0.98
step 7000, training accuracy 1
step 7100, training accuracy 0.98
step 7200, training accuracy 1
step 7300, training accuracy 1
step 7400, training accuracy 1
step 7500, training accuracy 0.98
step 7600, training accuracy 1
step 7700, training accuracy 1
step 7800, training accuracy 0.98
step 7900, training accuracy 1
step 8000, training accuracy 0.98
step 8100, training accuracy 1
step 8200, training accuracy 1
step 8300, training accuracy 0.98
step 8400, training accuracy 1
step 8500, training accuracy 1
step 8600, training accuracy 0.98
step 8700, training accuracy 1
step 8800, training accuracy 1
step 8900, training accuracy 1
step 9000, training accuracy 1
step 9100, training accuracy 0.96
step 9200, training accuracy 1
step 9300, training accuracy 1
step 9400, training accuracy 1
step 9500, training accuracy 1
step 9600, training accuracy 1
step 9700, training accuracy 0.98
step 9800, training accuracy 1
step 9900, training accuracy 1
step 10000, training accuracy 1
step 10100, training accuracy 1
step 10200, training accuracy 1
step 10300, training accuracy 1
step 10400, training accuracy 1
step 10500, training accuracy 1
step 10600, training accuracy 1
step 10700, training accuracy 1
step 10800, training accuracy 0.98
step 10900, training accuracy 1
step 11000, training accuracy 1
step 11100, training accuracy 0.98
step 11200, training accuracy 1
step 11300, training accuracy 1
step 11400, training accuracy 0.98
step 11500, training accuracy 1
step 11600, training accuracy 1
step 11700, training accuracy 1
step 11800, training accuracy 1
step 11900, training accuracy 1
step 12000, training accuracy 1
step 12100, training accuracy 0.98
step 12200, training accuracy 0.98
step 12300, training accuracy 1
step 12400, training accuracy 1
step 12500, training accuracy 0.98
step 12600, training accuracy 1
step 12700, training accuracy 1
step 12800, training accuracy 1
step 12900, training accuracy 1
step 13000, training accuracy 1
step 13100, training accuracy 1
step 13200, training accuracy 1
step 13300, training accuracy 1
step 13400, training accuracy 1
step 13500, training accuracy 1
step 13600, training accuracy 1
step 13700, training accuracy 1
step 13800, training accuracy 1
step 13900, training accuracy 1
step 14000, training accuracy 1
step 14100, training accuracy 1
step 14200, training accuracy 1
step 14300, training accuracy 1
step 14400, training accuracy 1
step 14500, training accuracy 1
step 14600, training accuracy 1
step 14700, training accuracy 0.98
step 14800, training accuracy 1
step 14900, training accuracy 1
step 15000, training accuracy 1
step 15100, training accuracy 1
step 15200, training accuracy 1
step 15300, training accuracy 1
step 15400, training accuracy 1
step 15500, training accuracy 0.98
step 15600, training accuracy 1
step 15700, training accuracy 1
step 15800, training accuracy 1
step 15900, training accuracy 1
step 16000, training accuracy 1
step 16100, training accuracy 1
step 16200, training accuracy 1
step 16300, training accuracy 1
step 16400, training accuracy 1
step 16500, training accuracy 1
step 16600, training accuracy 1
step 16700, training accuracy 1
step 16800, training accuracy 1
step 16900, training accuracy 1
step 17000, training accuracy 1
step 17100, training accuracy 1
step 17200, training accuracy 1
step 17300, training accuracy 1
step 17400, training accuracy 1
step 17500, training accuracy 0.98
step 17600, training accuracy 1
step 17700, training accuracy 1
step 17800, training accuracy 1
step 17900, training accuracy 1
step 18000, training accuracy 1
step 18100, training accuracy 1
step 18200, training accuracy 1
step 18300, training accuracy 1
step 18400, training accuracy 1
step 18500, training accuracy 1
step 18600, training accuracy 1
step 18700, training accuracy 1
step 18800, training accuracy 1
step 18900, training accuracy 1
step 19000, training accuracy 1
step 19100, training accuracy 1
step 19200, training accuracy 1
step 19300, training accuracy 1
step 19400, training accuracy 1
step 19500, training accuracy 1
step 19600, training accuracy 1
step 19700, training accuracy 1
step 19800, training accuracy 1
step 19900, training accuracy 1
test accuracy 0.993

```


## Summary

阅读[example code](https://github.com/tensorflow/tensorflow/tree/r1.4/tensorflow/examples/tutorials/mnist).

* `mnist.py` 构建了一个fully-connected MNIST model
* `fully_connected_feed.py` 训练了`mnist.py`中构建的模型

### mnist.py

实现了inference(forward)/loss(+loss)/training(+ gradient generate&apply ops) pattern.

py2&py3

```python
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
```

构建隐含层

```python
# Hidden 1
with tf.name_scope('hidden1'):
    weights = tf.Variable(
        tf.truncated_normal([IMAGE_PIXELS, hidden1_units],
                            stddev=1.0 / math.sqrt(float(IMAGE_PIXELS))),
        name='weights')
    biases = tf.Variable(tf.zeros([hidden1_units]),
                         name='biases')
    hidden1 = tf.nn.relu(tf.matmul(images, weights) + biases)
```

label的shape为[batch_size],非one-hot类型:

```python
def loss(logits, labels):
    """Calculates the loss from the logits and the labels.
    Args:
        logits: Logits tensor, float - [batch_size, NUM_CLASSES].
        labels: Labels tensor, int32 - [batch_size].
    Returns:
        loss: Loss tensor of type float.
    """
    labels = tf.to_int64(labels)
    cross_entropy = tf.nn.sparse_softmax_cross_entropy_with_logits(
        labels=labels, logits=logits, name='xentropy')
    return tf.reduce_mean(cross_entropy, name='xentropy_mean')
```

```python
tf.summary.scalar('loss', loss)
global_step = tf.Variable(0, name='global_step', trainable=False)  # Variable的trainable参数
```

```python
correct = tf.nn.in_top_k(logits, labels, 1)  # 返回一个bool tensor, 形状为 [batch_size] , 如果example的label在logits的top K(K = 1)内, 则返回True
return tf.reduce_sum(tf.cast(correct, tf.int32))  # 返回预测正确的样例数
```


### fully\_connected\_feed.py

py2&py3

```python
from six.moves import xrange
```

利用一个FLAG变量来承载各种超参数

```python
# Build the summary Tensor based on the TF collection of Summaries.
summary = tf.summary.merge_all()
# Instantiate a SummaryWriter to output summaries and the Graph.
summary_writer = tf.summary.FileWriter(FLAGS.log_dir, sess.graph)

# Update the events file.
summary_str = sess.run(summary, feed_dict=feed_dict)
summary_writer.add_summary(summary_str, step)
summary_writer.flush()

# Create a saver for writing training checkpoints.
saver = tf.train.Saver()
saver.save(sess, checkpoint_file, global_step=step)
```

main()函数
```python
def main(_):
    if tf.gfile.Exists(FLAGS.log_dir):
        tf.gfile.DeleteRecursively(FLAGS.log_dir)
    tf.gfile.MakeDirs(FLAGS.log_dir)
    run_training()
```

parser解析参数

```python
parser = argparse.ArgumentParser()
parser.add_argument(
    '--learning_rate',
    type=float,
    default=0.01,
    help='Initial learning rate.'
)

...

FLAGS, unparsed = parser.parse_known_args()
tf.app.run(main=main, argv=[sys.argv[0]] + unparsed)

```

# tf.estimator使用

dataset: Iris data set, 包含150行数据,三种相近的花每种各50个样例.拆分为training set(120) + test set(30), 存储为csv格式.

将csv文件读取为`Dataset`

```python
training_set = tf.contrib.learn.datasets.base.load_csv_with_header(
    filename=IRIS_TRAINING,
    target_dtype=np.int,
    features_dtype=np.float32
)

```

Datasets是named tuples,可以使用data或者target域来获取feature data和target values.

DNN Estimator

```python
# Specify that all features have real-value data
feature_columns = [tf.feature_column.numeric_column("x", shape=[4])]

# Build 3 layer DNN with 10, 20, 10 units respectively.
classifier = tf.estimator.DNNClassifier(feature_columns=feature_columns,
                                        hidden_units=[10, 20, 10],
                                        n_classes=3,
                                        model_dir="/tmp/iris_model")
```

model_dir: 用来存储checkpoint和TensorBoard的summaries数据的目录

tf.estimator使用input functions, 它创建了可以为模型产生数据的tensorflow操作,对于numpy的输入,我们这样构建输入函数,产生input pipeline

```python
train_input_fn = tf.estimator.inputs.numpy_input_fn(
    x={"x": np.array(training_set.data)},
    y=np.array(training_set.target),
    num_epochs=None,
    shuffle=True)
```

train the model

使用estimator的train()方法

```python
classifier.train(input_fn=train_input_fn, steps=2000)
```

模型的状态被保存在classifier的内部,因此你可以迭代多次来训练,下面的代码和上面的是等价的:

```python
classifier.train(input_fn=train_input_fn, steps=1000)
classifier.train(input_fn=train_input_fn, steps=1000)
```

如果想要跟踪模型的训练过程,可以使用`SessionRunHook`来记录日志.


evaluate模型, 使用evaluate()方法, 返回一个dict表示评估结果,

```python
# Define the test inputs
test_input_fn = tf.estimator.inputs.numpy_input_fn(
    x={"x": np.array(test_set.data)},
    y=np.array(test_set.target),
    num_epochs=1,
    shuffle=False)

# Evaluate accuracy.
accuracy_score = classifier.evaluate(input_fn=test_input_fn)["accuracy"]
```

返回的dict类似下面:

```python
{'accuracy': 0.96666664, 'average_loss': 0.061526418, 'loss': 1.8457925, 'global_step': 2000}
```

分类新的样例,使用estimator的predict()方法,返回一个dicts的generator,很容易转换为一个list,

```python
new_samples = np.array(
    [[6.4, 3.2, 4.5, 1.5],
     [5.8, 3.1, 5.0, 1.7]], dtype=np.float32)
predict_input_fn = tf.estimator.inputs.numpy_input_fn(
    x={"x": new_samples},
    num_epochs=1,
    shuffle=False)

predictions = list(classifier.predict(input_fn=predict_input_fn))
predicted_classes = [p["classes"] for p in predictions]

print(
    "New Samples, Class Predictions:    {}\n"
    .format(predicted_classes))
```

# Building Input Function with tf.estimator

input\_fn函数被用来给train,evaluate,predict方法传递feature和target数据,我们可以在input\_fn里面做一些feature engineering或者pre-processing


## 一个input_fn的结构

```python
def my_input_fn():

    # Preprocess your data here...

    # ...then return 1) a mapping of feature columns to Tensors with
    # the corresponding feature data, and 2) a Tensor containing labels
    return feature_cols, labels
```

* feature_cols: 一个包含key/value对的dict,将feature column的名字names映射到包含对应的feature数据的Tensors(或者SparseTensors).

* labels: 一个Tensor,包含label/target值(你的模型所要预测的值).

可以利用内置函数,将python array/numpy arrays/pandas dataframes等的feature/label data构造为input_fn:

如下所示:

```python
import numpy as np
# numpy input_fn.
my_input_fn = tf.estimator.inputs.numpy_input_fn(
    x={"x": np.array(x_data)},
    y=np.array(y_data),
    ...)
import pandas as pd
# pandas input_fn.
my_input_fn = tf.estimator.inputs.pandas_input_fn(
    x=pd.DataFrame({"x": x_data}),
    y=pd.Series(y_data),
    ...)
```

对于稀疏的类别数据(大部分是0),你可能想要用SparseTensor,它可以用以下3个参数来实例化.

1. dense_shape 一个指示shape的list
2. indices 包含非零元素的位置的list, 如[[1,3],[2,4]]
3. values 一个1D tensor,和indices相对应的非零值

eg: 定义一个3行5列的SparseTensor,且只有[0,1]位置元素为6, [2,4]位置元素为0.5, 其他位置元素都是0

```python
sparse_tensor = tf.SparseTensor(indices=[[0,1], [2,4]],
                                values=[6, 0.5],
                                dense_shape=[3, 5])
```

## Passing input_fn Data to Your Model

将my\_input_function传入estimator的train方法的`input_fn`即可.

```python
classifier.train(input_fn=my_input_function, steps=2000)
```

可以利用wrapper来包装input_fn为不带任何参数的函数,然后再在内部利用你想要的参数调用真正的input function


```python
def my_input_fn(data_set):
  ...

def my_input_fn_training_set():
  return my_input_fn(training_set)

classifier.train(input_fn=my_input_fn_training_set, steps=2000)
```

或者利用python的`functools.partial`函数

```python
classifier.train(
    input_fn=functools.partial(my_input_fn, data_set=training_set),
    steps=2000)
```

第三种方法利用lambda函数包装input_fn

```python
classifier.train(input_fn=lambda: my_input_fn(training_set), steps=2000)
```

## 预测Boston房价


设置logging verbosity为INFO,显示更加详细的日志输出.


```python
tf.logging.set_verbosity(tf.logging.INFO)
```

读取csv文件为pandas.DataFrame

```python
training_set = pd.read_csv("boston_train.csv", skipinitialspace=True,
                           skiprows=1, names=COLUMNS)
```

构造featureColumn的list

```python
feature_cols = [tf.feature_column.numeric_column(k) for k in FEATURES]
```

实例化DNNRegressor
```python
regressor = tf.estimator.DNNRegressor(feature_columns=feature_cols,
                                      hidden_units=[10, 10],
                                      model_dir="/tmp/boston_model")
```

构造input_fn

```python
def get_input_fn(data_set, num_epochs=None, shuffle=True):
  return tf.estimator.inputs.pandas_input_fn(
      x=pd.DataFrame({k: data_set[k].values for k in FEATURES}),
      y = pd.Series(data_set[LABEL].values),
      num_epochs=num_epochs,
      shuffle=shuffle)
```

对于training set, num_epochs设置为None,这样input\_fn就能够一直取数据,直到需要的train steps到达为止; shuffle=True.

对于evaluating 和 predicting set, 设置为1,这样input_fn迭代完一次数据之后就会抛出`OutOfRangeError`,这个错误将会通知Estimator停止evaluate或者predict. shuffle=False.



训练模型

```python
regressor.train(input_fn=get_input_fn(training_set), steps=5000)
```


预测模型

```python
y = regressor.predict(
    input_fn=get_input_fn(prediction_set, num_epochs=1, shuffle=False))
# .predict() returns an iterator of dicts; convert to a list and print
# predictions
predictions = list(p["predictions"] for p in itertools.islice(y, 6))
print("Predictions: {}".format(str(predictions)))
```

itertools.islice 创建一个迭代器,返回的是切片方式

# TensorBoard


## summary operations

`tf.summary.scalar`
`tf.summary.histogram`

`tf.summary.merge_all` 把所有的summary操作结合为1个单操作来产生所有的summary data.

运行merged summary操作会产生一个序列化的Summary Protobuf对象,将其写入硬盘,将这个summary protobuf传入`tf.summary.FileWriter`.

`tf.summary.FileWriter`接受一个logdir,存储events文件,可选接受一个Graph参数,如果接受了Graph参数,TensorBoard将能够可视化你的Graph(带有各种Tensor的shape信息)


FileWriter写入信息: `train_writer.add_summary(summary,i)`, 其中summary是merged Op的output, i是iter次数


## 启动TB

```bash
tensorboard --logdir=path/to/log-directory
```

其中log-directory包含FileWriter写出的序列化数据,如果log-directory下面还有子文件夹也包括不同次runs之间的序列化数据,那么TB会全部展示.

进入`localhost:6006`查看TensorBoard.

# Programmer'Guide

## Estimator

Estimator帮你建立了Graph和管理Session,你不需要再建立Graph,手动管理Session.

DNNClassifier: dense, feed_forward neural networks

```python
median_education = tf.feature_column.numeric_column('median_education',
                    normalizer_fn='lambda x: x - global_education_mean')`
```

将Keras中已编译的model转换为tf的estimators,使用`tf.keras.estimator.model_to_estimator`.


## Tensors

Tensor的属性:

1. a data type
2. a shape

每个Tensor中的元素都有相同的已知的数据类型,shape信息可能部分知道.

某些类型的tensor是特别的,比如`tf.Variable` \ `tf.Constant` \ `tf.Placeholder`, `tf.SparseTensor` ...

除了Variable,Tensor的值都是不可改变的

### Rank

rank0


`mammal = tf.Variable("Elephant", tf.string)`
`its_complicated = tf.Variable((12.3, -4.85), tf.complex64)`

注意一个string在TF中被看做是一个single item,而不是字符序列.


4维Tensor很常用,一般是[example-in-batch, image height, image width, color channel]

#### 获取一个Tensor的rank

`r = tf.rank(my3d)`

### 切片

对于rank 0 tensor, 不需要indices即可访问
对于rank 1 tensor, 需要传入一个下标 或者是 一个scalar tf.Tensor 
对于rank 2 tensor, 需要传入两个下标, 用逗号分割

类似于numpy

### Shape

0D的shape为[]
nD的shape为[D0, D1, ... , Dn-1]

shape可以被表示为list/tuples of ints,或者tf.TensorShape对象

#### 获取shape

有两种方式

1. 在构建图时,可以直接读取Tensor的shape属性来得到部分已知的shape信息(TensorShape对象)
2. 在运行时,调用`tf.shape`操作,可以返回一个完全已知的Tensor的shape信息(存储为另一个Tensor对象)

ex:

```python
zeros = tf.zeros(tf.shape(my_matrix)[1])
```

#### 改变shape

利用`tf.reshape`操作

```python
rank_three_tensor = tf.ones([3, 4, 5])
matrix = tf.reshape(rank_three_tensor, [6, 10])
matrixB = tf.reshape(matrix, [3, -1])   # -1 表示 自动推断 3x20
```


### Data Types

可以序列化任意的数据结构为strings,然后把其存储入tf.Tensors

```python
float_tensor = tf.cast(tf.constant([1,2,3]), dtype=tf.float32)
```

查看一个Tensor的data type, 使用Tensor.dtype属性

当从一个python object创建tensor时, 你可以手动指定datatype, 否则TF会自动选择一个可以表示你的数据的datatype, 例如,TF会把python的integer转换为tf.int32类型, 把python的浮点数转换为tf.float32类型, 其它情况TF采用和numpy在转换arrays时相同的转换规则.

### Evaluating Tensors

1. 使用`Tensor.eval(feed_dict={})`方法(当default session是active时), 返回一个numpy array
2. TF不能直接eval一个定义在函数内或者控制流结构内的tensor,当tf.Tensor依赖于一个来自queue的值时,如果没有元素enqueued,evaluating将会被hang, 当和queues有关时, 记得在eval任何tensors之前首先调用tf.train.start\_queue_runners

### Printing Tensors

由于之前为了抑制TF输出某些指令集未编译的警告信息, 在~/.zshrc中设置了环境变量`export TF_CPP_MIN_LOG_LEVEL=2`, 这会导致Print操作不能输出.

tf.Print的第一个参数会被原样返回, 第二个参数中的Tensor list中的tensor会被打印出来

```python
import tensorflow as tf
a = tf.constant(1.0)
a = tf.Print(a, [a], 'hi')
sess = tf.Session()
print(a.eval(session=sess))

```


## Variable

Variables are visible across multiple `tf.Session`s.

### Creating a Variable

best way is to call `tf.get_variable`

```python
my_variable = tf.get_variable("my_variable", [1,2,3])  # shape is [1,2,3]   default type is tf.float32   inital value will be randomized via tf.glorot_uniform_initializer

my_int_variable = tf.get_variable("my_int_variable", [1, 2, 3], dtype=tf.int32, 
initializer=tf.zeros_initializer)

# initialize to have the value of a tensor
# 不用指定shape, 因为init tensor的shape会被使用
other_variable = tf.get_variable("other_variable", dtype=tf.int32, 
  initializer=tf.constant([23, 42]))
```


### Variable Collections

collections: named lists of tensors or other objects(such as Variable instances)

默认,tf.Variable会被放在以下两个collections中:

1. tf.GraphKeys.GLOBAL_VARIABLES    可以被多个设备共享的变量
2. tf.GraphKeys.TRAINABLE_VARIABLES  TF将要计算梯度的变量

如果你不想让某个变量可训练,将其添加入`tf.GraphKeys.LOCAL_VARIABLES`

```python
my_local = tf.get_variable("my_local", shape=(), collections=[tf.GraphKeys.LOCAL_VARIABLES])
my_non_trainable = tf.get_variable("my_non_trainable",shape=(),trainable=False)

# 使用自己的collections, 任意string都是合法的collection name, 不必显式创建collection
tf.add_to_collection("my_collection_name", my_local)

# retrieve all vars in a collection
tf.get_collection("my_collection_name")

print (type(tf.GraphKeys.GLOBAL_VARIABLES))  # <class 'str'>  
```

一个tensor可以被加入多个collections

### Device Placement

将variables放入特定的devices

创建变量v,并放入第2个GPU设备:

```python
with tf.device("/device:GPU:1"):
    v = tf.get_variable("v",[1])
```

将变量放入正确的设备十分重要,如果不小心把变量放入workers而不是parameter servers,将会严重的降低训练效率,可以使用`tf.train.replica_device_setter`自动分配变量到param servers.

```python
# ps代表parameter servers
cluster_spec = {
    "ps": ["ps0:2222", "ps1:2222"],
    "worker": ["worker0:2222", "worker1:2222", "worker2:2222"]}
with tf.device(tf.train.replica_device_setter(cluster=cluster_spec)):
  v = tf.get_variable("v", shape=[20, 20])  # this variable is placed 
                                            # in the parameter server
                                            # by the replica_device_setter

```

### Initializing Variables

`tf.global_variables_initializer()` 返回单个op来初始化所有的变量(在GLOBAL_VARIABLES collection中的)

如果需要手动初始化,运行变量的initializer操作

`session.run(my_variable.initializer)`

查看所有尚未初始化的变量
```python
print(session.run(tf.report_uninitialized_variables()))
```

注意, global\_variable_initializer()没有指定变量初始化的顺序, 如果一个变量的初始值依赖于另一个变量的值,可能会出错.当你需要用一个可能没有初始化好的变量作为另一个变量的初始值时,最好使用`variable.initialized_value()`而不是`variable`.

```python
v = tf.get_variable("v", shape=(), initializer=tf.zeros_initializer())
w = tf.get_variable("w", initializer=v.initialized_value() + 1)
```

### Using Variables

当做一个普通的tensor使用即可, 任何时候当一个变量被用在一个表达式中时,它会自动转换为能代表它值的tf.Tensor.

对变量赋值, 使用`assign`,`assign_add`和tf.Variable类的友元.

```python
assignment = v.assign_add(1)
assignment.eval()  # 执行+=操作 v = 1
```

在某些操作完成后,强制重新读取变量的值
```python
v = tf.get_variable("v", shape=(), initializer=tf.zeros_initializer())
assignment = v.assign_add(1)
with tf.control_dependencies([assignment]):
  w = v.read_value()  # w is guaranteed to reflect v's value after the
                      # assign_add operation.
```

### Sharing Variables

TF支持两种方式来共享变量:

1. 显式传递tf.Variable对象
2. 隐式用tf.variable_scope来包装tf.Variable对象

```python
def conv_relu(input, kernel_shape, bias_shape):
    # Create variable named "weights".
    weights = tf.get_variable("weights", kernel_shape,
        initializer=tf.random_normal_initializer())
    # Create variable named "biases".
    biases = tf.get_variable("biases", bias_shape,
        initializer=tf.constant_initializer(0.0))
    conv = tf.nn.conv2d(input, weights,
        strides=[1, 1, 1, 1], padding='SAME')
    return tf.nn.relu(conv + biases)
```

```python
input1 = tf.random_normal([1,10,10,32])
input2 = tf.random_normal([1,20,20,32])
x = conv_relu(input1, kernel_shape=[5, 5, 32, 32], bias_shape=[32])
x = conv_relu(x, kernel_shape=[5, 5, 32, 32], bias_shape = [32])  # This fails. 不清楚是创建新的变量还是重用已有变量
```

```python
def my_image_filter(input_images):
    with tf.variable_scope("conv1"):
        # Variables created here will be named "conv1/weights", "conv1/biases".
        relu1 = conv_relu(input_images, [5, 5, 32, 32], [32])
    with tf.variable_scope("conv2"):
        # Variables created here will be named "conv2/weights", "conv2/biases".
        return conv_relu(relu1, [5, 5, 32, 32], [32])
```


如果确实想share vars, 有两种方式:

1. 创建一个同名的scope,并设置reuse=True
```python
ith tf.variable_scope("model"):
  output1 = my_image_filter(input1)
with tf.variable_scope("model", reuse=True):
  output2 = my_image_filter(input2)

```

2. 调用scope.reuse_variables()来触发reuse.

```python
with tf.variable_scope("model") as scope:
  output1 = my_image_filter(input1)
  scope.reuse_variables()
  output2 = my_image_filter(input2)
```

可以用另一个scope来初始化variable_scope
```python
with tf.variable_scope("model") as scope:
  output1 = my_image_filter(input1)
with tf.variable_scope(scope, reuse=True):
  output2 = my_image_filter(input2)
```

## Graph and Sessions

### Why Dataflow Graphs?


![](https://www.tensorflow.org/images/tensors_flowing.gif?hl=zh-cn)

1. 并行
2. 分布执行
3. 便于编译优化
4. 可移植性

### tf.Graph

一个tf.Graph包含了两类相关信息:

1. 图的结构

2. 图的collections (tf.GraphKeys, tf.add\_to_collection, tf.get\_collection)

当创建一个tf.Variable时. 它默认被添加进'global variables'和'trainable variables',以便后续的tf.train.Saver或者tf.train.Optimizer使用作为默认的参数.

#### build a tf.Graph

TF提供了一个**默认图**,它是所有API的隐式的参数. 高级API会帮你管理default graph,并且可能会为training和evaluation创建不同的graphs.

#### naming operations

TF有两种方式来为Operations命名:

1. name参数,如`tf.constant(42.0, name="answer")`创建一个新的operation叫做"answer"并且返回一个tf.Tensor,叫做"answer:0", 如果已经有叫"answer"的操作了,则会在后面添加"\_1","\_2"来保证名字的唯一.
2. 使用tf.name_scope函数,在其中定义的operations都会添加前缀name\_scope/,如果重名,添加"\_1"等...

类似于目录的层次结构

```python
with tf.name_scope("outer"):
    c_2 = tf.constant(2,name="c")
    print(c_2)
    with tf.name_scope("inner"):
        c_3 = tf.constant(3,name="c")
        print(c_3)
    c_4 = tf.constant(4,name="c")
    print(c_4)
    with tf.name_scope("inner"):   #再次进入, 会创建新的inner_1
        c_5 = tf.constant(5,name="c")
        print(c_5)
```

输出

```python
Tensor("outer/c:0", shape=(), dtype=int32)
Tensor("outer/inner/c:0", shape=(), dtype=int32)
Tensor("outer/c_1:0", shape=(), dtype=int32)
Tensor("outer/inner_1/c:0", shape=(), dtype=int32)
```


graph visualizer会利用name_scopes将operations分组显示.

注意tf.Tensor的名字会被隐式定义为输出该Tensor的Operation的名字(OP_NAME)和该tensor的输出的index(i)
有这样的形式: "<OP_NAME>:\<i\>"

### Device

device specification:

`/job:<JOB_NAME>/task:<TASK_INDEX>/device:<DEVICE_TYPE>:<DEVICE_INDEX>`

JOB_NAME: JOB名, 数字字母组成,不能数字开头
DEVICE_TYPE: 一个注册的设备类型, 如CPU GPU等
TASK_INDEX: 非负整数, 代表该TASK在JOB\_NAME的index
DEVICE_INDEX: 非负整数, 代表device的index, 比如区分不同的GPU设备.

不必全部指定

```python
# Operations created outside either context will run on the "best possible"
# device. For example, if you have a GPU and a CPU available, and the operation
# has a GPU implementation, TensorFlow will choose the GPU.
weights = tf.random_normal(...)

with tf.device("/device:CPU:0"):
  # Operations created in this context will be pinned to the CPU.
  img = tf.decode_jpeg(tf.read_file("img.jpg"))

with tf.device("/device:GPU:0"):
  # Operations created in this context will be pinned to the GPU.
  result = tf.matmul(weights, img)
```
### tensor-like objects

很多TF的Op都接受tf.Tensor作为参数,然而可以传递tensor-like object,会被隐式转换为一个tf.Tensor(利用tf.convert\_to_tensor方法),tensor-like objects包括如下类型:

1. tf.Tensor
2. tf.Variable
3. numpy.ndarray
4. list(或者是tensor-like objects的list)
5. scalar python types: bool float int str 

用`tf.register_tensor_conversion_function`来注册更多的TLO对象.

*注意: 每次TF都会创建新的tf.Tensor对象, 如果TLO很大, 可以手动先调用tf.convert\_to_tensor,再利用返回的tf.Tensor对象.*



### Executing a graph in tf.Session

client program: python and other langs
runtime: C++

Session对象提供了访问设备(本地\远程)的能力,缓存了tf.Graph的信息以便你可以高效运行多次相同的计算.

#### Creating a tf.Session

```python
# create a default in-process session
with tf.Session() as sess:
    # ...

# Create a remote session.
with tf.Session("grpc://example.org:2222"):
  # ...
```

Session().\_\_init\_\_接受3个可选参数:

1. target 如果为空(default),则只使用本地机器的设备, 如果指定一个grpc://URL来表明一个TF server的地址,则给了session访问所有该server控制的设备的能力.

2. graph 默认会绑定到当前默认图,如果有多个图,可以显式指定tf.Graph
3. config 制定一个tf.ConfigProto, 它控制session的行为,一些配置选项包括 allow\_soft\_placement(会自动将CPU-only的操作从tf.device指定的GPU移动到CPU上), cluster\_def(用于分布式TF), graph\_options.optimizer_options, gpu\_options.allow\_growth(允许GPU显存动态增长还是一开始就申请好)

#### Using tf.Session.run to execute operations

需要指定a list of fetches,其决定了返回值, 可以fetch tf.Op, tf.Tensor, TLO(such as tf.Variable).
这些fetches决定了需要计算的subgraph

run 接受feeds参数
run 还接受一个options参数和run_metadata参数


```python
y = tf.matmul([[37.0, -23.0], [1.0, 4.0]], tf.random_uniform([2, 2]))

with tf.Session() as sess:
  # Define options for the `sess.run()` call.
  options = tf.RunOptions()
  options.output_partition_graphs = True
  options.trace_level = tf.RunOptions.FULL_TRACE

  # Define a container for the returned metadata.
  metadata = tf.RunMetadata()

  sess.run(y, options=options, run_metadata=metadata)

  # Print the subgraphs that executed on each device.
  print(metadata.partition_graphs)

  # Print the timings of each operation that executed.
  print(metadata.step_stats)

```

#### Multiple Graphs

安装某个tf.Graph作为默认Graph, 使用 `tf.Graph.as_default` context manager

```python
g_1 = tf.Graph()
with g_1.as_default():
  # Operations created in this scope will be added to `g_1`.
  c = tf.constant("Node in g_1")

  # Sessions created in this scope will run operations from `g_1`.
  sess_1 = tf.Session()

g_2 = tf.Graph()
with g_2.as_default():
  # Operations created in this scope will be added to `g_2`.
  d = tf.constant("Node in g_2")

# Alternatively, you can pass a graph when constructing a `tf.Session`:
# `sess_2` will run operations from `g_2`.
sess_2 = tf.Session(graph=g_2)

assert c.graph is g_1
assert sess_1.graph is g_1

assert d.graph is g_2
assert sess_2.graph is g_2
```

查看当前默认graph, 调用`tf.get_default_graph`,返回一个tf.Graph对象

```python
# Print all of the operations in the default graph.
g = tf.get_default_graph()
print(g.get_operations())
```

## Saving and Restoring

tf.train.Saver提供了保存和恢复模型的能力, 它为指定的/全部的变量添加了save和restore Ops到Graph.

TF将变量存储为二进制的**checkpoint files**,它把variable names map 到 tensor values.

### Saving Variables


```python
# Create some variables.
v1 = tf.get_variable("v1", shape=[3], initializer = tf.zeros_initializer)
v2 = tf.get_variable("v2", shape=[5], initializer = tf.zeros_initializer)

inc_v1 = v1.assign(v1+1)
dec_v2 = v2.assign(v2-1)

# Add an op to initialize the variables.
init_op = tf.global_variables_initializer()

# Add ops to save and restore all the variables.
saver = tf.train.Saver()

# Later, launch the model, initialize the variables, do some work, and save the
# variables to disk.
with tf.Session() as sess:
  sess.run(init_op)
  # Do some work with the model.
  inc_v1.op.run()
  dec_v2.op.run()
  # Save the variables to disk.
  save_path = saver.save(sess, "/tmp/model.ckpt")
  print("Model saved in file: %s" % save_path)
```

### Restoring Variables

```python
tf.reset_default_graph()

# Create some variables.
v1 = tf.get_variable("v1", shape=[3])
v2 = tf.get_variable("v2", shape=[5])

# Add ops to save and restore all the variables.
saver = tf.train.Saver()

# Later, launch the model, use the saver to restore variables from disk, and
# do some work with the model.
with tf.Session() as sess:
  # Restore variables from disk.
  saver.restore(sess, "/tmp/model.ckpt")
  print("Model restored.")
  # Check the values of the variables
  print("v1 : %s" % v1.eval())
  print("v2 : %s" % v2.eval())
```


### Choosing which variables to save and restore

传递给tf.train.Saver()的构造函数以下内容:

1. 变量的list(它们将会被按照自己的名字保存)
2. python的dict,其中Keys是要使用的名字, Values是变量

```python
tf.reset_default_graph()
# Create some variables.
v1 = tf.get_variable("v1", [3], initializer = tf.zeros_initializer)
v2 = tf.get_variable("v2", [5], initializer = tf.zeros_initializer)

# Add ops to save and restore only `v2` using the name "v2"
saver = tf.train.Saver({"v2": v2})

# Use the saver object normally after that.
with tf.Session() as sess:
  # Initialize v1 since the saver will not.
  v1.initializer.run()
  saver.restore(sess, "/tmp/model.ckpt")

  print("v1 : %s" % v1.eval())
  print("v2 : %s" % v2.eval())
```

注意: 未被restore的变量必须initialized

可以使用`print_tensors_in_checkpoint_file`来查看checkpoint_file文件的内容, 参考[这里](https://stackoverflow.com/questions/41867191/how-does-one-inspect-variables-in-a-checkpoint-file-in-tensorflow-when-tensorflo).

---

