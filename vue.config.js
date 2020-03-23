const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport');
const path = require('path')
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: ' dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  publicPath: '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail.vue: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://58.56.15.138:20012/`,
        target: `http://192.168.0.221:20012/`,
        timeout: 8640000,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}
