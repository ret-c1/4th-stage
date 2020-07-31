const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');

function createWebpackMiddleware(compiler, publicPath) {
    return webpackDevMiddleware(compiler, {
        logLevel: 'warn',
        publicPath,
        silent: true,
        stats: 'errors-only',
    });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
    const compiler = webpack(webpackConfig);
    const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.use(
        '/ahopen2',
        proxy({
            target: 'http://192.168.31.125:23010',
            changeOrigin: true,
            secure: false,
        }),
    );

    app.use(
        '/ahopen',
        proxy({
            target: 'https://192.168.31.125:23010',
            changeOrigin: true,
            secure: false,
        }),
    );

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
        fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send(file.toString());
            }
        });
    });
};
