const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        watchFiles: ['index.html', 'src/**/*'],
        open: true,
        client: {
            overlay: {
                warnings: false,
                errors: true,
            },
        }
    },
})