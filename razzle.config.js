const path = require('path')

module.exports = {
  modifyWebpackConfig({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackConfig, // the created webpack config
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions, // the modified options that was used to configure webpack/ webpack loaders and plugins
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    webpackConfig.node = {
      fs: 'empty',
    }

    return webpackConfig
  },
  modifyWebpackOptions({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    options: {
      webpackOptions, // the default options that will be used to configure webpack/ webpack loaders and plugins
    },
  }) {
    // https://github.com/jaredpalmer/razzle/blob/master/packages/razzle/config/createConfigAsync.js#L292
    // needed for typescript: concat additional includes, by default only src folder is included
    webpackOptions.babelRule.include = webpackOptions.babelRule.include.concat([
      /typings/,
      /shared/,
      /backend/,
    ])

    return webpackOptions
  },
}
