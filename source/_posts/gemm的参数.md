---
title: BLAS基础及GEMM的使用
pid: BLAS&GEMM
categories:
  - math
tags: [math,BLAS]
date: 2017-11-21 14:10:46
---

<center> 有关通用矩阵乘函数GEMM(<b>GE</b>neral <b>M</b>atrix <b>M</b>ultiply)的参数及其转置标志的说明. </center>


<br>

![BLAS](data:image/png;base64,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)

<!-- more -->

# BLAS

---

BLAS,即Basic Linear Algebra Subprograms,基础线性代数程序集,是一个API标准,用来规范发布基础线性代数操作的数值运算库,它的性能,尤其是其中的?GEMM子程序(?代表S或者D,表示单精度或双精度)的表现,很大程度上影响了以数值计算为主的应用程序的性能.

BLAS按照功能被分为3个级别:

1. Level1 矢量-矢量运算, 如 ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/a6f6710c9b3a70491fd8b0702a89e7bae26877cf)

2. Level2 矩阵-矢量运算, 如 ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/ef9e6bdb1c0a3ccfea5022d15ece8c14752a2cf2)

3. Level3 矩阵-矩阵运算, 如 ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/7f468ecf6921e01d99cacd944bfd18f7eb5eb6f7)

*注: 以上大写字母表示矩阵, 小写字母表示向量*


常用的BLAS实现有基于Fortran的Netlib BLAS官方参考实现, CBLAS(BLAS的C语言接口), CUDA SDK(通过C编程在GeForce 8系列及以上显卡上运行), OpenBLAS, Intel MKL(Intel的核心数学库), GSL(GNU Scientific Library)等等.

# GEMM及在CBLAS中的使用

---

