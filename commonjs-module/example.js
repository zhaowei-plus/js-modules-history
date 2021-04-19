var x = 5
var addX = function(value) {
    return ++x
}

console.log('module:', module)

// 通过 module.exports输出对象
// module.exports.x = x
// module.exports.addX = addX

// 通过 module.exports输出函数
// module.exports = function() {
//     console.log('hello world')
// }

// Node 提供的简写方式
exports.x = x
exports.addX = addX

// 打印 module 模块对象
console.log('module:', module)