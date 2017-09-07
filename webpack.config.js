var webpack = require("webpack");
module.exports = {
  entry: __dirname+"/src/app/gameBoard.js",
  output: {
        path: __dirname+"/src/",
        filename: "bundle.js",
        publicPath: "app"
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude:/(node_modules)/,
        loader: 'babel-loader',
        query:{
          presets:['react','es2015','stage-2']
        }
      },
        {test: /\.Sass/, use:['style-loader','css-loader','sass-loader']}

    ]
  }
};
