# ES Module规范

## 背景

ES Module是用于处理模块的 ECMAScript 标准。虽然 Node.js 长期使用 CommonJs标准，但是浏览器从未有过模块系统。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

## 规范描述

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

## 特性

-    编译时加载

Es Module是在编译时加载，使得静态分析成为可能，如Tree-Shaking，类型系统等

-   模块的加载机制

-   模块的循环加载
## 其他

## 总结
## 参考文章

- [ 1 ] [ECMAScript 官网](https://www.ecma-international.org/)
- [ 2 ] [JavaScript 模块的前世今生](https://macsalvation.net/the-history-of-js-module/)