因为我已经安装过caffe, 所以CBLAS不必再安装, 如果你需要安装, 请参考[这里](http://blog.csdn.net/cleverysm/article/details/1925549).

## 编译blas程序

编译时需要链接blas库, 添加 `-lcblas` 编译标志即可.

在codeblocks IDE中, 需要在 Project --> Build options --> Linker settings 标签页下的Link Libraries中添加blas库即可.

## GEMM函数

所有的BLAS函数的数据类型都反映在函数名上,如属于Level3的用于计算两个矩阵乘法的函数GEMM, 对于单精度浮点型的函数名为`SGEMM`, 对于双精度浮点型为`DGEMM`, 对于单精度复数类型为`CGEMM`, 对于双精度复数类型为`ZGEMM`

对于Level 2的BLAS还有一系列扩展精度子程序, 其前缀为ES, ED, EC, EZ等.

GE表示矩阵的类型为general, 除此外还有GB(General Band), SY(SYmmetric), SB(SYmmetric Band), SP(Symmetric Packed), TR(TRiangular) ...

完整的函数列表及缩写请参考 [Quick Reference Guid to the BLAS](http://www.netlib.org/lapack/lug/node145.html).

下面我们主要看看SGEMM函数的使用,其他类型大同小异.

在CBLAS中该函数的原型如下:

```C
void cblas_sgemm(const enum CBLAS_ORDER __Order, const enum CBLAS_TRANSPOSE __TransA, const enum CBLAS_TRANSPOSE __TransB, const int __M, const int __N, const int __K, const float __alpha, const float *__A, const int __lda, const float *__B, const int __ldb, const float __beta, float *__C, const int __ldc);
```

参数:

Order: 用来指定数据在内存中的顺序是row-major(C语言格式)还是column-major(Fortran格式)
TransA: 指定是否要转置矩阵A 
TransB: 指定是否要转置矩阵B
可选枚举值

```C
enum CBLAS_TRANSPOSE 	{CblasNoTrans=111, CblasTrans=112, CblasConjTrans=113};
```

M\N\K: [经过转置后]的A的维度为M*K, B为K\*M, 计算结果C=A\*B的维度为M\*N

alpha\beta: 总的计算相当于 C ← α op(A) * op(B) + β C , 其中op()为是否转置

lda\ldb\ldc: 指定A\B\C的leading dimension, 一般对于row major是列数, 对于column major是行数, 详情请参考下文.

注意C所指向的内存要可写.

### Leading Dimension

无论对于什么维度的矩阵, 在计算机中都存储为连续的一维数组, 关键在于如何解读这块连续的数据为某个维度的矩阵信息. C语言中的多维数组都采用row-major的方式,即a[i][j]的地址在a  + i * #cols + j 位置处 (简单起见, 此处以char数组为例, 不讨论sizeof(type)乘子); 然而在Fortran中, 多维数组的Data Layout采用column-major方式, 同一列的元素在内存中相邻, a[i][j]的位置在a + j * #rows + i 位置处.

比如, 对于以下数组

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/0d2606537373aed9f7c6240cc6c94efcce12c53a)

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-21%2014-59-40%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

而这正是第一个参数Order的含义, 按照怎样的顺序来解读数据的维度信息.

下面计算以下问题;

```python
A(3x2) = [ 1 2
           3 4
           5 6 ]

B(2x3) = [ 7 8 9
           1 2 3 ]
    
C(3x3) = A * B = [ 9 12 15
                  25 32 39
                  41 52 63 ]
```

C++代码如下:

```C++
#include <cblas.h>
#include <iostream>
using namespace std;


int main() {
    const CBLAS_ORDER Order=CblasRowMajor;
    const CBLAS_TRANSPOSE TransA=CblasNoTrans;
    const CBLAS_TRANSPOSE TransB=CblasNoTrans;
    const int M=3;
    const int N=3;
    const int K=2;
    const float alpha=1;
    const float beta=0;
    const int lda=K;
    const int ldb=N;
    const int ldc=N;
    const float A[M*K]={1,2,3,4,5,6};
    const float B[K*N]={7,8,9,1,2,3};
    float C[M*N];

    cblas_sgemm(Order, TransA, TransB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc);

    for(int i=0;i<M;i++)
    {
      for(int j=0;j<N;j++)
      {
          cout<<C[i*N+j]<<"\t";
      }
      cout<<endl;
    }

    return 0;
}

```

运行结果如下:

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-21%2015-16-32%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

让我们仔细解读一下这个过程

A在内存中的布局如下
![](http://of1cz7dcw.bkt.clouddn.com/data_layout1.png)

B的布局如下
![](http://of1cz7dcw.bkt.clouddn.com/data_layout2.png)


因为order为row-major且A和B都是不转置的,A的shape就是M*K,即3x2, A[i][j]=A(i\*lda+j)=A(2i+j)

所以A解读为
![](http://of1cz7dcw.bkt.clouddn.com/A.png)

同理, B解读为B[i][j]=B(i\*ldb+j)=B(3i+j), shape为K\*N(2x3)

![](http://of1cz7dcw.bkt.clouddn.com/B.png)


如果我们把data-layout转变为col-major,完成同样计算的代码如下:

```C++
#include <cblas.h>
#include <iostream>
using namespace std;


int main() {
    const CBLAS_ORDER Order=CblasColMajor;
    const CBLAS_TRANSPOSE TransA=CblasNoTrans;
    const CBLAS_TRANSPOSE TransB=CblasNoTrans;
    const int M=3;
    const int N=3;
    const int K=2;
    const float alpha=1;
    const float beta=0;
    const int lda=M;
    const int ldb=K;
    const int ldc=M;
    const float A[M*K]={1,2,3,4,5,6};
    const float B[K*N]={7,8,9,1,2,3};
    float C[M*N];

    cblas_sgemm(Order, TransA, TransB, M, N, K, alpha, B, lda, A, ldb, beta, C, ldc);

    for(int i=0;i<M;i++)
    {
      for(int j=0;j<N;j++)
      {
          cout<<C[i*M+j]<<"\t";
      }
      cout<<endl;
    }

    return 0;
}
```

这是为什么呢?

此时B在A的位置, 被解读为shape=MxK=(3x2)
而A在B的位置, 被解读为shape=KxN=(2x3)

B[i][j]=B(j*lda+i)=B(3j+i)
B被解读为

![](http://of1cz7dcw.bkt.clouddn.com/B2.png)


A[i][j]=A(j*ldb+i)=A(2j+i)
A被解读为

![](http://of1cz7dcw.bkt.clouddn.com/A2.png)

发现什么了吗? 没错! 同一个数组, 按row-major方式和按col-major方式解读,只要设置好合适的shape,两者就是转置的关系!


根据线性代数中的B'A'=(AB)',运算的结果就是C的转置,但又因为C也是col-major的方式写入内存,即c[i][j]=C(j*ldc+i)=C(3j+i), 再按row-major的方式读出, 正好又是一个转置,最终结果还是C, 即不论按row还是col方式,C在内存中的布局是一样的.如果按col-major读出,结果就正好是C'.

这样, 算法就可以用col-major方式直接计算结果的转置,而不用复制任何数据!

### Trans Flags

如果我们想直接用row-major来计算B' * A'呢?

C++代码如下:

```C++
#include <cblas.h>
#include <iostream>
using namespace std;


int main() {
    const CBLAS_ORDER Order=CblasRowMajor;
    const CBLAS_TRANSPOSE TransA=CblasTrans;
    const CBLAS_TRANSPOSE TransB=CblasTrans;
    const int M=3;
    const int N=3;
    const int K=2;
    const float alpha=1;
    const float beta=0;
    const int lda=N;
    const int ldb=K;
    const int ldc=N;
    const float A[M*K]={1,2,3,4,5,6};
    const float B[K*N]={7,8,9,1,2,3};
    float C[M*N];

    cblas_sgemm(Order, TransB, TransA, M, N, K, alpha, B, lda, A, ldb, beta, C, ldc);

    for(int i=0;i<M;i++)
    {
      for(int j=0;j<N;j++)
      {
          cout<<C[i*M+j]<<"\t";
      }
      cout<<endl;
    }

    return 0;
}

```

运行结果

![](http://of1cz7dcw.bkt.clouddn.com/2017-11-21%2016-10-32%20%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

*注意: MNK始终都是最终真正进行计算时A和B的维度,即A(M\*K) * B(K\*N),此时已经经过了转置, 而ld?始终都是数组原本的维度的行或列的数量, 此时还没有转置!!*


# 总结

BLAS在深度学习框架中应用很广, 比如Caffe就应用了cuBLAS,CBLAS或者MKL等, 大部分数学运算函数在`math_functions.cpp`被封装成统一的API接口以便于调用, 可参考[这篇博文](http://blog.csdn.net/seven_first/article/details/47378697).


# References:

1. <https://developer.apple.com/documentation/accelerate/1513264-cblas_sgemm?language=objc>
2. <http://www.netlib.org/lapack/lug/node145.html>
3. <http://blog.csdn.net/seven_first/article/details/47378697>
4. <https://en.wikipedia.org/wiki/Row-_and_column-major_order>
5. <https://zh.wikipedia.org/zh-hans/BLAS>
6. <http://blog.csdn.net/sunmenggmail/article/details/38696381>
7. <https://www.christophlassner.de/using-blas-from-c-with-row-major-data.html>
8. <http://www.netlib.org/clapack/CLAPACK-3.1.1/BLAS/WRAP/cblas.h>


本文图片由<https://www.draw.io/>绘制.

