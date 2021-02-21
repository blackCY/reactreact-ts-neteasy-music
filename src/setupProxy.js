const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/video",
    createProxyMiddleware({
      target: "http://localhost:3008",
      changeOrigin: true,
      pathRewrite: {
        "^/video": "",
      },
    })
  );

  app.use(
    "/music",
    createProxyMiddleware({
      target: "http://47.115.57.59:3000",
      changeOrigin: true,
      pathRewrite: {
        "^/music": "",
      },
    })
  );
};
