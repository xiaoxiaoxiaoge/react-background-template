module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 'postcss-pxtorem': {
    //   rootValue: 16,
    //   propList: ['*'], // 除 border 外所有px 转 rem
    //   exclude: (e) => {
    //     if (/src(\\|\/)views(\\|\/)AssetMap(\\|\/)BigScreen/.test(e) || /src(\\|\/)views(\\|\/)Welcome/.test(e)) {
    //       return false
    //     } else {
    //       return true
    //     }
    //   }, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module|src)/
    //   replace: true, // 替换包含rems的规则。
    //   mediaQuery: true, // （布尔值）允许在媒体查询中转换px。
    //   minPixelValue: 0 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
    // }
  }
}
