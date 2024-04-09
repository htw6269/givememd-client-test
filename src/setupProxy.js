const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프론트엔드에서 API 요청할 경로
    createProxyMiddleware({
      target: 'http://3.39.11.243:8080', // 백엔드 API 서버의 주소
      changeOrigin: true,
    })
  );
};
