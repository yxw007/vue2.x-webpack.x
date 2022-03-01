<template>
  <div class="app-contain">
    <h1>this is a template project</h1>
    <span>use: vue2.x + webpack4.x + babel7.x</span>
    <el-button @click="visible = true">Button</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        input: "",
      };
    },
  };
</script>

<style lang="scss" scoped>
  .app-contain {
    color: green;
  }
</style>
