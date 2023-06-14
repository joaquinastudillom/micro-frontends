// Merges different configurations for webpack
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    // Important line required to avoid issues with nested routing
    // in development environment, the '/' at the end is very important!!
    output: {
        publicPath: 'http://localhost:8080/',
    },
    devServer: {
        port: 8080,
        // Important for navigation
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
            },
            // Do it automatically
            shared: packageJson.dependencies,
            //shared: ['react', 'react-dom'],
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);
