---
title: Deep Learning Notes
pid: Deep Learning Notes
categories:
  - 杂项
tags: []
date: 2017-12-08 13:33:28
---

<!-- more -->


# Gradient Descent

## Learning Rate

adaptive learning rates:

1. reduce the lr by some factor every few epochs

eg. 1/t decay   ηt = η / (sqrt( t + 1 ))

2. give different params different lrs

## Adagrad

divide the lr of each param by the RMS of its previous derivatives.

Vanilla GD:

W(t+1) = W(t) - ηtgt      w is one parameter

Adagrad:

W(t+1) = W(t) - ηt*(gt/(δt)) 其中 δt 是之前所有关于w的梯度的root mean square, 这是与参数相关的

eg:
δ0 = sqrt((g0)^2)
δ1 = sqrt(1/2 * ((g0)^2 + (g1)^2))
δ2 = sqrt(1/3 * ((g0)^2 + (g1)^2 + (g2)^2))
...
δt = sqrt(1/t+1 * ((g0)^2 + ... + (gt)^2))

由于ηt 1/t decay, 消去sqrt(1/(t+1)), 得到

![](http://of1cz7dcw.bkt.clouddn.com/%E5%9B%BE%E7%89%871.png)






