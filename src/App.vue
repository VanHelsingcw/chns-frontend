<template>
  <div id="app">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
#app {
  // background-color: skyblue;
  background-color: rgb(249, 249, 249);
  // height: 500px;
  // width: 1349px;
}
.Header {
  z-index: 99;
}
.content {
  margin:20px auto;
  background-color: white;
  width: 95%;
  // height: 2000px;
  height: 100%;
}
</style>
