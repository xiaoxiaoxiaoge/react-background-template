import request from '@/utils/request'

// 十日
export const countDataAssetChange = (): Promise<BasicFetchResult<API.CountDataAssetChangeResponse[]>> => {
  return request({
    url: '/api/v1/homepage/countDataAssetChange',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 分级结果统计
export const getClassiflyCount = (): Promise<BasicFetchResult<API.GetClassiflyCountResponse[]>> => {
  return request({
    url: '/api/v1/homepage/getClassiflyCount',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 五日
export const taskStatusCount = (): Promise<BasicFetchResult<API.TaskStatusCountResponse[]>> => {
  return request({
    url: '/api/v1/homepage/taskStatusCount',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 数据源发现
export const discoverCount = (): Promise<BasicFetchResult<API.DiscoverCountResponse[]>> => {
  return request({
    url: '/api/v1/homepage/discoverCount',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
