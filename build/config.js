var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../deploy/index.html'),
    assetsRoot: path.resolve(__dirname, '../deploy'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionSourceMap: true,
  },
  dev: {
    env: require('./dev.env'),
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      overlay: true,
      stats: 'normal',
      https: true,
      open: true
    }
  }
}
