<template>
  <!-- <el-header> -->
  <el-card shadow="hover">
    <el-row class="row">
      <!-- 图标部分 -->
      <el-col :span="2" :offset="0">
        <div id="icons">
          <el-avatar shape="square" :size="50" :src="logoUrl"></el-avatar>
        </div>
      </el-col>
      <!-- 字体部分 -->
      <el-col :span="4">
        <div id="header-text">微观中国</div>
      </el-col>
      <!-- 右侧菜单栏部分 -->
      <el-col :span="8" :offset="10">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <!-- @select="handleSelect" -->
          <el-menu-item index="1" @click="changeMenu('analysis')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;画像&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-menu-item>
          <el-submenu index="2">
            <template slot="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总览概况&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
            <el-menu-item index="2-1" @click="changeMenu('health')">医疗总览</el-menu-item>
            <el-menu-item index="2-2" @click="changeMenu('property')">财产总览</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-card>
  <!-- </el-header> -->
</template>

<script>
import logo from '@/assets/logo.png'
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1',
      logoUrl: logo
    }
  },
  methods: {
    changeMenu(str) {
      if (str === 'analysis') this.$router.push('/filterpage')
      if (str === 'health') this.$router.push('/medicalhealth')
      if (str === 'property') this.$router.push('/property')
    }
  }
}
</script>

<style lang="less">
.el-row {
  height: 100%;
}

.row {
  height: 60px;
}

.el-avatar {
  display: contents;
}

.el-col {
  height: 100%;
}

.el-card {
  height: 100%;
  width: 100%;
  padding: 0px;
  border: none !important;
  border-radius: 0px !important;
  .el-card__body {
    padding: 0px;
  }
}

.el-col-2 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-col-4 {
  display: flex;
  align-items: center;
  font-size: larger;
}

.el-col-8 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-header {
  padding: 0px;
  /* position: fixed; */
  width: 100%;
  z-index: 99;
}
#header-text {
  display: flex;
  align-items: center;
  line-height: 60px;
  margin-left: 10px;
}
#icons {
  width: 60px;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
}
.el-avatar > img {
  width: 60px;
  height: 60px;
}
</style>
