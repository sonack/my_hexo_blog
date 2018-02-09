---
title: CS20SI-Tensorflow for Deep Learning Research
pid: CS20SI-Tensorflow for Deep Learning Research
categories:
  - courses
  - tensorflow
tags: [tensorflow]
date: 2017-11-23 13:27:07
---


![](http://nlp.stanford.edu/sentiment/images/nlp-logo.gif)
<center>
    斯坦福大学 CS 20SI课程 Tensorflow for Deep Learning Research
</center>

<!-- more -->



---


# Lecture 0 Environment SetUp

推荐使用 Cloud Service [COCALC](https://cocalc.com/)

# Lecture 1 Overview of Tensorflow

Tensorflow将原型设计与生产部署都兼顾到了,兼具灵活性与稳定性.

有一些简化TF使用的机制:

1. TF Learn(tf.contrib.learn): 帮助从scikit-learn迁移过来的用户来使用一行完成强大功能的简化接口
2. TF Slim(tf.contrib.slim): 简化复杂模型的定义,训练和评估的轻量级Tensorflow库
3. 高级别的API: 如Keras, TFLearn(与 TF Learn 不同), Pretty Tensor等


## Data Flow Graphs

TF 通过 Data Flow Graph 将计算的 "定义" 和 "执行" 分离开来

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-23%2013-36-03%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

一般我们需要两个阶段的工作:

1. 阶段1需要搭建一个Graph
2. 阶段2使用一个Session来执行Graph中的Operations

## What is a tensor?

一个n维数组

0-d: scalar
1-d: vector
2-d: matrix
and so on

TF自动命名nodes

nodes一般是operations, variables, and constants
edges一般是tensors

tensors are data (data flow --> tensor flow)


## Session

A Session encapsulates the environments in which Operation Objects are executed, and Tensor Objects are evaluated.
The Session will also allocate memory to store the current value of the variable.

TF只会execute与fetch有关的subgraph

fetch可以是一个List

为啥要划分子图?
可能将图划分为几个部分, 然后并行运行

创建一个session, 配置config为log\_device_placement为True.

```python

sess = tf.Session(config = tf.ConfigProto(log_device_placement=True))
```

## More than 1 Graph?

you CAN, but you DO NOT NEED it! (The session runs the default graph)

1. Multiple graphs requires multiple sessions(each will try to use all available resources by default)
2. Can't pass data between them without passing them through python/numpy, which doesn't work in distributed
3. It's better to have disconnected subgraphs within one graph

```python
g = tf.Graph()
with g.as_default():
  x = tf.add(3,5)

sess = tf.Session(graph=g)

g = tf.get_default_graph()

```

## Why Graphs?

1. Save Computation(only run subgraphs that lead to the values you want to fetch)
2. Break computation into small, differential pieces to facilitates auto-differentiation
3. Facilitate distributed computation, spread the work across multiple CPUS, GPUS, or devices
4. Many common machine learning models are commonly taught and visualized as directed graphs already

# Lecture 2 Tensorflow Ops

## Basic operations

### Visualize it with tensorboard

```python
import tensorflow as tf
a = tf.constant(2)
b = tf.constant(3)
x = tf.add(a,b)
with tf.Session() as sess:
    writer = tf.summary.FileWriter("./serve/",sess.graph) # create the summary writer before running session and after graph definition
    print(sess.run(x))
writer.close() # close the writer when you're done using it
```

### explicitly name operations
```python
a = tf.constant(2, name="a")
b = tf.constant(3, name="b")
x = tf.add(a,b,name="add")
```

constants:

`tf.constant(value, dtype=None, shape=None, name="Const", verify_shape=False)`

### tensors filled with a specific value

`tf.zeros(shape, dtype=tf.float32, name=None)` 
创建shape形状的全零矩阵, 类似于numpy.zeros()


`tf.zeros_like(input_tensor, dtype=None, name=None, optimize=True)`
创建一个tensor, 其shape和dtype(除非指定)都和input_tensor相同, 但是全部元素都是0, 类似于numpy.zeros\_like()

`tf.ones(shape, dtype=tf.float32, name=None)`
`tf.ones_like(input_tensor, dtype=None, name=None, optimize=True)`

类似于numpy.ones(), numpy.ones_like()

`tf.fill(dims, value, name=None)`
创建一个tensor, 其被填充了一个scalar value
类似于numpy中的self.fill(value)

### constants as sequences

`tf.linspace(start, stop, num, name=None) # slightly different from np.linspace`
产生[10., 11., 12., 13.]
`tf.range(start, limit=None, delta=1, dtype=None, name='range')`

Tensor Objects are not Iterable

### Randomly Generated Constants

```python
tf.random_normal(shape, mean=0.0, stddev=1.0, dtype=tf.float32, seed=None, name=None)
tf.truncated_normal(shape, mean=0.0, stddev=1.0, dtype=tf.float32, seed=None, name=None)

tf.random_uniform(shape, minval=0, maxval=None, dtype=tf.float32, seed=None, name=None)
tf.random_shuffle(value, seed=None, name=None)
tf.random_crop(value, size, seed=None, name=None)
tf.multinomial(logits, num_samples, seed=None, name=None)
tf.random_gamma(shape, alpha, beta=None, dtype=tf.float32, seed=None, name=None)


tf.set_random_seed(seed)
```

### Operations

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-23%2014-41-46%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

`tf.add_n([a,b,b]) # 等价于 a + b + b`

tf.mul已经被改名为tf.multiply
tf.sub被改名为tf.subtract


### Print out the graph def

```python
my_const = tf.constant([1.0, 2.0], name="my_const")
with tf.Session() as sess:
    print (type(sess.graph.as_graph_def()))
    print (sess.graph.as_graph_def())
```

You will see value of my_const stored in the graph's definition
This makes loading graphs expensive when constants are big
so, only use constants for primitive types, Use variables or readers for more data that requires more memory

## Tensor types

TF也接受Python的原生类型: boolean, numeric(int,float), strings

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-23%2014-56-29%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

TF无缝集成了Numpy的类型, 比如 
`tf.int32==np.int32 # True`

对于Session.run(fetches), 如果fetches是一个Tensor,则输出一个numpy ndarray对象.

*注意: 不要使用Python Native的类型来构造Tensors, 因为TF必须要推断Python type*

Constants are stored in the graph definition.

### Variable?

Why tf.Variable but tf.constant?
Because tf.Variable is a class, but tf.constant is an op

tf.Variable holds several ops:

`x = tf.Variable(...)`

包含了 
`x.initializer` # init op
`x.value()` # read op
`x.assign()` # write op
`x.assign_add()` # and more

You have to initialize your variables

#### Initialize

initializing all variables at once

```python
init = tf.global_variables_initializer()
with tf.Session() as sess:
  sess.run(init)
```

initializing only a subset of variables

```python
init_ab = tf.variables_initializer([a, b], name="init_ab")
with tf.Session() as sess:
  sess.run(init_ab)
```

initializing a single variable

```python
W = tf.Variable(tf.zeros([784,10]))
with tf.Session() as sess:
  sess.run(W.initializer)

```


### Eval() a variable

当和assign_op搭配使用时,不必初始化变量,因为assign中为你做了initialization.
实际上, initializer op就是一个assign op, 它把变量的初始值assign到变量自己.


```python
tf.reset_default_graph()
my_var = tf.Variable(2, name="my_var")

my_var_times_two = my_var.assign(2 * my_var)

with tf.Session() as sess:
    print(sess.run(my_var.initializer))
    print(sess.run(my_var_times_two))  # 4
    print(sess.run(my_var_times_two))  # 8
    print(sess.run(my_var_times_two))  # 16

```
每次fetch assign\_op, 都会导致 my_var * 2 被assign给 my\_var.


assign_add() and assign\_sub() 不能帮你自动初始化variable, 因为这些操作本身就需要variable的初始值.


### Each Session maintains its own copy of variable.

```python
W = tf.Variable(10)

sess1 = tf.Session()
sess2 = tf.Session()

sess1.run(W.initializer)
sess2.run(W.initializer)

print(sess1.run(W.assign_add(10)))   # >> 20
print(sess2.run(W.assign_sub(2)))   # >> 8

```

### Use a variable to initialize another variable

```python
W = tf.Variable(tf.truncated_normal([700,10]))
U = tf.Variable(2 * W)      # Not so safe(but quite common)
U = tf.Variable(2 * W.initialized_value())  # ensure that W is initialized before its value is used to initialize U   Safer!
```

### Session vs InteractiveSession

The only difference is an InteractiveSession makes itself the default

### Control Dependencies

```python
# define which ops should be run first

# your graph g have 5 ops: a b c d e
with g.control_dependencies([a,b,c]):
  # d and e will only run after a b c have executed
  d = ...
  e = ...
```

## Placeholder and feeding inputs

Our Clients can later supply their own data when they need to execute the computation.

`tf.placeholder(dtype, shape=None, name=None)`


### Feed the values to placeholders using a dictionary

`{a:[1,2,3]}    # tensor a is the key, not the string 'a'`

`shape=None` means tensor of any shape will be accepted as value for placeholder. 

shape=None
1. It is easy to construct graphs, but nightmarish for debugging.
2. Also breaks all following shape inference, which makes many ops not work because they expect certain rank.


#### What if want to feed multiple data points in?

method1: feed all the values in, one at one time
```python
with tf.Session() as sess:
  for a_value in list_of_values_for_a:
    print(sess.run(c, {a:a_value}))
```

You can feed dict to any feedable tensor, placeholder is just a way to indicate that something must be fed.

```python
tf.Graph.is_feedable(graph,tensor)  # True iff tensor is feedable
```

#### Feeding values to TF ops
```python
a = tf.add(2, 5)
b = tf.multiply(a,3)

with tf.Session() as sess:
    replace_dict = {a:15}
    print(sess.run(b, feed_dict=replace_dict))   # >> 45  helpful for testing

```

## Lazy loading

The trap of lazy loading

### What's lazy loading?

lazy loading is defer creating/initializing an object until it is needed.

#### Normal loading
```python
x = tf.Variable(10, name="x")
y = tf.Variable(20, name="y")

z = tf.add(x,y)

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    writer = tf.summary.FileWriter("./serve/",sess.graph)
    for _ in range(10):
        sess.run(z)
    writer.close()
```

TensorBoard

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-23%2017-05-03%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


---

#### Lazy loading

```python
x = tf.Variable(10, name="x")
y = tf.Variable(20, name="y")

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    writer = tf.summary.FileWriter("./serve/12",sess.graph)
    for _ in range(10):
        print(sess.run(tf.add(x,y)))
    writer.close()
```
TensorBoard

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-23%2017-08-06%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)


Just missing the node Add, bad for reading graph, but not a bug.

Both give the same correct value of z!


For normal loading, "Add" node added once to the graph definition
For lazy loading, "Add~Add_9" nodes added 10 times to the graph definition

### Solution:

1. separate definition of ops from computing/running ops
2. using python property to ensure function is only loaded once the first time it is called

# Lecture 3 Linear and Logistic Regression

## Review

Constant values are stored in the graph definition
Sessions allocate memory to store variable values


## Linear Regression

How does tensorflow know what variables to update?
Session looks at all `trainable` variables that loss depends on and update them


在tf.Variable中有一个trainable参数

### List of optimizers in TF

* tf.train.GradientDescentOptimizer
* tf.train.AdagradOptimizer
* tf.train.MomentumOptimizer
* tf.train.AdamOptimizer
* tf.train.ProximalGradientDescentOptimizer  (proximal：最邻近的)
* tf.train.ProximalAdagradOptimizer
* tf.train.RMSPropOptimizer
And more ...


### How to improve our model?

Huber loss:

Intuition: if the difference between the predicted value and the real value is small, square it;
If it's large , just take its absolute value

It is robust to outliers.

Huber Loss:

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/21983befe82b2509d1bb8dfa1064a35b6031d508)
![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Huber_loss.svg/720px-Huber_loss.svg.png)

