# CommonJs规范

## 规范描述
## 特点

-    加载时执行

CommonJS在浏览器端模块是需要提前编译打包处理的，而服务器端模块的加载是在运行时同步加载的

## 特性

-   modulex.exports

module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量

-   exports

为了方便，Node为每个模块提供一个exports变量，指向 module.exports。这等同于在每个模块头部，新增一个赋值操作：

```js
var exports = module.exports
```

所以在对外输出对象时，也可以向 exports 对象添加方法

```js
exports.x = 5
exports.addX = function (value) {
    value + x
}
```

当在使用时，exports和module.exports之间的区别很难区分时，一个简单的处理方法，就是放弃使用exports，只使用module.exports

-   Module对象

-   require

require命令的基本功能是，读入并执行一个javaScript文件并返回该模块的 module.exports对象。如果没有发现指定模块，则会报错

根据参数的不同格式，require命令去不同的路径寻找模块文件

-   模块的缓存

第一次加载模块时，Node会缓存模块。之后在加载该模块时，直接从缓存汇总取出该模块的 module.exports 属性

如果想要多次执行某个模块，可以让该模块输出一个函数，然后每次 require 模块的时候，重新执行输出的函数

每次加载模块之后可以通过 require.cache 删除模块的缓存，代码如下：

```js
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
})
```

-   模块的加载机制

CommonJs模块的加载机制时，输入的是被输出的值的拷贝（基础类型为复制，引用类型为值引用）。也就是说，一旦输出一个值，模块内部的变化就不会影响到这个值

-   模块的循环依赖

CommonJS模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就输出已执行的部分，还未执行的部分是不会输出的

在模块内部，可以通过 require.main 属性，判断模块是直接运行，还是被调用执行

## 总结
## 参考文章

[CommonJS规范 阮一峰](https://javascript.ruanyifeng.com/nodejs/module.html#toc2)
[require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)