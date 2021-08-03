// 封装首页url请求

import { request } from "./request";

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}