不能直接写　`if X - Y_predicted < delta:`
要用`tf.less`和`tf.select`, 代码如下:

```python
def huber_loss(labels, predictions, delta=1.0):
    residual = tf.abs(predictions - labels)
    condition = tf.less(residual, delta)
    small_res = 0.5 * tf.square(residual)
    large_res = delta * residual - 0.5 * tf.square(delta)
    return tf.select(condition, small_res, large_res)
```


## Logistic Regression

MNIST

process data

```python
from tensorflow.examples.tutorials.mnist import input_data
MNIST = input_data.read_data_sets("/data/mnist", one_hot = True)

MNIST.train # 55,000 examples
MNIST.validation # 5,000 examples
MNIST.test # 10,000 examples
```

Build model to predict Y

```python
logits = X * w + b
entropy = tf.nn.softmax_cross_entropy_with_logits(logits, Y)
loss = tf.reduce_mean(entropy)
tf.train.GradientDescentOptimizer(learning_rate=0.001).minimize(loss)
```


# Lecture 4 Structure your model


## Overall structure of a model in Tensorflow

### word embedding

* CBOW
* Skip-gram


#### Softmax vs Sample-based Approaches

Softmax: computationally expensive
Sample-based Approaches: Negative Sampling is a simplified version of NCE(Noise Contrastive Estimation)

