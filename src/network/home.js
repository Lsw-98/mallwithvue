// 封装好要在Home.vue中导入
import { request } from "./request";

// 封装首页url请求
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

// 封装三个标题的请求
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}
