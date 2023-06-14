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
        publicPath: 'http://localhost:8083/',
    },
    devServer: {
        port: 8083,
        // Important for navigation
        historyApiFallback: true,
        // Required here because of load of font files
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap',
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
