const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin([
            {
                from: 'src/**/*',
                ignore: ['*.js'],
                transformPath(targetPath) {
                    targetPath = targetPath.substring(4, targetPath.length)
                    return targetPath;
                },
            },
        ]),
    ],
    mode: 'development',
};