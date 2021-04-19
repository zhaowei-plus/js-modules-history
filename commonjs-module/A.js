exports.x = 'A1'

// { x: 'A1' }
console.log('A.js B.x:', require('./B.js').x)

// 当通过 require 被调用执行时，require.main不等于module
// console.log('A.js main:', require.main === module)
exports.x = 'A2'

/**
 * {
 *  x: A2
 * }
 */