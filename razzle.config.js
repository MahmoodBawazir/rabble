const path = require('path')

module.exports = {
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
      /api/,
    ])

    return webpackOptions
  },
}
