const path = require('path')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./backend/index.ts']

    config.output.path = path.join(process.cwd(), 'build-api')

    config.resolve = {
      extensions: ['.ts'],
    }

    config.module.rules.push({
      test: /\.ts?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        configFile: 'tsconfig.api.json',
      },
    })

    return config
  },
}
