const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/loader.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: './',
        filename: 'js/app.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            // mp3 
            {
                test: /\.(ttf|mp3|wav)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: 'resourse/sounds/[name].[ext]',
                    }
                }
            },
            // css文件处理 
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // sass文件处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            // 图片配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resourse/media/[name].[ext]'
                    }
                }]
            },
            // 字体文件配置
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resourse/font/[name].[ext]'
                    }
                }]
            },
            // sprites
            {
                test: /\.(json|atlas|conf|ani)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: 'resourse/media/[name].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({ template: './index.html' }),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),
        // 提出公共模块
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'js/base.js'
        // })
        // 清理 dist
        new CleanWebpackPlugin('dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
    devServer: {
        port: "8086"
    },
};