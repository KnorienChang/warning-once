module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/warning-once/'
    : '/',
  devServer: {
    proxy: 'http://users.qzone.qq.com'
  }
}
