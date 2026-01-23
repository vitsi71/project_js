import path from "node:path";
import {fileURLToPath} from "node:url";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: "./src/app.js",
    mode: "development",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                // test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true, //для перевода на главную страницу при ошибке 404(если сервер не нашел страницу)
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html" // для копирования существующего файла, а не создания нового
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
                {from: "./src/static/images", to: "images"},
                {from: "./src/static/js", to: "js"},
                {from: "./src/static/js/bootstrap.js", to: "js"},
                {from: "./src/static/css", to: "css"},
                {from: "./src/static/fonts", to: "fonts"},
            ],
        }),
    ],
};