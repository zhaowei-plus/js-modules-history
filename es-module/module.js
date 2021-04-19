let count = 0
const obj = {
    count: 0
}

setInterval(() => {
    obj.count++
    count++
}, 1000)

const addCount = () => {
    obj.count++
    count++
}

export { obj, count, addCount }