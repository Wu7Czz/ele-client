const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: isProduction
    ? '/'
    : '/',

  outputDir: 'dist',

  assetsDir: 'static',

  filenameHashing: true,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: config => {
    config.resolve.alias.assets = '@/assets'
    config.resolve.alias.components = '@/components'
    config.resolve.alias.views = '@/views'
    config.resolve.alias.styles = '@/styles'
    config.optimization = {
      splitChunks: {
        chunks: 'all'
      }
    }
    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'vant': 'vant'
      }
    }
  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization
      .splitChunks({
        cacheGroups: {}
      })
    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    config.module
      .rule('eslint')
      .exclude
      .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
      .end()
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },

      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,

    host: '0.0.0.0',
    disableHostCheck: true,

    port: 3000,

    https: false,

    hotOnly: false,
    proxy: {// 配置跨域
      '/api': {
        target: isProduction
          ? 'http://47.101.11.217:3030/'
          : 'http://localhost:3030/',
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': ''// 请求的时候使用这个api就可以
        }
      }
    },
    before: app => {
    }
  },

  // 第三方插件配置
  pluginOptions: {}
}