but NCE guarantees approximation to softmax, NS doesn't.


`tf.embedding_lookup(params, ids, partition_strategy="mod", name=None, validate_indices=True, max_norm=None)`

NCE_loss: `tf.nn.nce_loss(weights, biases, labels, inputs, num_sampled, num_classes, ...)`

### name scope

Group nodes together

`with tf.name_scope(name)`

在TensorBoard中, 你可以发现有两种类型的线(solid & dotted lines), solid lines代表实实在在的数据流, 比如tf.add(x+y)依赖于x和y的数据; 而dotted lines代表control dependence, 比如一个变量必须要在init之后才能使用, 你可以看到变量依赖于op `init`,control dependencies也可以使用`tf.Graph.control_dependencies(control_input)`来声明,正如我们在lecture 2中所说的.

# Lecture 5 Manage Experiments

## tf.gradients
`tf.gradients(y,[xs])` 求y对[xs]中的每一个tensor的偏导数

```python
x = tf.Variable(2.0)
y = 2.0 * (x ** 3)
z = 3.0 + y ** 2
grad_z = tf.gradients(z, [x,y])
with tf.Session() as sess:
    sess.run(x.initializer)
    print(sess.run(grad_z))
```

## manage experiments


### save
`tf.train.Saver` : saves graph's variables in binary files
`tf.train.Saver.save(sess, save_path, global_step=None ...)`: save sessions, not graphs!

