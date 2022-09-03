const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: undefined,
        filename: 'static/js/[hash][name].js'
    },
    module: {
        rules:[
            // js
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            // style/css
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // 图片资源
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                      maxSize: 10 * 1024 // 10kb
                    }
                },
                generator: {
                    filename: 'static/assets/images/[hash][ext][query]'
                }
            },
            // vue
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html',
        }),
    ],
    // 开发服务器
    devServer: {
        host: "localhost",
        port: "1688",
        open: true
    }
}