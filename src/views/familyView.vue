<template>
  <div class="family-container">
    <el-page-header @back="goBack" content="家庭信息"></el-page-header>
    <div class="textContent">
      <h3>基本信息</h3>
      <div class="basic-info">
        <div class="memberNum">人数：{{memberNum}} 人</div>
        <div class="house">住房情况：{{houseStatus}}</div>
        <div class="car">车辆情况：{{carStatus}}</div>
      </div>
      <h3>财产情况</h3>
      <el-table :data="tableData" :span-method="arraySpanMethod">
        <el-table-column prop="item" width="200" label="项目">
        </el-table-column>
        <el-table-column prop="desc" label="描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'familyView',
  data() {
    return {
      // 该家庭的情况数据
      memberNum: '4',
      houseStatus: '吉林省',
      carStatus: '皇家贵族',
      year: '2015',
      tableData: [
        {
          item: '住房情况',
          desc: '家庭的住房情况为：拥有'
        },
        {
          item: '家庭用水',
          desc: '家庭是否为饮用水支付费用：是'
        },
        {
          item: '家庭用水',
          desc: '家庭获得的饮用水为：室内自来水'
        },
        {
          item: '家庭用水',
          desc: '家庭饮用前是否过滤水：是'
        },
        {
          item: '室内财产',
          desc: '家庭拥有的家电是：电扇、电视'
        },
        {
          item: '室内财产',
          desc: '家庭使用的烹饪燃料是：天然气'
        },
        {
          item: '室内财产',
          desc: '家庭使用的厕所类型为：室内，可以冲水'
        },
        {
          item: '室内财产',
          desc: '家庭使用的照明类型为：电气'
        },
        {
          item: '室外财产',
          desc: '家庭拥有的车辆是：汽车'
        },
        {
          item: '室外财产',
          desc: '家庭拥有的农机是：水泵'
        }
      ],
      // 用于表格相同连续字段行合并的分割数组
      spanArr: []
    }
  },
  props: {
    fmid: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 合并表格相同字段的行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let row_ = this.spanArr[rowIndex]
        let col_ = row_ > 0 ? 1 : 0 // 1表示合并成row行,1列，0了话相当于这几行没有合并都删了
        return {
          rowspan: row_,
          colspan: col_
        }
      }
    },
    // 计算表格中有没有连续的大于1项的项目名是一样的，如果是一样的记录它连续的行数个数，并用于之后的合并行操作
    // tableDatas() {
    //   let count = 0 // 计算连续出现相同字段的次数，用于之后的合并行数
    //   let itemindex = 0 // 存储当前正在计算连续相同字段的第一个开始项的索引,例如，此时itemindex=4，此时位于第一个室内财产，表示准备开始计算连续的室内财产的个数
    //   this.tableData.forEach((tableItem, index) => {
    //     if (tableItem.item === this.tableData[itemindex].item) {
    //       count = count + 1
    //     } else {
    //       itemindex = index // 名称变化，需要更新新的索引位置，开始计算新的字段连续出现的次数
    //       this.spanArr.push(count)
    //       count = 1 // 此时两个不同字段已经经过了上面的if判断发现不一样，下一次循环的tableItem项就是下一项了，但是此时当前不同的字段项还没被计入count值，因此需要将count从0加到1，即赋值为1
    //     }
    //   })
    //   // 没有这一步，最后一项不会加入spanArr数组，过了上述循环后，最后一个字段的出现次数，需要靠下面的判断条件加入数组中去
    //   if (count >= 1) {
    //     this.spanArr.push(count)
    //   }
    //   // 测试分隔数组的内容，输出数据格式为[1,3,4,2]
    //   // console.log(this.spanArr)
    // },
    // 合并行需要的数组格式是如[1,3,0,0,4,0,0,0]表示第一行自己一行，第二三四行合并成一行，第五六七八行合并成一行
    tableDatas() {
      let count = 0
      let itemindex = 0
      this.tableData.forEach((tableItem, index) => {
        this.spanArr.push(0)
      })
      this.tableData.forEach((tableItem, index) => {
        if (tableItem.item === this.tableData[itemindex].item) {
          count = count + 1
        } else {
          this.spanArr[itemindex] = count
          itemindex = index
          count = 1
        }
      })
      if (count >= 1) {
        this.spanArr[itemindex] = count
      }
      // console.log(this.spanArr)
    },
    // 返回上一页
    goBack() {
      this.$router.push('/filterRes')
    }
  },
  mounted() {
    this.tableDatas()
  }
  // 测试parms项中参数时候用的
  // created() {
  //   console.log(this.$route)
  // }
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
}
.basic-info {
  margin-left: 20px;
  margin-bottom: 20px;
}
.memberNum,
.house,
.car {
  margin-bottom: 10px;
  border-left: 3px solid rgb(64, 158, 255);
  padding-left: 20px;
}
.el-table {
  margin: 0 20px;
  width: auto !important;
}
</style>
