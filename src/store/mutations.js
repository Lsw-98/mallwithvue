import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成单一的事情, 判断逻辑放到actions中
    [ADD_COUNTER](state, payload) {
        payload.count += 1
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = false
        state.cartList.push(payload)
    }
}