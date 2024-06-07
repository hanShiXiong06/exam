const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://localhost:3000', // 目标服务器地址
        changeOrigin: true, // 开启代理，在本地会创建一个虚拟服务端
        // pathRewrite: { '^/api': '' } // 重写路径
      }
    }
  }
})
