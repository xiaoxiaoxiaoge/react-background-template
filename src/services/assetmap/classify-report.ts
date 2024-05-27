import request from '@/utils/request.js'

// 分类树列表
export const getOverview = (): Promise<BasicFetchResult<API.OverviewResponse>> => {
  return request({
    url: '/api/v1/statistics/property/getOverView',
    method: 'post'
  })
}

// 分类树列表
export const getTopology = (): Promise<BasicFetchResult<API.TopologyResponse[]>> => {
  return request({
    url: '/api/v1/statistics/property/getTopology',
    method: 'post'
  })
}

// 系统统计
export const getSystemStatistic = (): Promise<BasicFetchResult<API.SystemStatisticResponse[]>> => {
  return request({
    url: '/api/v1/statistics/property/getSystemStatistic',
    method: 'post'
  })
}
// 分类分级统计字段/表
export const getTableOrFieldStatistic = (params: API.TableOrFieldStatisticRequest): Promise<BasicFetchResult<API.TableOrFieldStatisticResponse>> => {
  return request({
    url: '/api/v1/statistics/property/getTableOrFieldStatistic',
    method: 'post',
    data: params
  })
}

// 分级top20
export const getClassFieldTop = (params: API.ClassFieldTopRequest): Promise<BasicPageResult<API.ClassFieldTopResponse[]>> => {
  return request({
    url: '/api/v1/statistics/property/getClassFieldTop',
    method: 'post',
    data: params
  })
}

// 数据分级明细
export const getSystemDetail = (params: API.SystemAssetDetailRequest): Promise<BasicPageResult<API.SystemAssetDetailResponse[]>> => {
  return request({
    url: '/api/v1/statistics/property/getClassDetail',
    method: 'post',
    data: {
      current: 1,
      pageSize: 20,
      ...params
    }
  })
}
