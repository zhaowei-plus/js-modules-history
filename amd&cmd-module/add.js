// 定义 add.js 模块
define(function() {
    var add = function(x, y) {
        return x + y
    }
    return {
        add: add,
    }
})