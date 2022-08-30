const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'https://clonetodo.herokuapp.com',
          changeOrigin: true
      })
  )
};