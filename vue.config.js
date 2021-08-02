module.exports = {
    configureWebpack: {
        // 配置路径别名
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'common': '@/common',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}
