const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'lorehub-dialog-player.js',
        library: 'lorehub-dialog-player',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         exclude: /(node_modules)/,
    //         use: 'babel-loader',
    //     }],
    // },
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin({
            extractComments: true,
            terserOptions: {
                keep_classnames: true
            }
        })],
    }
};
