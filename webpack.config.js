const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'lorehub-dialog-player.js',
        library: 'lorehub-dialog-player',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: 'babel-loader',
        }],
    },
};
