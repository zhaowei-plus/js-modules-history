// require('./example.js')
// require('./example.js').message = 'hello'
var example = require('./example.js')
console.log('example:', example)

// 导入的模块
console.log('example:', example) // { x: 5, addX: [Function: addX] }

console.log(example.x) // 5
console.log(example.addX(1)) // 6
console.log(example.x) // 5