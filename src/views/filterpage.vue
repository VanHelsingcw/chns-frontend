<template>
  <div class="filterpage-container">
    <div class="title">
      <h2>请选择要检索的内容</h2>
    </div>
    <div class="healthSelect">
      <!-- 选择年份部分 -->
      <div class="selectTitle"><i class="el-icon-office-building"></i>&nbsp;选择年份</div>
      <div class="selectContent" id="date-picker">
        <el-select v-model="year" placeholder="请选择年份">
          <el-option v-for="year in yearlist" :key="year" :label="year" :value="year"> </el-option>
        </el-select>
      </div>
      <!-- 医疗健康部分 -->
      <div class="selectTitle"><i class="el-icon-office-building"></i>&nbsp;医疗健康</div>
      <div class="selectContent">
        <!-- 医疗健康类型多选框部分 -->
        <el-checkbox-group v-model="checkboxGroup">
          <el-checkbox-button @change="showHealthDetail(index)" v-for="(item, index) in healthTypes" :label="item" :key="item">{{ item }}</el-checkbox-button>
        </el-checkbox-group>

        <!-- 医疗健康每个类型的筛选条件选择部分 -->
        <el-row class="detail-select-box">
          <el-col :span="8" v-for="(item, index) in healthDetailInfo1" :key="index" class="column">
            <span class="detail-title-name">{{ item.title }}</span>
            <el-select v-if="item.title !== '医疗费用'" @change="healthChange(item, index)" v-model="item.curr" clearable multiple placeholder="请选择">
              <el-option v-for="content in item.detailLists" :key="content" :label="content" :value="content"> </el-option>
            </el-select>

            <el-cascader v-if="item.title === '医疗费用'" v-model="item.curr" @change="healthChange(item, index)" placeholder="请选择" :options="item.detailLists" :props="{ expandTrigger: 'hover' }"></el-cascader>
          </el-col>
        </el-row>
      </div>
      <!-- 财产部分 -->
      <div class="selectTitle"><i class="el-icon-money"></i>&nbsp;家庭财产</div>
      <div class="selectContent">
        <!-- 家庭财产类型多选框部分 -->
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button @change="showPropertyDetail(index)" v-for="(item, index) in propertyTypes" :label="item" :key="item">{{ item }}</el-checkbox-button>
        </el-checkbox-group>

        <!-- 家庭财产每个类型的筛选条件选择部分 -->
        <el-row class="detail-select-box">
          <el-col :span="24" v-for="(item, index) in propertyDetailInfo1" :key="index" class="column">
            <span class="detail-title-name">{{ item.title }}</span>
            <el-select class="selectItem" v-if="selectItem.itemName !== '饮用水' && selectItem.itemName !== '过滤水'" v-for="(selectItem, selectIndex) in item.itemLists" @change="propertyChange(item, selectItem, selectIndex)" v-model="selectItem.curr" :key="selectIndex" clearable multiple placeholder="请选择">
              <el-option v-for="content in selectItem.detailLists" :key="content" :label="content" :value="content"> </el-option>
            </el-select>

            <el-select class="selectItem" v-if="selectItem.itemName === '饮用水' || selectItem.itemName === '过滤水'" v-for="(selectItem, selectIndex) in item.itemLists" @change="propertyChange(item, selectItem, selectIndex)" v-model="selectItem.curr" :key="selectIndex" clearable placeholder="请选择">
              <el-option v-for="content in selectItem.detailLists" :key="content" :label="content" :value="content"> </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <!-- 检索按钮部分 -->
      <div class="search">
        <el-button class="btn-search" type="primary" @click="Loading" :loading="isLoading">{{ searchBtnText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'filterpage',
  data() {
    return {
      // 年份
      year: '',
      // 年份选择列表
      yearlist: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
      // 类型
      healthTypes: ['患病情况', '身体检查', '医疗保险', '医疗帮助', '医疗费用'],
      propertyTypes: ['住房情况', '家庭用水', '室内财产', '室外财产'],
      // 用户已经选择的类型
      checkboxGroup: [],
      checkboxGroup1: [],
      // 用户筛选框选择的数据
      healthFilterInfoObj: {},
      propertyFilterInfoObj: {},
      // 立即检索的展示
      isLoading: false,
      searchBtnText: '立即检索',
      healthDetailInfo: [
        {
          title: '患病情况',
          ifShow: false,
          curr: '',
          detailLists: ['心脏病、胸痛', '眼耳病', '皮疹', '皮炎', '关节、肌肉疼痛', '头痛、头晕', '哮喘', '胃疼', '腹泻、胃痛', '发烧、咳嗽、喉咙痛', '非传染病', '其他传染病']
        },
        {
          title: '身体检查',
          ifShow: false,
          curr: '',
          detailLists: ['妇科检查', '产后检查', '产前检查', '视力/听力检查', '肿瘤筛查', '血压筛查', '血检', '儿童体检', '全身检查', '其他']
        },
        {
          title: '医疗保险',
          ifShow: false,
          curr: '',
          detailLists: ['免费的医疗保险', '商业保险', '城市居民基本保险', '城市雇员基本保险', '合作保险', '其他保险']
        },
        {
          title: '医疗帮助',
          ifShow: false,
          curr: '',
          detailLists: ['完全没关注', '看医生', '看当地的健康工作者', '自我护理']
        },
        {
          title: '医疗费用',
          ifShow: false,
          curr: '',
          detailLists: [
            {
              value: '第一个地点的治疗费用',
              label: '第一个地点的治疗费用',
              children: [
                { value: '0-2000', label: '0-2000' },
                { value: '2001-5000', label: '2001-5000' },
                { value: '5001-10000', label: '5001-10000' },
                { value: '10001以上', label: '10001以上' }
              ]
            },
            {
              value: '第二个地点的治疗费用',
              label: '第二个地点的治疗费用',
              children: [
                { value: '0-2000', label: '0-2000' },
                { value: '2001-5000', label: '2001-5000' },
                { value: '5001-10000', label: '5001-10000' },
                { value: '10001以上', label: '10001以上' }
              ]
            },
            {
              value: '额外医疗费用',
              label: '额外医疗费用',
              children: [
                { value: '0-2000', label: '0-2000' },
                { value: '2001-5000', label: '2001-5000' },
                { value: '5001-10000', label: '5001-10000' },
                { value: '10001以上', label: '10001以上' }
              ]
            },
            {
              value: '疾病受伤的费用',
              label: '疾病受伤的费用',
              children: [
                { value: '0-2000', label: '0-2000' },
                { value: '2001-5000', label: '2001-5000' },
                { value: '5001-10000', label: '5001-10000' },
                { value: '10001以上', label: '10001以上' }
              ]
            },
            {
              value: '过去一年免疫接种费用',
              label: '过去一年免疫接种费用',
              children: [
                { value: '0-2000', label: '0-2000' },
                { value: '2001-5000', label: '2001-5000' },
                { value: '5001-10000', label: '5001-10000' },
                { value: '10001以上', label: '10001以上' }
              ]
            },
            {
              value: '预防性服务费用',
              label: '预防性服务费用',
              children: [
                { value: '0-2000', label: '0-2000' },
                { value: '2001-5000', label: '2001-5000' },
                { value: '5001-10000', label: '5001-10000' },
                { value: '10001以上', label: '10001以上' }
              ]
            }
          ]
        }
      ],
      // 资产部分数据
      propertyDetailInfo: [
        {
          title: '住房情况',
          ifShow: false,
          itemLists: [
            {
              itemName: '住房情况',
              curr: '',
              detailLists: ['从国家租房', '从工作单位租房', '向个人租房', '拥有', '免费居住', '部分所有权/产权']
            }
          ]
        },
        {
          title: '家庭用水',
          ifShow: false,
          itemLists: [
            {
              itemName: '饮用水',
              curr: '',
              detailLists: ['为饮用水支付费用', '不为饮用水支付费用']
            },
            {
              itemName: '水的种类',
              curr: '',
              detailLists: ['室内自来水', '院子里来的自来水', '院子里的井水', '瓶装水', '其他地方']
            },
            {
              itemName: '过滤水',
              curr: '',
              detailLists: ['饮用前过滤水', '饮用前不过滤水']
            }
          ]
        },
        {
          title: '室内财产',
          ifShow: false,
          itemLists: [
            {
              itemName: '选项2',
              curr: '',
              detailLists: ['拥有彩电', '拥有洗衣机', '拥有冰箱', '拥有空调', '拥有缝纫机', '拥有电扇', '拥有大挂钟', '拥有录像机', '拥有黑白电视机', '拥有相机', '拥有微波炉', '拥有电饭煲', '拥有压力锅', '拥有电脑', '拥有电话', '拥有空气净化器']
            },
            {
              itemName: '选项3',
              curr: '',
              detailLists: ['煤', '电力', '煤油', '液化石油气', '天然气', '木头、棍子、稻草等', '木炭', '其他']
            },
            {
              itemName: '选项1',
              curr: '',
              detailLists: ['无浴室', '室外公共卫生间，可以冲水', '室内，不可以冲水', '室外公共卫生间，不能冲水', '泥土露天（厕所）', '水泥露天（厕所）', '室内，可以冲水', '其他']
            },
            {
              itemName: '选项1',
              curr: '',
              detailLists: ['电气', '煤油', '油', '蜡烛', '其他']
            }
          ]
        },
        {
          title: '室外财产',
          ifShow: false,
          itemLists: [
            {
              itemName: '选项2',
              curr: '',
              detailLists: ['拥有三轮车', '拥有自行车', '拥有摩托车', '拥有汽车']
            },
            {
              itemName: '选项3',
              curr: '',
              detailLists: ['拥有拖拉机', '拥有手扶拖拉机', '拥有动物车', '拥有灌溉设备', '拥有动力脱粒机', '拥有水泵']
            }
          ]
        }
      ]
    }
  },
  methods: {
    showHealthDetail(index) {
      let that = this
      let temp = that.healthDetailInfo[index]
      that.healthDetailInfo[index].ifShow = !temp.ifShow
      // 当该项数据在用户数据中，但用户未选择时，需要进行删除
      if (temp.title in that.healthFilterInfoObj && !that.healthDetailInfo[index].ifShow) {
        delete that.healthFilterInfoObj[temp.title]
        that.healthDetailInfo[index].curr = ''
      }
      // 取消该项后，重新显示时候应该把原来已选的内容清空
      // if (!that.healthDetailInfo[index].ifShow) {
      //   that.healthDetailInfo[index].curr = ''
      // }
    },
    // 把选择器中选中的项赋值给healthFilterInfoObj中对应的字段
    healthChange(item, index) {
      this.healthFilterInfoObj[item.title] = item.curr
    },
    showPropertyDetail(index) {
      // temp.title in that.propertyFilterInfoObj &&
      let that = this
      let temp = that.propertyDetailInfo[index]
      that.propertyDetailInfo[index].ifShow = !temp.ifShow
      // 当该项数据在用户数据中，但用户未选择时，需要进行删除
      if (!that.propertyDetailInfo[index].ifShow) {
        delete that.propertyFilterInfoObj[temp.title]
        // 这两种写法都可以，下面注释的用过滤器的写法也可以
        let itemLength = that.propertyDetailInfo[index].itemLists.length - 1
        for (let i = 0; i <= itemLength; i++) {
          that.propertyDetailInfo[index].itemLists[i].curr = ''
        }
        // that.propertyDetailInfo[index].itemLists.forEach(item => {
        //   item.curr = ''
        // })
      }
    },
    // 把选择器中选中的项赋值给propertyFilterInfoObj中对应的字段
    propertyChange(fItem, sItem, index) {
      if (this.propertyFilterInfoObj[fItem.title] === undefined) this.propertyFilterInfoObj[fItem.title] = {}
      this.propertyFilterInfoObj[fItem.title][index] = sItem.curr
      // console.log(this.propertyFilterInfoObj)
    },
    Loading() {
      this.isLoading = true
      this.searchBtnText = '正在检索...'
      let timeOut = setTimeout(() => {
        this.isLoading = false
        this.searchBtnText = '立即检索'
        // 跳转到FilterRes部分
        this.$router.push('/filterRes')
        clearTimeout(timeOut)
      }, 2000)
      // 测试提交后用户数据结构长什么样
      // let obj = this.getUserData()
      // console.log(obj)
      // 把筛选条件数据对象存储到全局的store中
      let userfilter = { healthFilterInfoObj: this.healthFilterInfoObj, propertyFilterInfoObj: this.propertyFilterInfoObj, year: this.year }
      this.$store.commit('setuserFilterInfo', userfilter)
      // console.log(this.userFilterInfo)
    },
    // 获取用户选择的数据信息
    getUserData() {
      let obj = { year: this.year }
      // eslint-disable-next-line dot-notation
      obj['quesData'] = []
      let tempHeal = this.healthFilterInfoObj
      let tempProp = this.propertyFilterInfoObj
      let type = 0
      if (JSON.stringify(tempHeal) !== '{}') {
        for (let key in tempHeal) {
          if (tempHeal[key].length >= 2) {
            type = 2
          }
          if (tempHeal[key].length === 1) {
            type = 1
          }
          let tempObj = {
            questionChinese: key,
            questionType: type,
            answer: tempHeal[key],
            leftStatus: '',
            leftNum: 0,
            rightStatus: '',
            rightNum: 0
          }
          if (key === '医疗费用') tempObj = this.setTempObjMoney(tempObj)
          // eslint-disable-next-line dot-notation
          obj['quesData'].push(tempObj)
        }
      }
      if (JSON.stringify(tempProp) !== '{}') {
        for (let key in tempProp) {
          for (let key1 in tempProp[key]) {
            if (tempProp[key][key1].length >= 2) {
              type = 2
            }
            if (tempProp[key][key1].length === 1) {
              type = 1
            }
            let tempObj = {
              questionChinese: key,
              questionType: type,
              answer: tempProp[key][key1],
              leftStatus: '',
              leftNum: 0,
              rightStatus: '',
              rightNum: 0
            }
            // eslint-disable-next-line dot-notation
            obj['quesData'].push(tempObj)
          }
        }
      }
      return obj
    },
    // 分割医疗费用部分值
    setTempObjMoney(obj) {
      let ans = obj.answer
      obj.leftStatus = '<='
      obj.rightStatus = '<'
      obj.questionType = 0
      if (ans[1].split('-')[1] === undefined) {
        obj.leftNum = 10001
        obj.rightNum = 'none'
        obj.rightStatus = 'none'
      } else {
        obj.leftNum = ans[1].split('-')[0]
        obj.rightNum = ans[1].split('-')[1]
      }
      return obj
    }
  },
  computed: {
    healthDetailInfo1() {
      // eslint-disable-next-line space-before-function-paren
      return this.healthDetailInfo.filter(function (item) {
        return item.ifShow
      })
    },
    propertyDetailInfo1() {
      // eslint-disable-next-line space-before-function-paren
      return this.propertyDetailInfo.filter(function (item) {
        return item.ifShow
      })
    },
    ...mapState(['userFilterInfo'])
  }
}
</script>

<style lang="less" scoped>
.title {
  position: relative;
  text-align: center;
  padding: 15px;
}
.healthSelect {
  margin: 0px 30px;
}
.selectTitle {
  font-size: larger;
  font-weight: bold;
  color: rgb(64, 158, 255);
  margin-bottom: 30px;
}
.selectContent {
  margin-bottom: 30px;
}
.column {
  justify-content: left;
  color: rgb(64, 158, 255);
  font-weight: bold;
  margin-bottom: 50px;
}
.detail-select-box {
  margin-top: 30px;
}
.detail-title-name {
  margin-right: 20px;
}
.selectItem {
  margin-right: 30px;
}
.search {
  position: relative;
  text-align: center;
  margin-top: 30px;
  padding-bottom: 20px;
}
#date-picker {
  margin-bottom: 55px;
}
</style>
