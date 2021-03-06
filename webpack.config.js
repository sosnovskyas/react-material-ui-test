const {resolve} = require('path');
const webpack = require('webpack');

module.exports = env => {
    return {
        entry: [
            'react-hot-loader/patch',
            //activate HMR for React

            'webpack-dev-server/client?http://localhost:8080',
            //bundle the client for webpack dev server
            //and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            //bundle the client for hot reloading
            //only- means to only hot reload for successful updates


            './index.js'
            //the entry point of our app
        ],
        output: {
            filename: 'bundle.js',
            //the output bundle

            path: resolve(__dirname, 'dist'),

            publicPath: '/'
            //necessary for HMR to know where to load the hot update chunks
        },

        context: resolve(__dirname, 'src'),

        devtool: 'inline-source-map',

        devServer: {
            hot: true,
            //activate hot reloading

            contentBase: resolve(__dirname, 'dist'),
            //match the output path

            publicPath: '/'
            //match the output publicPath
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: [
                        'babel-loader',
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader?modules',
                        'postcss-loader',
                    ],
                },
            ],
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            //activates HMR

            new webpack.NamedModulesPlugin(),
            //prints more readable module names in the browser console on HMR updates
        ],
    };
};