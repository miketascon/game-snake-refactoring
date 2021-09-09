const path = require('path');

module.exports = {
    entry: './src/main.js', 
    output: {
        // path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: { 
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/'), // directory content the index.html
        },
        compress: true,
        port: 8081,
    },
    mode: 'development',

};