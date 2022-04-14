/*
 * @Author: fantiga
 * @Date: 2022-04-14 21:56:08
 * @LastEditTime: 2022-04-14 21:56:10
 * @LastEditors: fantiga
 * @Description: 
 * @FilePath: /snake-ts/webpack.config.js
 */

const path = require('path');

// 引入HTML插件
const HTMLWebpackPlugin = require('html-webpack-plugin')

// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
    // 指定打包模式：'none' | 'development' | 'production'
    mode: 'development',
    // 指定入口文件
    entry: './src/index.ts',
    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: 'bundle.js',
        // 告诉webpack不使用箭头函数
        environment: {
            // arrowFunction: false
        }
    },
    // 指定webpack打包时要用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件  
                test: /\.js$/,
                // 要使用的loader
                use: 'babel-loader',
                // 要排除的文件
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.ts(x)?$/,
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的浏览器
                                        targets: {
                                            'chrome': '88'
                                        },
                                        // 指定corejs的版本
                                        'corejs': '3',
                                        // 使用corejs的方式，'usage'表示按需加载
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }

                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    // 设置哪些文件可以用于引用模块
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.webpack.js', '.web.js']
    },
    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin()
    ]
};

module.exports = config;