const webpack = require('webpack');
const path = require('path');
const argv = require('yargs').argv
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const inProduction = (argv.mode === 'production')

console.log('inProduction', inProduction);

module.exports = {
       
    entry: {
        app: './src/main.js'  
    }, 

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: inProduction ? '[name].[hash].jss' : '[name].jss',
        chunkFilename: inProduction ? '[id].[hash].jss' : '[id].jss'
    }, 
    optimization: {
        minimize: inProduction,
    },
 
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: './',
                            hmr: process.env.NODE_ENV ===  inProduction
                        },
                        },
                        'css-loader', 'sass-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: './',
                            hmr: process.env.NODE_ENV ===  inProduction
                         //   minimize: inProduction
                        //  reloadAll: true

                        },
                        },
                        'css-loader'
                    ]
            },        
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({

          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: inProduction ? '[name].[hash].css' : '[name].css',
          chunkFilename: inProduction ? '[id].[hash].css' : '[id].css'
        })    
    ]
};