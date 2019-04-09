const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/index.jsx',
  output: {
    path: path.resolve('./dist'),
    filename: 'static/app/js/[name].[hash].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".jsx", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
   new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8090
  }
};