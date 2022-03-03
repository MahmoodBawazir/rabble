module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./api/index.ts']

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