```python
# save parameters after 1000 steps
# define model
# create a saver object
saver = tf.train.Saver()
# launch a session to compute the graph
    with tf.Session() as sess:
        # actual training loop
        for step in range(training_steps):
            sess.run([optimizer])
            if (step + 1) % 1000==0:
            saver.save(sess, 'checkpoint_directory/model_name',global_step=model.global_step) # each saved step is a checkpoint
            # checkpoints map variable names to tensors
```


### 管理global step

```python
self.global_step = tf.Variable(0, dtype=tf.int32, trainable=False, name='global_step')  # very common in tf programs


self.optimizer = tf.train.GradientDescentOptimizer(self.lr).minimize(self.loss, global_step=self.global_step) # need to tell optimizer to increase global step
```
### restore

```python
saver.restore(sess, 'checkpoints/name_of_the_checkpoint')

# restore the latest checkpoint
ckpt = tf.train.get_checkpoint_state(os.path.dirname("checkpoints/checkpoint"))
if ckpt and ckpt.model_checkpoint_path: # ckpt keeps track of the latest checkpoint & safeguard to restore checkpoints only when there are checkpoints
    saver.restore(sess, ckpt.model_checkpoint_path) 

```
### tf.summary

why matplotlib when you can summarize?

Visualize our summary statistics during training

```python
tf.summary.scalar
tf.summary.histogram
tf.summary.image
```
### step1. create summaries

