const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'lorehub-dialogue-player.js',
        library: 'lorehub-dialogue-player',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
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
