module.exports = {
    publicPath: './',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: { //配置跨域
            '/api': {
                target: 'https://api.server.test/v1/',
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}

