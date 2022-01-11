<template>
  <div class="filterRes-container">
    <!-- 筛选条件部分 -->
    <div class="user-info-container">
      <el-page-header @back="goBack" content="筛选条件"></el-page-header>
      <el-divider></el-divider>
      <el-row>
        <el-tag v-if="userFilterInfo.year!==''">{{userFilterInfo.year}}年</el-tag>
        <el-tag v-for="(value,index) in userInfo" :key="index">{{value}}</el-tag>
      </el-row>
      <el-divider class="divider"></el-divider>
    </div>
    <!-- 筛选结果部分 -->
    <div class="text-content">
      <h3>筛选结果</h3>
      <!-- 手风琴部分 -->
      <div class="slot-title">
        <div class="family-info-header">
          <div class="index">序号</div>
          <div class="member-count">成员人数</div>
          <div class="house-status">住房情况</div>
          <div class="car-status">车辆情况</div>
          <div class="more">更多信息</div>
        </div>
      </div>
      <el-collapse>
        <el-collapse-item :name="index + 1" v-for="(item, index) in ansLists1" :key="item + index">
          <template slot="title">
            <div class="family-info-body">
              <div class="index">{{(currentPage-1)*10+index+1}}</div>
              <div class="member-count">{{item.memberNum}}</div>
              <div class="house-status">{{ item.houseStatus }}</div>
              <div class="car-status">{{ item.carStatus }}</div>
              <div class="more" id="more" @click="pushFamily(index+1)">更多</div>
            </div>
          </template>
          <div class="text" v-for="(memberItem, memberIndex) in item.memberData" :key="memberItem + memberIndex">
            <div class="index1">成员 {{ memberIndex + 1 }}</div>
            <div class="name">性别：{{ memberItem.basicInfo.gender }}</div>
            <div class="province">省份：{{ memberItem.basicInfo.province }}</div>
            <div class="cityType">城市类型：{{ memberItem.basicInfo.cityType }}</div>
            <div class="more" @click.stop="toPersonMore(memberItem, memberIndex)" id="more1" @click="pushPerson(memberIndex+1)">更多</div>
            <div class="divide"></div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 分页部分 -->
    <div class="page">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" background layout="total ,prev, pager, next" :total="100">
      </el-pagination>
    </div>
    <!-- 回到顶部 -->
    <el-backtop target=".el-collapse" :bottom="100" :visibility-height="400">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'filterRes',
  data() {
    return {
      // 当前页面
      currentPage: 1,
      // 一页内展示个数
      pageSize: 10,
      // 存储filterPage页面中用户选择的筛选内容，在userInfo中存储的格式为键值对，如果同个键有多个值，则会被拆分为
      // 如"患病情况":"发烧","患病情况":"头痛"，这样的格式。
      userInfo: [],
      // ansLists存储的内容是符合筛选条件的家庭数据，这部分数据应该由后端传至前端，并且数据格式如下所示
      ansLists: [
        {
          id: '20210514',
          memberNum: 5,
          houseStatus: '从国家租房', // 住房情况
          carStatus: '拥有三轮车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 5,
          houseStatus: '从国家租房', // 住房情况
          carStatus: '拥有三轮车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 6,
          houseStatus: '从个人租房', // 住房情况
          carStatus: '拥有三轮车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 6,
          houseStatus: '从个人租房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 7,
          houseStatus: '拥有', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 7,
          houseStatus: '免费居住', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 5,
          houseStatus: '部分所有权', // 住房情况
          carStatus: '拥有自行车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 4,
          houseStatus: '从工作单位租房', // 住房情况
          carStatus: '拥有自行车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 4,
          houseStatus: '从国家租房', // 住房情况
          carStatus: '拥有三轮车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20210514',
          memberNum: 4,
          houseStatus: '从国家租房', // 住房情况
          carStatus: '拥有三轮车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        // 后十条数据测试分页
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        },
        {
          id: '20211212',
          memberNum: 5,
          houseStatus: '自己买房', // 住房情况
          carStatus: '拥有汽车', // 车辆情况
          memberData: [
            {
              // 每一个家庭成员的信息
              id: '20211212',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            },
            {
              // 每一个家庭成员的信息
              id: '20210514',
              basicInfo: {
                // 有的话，返回这种格式，没有的话，直接没有basicInfo这个字段
                gender: '男',
                province: 'jilin',
                cityType: '城市' // 农村，城市，balbala
              },
              diseaseStatusText: '发烧', // 数据库里的个人的情况文字
              bodyExamText: '发烧',
              bodyExamText2: '发烧',
              bodyExamText3: '发烧'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleChange(val) {
      // console.log(val)
    },
    // 拆分多选的字段和选项，使其形成一个字段对应一个选项的内容，并将其添加到userInfo中
    setUserChosenInfo() {
      let tempHeal = this.userFilterInfo.healthFilterInfoObj
      let tempProp = this.userFilterInfo.propertyFilterInfoObj
      // console.log(tempHeal)
      // console.log(tempProp)
      if (JSON.stringify(tempHeal) !== '{}') {
        for (let key in tempHeal) {
          if (Array.isArray(tempHeal[key])) {
            tempHeal[key].forEach(e => {
              this.userInfo.push(key + '：' + e)
            })
          } else {
            this.userInfo.push(key + '：' + tempHeal[key])
          }
        }
      }
      if (JSON.stringify(tempProp) !== '{}') {
        for (let key in tempProp) {
          for (let key_ in tempProp[key]) {
            if (Array.isArray(tempProp[key][key_])) {
              tempProp[key][key_].forEach(e => {
                this.userInfo.push(key + '：' + e)
              })
            } else {
              // tempProp[key][key_].forEach(e => {
              //   this.userInfo.push(key + '：' + e)
              // })
              this.userInfo.push(key + '：' + tempProp[key][key_])
            }
          }
        }
      }
      // 下面代码是不把家庭财产部分所选的筛选条件拆分，如果不需要拆分，请把下面代码的注释去掉，把上面财产if条件的代码加上注释
      // if (JSON.stringify(tempProp) !== '{}') {
      //   for (let key in tempProp) {
      //     for (let key_ in tempProp[key]) {
      //       if (Array.isArray(tempProp[key])) {
      //         tempProp[key].forEach(e => {
      //           this.userInfo.push(key + '：' + e)
      //         })
      //       } else {
      //         this.userInfo.push(key + '：' + tempProp[key][key_])
      //       }
      //     }
      //   }
      // }
      // console.log(this.userInfo)
    },
    goBack() {
      this.$router.push('/filterpage')
    },
    pushFamily(fid) {
      this.$router.push('/familyView' + fid)
    },
    pushPerson(pid) {
      this.$router.push('/personalView/' + pid)
    },
    // 分页的处理函数

    // 监听页面展示个数变化，并实时更新到pageSize中，目前这个函数没有用到，因为我们已经设定了每页展示10个数据
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 监听当前页面变化，并实时更新到currentPage中
    handleCurrentChange(val) {
      this.currentPage = val
    }
  },
  computed: {
    // 这个计算属性用于分页，当页面变化时候，选取ansLists中对应的数据，从而实现分页效果
    ansLists1() {
      // return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      return this.ansLists.slice((this.currentPage - 1) * 10, this.currentPage * 10)
    },
    ...mapState(['userFilterInfo'])
  },
  created() {
    this.setUserChosenInfo()
  }
}
</script>

<style lang="less" scoped>
/*隐藏滚动条*/
* {
  scrollbar-width: none; /*Firefox*/
  -ms-overflow-style: none; /*IE10+*/
}

*::-webkit-scrollbar {
  display: none; /*ChromeSafari*/
}
// 用于回到顶部的CSS设置
// .filterRes-container {
//   overflow-y: scroll;
//   height: 800px;
// }
.el-page-header {
  font-weight: 700;
}
.user-info-container {
  position: relative;
  padding: 20px;
  padding-left: 15px;
}
.el-row {
  margin: 20px 0 20px 0;
}
.user-info-container .el-row {
  border-top: 1 px solid #ebebeb;
  border-bottom: 1 px solid #ebebeb;
}
.el-tag {
  margin-right: 10px;
  margin-bottom: 15px;
}
.divider {
  margin-top: -12px;
}
h3 {
  margin-left: 20px;
  margin-top: -10px;
}
.el-collapse {
  margin: 0 20px;
  //用于回到顶部的CSS设置
  max-height: 490px;
  overflow-y: scroll;
}
.slot-title {
  margin: 0 20px;
}
.family-info-header {
  font-size: medium;
  line-height: 50px;
  font-weight: 700;
}
.index,
.member-count,
.house-status,
.car-status,
.more {
  display: inline-block;
  width: 240px;
}
.family-info-body {
  font-size: 15px;
  line-height: 50px;
}
#more {
  color: rgb(64, 158, 255);
  cursor: pointer;
}
#more:hover {
  text-decoration: underline;
}
#more1 {
  color: rgb(64, 158, 255);
  cursor: pointer;
}
#more1:hover {
  text-decoration: underline;
}
.page {
  margin: 0 20px;
  margin-top: 20px;
  position: relative;
  text-align: right;
  padding-bottom: 20px;
}
.index1,
.name,
.province,
.cityType,
.more {
  display: inline-block;
  width: 240px;
}
.divide {
  height: 0px;
  border-top: 1px solid #ebebeb;
  margin-top: 7px;
}
.text {
  margin-bottom: 10px;
  margin-top: 10px;
}
/deep/ .el-collapse-item__content {
  padding-bottom: 10px;
}
</style>
