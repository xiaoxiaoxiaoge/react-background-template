import request from '@/utils/request'

// 库表列表
export const getSourceList = (data: API.GetSourceListRequest): Promise<BasicFetchResult<API.GetSourceListResponse>> => {
  return request({
    url: '/api/v1/statistics/property/getSourceList',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 分类分级报告-概述
export const reportOverview = (): Promise<BasicFetchResult<API.ReportOverviewResponse>> => {
  return request({
    url: '/api/v1/statistics/property/getOverView',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 底账数据总览 非缓存-概述
export const getOverViewNoCache = (): Promise<BasicFetchResult<API.ReportOverviewResponse>> => {
  return request({
    url: '/api/v1/statistics/property/getOverViewNoCache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
