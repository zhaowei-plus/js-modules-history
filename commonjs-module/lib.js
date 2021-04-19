var counter = 3

function incCounter() {
    counter++
}

// 输出的是值的拷贝
exports.counter = counter
exports.incCounter = incCounter