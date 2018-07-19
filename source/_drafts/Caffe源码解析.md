---
title: Caffe源码解析
pid: Caffe源码解析
categories:
  - 深度学习
tags: [Caffe, source code]
date: 2018-03-02 18:20:02
---

[Caffe](https://github.com/BVLC/caffe)是贾扬清在UC Berkeley读phD期间首先创建的深度学习框架项目, 随后被BAIR(Berkeley AI Research)和社区贡献者一同贡献发展. 它是一门兼具表达力,速度和模块性的优秀的框架. 
  其核心代码主要由C++写成, 提供python(pycaffe)和matlab(matcaffe)接口.
<!-- more -->

## 数据交换接口

使用Google Protobuf作为序列化标准, 定义一个proto文本文件, 其中描述了多个message结构的格式, 可以通过多种语言的编译工具将其编译为对应语言的代码描述, 其提供了多种序列化和访问成员数据的API接口.
  如将其编译为c++文件, 使用如下命令:

    protoc --cpp_out="." ./addressbook.proto 

  生成了xxxx.pb.cc和xxxx.pb.h两个文件, 其中h文件是包含了自动生成类的声明, cc文件包含了对应类的实现代码.

  编译使用了xxxx.ph.h的C++代码:

    g++ WriteAMessage.cpp addressbook.pb.cc -lprotobuf -o WriteAMessage.o   

  
protobuf的语法有2个版本, 分别是proto2和proto3, caffe使用的是proto2,可以在第一行通过 `syntax = "proto2";` 来指定语法版本, 默认是2.

注释采用C++形式, 即//或/* */语法.

序列化/反序列化API:

 * bool SerializeToString(string* output) const: 使用string类型作为binary数据的container
 * bool ParseFromString(const string& data): 从给定的二进制data反序列化出message对象
 * bool SerializeToOstream(ostream* output): 序列化message到一个给定的C++ ostream
 * bool ParseFromIstream(istream* input): 从一个给定的C++ istream中反序列化(解析)出message对象

想要扩展功能, 不要继承generated classes, 包装它!

由于历史原因, 对于scalar数值类型的repeated fields的编码并不是最有效率的, 可以加入一个特殊的选项 `[packed=true]` 来保证新代码使用一个更有效率的编码方式, 比如:
   
    repeated int32 samples = 4 [packed=true];


```cpp
syntax = "proto2";

package tutorial;  // 防止命名冲突, C++会编译为一个namespace

// 一个message是很多有类型的域的集合, 类似于structure
// 很多常用的简单数据类型: bool, int32, float, double, string, 其他message类型, enum类型等
message Person {
    // 1~15 少用1个字节, 尽量用在常用的或者repeated元素上, repeated域的每个元素都需重新编码tag, 所以小tag优化尤其适合repeated field
  // modifier 
  // required: must be provided, otherwise uninitialized
  // optional: may or not be set, 如果没有设置, 则default value被设置, 类似于PhoneNumber的type field, 否则, 系统默认值为: 数值类型为0, 空字符串 for strings, false for bools. 
  // 如果嵌套的message, 默认值是default instance(每个field都没有设置)
  // repeated: 重复任意次(包含0), 可以看做动态数组
  required string name = 1;  // = 1 在二进制编码中, 该域使用的用来标识自己的唯一的tag
  required int32 id = 2;
  optional string email = 3;

// 枚举类型 
  enum PhoneType {
    MOBILE = 0;
    HOME = 1;
    WORK = 2;
  }
  // 内嵌message定义也可以
  message PhoneNumber {
    required string number = 1;
    optional PhoneType type = 2 [default = HOME];
  }

  repeated PhoneNumber phones = 4;
}

message AddressBook {
  repeated Person people = 1;
}
```

Caffe的所有数据结构都定义在<span class="id">src/caffe/proto/caffe.proto</span>文件中.
protocol buffers不仅能被序列化到binary format, 而且也能被序列化为text format, 可以使用 `google::protobuf::TextFormat::ParseFromString(fileContent, &message)` 来解析.
caffe中使用的模型文件caffemodel和状态记录文件solverstate就是protobuf的bianry format file, 而网络配置文件prototxt就是protobuf的text format file, 