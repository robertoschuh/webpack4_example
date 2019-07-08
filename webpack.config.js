var webpack = require('webpack');
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const inProduction = (process.env.NODE_ENV === 'production')

module.exports = {
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
            cache: inProduction,
            parallel: true,
            uglifyOptions: {
                compress: inProduction,
                ecma: 6,
                mangle: true
            },
            sourceMap: true
            })
        ]
    },
    // This line is not necessary at all.
   // entry: './src/main.js',   
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
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
                        },
                      },
                      'css-loader'
                ],
              },
        
            {
             
                // test: /\.s[ac]ss$/,
                // exclude: /node_modules/, 
                // use: [
                //     "style-loader", // creates style nodes from JS strings
                //     "css-loader", // translates CSS into CommonJS
                //     "sass-loader" // compiles Sass to CSS, using Node Sass by default
                // ]
                // test: /\.s[ac]ss$/,
                // use: ["style-loader", "css-loader", "sass-loader"]
            },
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"]
            // },
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
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
       
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
        

     
    ],
};