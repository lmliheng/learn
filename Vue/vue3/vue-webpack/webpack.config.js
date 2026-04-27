const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',

    entry: './src/main.js',

    resolve: {
        extensions: ['.js', '.vue', '.json']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                type: 'javascript/auto',
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        static: './dist',
        hot: true,
        open: true
    }
}