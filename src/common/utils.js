// 防抖和节流的目的都是为了减少不必要的计算，不浪费资源，只在适合的时候再进行触发计算。
// 防抖动函数：触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。
// 节流函数：当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数。
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}