```python
with tf.name_scope("summaries"):
 tf.summary.scalar("loss", self.loss)
 tf.summary.scalar("accuracy", self.accuracy)
 tf.summary.histogram("histogram loss", self.loss)
 # merge them all
 self.summary_op = tf.summary.merge_all()
```

### step2. run them

```python
loss_batch, _, summary = sess.run([model.loss, model.optimizer,model.summary_op], feed_dict=feed_dict) # summaries are ops
```
### step3. write summaries to file

```python
writer.add_summary(summary, global_step=step)
```

### step4. see summaries on tensorboard

just so easy and beautiful!

## control randomization

### Op level random seed

`my_var = tf.Variable(tf.truncated_normal((-1.0,1.0), stddev=0.1, seed=0)`

Sessions keep track of random state

```python
c = tf.random_uniform([], -10, 10, seed=2)
with tf.Session() as sess:
    print sess.run(c) # >> 3.57493
    print sess.run(c) # >> -5.97319
----
c = tf.random_uniform([], -10, 10, seed=2)
with tf.Session() as sess:
    print sess.run(c) # >> 3.57493
with tf.Session() as sess:
    print sess.run(c) # >> 3.57493   # each new session restarts the random state
```

### Graph level seed

`tf.set_random_seed(seed)`

## Data Readers

readers allow us to load data directly into the worker process.

Ops that return different values every time you call them (Think Python’s generator)

## Different Readers for different file types

`tf.TextLineReader` : outputs the lines of a file delimited by newlines.(text files, csv files ... )

`tf.FixedLengthRecordReader` : outputs the entire file when all files have same fixed lengths. (each MNIST file has 28 x 28 pixels, CIFAR-10 32 x 32 x 3 )

`tf.WholeFileReader` : outputs the entire file content

`tf.TFRecordReader` : reads samples from TensorFlow’s own binary format (TFRecord)

`tf.ReaderBase` : to allow you to create your own readers

## read in files from queues

```python
filename_queue = tf.train.string_input_producer(["file0.csv", "file1.csv"])

reader = tf.TextLineReader()
key, value = reader.read(filename_queue)
```

`tf.FIFOQueue`

## Threads & Queues

You can use `tf.Coordinator` and `tf.QueueRunner` to manage your queues

```python
with tf.Session() as sess:
    # start populating the filename queue.
    coord = tf.train.Coordinator()
    threads = tf.train.start_queue_runners(coord=coord)
```

# Lecture 6,7 Convolutional Neural Network + Neural Style Transfer

## guest lecture by justin johnson

ILSVRC: Imagenet Large Scale Visual Recognition Challenge


* Image Classification
* Object Detection = What and Where = Recognition + Localization
* Object Segmentation 
* Pose Estimation
* Image Captioning: Normal/Dense
* Visual Question Answering
* Image Super-Resolution
* Generating Art



Guided Backprop vs. Gradient Ascent

Feature Inversion: 
Given a feature vector for an image, find a new image such that:
1. Its features are similar to the given features
2. It "looks natural" (image prior regularization)

Style Transfer = Feature Inversion + Texture Synthesis

## Convnets in Tensorflow

### convolution in maths and physics

a function derived from two given functions by integration that expresses how the shape of one is modified by the other.
一个函数在另一个函数上的加权叠加


we can use one single convolutional layer to modify a certain image.

### cnn in tensorflow
`tf.nn.conv2d(input, filter, strides, padding, use_cudnn_on_gpu=None, data_format=None, name=None)`

Input: [Batch Size, Height, Width, Channels]
Filter: [Height, Width, Input\_Channels, Output\_Channels] eg (5,5,3,64)
Strides: 4 elements' 1-D tensor, strides in each direction (often [1,1,1,1] or [1,2,2,1])
Padding: "SAME" or "VALID"
Data_format: default to NHWC

卷积后的width: (W-F+2P)/S+1

* W: input_width
* F: filter_width
* P: padding
* S: stride

CNN中常用的tensorflow函数:

```python
convolution: tf.nn.conv2d
relu: tf.nn.relu
max_pool: tf.nn.max_pool
fully connected: 
                tf.reshape # (flatten) 
                tf.matmul
softmax: tf.nn.softmax_cross_entropy_with_logits
```


