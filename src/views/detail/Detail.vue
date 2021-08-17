<template>
  <div class="detail">
    <h2>{{ iid }}</h2>
  </div>
</template>

<script>
export default {
  name: "Detail",

  data() {
    return {
      iid: null,
    };
  },

  created() {},

  activated() {
    this.iid = this.$route.params.iid;
  },
};
</script>

<style scoped>
</style>