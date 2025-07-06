const { defineConfig } = require('@vue/cli-service')
const path = require('path')


// 提取后端服务器地址到变量
const BACKEND_HOST = 'http://192.168.2.7'

// 通用的代理配置函数
const createProxy = (port) => ({
  target: `${BACKEND_HOST}:${port}`,
  changeOrigin: true,
  pathRewrite: (path) => path, // 如果不需要重写路径，可以这样写
  onProxyReq(proxyReq) {
    console.log('Proxying request to:', proxyReq.path)
  },
  onError(err) {
    console.error('Proxy error:', err)
  }
})

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
      '/login': createProxy(8001),
      '/music': createProxy(8002),
      '/setting': createProxy(8005),
      '/msg': createProxy(8006),
      '/upload': createProxy(8007),
      '/songList': createProxy(8008),
      '/mylike': createProxy(8009),
    },
  }
})
// const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

// module.exports = defineConfig({
//   lintOnSave: false,
//   transpileDependencies: true,

//   devServer: {
//     host: "0.0.0.0",
//     port: 9092,
//     client: {
//       overlay: false,
//     },
//     proxy: {
//       '/login': {
//         target: 'http://192.168.2.11:8001',
//         changeOrigin: true,
//         pathRewrite: { '^/login': '/login' },
//         onProxyReq(proxyReq) {
//           console.log('Proxying request to:', proxyReq.path)
//         },
//         onError(err) {
//           console.error('Proxy error:', err)
//         }
//       },
//         '/music': {
//         target: 'http://192.168.2.11:8002',
//         changeOrigin: true,
//         pathRewrite: { '^/music': '/music' },
//         onProxyReq(proxyReq) {
//           console.log('Proxying request to:', proxyReq.path)
//         },
//         onError(err) {
//           console.error('Proxy error:', err)
//         }
//       },
//         '/setting': {
//         target: 'http://192.168.2.11:8005',
//         changeOrigin: true,
//         pathRewrite: { '^/setting': '/setting' },
//         onProxyReq(proxyReq) {
//           console.log('Proxying request to:', proxyReq.path)
//         },
//         onError(err) {
//           console.error('Proxy error:', err)
//         }
//       },
//         '/msg': {
//         target: 'http://192.168.2.11:8006',
//         changeOrigin: true,
//         pathRewrite: { '^/msg': '/msg' },
//         onProxyReq(proxyReq) {
//           console.log('Proxying request to:', proxyReq.path)
//         },
//         onError(err) {
//           console.error('Proxy error:', err)
//         }
//       },
//         '/upload': {
//         target: 'http://192.168.2.11:8007',
//         changeOrigin: true,
//         pathRewrite: { '^/upload': '/upload' },
//         onProxyReq(proxyReq) {
//           console.log('Proxying request to:', proxyReq.path)
//         },
//         onError(err) {
//           console.error('Proxy error:', err)
//         }
//       },
//         '/songList': {
//         target: 'http://192.168.2.11:8008',
//         changeOrigin: true,
//         pathRewrite: { '^/songList': '/songList' },
//         onProxyReq(proxyReq) {
//           console.log('Proxying request to:', proxyReq.path)
//         },
//         onError(err) {
//           console.error('Proxy error:', err)
//         }
//       },
//         '/mylike': {
//         target: 'http://192.168.2.11:8009',
//         changeOrigin: true,
//         pathRewrite: { '^/mylike': '/mylike' },
//         onProxyReq(proxyReq) {
//           console.log('Proxying request to:', proxyReq.path)
//         },
//         onError(err) {
//           console.error('Proxy error:', err)
//         }
//       }
//     },
//   }
// })