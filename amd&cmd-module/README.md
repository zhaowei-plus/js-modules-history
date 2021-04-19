# AMD & CMD规范

## 背景

Commonjs规范在浏览器端不太适用得原因是 require 是同步的，这对服务器端不是问题，因为所有得模块都存放在本地，可以同步加载完成，加载耗时较短可以接受。但是对于浏览器端却是一个大问题，模块加载等待时间和网速相关，可能要等待很长时间，浏览器则处于“假死”状态。因此，浏览器端得模块，就只能采用“异步加载”方式，AMD规范应运而生。

## 规范描述

AMD（Asynchronous Module Definition），即异步模块加载机制，该规范采用异步方式加载模块，模块的加载不影响后面语句的执行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会执行。

AMD规范也使用require语句来加载模块，和CommonJS不同的是，它要求两个参数：

```js
require([modile], callback)
```

例如：

```js
require(['math'], function(math) {
    const sum = math.add(3, 5)
})
```

这里的math.add()和math模块的加载不是同步的，浏览器不会出现“假死”状态，所以，AMD更适合浏览器环境。

目前，主要有两个javascript库实现了AMD规范：[require.js](https://requirejs.org/) 和 [curl.js](https://github.com/cujojs/curl)


## 特点
## 缺点

## AMD 和 CMD的区别

AMD推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行

```js
/** AMD写法（require.js） **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    } 
});

/** CMD写法（sea.js）**/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});
```

## 其他

浏览器端的使用，以require.js为例

## 总结
## 参考文章

[CommonJS规范 阮一峰](https://javascript.ruanyifeng.com/nodejs/module.html#toc2)
[require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)