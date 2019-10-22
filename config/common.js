const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

function copyStaticSource2Assets() {
    const env = process.env.NODE_ENV;
    const DEVSTATICSOURCE = [
        '/node_modules/react/umd/react.development.js',
        '/node_modules/react-dom/umd/react-dom.development.js'
    ];
    const PRODSTATICSOURCE = [
        '/node_modules/react/umd/react.production.min.js',
        '/node_modules/react-dom/umd/react-dom.production.min.js'
    ];
    const STATICSOURCE = env === 'production' ? PRODSTATICSOURCE : DEVSTATICSOURCE;

    STATICSOURCE.forEach((v) => {
        const filePath = path.join(__dirname, '../', v);
        const targetFilePath = path.join(config.outputPath, v);
        if (fs.existsSync(targetFilePath)) {
            return;
        }
        fs.copySync(filePath, targetFilePath);
    });
}

function getEntriesAndHtmls() {
    copyStaticSource2Assets();

    // 页面地址
    const pagesPath = path.resolve(__dirname, '../source/pages');
    // 获取 pages 目录下的文件夹
    const pages = fs.readdirSync(pagesPath);

    // 根据文件夹查找页面
    const enrties = {};
    pages.forEach((item) => {
        enrties[`pages/${item}/index`] = path.resolve(__dirname, `../source/pages/${item}/index.ts`);
    });

    // 配置 HtmlWebpackPlugin
    const htmls = pages.map(item => {
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../template/index.ejs'),
            chunks:[`pages/${item}/index`, 'asstets/vender', 'asstets/commons', 'asstets/compoents'],
            filename : item === "index" ? "index.html" : `./html/${item}.html`, //html位置, 判断 pages 中是不是有 index 目录，如有则认为是单页应用
            minify:{//压缩html
                collapseWhitespace: true,
                preserveLineBreaks: true
            },
            title: 'batman 平台',
            scripts: [
                '/node_modules/react/umd/react.development.js',
                '/node_modules/react-dom/umd/react-dom.development.js'
            ]
        });
    });

    return {
        enrties,
        htmls
    };
}

module.exports = {
    getEntriesAndHtmls
};
