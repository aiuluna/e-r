var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './client/app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'client/build/'),
    publicPath: "/client/build/",
    filename: 'bundle.js'
  },
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack',
          'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-2']
      },
      {
        test: /\.css|\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }, {
          loader: "postcss-loader"
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=8192',
          'img-loader'
        ]
      },
      {test: /\.(gif|woff|svg|eot|ttf)$/, loader: "file-loader"}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热加载插件
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'client/app')
    }
    // 这里可以使用alias配置项，可以显示的指定我们常用的一些库，避免webpack自己的查找
  },
  devServer: {
    port: 8082,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:' + (process.env.PORT || 3000)
      }
    },
    disableHostCheck: true
  }
};
