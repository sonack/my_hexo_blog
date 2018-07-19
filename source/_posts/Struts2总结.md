---
title: Struts2总结
pid: Struts2总结
categories:
  - 杂项
tags: []
date: 2016-10-22 15:34:01
---
由于学校“软件工程”课程的一个实验要求完成一个基于Struts2框架的Web App项目，于是我对Struts2进行了一些研究，这里是我目前学习的总结。

<!-- more -->



## 前言

由于学校“软件工程”课程要求最终要完成一个基于Struts2框架的Web App项目，而我之前只学过一点点Java SE的语法知识（其实这学期一开始已经基本忘光，现在回想起来，感觉当初的学习方法有点不当，只一味研究一些我不太理解的Java的高级语法和特性，记得曾在多线程、反射和AWT上竟然还浪费了很长的时间，而平时基本不用这些东西编程，所以一年多后的我早就忘干净了），对JavaEE和Java Web开发的ssh三大框架等完全是一窍不通（话说一开始我还以为ssh是指secure shell呢，手动汗）。

老师把我们的项目语言限制为Java，也是属于一种技术约束吧，趁机可以锻炼一下自己的自学能力。在Ubuntu上轻松配置了Eclipse、Tomcat等环境后(不得不说，linux上配置相关开发环境真的有天然优势，比Win下舒服太多了)，我便按照老师的课件开始尝试HelloWorld，谁知一波三折。导入Struts2.5.2的相关包后，Eclipse提示ClassNotFound，而Class明明是存在的，当时感觉应该是包导的有问题，请教过同学后再次导入所谓的最小必备包，还是报错，在Tomcat启动过程中就会报错而启动失败，百度之众说纷纭，有人说不能直接导入User Library(尝试过改为直接导入并无效)，有人说这是Tomcat8.0的一个已知bug，尝试换回Tomcat7.0，问题莫名解决（其实不确定到底是不是Tomcat8的问题，后来导的包的位置和种类都有所变化，已经不可考，无奈……不过再次碰到这种问题我相信一定可以各种方法配好）。Struts2.5.2的配置过程让人很郁闷，2.5和以前的版本差别相当大（至少从当时完全小白的我看来），比如\<filter-class\>的变化，必需包的变化，xwork的jar包的变化等等都让我一度停顿。

回去大致看了一下Apache Struts2的官方Tutorial，感觉意犹未尽，这个教程只是用来入门的，让我了解和接触到了更多的Struts2内建机制（如属性文件、数据验证和国际化等等）和各种标签（表单UI标签和控制标签等），而我对Struts2的核心还是很朦胧。

趁着国庆放假，我利用几天时间大致通读了一下《Struts2实战》(《Struts2 In Action》)这本有关Struts2框架的书籍，据说写的还不错。基本看了关于Struts2核心组件的前三部分，至于后面的和Spring和Hibernate集成的部分，由于时间关系，我觉得用在我们项目中的可能性不大，也就没再学习。看完后，感觉思绪比较杂乱，需要进一步的消化总结，于是写这篇文章来大致回顾和记录一下阅读这本书的感受和启发，顺便发篇博客。这也是课程要求的一部分，哈哈。

前言写的有点多了啊，打住打住。


##  Struts2InAction读书笔记

### 关键字

读完后回想起来，我印象最深的就是几个关键词，**ValueStack**、**ActionContext**、**Interceptor**、**OGNL**、**Action**和**Tag API**，下面就分别来总结一下这几个概念吧。

由于Struts2是建立在Servlet API上的框架，而我并没有学习过原生的Servlet开发，所以很多底层的概念如果有理解不恰当的地方，欢迎指教。

#### ActionContext

