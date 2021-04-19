# 前端模块化

前端模块化主要解决两个问题：命名空间冲突和文件依赖管理

# JavaScript 模块演化历程

## 原始时期

### 直接定义依赖

```
var a = 10
function funcA () {}

var b = 20
function funcB () {}
```

在原始时期，“模块化”是通过定义函数和共享变量，这种做法最明显的缺点就是污染全局变量，后面的重名的变量会覆盖前面使用的变量，各个模块之间也没有明显的依赖关系。

### 命名空间

```
var objA = {
    a: 10,
    funcA: function () {}
}

var objB = {
    b: 20,
    funcB: function () {}
}
```

比较多的组织方式的可能会使用命名空间来表示变量，使用对象来约定变量的作用域

### 闭包模块化

```
var module = (function(module, $) {
    function privateMethod () {}

    module.moduleProperty = 1
    module.moduleMethod = function () {
        // dosomething
    }
    return module
})(window.modules || {}, jQuery)
```

通过立即执行函数（IIFE），外部函数无法调用到里面的 privateMethod方法，解决了全局污染问题。

同时这种模式还可以将模块拆分，在闭包内可以调用或继承其他子模块、添加新的变量和方法，最后返回新的模块。

同样这种模块化的方式缺点也很明显，如：

-   为了在模块内调用其他全局变量，必须显示注入全局变量，例如这里的jQuery
-   当跨文件使用模块时，必须将模块挂载到全局变量（window）上
-   没有解决如何管理这些模块的问题，各个模块之间的依赖关系需要通过 script 的引入顺序来保证

## CommonJs

### 概述

从 1999 年开始，js模块化的探索都是基于语言层面上的优化，真正的改变要从2009年Commonjs的引入开始，后面的Node.js就是采用了CommonJs模块规范，其约定如下：

-   每个文件都是一个模块，拥有自己的作用域。一个文件中定义的变量、函数、类，总是私有的，对其他文件不可见。
-   exports指向module.exports，可以通过exports向module.exports对象中添加变量
-   require用于加载模块（核心）
-   每个模块内部，module变量代表当前模块。这个变量是一个对象，是Module的一个实例，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实就是加载的该模块的module.exports对象

### 特性

-   所有模块都运行在模块作用域，不会污染全局作用域
-   模块加载的顺序，按照代码中出现的顺序执行（同步执行）
-   模块输入的值是复制（基础类型为复制，引用类型为值引用），模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存起来了，以后再加载，就直接读取缓存结果。想要让模块再次运行，必须清除缓存。

### 不足

-   缺少模块封装的能力

CommonJs规范中每个模块都是一个文件，这意味着每个文件只有一个模块。这在服务器端是可行的，但是在浏览器端会不俗很友好，浏览器中需要做到尽可能少的发起请求，通常一个文件中会有多个模块。

-   使用同步的方式加载依赖。

在浏览器中由于JS的加载会阻碍渲染，同步加载可能会导致白屏问题，对于用户体验是致命的。

-   导出语法问题

CommJs规范中使用了export的对象来暴露模块，将需要导出的变量附加到export上，但是要导出一个函数却只能使用 module.export，这种语法容易然人困惑。

### 其他疑问点

-   模块的缓存

第一次加载模块时，Node会缓存模块。之后在加载该模块时，直接从缓存中取出该模块的 module.exports 对象

如果想要多次执行某个模块，可以在每次模块加载之前可以删除缓存的模块（require.cache中的缓存），代码如下：

```js
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
})
```

-   模块的加载机制

CommonJs模块输出的是值的拷贝（基础类型为复制，引用类型为值引用）。也就是说，一旦输出一个值，模块内部的变化就不会影响到这个值

-   模块的循环依赖

CommonJS模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部加载并执行。当出现某个模块被"循环加载"，就输出已执行的部分，还未执行的部分不会输出

在模块内部，可以通过 require.main 属性，判断模块是直接运行，还是被调用执行，从而检测是被其他模块依赖。

## AMD

### 背景

CommonJS规范在浏览器端并不太适用，主要得原因是 require 模块是同步加载的，这在服务器端问题不大，因为所有的模块都存放在本地，可以同步加载完成启动服务，加载耗时较短是可以接受的。

但这对于浏览器却是有待考虑的问题，模块加载等待时间和文件大小以及网速相关，可能要等待很长时间，这段时间内浏览器则处于“假死”状态，失去相应或出现“白屏”现象。

所以，浏览器端的模块就只能采用“异步加载”的方式，前端社区也出现AMD模块规范，用于满足在浏览器端模块的“异步加载”场景

### 概述

AMD（Asynchronous Module Definition），即异步模块加载机制，该规范采用异步方式加载模块，模块的加载不影响后面语句的执行。

#### 模块定义

AMD规范定义了一个 define 关键字，用来定义和加载模块

```JS
define(id?, dependencies?, factory)
```

参数：

-   id：模块标识，可以省略
-   dependences：所依赖的模块数，可以省略
-   factory：模块的实现，通常是一个对象

#### 模块加载

AMD规范中也使用require全局方法加载模块

```JS
require([dependence], callback)
```

但AMD规范中的require不同于CommonJs规范，这里接受两个参数：

-   dependences 需要配置前置的依赖

只有所有前置依赖都加载完毕才会触发回调函数，dependences中的依赖是通过动态创建script和事件监听的方式来异步加载模块，解决了CommonJs同步加载耗时的问题

-   callback 所有模块加载完毕之后的回调函数

