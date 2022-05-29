const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {                //특정 경로에 대한 서버 통신을 허용
    app.use(
        '/api',
        createProxyMiddleware({ 
            target: 'http://localhost:5000', 
            changeOrigin: true }));
}