<template>
  <div class="app-contain">
    <h1>this is a template project</h1>
    <span>use: vue2.x + webpack4.x + babel7.x</span>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
  };
</script>

<style lang="scss" scoped>
  .app-contain {
    color: green;
  }
</style>
