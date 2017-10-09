var webpack = require('atool-build/lib/webpack');

module.exports = function (webpackConfig, env) {
    webpackConfig.babel.plugins.push(['import', {
        libraryName: 'antd'
    }]);
    webpackConfig.plugins.some(function (plugin, i) {
        if (plugin instanceof webpack.optimize.CommonsChunkPlugin) {
            webpackConfig.plugins.splice(i, 1, new webpack.optimize.CommonsChunkPlugin({
                names: ['reacts'],
                minChunks: 2
            }));
            return true;
        }
    });
    return webpackConfig;yzerPlu
};
