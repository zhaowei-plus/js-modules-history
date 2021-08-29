require(['add', 'sub'], function(add, sub) {
    console.log('add:', add.add(1, 2))
    console.log('sub:', sub.sub(1, 2))

    document.querySelector('#main-iframe').src = './page/login.html'
})

function loadModules(id) {
    require(['vue', 'jquery'], function() {
        require(id)
    })
}
