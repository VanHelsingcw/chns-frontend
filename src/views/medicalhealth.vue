<template>
  <div class="medical-container" v-loading.fullscreen.lock="loading" element-loading-text="正在加载" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 年份选择器部分 -->
    <div class="year-selector">
      <div class="selectTitle">
        <i class="el-icon-office-building"></i>&nbsp;选择年份
      </div>
      <div class="selectContent">
        <el-select v-model="year" clearable placeholder="请选择年份">
          <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <!-- 查询按钮 -->
        <el-button type="primary" @click="showChart">查询医疗情况</el-button>
      </div>
    </div>
    <!-- 总览图表部分 -->
    <div class="textContent" v-for="(item,index) in overviewDataArr" :key="index">
      <div v-if="isShowChart">
        <!-- 标题部分 -->
        <div class="title">{{item.title}}</div>
        <!-- 文本内容部分 -->
        <el-alert :title="item.text" type="info" :closable="false"></el-alert>
        <!-- 引用图表 -->
        <barChart class="grid item" :ref="item.type" :chartId="item.type"></barChart>
      </div>
    </div>
    <!-- 页脚为了不让图表贴边，留点空隙直接插入footer这个div -->
    <div class="footer"></div>
  </div>
</template>

<script>
// import { getAllDiseasePrevalenceAPI } from '../api/allDiseasePrevalenceAPI.js'
import barChart from '@/charts/barChart.vue'

export default {
  name: 'medicalhealth',
  components: {
    barChart
  },
  data() {
    return {
      // 用户所选择的年份
      year: '2015',
      // 年份列表
      yearList: ['1989', '1991', '1993', '1997', '2000', '2004', '2006', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
      // 是否展示图表
      isShowChart: false,
      // 图表查询时候还未加载时的特效
      loading: false,
      // 图表数据
      overviewDataArr: [
        {
          title: '患病情况',
          type: 'disease',
          text: '患病情况调查中，发烧、喉咙痛、咳嗽的患病率最高',
          chart: {
            chartData: [],
            title: '各疾病患病率'
          }
        },
        {
          title: '身体检查',
          type: 'bodyExam',
          text: '身体检查调查中，全身检查的检查率最高',
          chart: {
            chartData: [],
            title: '各身体检查项检查率'
          }
        },
        {
          title: '医疗保险',
          type: 'insurance',
          text: '医疗保险的调查中，合作保险的拥有率最高',
          chart: {
            chartData: [],
            title: '各类保险拥有率'
          }
        },
        {
          title: '医疗帮助',
          type: 'help',
          text: '医疗帮助调查中，看医生的选择率最高',
          chart: {
            chartData: [],
            title: '医疗帮助项的选择率'
          }
        }
      ],
      // 从服务器中传来的数据
      diseaseResponseData: {
        data: {
          哮喘: 0.69,
          '头痛-头晕': 4.25,
          眼耳病: 1.17,
          非传染性疾病: 2.38,
          '关节-肌肉疼痛': 4.76,
          其他传染病: 0.1,
          胃痛: 1.88,
          '发烧-喉咙痛-咳嗽': 7.5,
          '心脏病-胸痛': 1.85,
          '皮疹-皮炎': 0.69,
          '腹泻-胃痛': 1.35
        },
        year: '2015',
        message: 'OK',
        url: 'http://114.55.25.220:8080/chnsx/medical/statistics/disease',
        timestamp: '2021-05-18 01:21:25 UTC',
        status: 200
      },
      // diseaseResponseData: {},
      bodyExamResponseData: {
        data: {
          血检: 0.51,
          视力或听力检查: 0.04,
          全身体检: 1.79,
          产后检查: 0.01,
          妇科检查: 0.07,
          产前检查: 0.06,
          血压筛查: 1.09,
          其它检查: 0.18,
          肿瘤筛查: 0.07
        },
        year: '2015',
        message: 'OK',
        url: 'http://114.55.25.220:8080/chnsx/medical/statistics/bodyExam',
        timestamp: '2021-05-18 01:45:30 UTC',
        status: 200
      },
      insuranceResponseData: {
        data: {
          城市居民基本保险: 19.19,
          合作保险: 52.66,
          其它: 1.11,
          免费医疗保险: 2.63,
          商业保险: 3.47,
          城市雇员基本保险: 22.71
        },
        year: '2015',
        message: 'OK',
        url: 'http://114.55.25.220:8080/chnsx/medical/statistics/insurance',
        timestamp: '2021-05-18 01:45:53 UTC',
        status: 200
      },
      helperResponseData: {
        data: { 咨询当地的健康工作者: 2.42, 自我护理: 5.91, 看医生: 7.8, 完全没关注: 1.23 },
        year: '2015',
        message: 'OK',
        url: 'http://114.55.25.220:8080/chnsx/medical/statistics/helper',
        timestamp: '2021-05-18 01:46:14 UTC',
        status: 200
      }
    }
  },
  methods: {
    // 展示图表
    showChart() {
      // 调用API函数，实现新年份数据的赋值(每次选择新的年份，要重新获取数据并展示)
      // this.getAllDiseasePrevalence()
      // 延迟两秒展示图表，在延迟期间显示加载特效
      this.loading = true
      setTimeout(() => {
        this.isShowChart = true
        this.getChartData()
        this.loading = false
      }, 2000)
    },
    // 将图表展示的数据赋值给overviewDataArr中进行展示
    getChartData() {
      let that = this

      setTimeout(() => {
        that.overviewDataArr[0].chart.chartData = that.diseaseResponseData.data
        that.showBarChart(0)
        that.overviewDataArr[1].chart.chartData = that.bodyExamResponseData.data
        that.showBarChart(1)
        that.overviewDataArr[2].chart.chartData = that.insuranceResponseData.data
        that.showBarChart(2)
        that.overviewDataArr[3].chart.chartData = that.helperResponseData.data
        that.showBarChart(3)
      }, 0)
      // }, 1000)
    },
    // 找到对应的图表的dom元素，并赋值对应的数据
    showBarChart(index) {
      let str = this.overviewDataArr[index].type
      this.$refs[str][0].getData(this.overviewDataArr[index].chart, 'health', this.year)
    }
    // 利用axios访问数据库中查询某年所有疾病的患病率
    // async getAllDiseasePrevalence() {
    //   const { data: res } = await getAllDiseasePrevalenceAPI(this.year)
    //   this.diseaseResponseData = res
    // }
  }
  // 用于在页面渲染之前并且数据和方法已经可以用的时候，利用axios发起请求，并传到前端对应的数据上。
  // created() {
  //   this.getAllDiseasePrevalence()
  // }
}
</script>

<style lang="less" scoped>
.year-selector {
  margin: 0px 30px;
  padding-top: 40px;
}
.selectTitle {
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
  margin-bottom: 30px;
}
.el-button {
  margin-left: 20px;
}
.textContent {
  margin: 0 30px;
}
.title {
  font-size: larger;
  color: rgb(64, 158, 255);
  font-weight: bold;
  margin-top: 50px;
}
.el-alert {
  margin-top: 30px;
  font-size: 10px;
  margin-bottom: 20px;
}
.footer {
  height: 30px;
}
</style>
