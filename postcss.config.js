module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  // 视窗的宽度
      viewportHeight: 667,  // 视窗的高度
      unitPrecision: 5,  // 小数点后几位，指定px转换为视窗单位值的小数点位数
      viewportUnit: 'vw',  // 转成的视窗单位
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],  // 不需要转换的类
      minPixelValue: 1,  // 小于或等于1px的不转换成视窗单位
      mediaQuery: false  // 允许在媒体查询中转换为px
    }
  }
}