// 定义 sub.js 模块
define(function() {
    var sub = function(x, y) {
        return x - y
    }
    return {
        sub: sub
    }
})