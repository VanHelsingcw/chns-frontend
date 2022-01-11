<template>
  <div class="personal-container">
    <el-page-header @back="goBack" content="个人信息"></el-page-header>
    <div class="textContent">
      <h3>基本信息</h3>
      <el-row class="basic-info">
        <el-col :span="12" class="name">id:{{id}}</el-col>
        <el-col :span="12" class="gender">性别：{{gender}}</el-col>
        <el-col :span="12" class="age">年龄：{{age}}</el-col>
        <el-col :span="12" class="nation">民族：{{nation}}</el-col>
        <el-col :span="12" class="province">省份：{{province}}</el-col>
        <el-col :span="12" class="cityType">城市/农村：{{cityType}}</el-col>
      </el-row>
      <h3>医疗情况</h3>
      <el-table :data="tableData" stripe style="width:100%">
        <el-table-column prop="item" label="项目" width="200"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personalView',
  props: {
    pid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 个人信息数据
      id: ' 20211212',
      age: '25',
      gender: '男',
      nation: '汉',
      province: '吉林省',
      cityType: '城市',
      tableData: [
        {
          item: '医疗保险',
          desc: '拥有的医疗保险类型有：『 商业保险 城市雇员基本保险 』'
        },
        {
          item: '患病情况',
          desc: '在近一个月内有过『 发烧-喉咙痛-咳嗽 头痛-头晕 』的症状'
        },
        {
          item: '身体检查',
          desc: '进行过的身体检查有：『 血压筛查 』'
        },
        {
          item: '医疗费用',
          desc: '2015年的医疗总花费为：『 xx元 』，其中预防性医疗费用占比xx%，总治疗费用占比xx%'
        },
        {
          item: '医疗帮助',
          desc: '当感到不舒服时，选择了『 看医生  』，地点是『 工作单位诊所 』'
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/filterRes')
    }
  }
}
</script>

<style scoped>
.el-page-header {
  margin: 0 20px;
  padding-top: 15px;
  margin-bottom: 30px;
  font-weight: 700;
}
h3 {
  margin-left: 20px;
  padding-bottom: 10px;
}
.basic-info {
  margin-left: 20px;
  margin-bottom: 20px;
  width: 60%;
}
.basic-info div {
  margin-bottom: 15px;
  border-left: 3px solid rgb(64, 158, 255);
  padding-left: 20px;
}
.el-table {
  margin: 0 20px;
  width: auto !important;
}
</style>
