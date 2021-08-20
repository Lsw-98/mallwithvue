<template>
  <div class="check-btn" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-btn {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  border-color: red;
  background-color: red;
}
</style>