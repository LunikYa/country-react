const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: ["./src/components/App.js"],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: [{ loader: "html-loader" }]
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" },
                      { loader: "css-loader" }]
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        contentBase: "./dist",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: "bundle.js"
    },
};