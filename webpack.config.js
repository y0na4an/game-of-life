const path = require('path');

module.exports = {
  entry: './src/app/gameBoard.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {test: /\.Sass/, use:['style-loader','css-loader','sass-loader']}
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  // changed line
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};