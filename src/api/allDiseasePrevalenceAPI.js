// 获取allDiseasePrevalence数据
import request from '../utils/request'

// 向外按需导出一个API函数
export const getAllDiseasePrevalenceAPI = function(year) {
  return request.get('/disease', {
    // 请求参数
    params: {
      year: year
    }
  })
}
