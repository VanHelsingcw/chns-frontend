<template>
  <div>
    <div class="chart" :id="chartId"></div>
  </div>
</template>

<script>
import sort from '@/utils/algorithm.js'
import spring from '@/utils/theme/echart-spring.json'

export default {
  data() {
    return {
      category: [],
      value: [],
      chartInfo: {},
      year: ''
    }
  },
  props: ['chartId'],
  methods: {
    /**
     * 柱状图数据获取函数
     * @param data:图表数据
     * @param type:数据类型（资产还是医疗）
     * @param year:年份
     * @returns {Promise<void>}
     */
    // 获取数据函数
    getData(data, type, year) {
      this.year = year
      // 这里置空是为了防止图表重叠，重复渲染
      this.category = []
      this.value = []
      let title = ''
      // 财产图表的展示
      // 财产部分数据不需要拆分json字符串，因为在property界面设置的数据格式的时候，键值对分别存放在各自的数组里，所以直接赋值即可
      if (type === 'property') {
        this.category = data.chart.categoryData
        this.value = data.chart.valueData
        title = year + '年' + data.chart.title
      }
      // 医疗健康图表的展示
      if (type === 'health') {
        for (let key in data.chartData) {
          // category表示键的中文名称，value表示键对应的值，如{'自我护理':5.91}，这里'自我护理'就是category，5.91就是value
          this.category.push(key)
          this.value.push(data.chartData[key])
        }
        title = year + '年' + data.title
        // 测试数据内容格式
        // console.log(this.category)
        // console.log(this.value)
      }
      this.value = this.value.map(Number)
      sort(this.category, this.value)
      this.showChart(title)
    },
    // 展示图表函数
    showChart(title) {
      if (this.year === '') return
      this.$echarts.registerTheme('spring', spring)
      let chart = this.$echarts.init(document.getElementById(this.chartId), 'spring', { renderer: 'svg' })
      var option = {
        title: {
          text: title,
          left: 'center',
          top: 'top',
          textStyle: {
            fontSize: 18
          }
        },
        grid: {
          left: '20%',
          bottom: '7%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              shadowColor: '#fde2e2'
            }
          }
        },
        xAxis: {
          type: 'value',
          name: this.chartInfo.valueLabel,
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: this.category,
          name: this.chartInfo.categoryLabel,
          axisTick: {
            show: false
          }
        },
        series: [
          {
            barWidth: '60%',
            label: {
              position: 'right',
              show: true,
              formatter: '{c}%'
            },
            data: this.value,
            type: 'bar',
            showBackground: false
          }
        ]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}

.chart div:first-child {
  left: 50%;
  transform: translateX(-50%);
}
</style>
