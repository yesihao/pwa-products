'use strict'

const ORIGIN = 'http://www.yesihao.tk/'
const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const Extract = require('extract-text-webpack-plugin')
const extractOther = new Extract({ allChunks: true, filename: 'o.[contenthash:base64:8].css' })
const extractMain = new Extract({ allChunks: true, filename: 'm.[contenthash:base64:8].css' })

const autoprefixer = require('autoprefixer')

const nenv = 'build'

const statsConfig = {
  children: false,
  maxModules: 0
}
const configs = {
  base: {
    entry: {
      main: './src/index.js',
      polyfill: './src/polyfill.js',
      vendor: [
        'history',
        'immutable',
        'prop-types',
        'react',
        'react-dom',
        'react-loadable',
        'react-redux',
        'react-router-dom',
        'redux',
        'redux-immutablejs',
        'redux-thunk',
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
      publicPath: '/',
    },
    module: {
      rules: [{
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.s(c|a)ss$/,
        exclude: [
          /node_modules/,
          /bulma/,
        ],
        use: extractMain.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                modules: true,
                minimize: nenv === 'build',
                localIdentName: '[hash:base64:8]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    new autoprefixer()
                  ]
                }
              }
            },
            'sass-loader'
          ]
        })
      }, {
        test: /\.css$/,
        use: extractOther.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: nenv === 'build',
              }
            }
          ]
        })
      }, {
        test: /\.s(c|a)ss$/,
        include: /bulma/,
        use: extractOther.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: nenv === 'build',
              }
            },
            'sass-loader'
          ]
        })
      }, {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:base64:8].[ext]'
            }
          }
        ]
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:base64:8].[ext]'
            }
          }
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body'
      }),
      extractOther,
      extractMain,
    ],
    stats: statsConfig
  },
  build: {
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.NamedChunksPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false
      }),
      // seperate vendor, polyfill, and webpack runtime from app code for long-term caching
      new webpack.optimize.CommonsChunkPlugin({
        names: ['polyfill', 'vendor', 'runtime'],
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        minChunks: 2,
        children: true,
        deepChildren: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.ORIGIN': JSON.stringify(ORIGIN)
      }),
    ],
  }
}

if (configs[nenv]) {
  module.exports = merge(configs['base'], configs[nenv])
} else {
  module.exports = configs['base']
}
