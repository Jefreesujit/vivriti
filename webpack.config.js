module.exports = env => {
  return {
    entry: [
      './public/index.js'
    ],
    output: {
      filename: './public/index.build.js'
    },
    module: {
      loaders: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }, {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }]
    },
    devtool: 'inline-source-map'
  };
};