当前置依赖的所有模块加载完毕之后，会按照前置依赖的顺序作为callback的参数，在回调函数中就可以正常调用这些模块

### 代表作

RequireJs

## UMD

### 背景

对于javaScript社区中中的各种不同规范的分裂状态，需要整合实现一个通用模块规范，由此促使UMD规范的出现

### 概述

UMD（Universal Module Definnition），即通用模块定义模式，用来解决CommonJs规范和AMD规范的代码在服务端和浏览器端不通用的问题

### 实现

UMD规范实现比较简单，通过检测不同的环境使用不同的规范打包就可以了，大概处理流程如下：

```js
(function (global, factory) {
// CommonJS 规范
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : 

// AMD规范
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.myBundle = factory());
}(this, (function () { 
    const main = () => {
        return 'hello world';
    };

    return main;
})))

```

## ES Module

### 背景

不管是CommonJS规范，还是AMD规范，都是前端社区实现的模块加载方案，对于js本身而言，始终没有实现与模块相关的功能，这就促使了ECMA对于js的模块规范纳入考虑之中

### 概述

相对于CommonJs和AMD两种比较流程的社区模块加载方案，前者主要用于服务器端，后者主要用于浏览器端，ES2015终于在语言标准层面上，实现了模块功能：ES Module模块规范，而且语法更加简洁，更加人性化。

ES Module模块规范主要由两个命令构成：

export和import

export命令用于规定模块的对外接口，

import命令用于输入其他模块提供的功能。

### 特性

Es6的模块不是对象，import命令会被JavaScript引擎解析，在编译时就引入模块代码，而不是在运行时加载，也正是因为如此，才使得静态分析成为可能，主要特性如下：

-   ES Module会对静态代码分析，即在代码编译时进行模块的解析加载，在运行时之前就已经确定了依赖关系
-   ES Module是动态引用，变量不会被缓存，而是成为一个指向加载模块的引用，只有在真正取值的时候才会进行计算

### 其他疑问点

-   Es Moduel加载规则

ES Module在编译时就会生成一个依赖树，依赖关系则是源于每一条“import”语句

通过这些“import”语句，浏览器或Node.js会从依赖树的入口开始，沿着每条“import”语句找到对应的模块代码，但是浏览器不能直接使用这些文件，所有的文件都必须转换为一系列的称为“Module Reacord”（模块记录）的数据结构（类似于AST），Module Record会记录每个模块的内部状态信息和依赖关系。

关于 ES Module 模块加载的详细过程可以参考文章：[ES module工作原理](https://segmentfault.com/a/1190000020388889)，也可以查看官方文档：[ECMA 16.2 Modules](https://tc39.es/ecma262/#sec-modules)

-   Es Module循环依赖

A.js
```
import { counB } from './B.js'
console.log('A counB:', counB)
export const countA = '你好，我是A'
```

B.js
```
import { counA } from './A.js'
console.log('B counA:', counA)
export const countB = '你好，我是B'
```

当出现上面的情况时，就出现了 ES Module 的循环依赖问题，这其实是ES Module的模块实例的加载状态问题

如前面所描述，在编译解析 ES Module 时，模块内部会生成一个 Module Map 的数据结构，用来记录 Module 当前状态，而在模块解析完毕时，会获取“Module Record”（模块记录）信息，导出相关数据。

而当模块没有解析完成时，则被标记为Fetching状态，不做任何处理，也就不会导出任务数据，继续编译后面的代码。

如当加载A.js模块时，由于A模块依赖了B模块，在遇到 import 时，进入B模块进行解析，而在B模块中又发现导入了A模块中的 counA，由于A模块并没有解析完毕，所以不会导出任何内容，所以这里就会报错：

![](https://global.uban360.com/sfs/file?digest=fidfde440a0ea48ff2e766d6ae642d05851&fileType=2)'

这也是ES Module模块和CommonJS模块的区别

-   CommonJs vs ES Modules

CommonJs规范和ES Module规范特性对比如下：

-   CommonJS模块是“运行时加载”，而ES Module则是“编译时加载”
-   CommonJS模块输出的拷贝（基础类型是拷贝，应用类型是值引用），即一旦输出一个值，模块内部的变化不会影响到这个值。而ES Module模块输出的是引用，只有在使用的时候才重新计算

# 总结

JS的各个模块规范的出现都是基于当时需求的沉淀实现，可以更好的帮助开发者解决前端领域问题，而为了能够减少服务端和浏览器端的差异，Node.js和浏览器都实现了支持ES Module模块规范，让javaScript开发开更加友好。

# 参考文章

- [ 1 ] [javascript模块化演进及原理浅析](https://juejin.cn/post/6940163713345257486)
- [ 2 ] [前端工程化的理解](https://www.jianshu.com/p/88ed70476adb)
- [ 3 ] [你可能不知道的 JavaScript 模块化野史](https://juejin.cn/post/6844904056847073293)
- [ 4 ] [ES module工作原理](https://segmentfault.com/a/1190000020388889)
- [ 5 ] [EsBuild 官网](https://esbuild.github.io/getting-started/#your-first-bundle)
- [ 6 ] [webpack如何解决循环依赖](https://zhuanlan.zhihu.com/p/141863544)
- [ 7 ] [webpack如何解决循环依赖](https://zhuanlan.zhihu.com/p/33049803)
- [ 8 ] [读懂CommonJS的模块加载](https://juejin.cn/post/6844903685466619911)
- [ 9 ] [ES module和commonJS循环引用问题](http://www.qiutianaimeili.com/html/page/2019/12/fnpo81u8ni9.html)