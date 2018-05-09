var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var TARGET = process.env.NODE_ENV
var NODE_DIR = path.join(__dirname, 'node_modules')
var SRC_DIR = path.join(__dirname, 'src')
var DEST_DIR = path.join(__dirname, 'dist')

var plugins = [
  //add min to file for minification
    new ExtractTextPlugin("styles.css")
]

module.exports = {
  entry: './src/main.js',
  output: {
    path: DEST_DIR,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },{
				test: /\.json$/,
				loader: 'json',
				include: [SRC_DIR, NODE_DIR]
			}, {
				test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader']
        }),
				include: SRC_DIR
			}, {
				test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        }),
				include: SRC_DIR
			}, {
				test: /\.(png|jpg|jpeg|gif|webp|mp3)$/,
				loader: 'file-loader?name=media/[name].[ext]',
				include: SRC_DIR
			},
      {
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader?name=fonts/[name].[ext]',
				include: SRC_DIR
			}
    ]
  },
  plugins: [
    //add min to file for minification
      new ExtractTextPlugin({filename: "styles.css"}),
      new CopyWebpackPlugin([
            {from:'src/media',to:'media'},
            {from:'src/fonts',to:'fonts'}
        ])
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
