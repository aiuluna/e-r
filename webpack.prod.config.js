var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// var config = require('./config')



module.exports = {
  entry: [
    './client/app/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './client/build'),
    publicPath: "./",
    filename: '[name].[hash].js'
  },

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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{loader: 'css-loader'}, {loader: 'sass-loader'}]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
          'img-loader'
        ]
      },
      {test: /\.(gif|woff|svg|eot|ttf)$/, loader: "file-loader"}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // filename: path.resolve(__dirname, "./client/build/index.html"),
      filename: path.resolve(__dirname,"./client/build/index.html"),
      template: path.resolve(__dirname, "client/index.tmpl.html"),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CleanWebpackPlugin([
        path.resolve(__dirname,'./client/build/*.js'),
        path.resolve(__dirname,'./client/build/main.*.css'),
      ],
      {
        verbose: true,
        dry: false,
      })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'client/app')
    }
    // 这里可以使用alias配置项，可以显示的指定我们常用的一些库，避免webpack自己的查找
  }
}
;
