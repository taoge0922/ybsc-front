<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  html, body {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    overflow: hidden;
  }

#app {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
}
</style>
