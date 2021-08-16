import axios from 'axios'

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // 2.axios拦截器
    // 2.1请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
    }, err => {

    })

    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {

    })

    // 2.发送网络请求
    // 返回一个promise
    // promise是什么？
    // 1、主要用于异步计算
    // 2、可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
    // 3、可以在对象之间传递和操作promise，帮助我们处理队列
    return instance(config)
}
