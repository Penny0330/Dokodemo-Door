const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
        assetModuleFilename: '[name][ext]',
        clean: true,
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
                exclude: /\.module.css$/,
            },
            {
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                            modules: {
                                    localIdentName: '[name]__[local]__[hash:base64:5]'
                            },
                        },
                    }
                ],
                include: /\.module.css$/i,
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
}