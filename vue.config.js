// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
  
//   lintOnSave:false,
//   transpileDependencies: true,
//   devServer: {
//     host: "0.0.0.0",  
//     port: "9092", // 代理端口
  
//   },  
//   //定义添加访问后端地址定义。
//     define: {
//     "process.env": {
//       BASE_URL: "http://localhost",
//     },
//   },
// })
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack') // 引入 webpack

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",  
    port: "9092", // 代理端口
  },  
  // ✅ 正确方式：使用 DefinePlugin 定义全局变量
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify('http://localhost'),
      }),
    ],
  },
})