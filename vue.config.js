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
      '/login': {
        target: 'http://192.168.34.208:8001',
        changeOrigin: true,
        pathRewrite: { '^/login': '/login' },
        onProxyReq(proxyReq) {
          console.log('Proxying request to:', proxyReq.path)
        },
        onError(err) {
          console.error('Proxy error:', err)
        }
      },
        '/music': {
        target: 'http://192.168.34.208:8002',
        changeOrigin: true,
        pathRewrite: { '^/music': '/music' },
        onProxyReq(proxyReq) {
          console.log('Proxying request to:', proxyReq.path)
        },
        onError(err) {
          console.error('Proxy error:', err)
        }
      },
        '/setting': {
        target: 'http://192.168.34.208:8005',
        changeOrigin: true,
        pathRewrite: { '^/setting': '/setting' },
        onProxyReq(proxyReq) {
          console.log('Proxying request to:', proxyReq.path)
        },
        onError(err) {
          console.error('Proxy error:', err)
        }
      },
        '/msg': {
        target: 'http://192.168.34.208:8006',
        changeOrigin: true,
        pathRewrite: { '^/msg': '/msg' },
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