在我看来，ValueStack是一个虚拟的对象，由于Struts2不像Struts1那样，每个Action都是单例模式(In Struts1)，对于处理不同的请求，该对象很可能线程不安全，这就限制了Action可以做的事情，而Struts2每次处理请求都会new一个Action的实例，各个Action中的成员变量彼此独立且没有线程安全问题，所以Struts2中的Action要强大很多，Struts2中的Action也就担任了MVC中的C和M的功能。Struts2中的Action不强迫继承任何基类或者实现任何接口（虽然有ActionSupport实现类可以继承，有Action接口可以实现，但都不是必须的），只要是一个有返回控制字符串的execute方法的POJO对象(Plain Ordinary Java Object，简单Java对象)都可以，而execute方法没有任何参数，这也是Struts2的目标之一——提供一个**简洁**的MVC框架，没有参数的话，在execute()中执行业务逻辑又需要很多信息，在View层使用OGNL语言简单引用相关数据资源等，这都需要一个**集中的**，能够提供一个**动作执行所需要的内容环境**的存储区域，这就是ActionContext，ActionContext持有与一个动作调用相关的所有重要的数据对象，我们可以利用OGNL语言指向其中任何一个。

ActionContext的结构如下图所示：

![ActionContext和它所包含的对象](https://ooo.0o0.ooo/2016/12/22/585b5b0247400.png)

*   ValueStack包含当前请求的应用程序领域的所有数据
*   parameters包含当前请求中请求参数的映射
*   application包含应用程序作用域的属性的映射（被该App的所有request访问）
*   session包含会话作用域的属性的映射（被该Session的所有request访问，存储用户对象判断用户是否登录）
*   attr按照页面、请求、会话、应用程序作用域的顺序，返回第一个出现的属性
*   request包含请求作用域的属性的映射（只有该request可以访问）
OGNL默认ValueStack作为根对象，其他对象使用语法 _**#session['user'] **_。

#### ValueStack

当Struts2收到一个请求时，它会立即创建一个ActionContext对象、一个ValueStack对象和一个动作对象，并把Action对象马上放到ValueStack中，以便作为应用程序的数据的承载者，框架可以通过OGNL来访问它的属性。

首先，来自请求的参数会发生自动数据转移到ValueStack公开的属性上(由于params拦截器的作用)，ValueStack有一个微妙的地方，这个虚拟对象包含了它所包含的所有对象的所有属性，如果属性同名，栈上面的会覆盖栈下面的属性，ValueStack的一般结构如下图所示：

![ValueStack的结构](https://ooo.0o0.ooo/2016/12/22/585b5df2614a7.png)

首先动作对象MyAction被放在ValueStack上面，之后可能一个模型对象被放入（可能由于动作实现了ModelDriven），然后一个bean被放入了栈（可能是jsp页面中使用bean和push标签，这里的bean仅仅指用来承载数据或者提供工具方法的Java对象，它通常只是一个想在标签中通过OGNL表达式访问其属性的对象）

#### Intercepter

拦截器，是实现框架大部分功能的核心组件之一，它是默默工作在框架背后真正的“英雄”。从架构关注点分离的角度来看，intercepter消除处理了Action中的横切任务（Cross-Cutting Task）。其工作可分为cross-cutting、preprocessing和postprocessing，那么什么是横切任务呢？

在面向切片编程(AOP)中，cross-cutting concerns 指的是一个程序中会影响其它业务关注点的关注点切片，这些关注点无论从设计上还是实现上都不能很清楚地与系统的其他部分解构分离，并且会导致代码分散重复、逻辑纷繁混乱等问题。常见的cross-cutting concerns有日志记录、身份认证等业务任务，这些任务横向关联所有其它动作。

Action调用是一个分层的过程：总是先执行一系列的拦截器(pre-process)，再执行动作(cross-cutting)，再反向执行一系列的拦截器(post-process)。框架不直接调用Action的execute方法，而是先创建一个叫做ActionInvocation的对象，它封装了动作和一系列拦截器的信息，一个动作的完整执行过程如下：

![ActionInvocation封装了Action及与之关联的intercepters和result的执行](https://ooo.0o0.ooo/2016/12/22/585b5bc4db2c1.png)

使用Intercepter可以达到可重用和可配置(如调整拦截器的顺序和数量)的好处。

总指挥ActionInvocation封装了特定动作执行的所有处理细节。当S2(指Struts2，下同)收到一个请求时，他首先决定URL映射哪个动作，然后这个动作的一个**新**实例会被加入到一个**新**创建的ActionInvocation实例上，接着，框架通过声明性架构（从struts.xml或者Java Annotation）以发现哪些拦截器应该触发，按照什么顺序触发（即在struts.xml中排列的先后顺序）等信息，所有指向这些拦截器的引用被加入到AI中，此外，AI也拥有对其他重要信息（如Servlet请求对象和当前动作可用的结果组件的映射）的引用。

ActionInvocation公开了String invoke()方法，S2调用该方法开始动作的执行，此时，AI在invoke方法中通过执行拦截器栈中的第一个拦截器的intercept()方法，AI内部跟踪了invoke过程当前执行的位置的状态，在第一个拦截器的intercept()中调用参数AI的invoke()以此进入第二个拦截器的intercept()，第二个拦截器中的intercept()调用参数AI的invoke()以进入第三个拦截器的intercept()，以实现控制权沿着拦截器栈的从上到下的以此传递，最后一个拦截器执行完毕后，再调用AI的invoke()则会调用Action方法，然后逆序依次返回控制字符串，并进行各个拦截器的后处理。这本质上就是invoke()的递归调用(A调用B，B调用A，只不过A会查询自身状态，在适当时候返回结果)。

所以拦截器栈上任何一个拦截器都可以返回一个控制字符串来终止递归调用，避免后续拦截器和Action的执行。

##### 自定义拦截器

拦截器需要实现com.opensymphony.xwork2.intercepter.Interceptor接口，该接口如下：

![Interceptor接口中的3个方法](https://ooo.0o0.ooo/2016/12/22/585b5c596d7e5.png)

init()和destroy()是生命周期方法，一般空实现。可以继承空实现抽象父类AbstractInterceptor（如果不需要打开和销毁资源）；如果要编写一个具有参数化类型的拦截器，可以继承抽象实现MethodFilterIntercepter类(是AbstractIntercepter的子类)，如workflow拦截器，可以使用基于参数的方法过滤，定义了哪些Action方法不会触发拦截器。

![选区_052.png](https://ooo.0o0.ooo/2016/12/22/585b5cb8700a6.png)


参考：[Struts2拦截器的方法过滤](http://www.cnblogs.com/ribavnu/archive/2013/03/15/2960891.html)

**XML中声明拦截器的语法：**

**声明独立的拦截器和拦截器栈：**

    <intercepters>
    <intercepter name="拦截器名" class="拦截器类" />  <!--普通拦截器-->
    <intercepter-stack name="拦截器栈名">
    <intercepter-ref name="引用拦截器名1" />
    <intercepter-ref name="引用拦截器名2" />
    <intercepter-ref name="workflow">
    <param name="参数名">参数值</param>
    </intercepter-ref>
    </intercepter-stack>
    </intercepters>
    <default-intercepter-ref name="拦截器(栈)名"/>  <!--设置默认的拦截器-->

**将intercepters映射到Action:**

    <action name="" class="">
    <intercepter-ref name="拦截器名1"/>   <!-- 按照顺序 -->
    <intercepter-ref name="拦截器名2"/>   <!-- 只要声明了自己的拦截器，就自动失去默认值 ，必须显式指出defaultStack-->
    <intercepter-ref name="拦截器栈名1"/>
    .......
    <result>result.jsp</result>
    </action>

如果一个动作没有声明自己的拦截器，它就会继承所在包的默认拦截器引用。

重用defaultStack，但是改变workflow的参数值：

    <action name="" class="">
    <intercepter-ref name="">
    <param name="workflow.excludeMethods">doSomething</param>
    </intercepter>
    <result>......</result>
    </action>

#### 获得Servlet对象的方法

1.使用Aware接口通过IoC方式注入：

Aware意为“感知”，实现了相应Aware接口的Action能够感知相应的资源。Struts2在实例化一个Action实例时，如果发现它实现了相应的Aware接口，会把相应的资源通过Aware接口方法注射进去。这种方式也叫做注射方式（IoC方式）。

Servlet API中常用对象application、request、response、session对应的Aware接口分别为ServletContextAware、ServletRequestAware、ServletResponseAware、SessionAware。

对应的对象类型：

    ServletContext application;
    HttpServletRequest request;
    HttpServletResponse response;
    HttpSession session;

Aware接口其实是利用了拦截器机制。

ApplicationAware, RequestAware,SessionAware, ParameterAware.

_struts2提供了这四个Aware接口用于Action类的实现，从而注入对应的application、request、session，parameter, 不过它们都是Map类型的。这和ActionContext一样是解耦的，即没有引入servlet相关的包，是在struts2内部的。都是Map\<String,Object\>类型。_

_通过XxxAware接口的实现，可以方便的获取web资源。_

参考：

1.[利用相关的Aware接口](http://book.51cto.com/art/200912/169828.htm)

2.[XxxxAware接口](http://www.cnblogs.com/sdnu/p/5352468.html)

#### 有关page、request、session、application的区别

参考：page、request、session和application有什么区别？（[http://liuyuru.iteye.com/blog/773367](http://liuyuru.iteye.com/blog/773367)）

或者可以通过非IoC方式获得以上对象：

    ActionContext.getContext().getSession()
    ActionInvocation对象.getInvocationContext().getSession()

这样获得的是经过S2封装的Map对象

如果想获得原生的HttpServletRequest等，可以采用：

    HttpServletRequest request = ServletActionContext.getRequest();
    HttpServletResponse response = ServletActionContext.getResponse();
    HttpSession session = request.getSession();

或者

    HttpServletResponse response =ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
    HttpServletRequest request = ActionContext.getContext().get(org.apache.struts2.StrutsStatics.HTTP_REQUEST);

参考：struts2获取request、response这些对象([http://blog.sina.com.cn/s/blog_6145ed810100mov8.html](http://blog.sina.com.cn/s/blog_6145ed810100mov8.html))

重要的一点：拦截器实例在动作之间共享，虽然每次请求都会创建一个动作的新实例，但是拦截器会重用！拦截器是无状态的！

#### OGNL

Object-Graph Navigation Language，对象图导航语言。它是一种表达式语言，被集成在S2中实现数据转移和类型转换，就像基于字符串的HTTP输入/输出与Java的内部处理对象之间的黏合剂，它可以使用简单语法来引用Java环境对象（JavaBean），甚至可以调用Java对象上的方法，帮助将数据从这些属性移动到呈现的HTML页面。表达式语言的思路就是简化对数据的访问。

S2中每个标签的属性都有一个默认值来决定将字符串作为OGNL表达式还是作为字面值来处理，只有在必须的时候，才需要转义OGNL表达式，以告诉S2将字符串作为表达式来解析。

OGNL类型转换器：内建的类型转换器

S2自带了HTTP本地字符串与Java的String\b(B)oolean\char\Character\int\Integer\Date\array\List\Map类型之间的内建转换器支持。

处理多值请求参数：

**数组：**

ages 一个请求参数  **不需要自己创建ages**

names[0] names[1] names[2]  每个是独立的请求参数，**需要初始化数组names**

**Collections:**

*List*

为元素指定类型（泛型\属性文件指定）或默认类型（String）

和数组类似，不同的是无论使用ages方式还是ages[i]方式，都不需要初始化List对象。

属性转换(properties)文件命名约定：

    ClassName.conversion.properties

内容：

    Element(固定前缀)-weights(List名字)=java.lang.Double(元素类型)

如果使用Java5+，使用泛型List更好，不必使用属性文件！

不要预先初始化List（或其他Collection），虽然没有类型的List无论初不初始化都能工作，但如果指定了元素具体类型的List，一旦初始化就会得到错误！

*Map* 略

自定义类型转换器 略

#### Action

Struts2是一个面向动作的框架，动作是框架的整个核心。

动作Action完成一个请求的核心处理，包括业务逻辑、承载数据（JavaBean属性）、之后选择应该呈现的结果页面的结果。

注意：在S1中，一个动作类只有一个实例，如果S2仍然如此，就无法将动作自身作为请求的数据携带者，因此S2为每一个映射到动作类的请求都创建一个新的动作实例来解决这个问题。

动作组织在包(package)中，包的属性有name(包名)、namespace(命名空间)、extends(继承父包)、abstract(是否抽象)四个属性。命名空间来生成包内所有动作被映射到URL命名空间。可以为多个不同的包设置相同的namespace，如果不设置namespace（实际上是空字符串""），包内动作就会进入默认命名空间，其在所有其他命名空间之下，用来解决不能与任何显式声明的命名空间匹配的请求。也可以定义"/"的根命名空间。如果找不到动作，会逐级向父目录来寻找Action，如果仍然找不到，到默认命名空间寻找，如果还找不到，报错找不到Action。

动作的实现：

可用Action接口（可选），该接口只定义了一个execute()方法和一些常量（如SUCCESS、INPUT、LOGIN、NONE、SUCCESS），使用这些常量的好处是框架内部也使用了这些常量，所以允许更多的智能默认行为有效。

如果action没有制定class，会绑定默认的action类，可通过\<default-action-ref name="index" /\>配置，默认的action类有一个返回SUCCESS的空execute()方法，result元素的默认name也是SUCCESS常量。

继承实现类ActionSupport，它提供了实现Action接口和其他几个有用接口的默认实现的便利类，提供了诸如数据验证、错误消息本地化等功能。提供了如addFieldError()等方法。数据验证使用validate()方法，没有返回值。通过DefaultWorkflowInterceptor来实现基本的验证。实现了ValidationAware接口的类必须为每一个验证字段维护一系列错误消息和一系列与动作整体相关的通用错误消息，workflow拦截器通过该接口的方法来检查是否有错误消息，幸运的是，ActionSupport类已经实现了该接口，我们可以调用addFieldError(String fieldname,String errorMsg)和addActionError(String errorMsg)（添加一个动作范围的错误消息）来使用它们，workflow拦截器使用ValidationAware接口中提供的用来测试错误消息是否存在的方法，来判断是否应该将工作流重定向到输入页面，即返回“input”控制字符串。

可以使用资源包（ResourceBundle）来定义提示文本消息，资源文件命名约定为className.properties，与action类放在一个包下。ActionSupport实现了两个接口来协作提供了本地化消息文本的功能，TextProvider提供了对这些消息的访问方法，如getText("key")；第二个接口是LocaleProvider只提供了一个方法getLocale()，根据浏览器发送的地域设置取得用户地域，TextProvider会尝试根据getLocale()的结果来选择适当的资源文件，如className_es.properties文件等。

向对象传递数据：

1.使用JavaBean属性：公开一个复杂对象作为JavaBean属性，让数据直接传输到该对象上，不需要初始化对象，因为我们让框架自动处理该对象的实例化（该对象要有公开无参构造方法），并且用来自请求的数据来填充它的属性。

jsp页面： 
    
    <s:textfield name="user.username" label="Username">

2.ModelDriven接口：在视图层jsp上不用引入额外的user点。

该接口定义了`public Object getModel()`，该方法返回要公开的应用程序的域对象。

需要初始化对象。

文件上传：略

#### Tag

属于视图层V，标签可分为4类：

1. 数据标签（Data Tag）

    关注将数据从ValueStack中抽出或者在ValueStack中放入的方法

2. 流程控制标签（Control-flow Tag）

    根据条件（测试ValueStack值），改变呈现过程

3. UI标签（UI Tag）

    （待）

4. 其他标签（miscellaneous Tag）

    不易分类，包含有用功能，如管理URL呈现，文本的国际化等


Struts2的Tag API定义在比任何具体的视图层技术更高级的层上，标签API的接口已经在各种具体的视图层技术（JSP、Velocity、FreeMarker）中实现。

JSP语法： 在jsp页面开始部分必须声明包含property标签库(taglib)的声明，这是标准jsp的内容，如`<%@ taglib prefix="s" uri="/struts-tags" %>`。

属性：

分为字符串和非字符串属性

OGNL使用%{expression}来转义。

JSTL 使用${expression}来转义。
