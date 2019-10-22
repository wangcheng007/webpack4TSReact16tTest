const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const baseConfog = require('./webpack.base.config');

const devConfig = {
    mode: 'development',
    devtool: 'source-map',

    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8001/index.html'
        })
    ],

    devServer: {
        disableHostCheck: true,
        overlay: true, // 浏览器页面上显示错误
        inline: true,
        compress: true,
        port: 8001,
        hot: true, // 使用热加载插件 HotModuleReplacementPlugin
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
                changeOrigin: true
            }
        }
    }
};

module.exports = merge(baseConfog, devConfig);
