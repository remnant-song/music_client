const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,

  devServer: {
    host: "0.0.0.0",
    port: 9092,
    client: {
      overlay: false,
    },
    proxy: {
      '': {
        target: 'http://192.168.161.233:8001',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        onProxyReq(proxyReq) {
          console.log('Proxying request to:', proxyReq.path)
        },
        onError(err) {
          console.error('Proxy error:', err)
        }
      }
    },
  }
})