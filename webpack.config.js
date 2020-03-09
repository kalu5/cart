/*//插件的模块才需要引入  loader不需要引入
const path = require ('path'),
      webpack = require ('webpack'),
      uglify = require ('uglifyjs-webpack-plugin'),
      htmlWebpackPlugin = require ('html-webpack-plugin'),
      autoprefix = require ('autoprefixer'),
      cleanWebpackPlugin = require ('clean-webpack-plugin');

const config = {
    mode: 'development',//告诉打包工具是开发者模式
    entry: {
        index: path.resolve (__dirname, './src/js/index.js')   //找到根目录
    },     //入口   组件化模块化开发都需要入口

    output: {
        path: path.resolve (__dirname + '/dist'),// 出口 文件
        filename: 'js/[name] - [hash].js'     //[name]就是index
    },

    module: {
        rules: [
            //被处理的东西
            {
                test: /\.js$/,
                loader: 'babel-loader', //es6转es5
                exclude: path.resolve (__dirname, 'node_modules'),//不需要打包
                query: {
                    "presets": ["latest"]
                }
            },

            //匹配谁
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },

            //css
            {
                test: /\.css$/,
                //对个loader用数组  从下往上匹配
                use: [
                    {
                        loader: 'style-loader'
                    },

                    {
                        loader: 'css-loader'
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer ('last 5 versions')]
                            }
                        }
                    }
                ]
            },

            //sass
            {
                test: /\.scss$/,
                //对个loader用数组  从下往上匹配
                use: [
                    {
                        loader: 'style-loader'
                    },

                    {
                        loader: 'css-loader'
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer ('last 5 versions')]
                            }
                        }
                    },

                    {
                        loader: 'sass-loader'
                    }
                ]
            },

            //image
            {
                test: /\.(png|jpg|gif|jpeg|ico)$/i,
                loader: [
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },

    plugins: [
        new uglify (),
        new htmlWebpackPlugin ({
            //体积小化  压缩
            minify: {
                //没有注释
                removeComments: true,
                //不需要回车空白
                collapseWhitespace: true
            },
            //打包好的名称
            filename: 'index.html',
            //模板是什么
            template: path.resolve (__dirname, 'src/index.html'),
            title: '商品列表',
            excludeChunks: ['node_modules'],
            chunks: ['index'],
            hash: true
        }),
        new cleanWebpackPlugin ({
            //在编译之前要清除一次
            cleanOnceBeforeBuildPatterns: ['dist/js/*.js', 'dist/*.html', 'dist/img']
        })
    ],
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        open: true,
        host: 'localhost',
        port: 3333
    }
}

module.exports = config;*/

const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin =  require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const cleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
  	index: path.resolve(__dirname, './src/js/index.js'),
  	detail: path.resolve(__dirname, './src/js/detail.js'),
  	cart: path.resolve(__dirname, './src/js/cart.js')
  },
  output: {
  	path: path.resolve(__dirname + '/dist'),
  	filename: 'js/[name]-[hash].js',
    //publicPath:"./"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query:{
          "presets": ["latest"]
        }
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },
      {
        test:/\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          }
        ]
      },
      {
        test:/\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        loaders: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new uglify(),
    new htmlWebpackPlugin({
    	minify: {
    		removeComments: true,
    		collapseWhitespace: true
    	},
    	filename: 'index.html',
    	template: path.resolve(__dirname, 'src/index.html'),
    	title: '商品列表',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
    	chunks: ['index'],
      hash: true
    }),
    new htmlWebpackPlugin({
    	minify: {
    		removeComments: true,
    		collapseWhitespace: true
    	},
    	filename: 'detail.html',
    	template: path.resolve(__dirname, 'src/detail.html'),
    	title: '商品详情页',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
    	chunks: ['detail'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'cart.html',
      template: path.resolve(__dirname, 'src/cart.html'),
      title: '商品购物车',
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      chunks: ['cart'],
      hash: true
    }),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!dist/js', '!dist/*.html']
    })
  ], 
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    open: true,
    host: 'localhost',
    port: 3333
  }
}

module.exports = config;