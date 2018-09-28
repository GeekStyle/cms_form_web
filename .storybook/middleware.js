const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware(router) {
    router.use('/', proxy({
        //target: 'http://www.sit1.bwoilmarine.com',
        target: 'http://localhost:5000',
        changeOrigin: true
    }))
    router.use('/', proxy('ws://www.sit1.bwoilmarine.com', { changeOrigin: true }))
}