const moduleA = '/Users/zhaowei/Desktop/workspace/selfWorkspace/js-modules-history/commonjs-module/A.js'
const moduleB = '/Users/zhaowei/Desktop/workspace/selfWorkspace/js-modules-history/commonjs-module/B.js'

var A = require('./A.js')
console.log('main.js ', A.x);

// Object.keys(require.cache).forEach(function(key) {
//     console.log('key:', key)
// })

delete require.cache[moduleA]
delete require.cache[moduleB]

var B = require('./B.js')
    // console.log('require.cache:', require.cache)
console.log('main.js ', B.x);