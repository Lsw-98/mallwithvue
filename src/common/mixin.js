// 导入防抖动js
import { debounce } from "./utils";

export const itemImageListenerMixin = {
    data() {
        return {
            itemImageListener: null,
        }
    },

    mounted() {
        // 1.图片加载完成的事件监听
        let refresh = debounce(this.$refs.scroll.refresh, 500);
        this.itemImageListener = () => {
            refresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImageListener);
    }
}