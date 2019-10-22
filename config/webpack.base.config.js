const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getEntriesAndHtmls } = require('./common');
const config = require('./config');

const entriesAndHtmls = getEntriesAndHtmls();

module.exports = {
    // 1、填写项目的入口文件
    entry: entriesAndHtmls.enrties,

    // 2、填写项目的出口信息
    output: {
        path: config.outputPath,
        filename: '[name].js'
    },

    // 3、填写项目的loader 配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(__dirname, '../.cache-loader')
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, '../')
                            }
                        }
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(__dirname, '../.cache-loader')
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, '../')
                            }
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(j|t)sx?/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(__dirname, '../.cache-loader')
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },

    // 4、填写项目的plugin 配置
    plugins: [
        ...entriesAndHtmls.htmls, // html插件数组

        new ProgressBarPlugin({
            format: 'build [:bar] :percent (:elapsed seconds)',
            clear: false,
            width: 60
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),

        new TsconfigPathsPlugin({
            configFile: path.join(__dirname, '../', 'tsconfig.json'),
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        })
    ],

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },

    optimization: {
        splitChunks: {
            chunks: "all",         // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载）

            cacheGroups: {
                'asstets/vender': {
                    test: /node_modules/,
                    filename: '[name].js',
                    chunks: 'initial',
                    minChunks: 1,
                    priority: 10,
                    minSize: 0,
                    enforce: true,
                    name: 'asstets/vender'
                },

                'asstets/commons': {
                    filename: '[name].js',
                    chunks: 'initial',
                    test: /common/,
                    minChunks: 1,
                    minSize: 0,
                    name: 'asstets/commons',
                    enforce: true
                },

                'asstets/components': {
                    filename: '[name].js',
                    chunks: 'initial',
                    test: /components/,
                    minChunks: 1,
                    minSize: 0,
                    name: 'asstets/compoents',
                    enforce: true
                }
            }
        }
    },

    // 5、其他配置
    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules')
        ],

        extensions: [".ts", ".tsx", '.js', '.jsx', ".json"],

        alias: {
            '@common': path.resolve(__dirname, '../source/common'),
            '@components': path.resolve(__dirname, '../source/components'),
            '@views': path.resolve(__dirname, '../source/views'),
            '@models': path.resolve(__dirname, '../source/models'),
            '@services': path.resolve(__dirname, '../source/services'),
            '@genre': path.resolve(__dirname, '../source/genre')
        }
    }
};
