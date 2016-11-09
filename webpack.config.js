module.exports = {
  entry: {
    runtime: './src/runtime.js',
    router: ['./src/router.js'],
    buildModuleParameters: ['./src/build-module-parameters.js'],
  },
  output: {
    filename: '/[name].js',
    path: __dirname + '/dist', // eslint-disable-line
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  module: {
    loaders: [{
      test: /^.+.(jsx?|esx?)$/,
      exclude: '/(node_modules|bower_components|.map)/',
      loader: 'babel',
      query: {
        presets: [
          'latest',
          'stage-0',
        ],
        plugins: [
          ['transform-runtime', {
            helpers: false,
            polyfill: false,
            regenerator: true,
          }],
        ],
      },
    }],
  },
  devtool: 'source-map',
};