### variable scope

```python
with tf.variable_scope('conv1') as scope:
    w = tf.get_variable('weights', [5, 5, 1, 32])
    b = tf.get_variable('biases', [32], initializer=tf.random_normal_initializer())
    conv = tf.nn.conv2d(images, w, strides=[1, 1, 1, 1],
    padding='SAME')
    conv1 = tf.nn.relu(conv + b, name=scope.name)

```

### autoencoder in tf

[TODO]

# Lecture 9 Tensorflow Input Pipeline


## Queues

tf.Session objects are designed to multithreaded ==> can run ops in parallel

Queues: Important Tensorflow Objects for computing tensors **asynchronously** in a graph

* multiple threads prepare training examples and push them in the queue
* a training thread executes a training op that dequeues mini-batches from the queue

1. All threads must be able to stop together
2. Exceptions must be caught and reported
3. Queues must be properly closed when stopping.

Queues can't run without proper threading, but threading isn't exactly pleasant in Python.


### tf.Coordinator and tf.train.QueueRunner

* QueueRunner
create a number of threads cooperating to enqueue tensors in the same queue

* Coordinator
help multiple threads stop together and report exceptions to a program that waits for them to stop

Queues:

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-26%2016-28-32%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

### create a queue

`tf.FIFOQueue(capacity, min_after_dequeue, dtypes, shapes=None, names=None ...)` same for other kinds of queues

eg:

```python
all_data = 10 * np.random.randn(N_SAMPLES, 4) + 1  # dummy data
all_target = np.random.randint(0, 2, size=N_SAMPLES)
queue = tf.FIFOQueue(capacity=50, dtypes=[tf.float32, tf.int32], shapes=[[4], []]) # create queue. dtypes specifies types of data and label. shapes specifies shape of data and label
enqueue_op = queue.enqueue_many([all_data, all_target]) # a common practice is to enqueue all data at once, but dequeue one by one
data_sample, label_sample = queue.dequeue()
qr = tf.train.QueueRunner(queue, [enqueue_op] * NUM_THREADS)
with tf.Session() as sess:
    # create a coordinator, launch the queue runner threads.
    coord = tf.train.Coordinator()
    enqueue_threads = qr.create_threads(sess, coord=coord, start=True)
    for step in xrange(100): # do to 100 iterations
        if coord.should_stop():
        break
        one_data, one_label = sess.run([data_sample, label_sample])  # You can use data_sample and label_sample to do all the training ops as if with placeholders
    coord.request_stop()
    coord.join(enqueue_threads)

```

### dequeue multiple elements?

只有`tf.PaddingFIFOQueue`才支持`dequeue_many`操作, 但可以使用`tf.train.batch`或`tf.train.shuffle_batch` if you want your batch to be shuffled.

## Data Readers

3 ways to read in data

1. through tf.constant (make everything a constant)  容易使Graph膨胀[NO]
2. feed dict    <span class="ic">storage->client->workers</span>  (slow when client and workers are on different machines)[MAYBE]
3. data readers <span class="ic">storage->worker</span> (readers allow us to load data directly into the worker process)

### Read in files from queues


```python
filename_queue = tf.train.string_input_producer(["file0.csv", "file1.csv"])
reader = tf.TextLineReader()
key, value = reader.read(filename_queue)
```

### TFRecord

Tensorflow's binary file format (a serialized tf.train.Example protobuf object)

# Lecture 11 RNNs in TensorFlow

## All about RNNs

### SRNN(Simple Recurrent Neural Network)

Introduced by Jeffrey Elman in 1990, known as Elman Network

In practice, RNNs aren’t very good at capturing long-term dependencies

### LSTM

not new, published in 1997.

### GRU

People find LSTMs work well, but unnecessarily complicated, so they introduced GRUs

# Lecture 12 Convolutional-GRU
[TODO]

# Lecture 13 Seq2seq with Attention
[TODO]

# Lecture 14 Reinforcement Learning in Tensorflow
[TODO]

---



