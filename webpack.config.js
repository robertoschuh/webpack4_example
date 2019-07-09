const webpack = require('webpack');
const path = require('path');
const glob = require('glob')
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const inProduction = (argv.mode === 'production');

const PATHS = {
    src: path.join(__dirname, 'src')
};

module.exports = {
       
    
   // This line is not necessary at all.
    entry: {
        app: './src/main.js'  
    }, 

    output: {
        path: path.resolve(__dirname, './dist'),
       // filename: '[name].[hash].js',
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
        }),
        
        // Adding html for testing.
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: inProduction ? 'index.[hash].html' : 'index.html',
            template: 'src/views/index.html'
        }),

        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })

        })
    ]
};