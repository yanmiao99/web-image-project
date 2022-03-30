module.exports = {
    publicPath: './',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: { //配置跨域
            '/api': {
                target: 'http://39.108.194.234:8080/',
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}

