exports.x = 'B1'
    // { x: 'B1' }
console.log('B.js A.x:', require('./A.js').x)

// 当通过 require 被调用执行时，require.main不等于module
// console.log('B.js main:', require.main === module)
exports.x = 'B2'

/**
 * {
 *  x: B2
 * }
 */