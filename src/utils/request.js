import axios from 'axios'

// 统计总览的数据根路径
const request = axios.create({
  // 指定请求根路径
  baseURL: 'http://localhost:8080/chnsx/medical/statistics'
})

export default request
