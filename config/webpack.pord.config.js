const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptmizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfog = require('./webpack.base.config');

const pordConfig = {
    mode: 'production',

    optimization: {
        minimizer: [
            new TerserPlugin({ parallel: true }),
            new OptmizeCssAssetsWebpackPlugin()
        ]
    }
};

module.exports = merge(baseConfog, pordConfig);
