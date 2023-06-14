// Merges different configurations for webpack
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    // Important line required to avoid issues with nested routing
    // in development environment, the '/' at the end is very important!!
    output: {
        publicPath: 'http://localhost:8082/',
    },
    devServer: {
        port: 8082,
        // Important for navigation
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap',
            },
            // Do it automatically
            shared: packageJson.dependencies,
            //shared: ['react', 'react-dom'],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);
