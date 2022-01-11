<template>
  <div class="property-container" v-loading.fullscreen.lock="loading" element-loading-text="正在加载" element-loading-background="rgba(0, 0, 0, 0.8)">
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
        <el-button type="primary" @click="showChart">查询财产情况</el-button>
      </div>
    </div>
    <!-- 总览图表部分 -->
    <div class="textContent" v-for="(item,index) in dataLists" :key="index">
      <div v-if="isShowChart">
        <!-- 标题部分 -->
        <div class="title">{{item.title}}</div>
        <!-- 文本内容部分 -->
        <!--todo: text文本，本应该由后端直接返回,但目前后端仅返回的是红色高亮文字，且顺序有误，因此先用固定文本展示-->
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
import barChart from '@/charts/barChart.vue'

export default {
  name: 'property',
  components: {
    barChart
  },
  data() {
    return {
      isShowChart: false,
      loading: false,
      year: '2015',
      yearList: ['1989', '1991', '1993', '1997', '2000', '2004', '2006', '2009', '2011', '2015'],
      dataLists: [
        {
          title: '住房情况',
          text: '家庭的住所情况中，拥有住房的占比最大，向个人租房的占比最小',
          type: 'bar1',
          textArr: ['家庭的住所情况中，', '的占比最大，', '的占比最小']
        },
        {
          title: '家庭用水',
          text: '家庭使用的饮水中，大多数人为饮用水支付费用',
          type: 'bar2',
          textArr: ['家庭使用的饮水中，大多数人']
        },
        {
          title: '家庭饮水',
          text: '家庭获得的饮用水中中，室内自来水占比最大，其他地方的占比最小',
          type: 'bar3',
          textArr: ['家庭获得的饮用水中，', '的占比最大，', '的占比最小']
        },
        {
          title: '家庭饮水',
          text: '多数家庭选择饮用前不过滤水',
          type: 'bar4',
          textArr: ['多数家庭选择']
        },
        {
          title: '室内财产',
          text: '家庭拥有的家电中，拥有彩电的占比最大，拥有空气净化器的占比最小',
          type: 'bar5',
          textArr: ['家庭拥有的家电中，拥有', '的占比最大，拥有', '的占比最小']
        },
        {
          title: '家庭设施',
          text: '家庭使用的烹饪燃料中，天然气等的占比最大，木炭占比最小',
          type: 'bar6',
          textArr: ['家庭使用的烹饪燃料中，', '等的占比最大，', '的占比最小']
        },
        {
          title: '家庭设施',
          text: '家庭使用的厕所设施类型中，室内可以冲水的占比最大',
          type: 'bar7',
          textArr: ['家庭使用的厕所设施类型中，', '的占比最大']
        },
        {
          title: '家庭设施',
          text: '家庭使用照明类型中，使用电气的占比最大，使用油的占比最小',
          type: 'bar8',
          textArr: ['家庭使用照明类型中，使用', '的占比最大，使用', '的占比最小']
        },
        {
          title: '室外财产',
          text: '家庭拥有车辆中，拥有自行车的占比最大，拥有三轮车的占比最小',
          type: 'bar9',
          textArr: ['家庭拥有车辆中，拥有', '的占比最大，拥有', '的占比最小']
        },
        {
          title: '家庭设施',
          text: '家庭拥有的农机中，拥有水泵的占比最大，拥有动力脱粒机的占比最小',
          type: 'bar10',
          textArr: ['家庭拥有的农机中，拥有', '的占比最大，拥有', '的占比最小']
        }
      ],
      resData: [],
      // 从服务器上传来的数据
      responseData: {
        data: [
          {
            text: ['拥有', '向个人租房'],
            type: 'HousingSourceType',
            chart: {
              categoryData: ['拥有', '从工作单位租房', '部分所有权/部分产权', '从国家租房', '免费居住', '向个人租房'],
              title: '家庭住房来源',
              valueData: [60.7, 2.14, 1.8, 1.06, 0.79, 0.65]
            }
          },
          {
            text: ['为饮用水支付费用'],
            type: 'IfPayForWaterRate',
            chart: { categoryData: ['为饮用水支付费用', '不为饮用水支付费用'], title: '家庭是否为饮用水付费', valueData: [77.18, 19.41] }
          },
          {
            text: ['室内自来水', '其他地方'],
            type: 'WaterMethodRate',
            chart: {
              categoryData: ['室内自来水', '院子里的井水', '院子里的自来水', '瓶装水', '其他地方'],
              title: '家庭饮用水获取方式',
              valueData: [50.21, 21.37, 20.51, 5.48, 2.42]
            }
          },
          {
            text: ['饮用前不过滤水'],
            type: 'IfFilterWaterRate',
            chart: { categoryData: ['饮用前不过滤水', '饮用前过滤水'], title: '家庭是否过滤饮用水', valueData: [82.96, 13.62] }
          },
          {
            text: ['拥有彩电', '拥有空气净化器'],
            type: 'ApplianceOwnerRate',
            chart: {
              categoryData: ['拥有彩电', '拥有电饭煲', '拥有冰箱', '拥有洗衣机', '拥有电扇', '拥有空调', '拥有压力锅', '拥有电脑', '拥有电话', '拥有微波炉', '拥有相机', '拥有缝纫机', '拥有空气净化器'],
              title: '家庭电器拥有类型拥有率',
              valueData: [94.31, 87.97, 87.33, 85.26, 77.54, 55.85, 52.78, 42.97, 37.12, 37.09, 19.83, 16.45, 3.22]
            }
          },
          {
            text: ['天然气', '木炭'],
            type: 'CookingFuelTypeRate',
            chart: {
              categoryData: ['天然气', '液化石油气', '电力', '木头，棍子，稻草等', '煤', '煤油', '其他', '木炭'],
              title: '家庭烹饪燃料类型拥有率',
              valueData: [37.95, 30.65, 14.48, 14.43, 1.53, 0.56, 0.29, 0.13]
            }
          },
          {
            text: ['室内，可以冲水'],
            type: 'toiletTypeRate',
            chart: {
              categoryData: ['室内，可以冲水', '水泥露天（厕所）', '室外公共卫生间，不能冲水', '泥土露天（厕所）', '室内，不可以冲水', '室外公共卫生间，可以冲水', '无浴室', '其他'],
              title: '家庭厕所设施类型拥有率',
              valueData: [65.87, 13.39, 5.09, 4.78, 3.42, 3.04, 0.81, 0.18]
            }
          },
          {
            text: ['电气', '油'],
            type: 'LightingTypeRate',
            chart: {
              categoryData: ['电气', '煤油', '蜡烛', '油'],
              title: '家庭使用照明类型',
              valueData: [99.09, 0.68, 0.14, 0.1]
            }
          },
          {
            text: ['拥有自行车', '拥有三轮车'],
            type: 'VehicleOwnerRate',
            chart: {
              categoryData: ['拥有自行车', '拥有摩托车', '拥有汽车', '拥有三轮车'],
              title: '家庭车辆拥有类型拥有率',
              valueData: [41.47, 24.55, 18.26, 10.55]
            }
          },
          {
            text: ['拥有水泵', '为饮用水支付费用'],
            type: 'AgriculturalMachineryOwnerRate',
            chart: {
              categoryData: ['拥有水泵', '拥有手扶拖拉机', '拥有手扶拖拉机', '拥有动物车', '拥有灌溉设备', '拥有动力脱粒机'],
              title: '家庭农机拥有类型拥有率',
              valueData: [7.51, 3.47, 3.01, 2.91, 2.89, 1.75]
            }
          }
        ],
        year: '2015',
        count: 10,
        message: 'OK',
        url: 'http://114.55.25.220:8080/chnsx/asset/statistics',
        timestamp: '2021-12-18 00:00:00 UTC',
        status: 200
      }
    }
  },
  methods: {
    // 展示图表
    showChart() {
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
      // 需要进行异步处理，不然不用setTimeout会报错
      setTimeout(() => {
        that.resData = that.responseData.data
        that.resData.forEach((e, index) => {
          that.showBarChart(e, index)
        })
      }, 0)
      // }, 1000)
    },
    // 找到对应的图表的dom元素，并赋值对应的数据
    showBarChart(data, index) {
      // 由于type类型是从bar1开始的，所以一开始的索引值0要加1，后面的都是同样的道理
      index++
      let str = 'bar' + index
      this.$refs[str][0].getData(data, 'property', this.year)
    },

    // 获取文本，并知道哪些展示的是黑色，哪些是红色
    getText(item, index) {
      let blackArr = this.dataLists[index].textArr
      let redArr = this.resData.data[index].text
      console.log(blackArr)
      console.log(redArr)
      // return '' + item[index].type + index
    }
  }
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
