// 请求详情页数据

import { request } from "./request"

export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}

// 定义一个商品信息类，请求需要用到的商品信息，用到详情页中
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

// 实例化商品信息类
// const g = new GoodsInfo()


// 定义店铺信息类
export class ShopInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

// 商品参数
export class GoodsParam {
    constructor(info, rule) {
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}