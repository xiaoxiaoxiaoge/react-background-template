import request from '@/utils/request'

// 获取数据源发现任务列表
export const getDiscoverTaskList = (data: API.DiscoverTaskListRequest): Promise<BasicPageResult<API.DiscoverTask[]>> => {
  return request({
    url: '/api/v1/datasource/discover/task/list',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取数据源发现任务列表
export const getAllDiscoverTaskList = (): Promise<BasicFetchResult<API.DiscoverTask[]>> => {
  return request({
    url: '/api/v1/datasource/discover/task/all',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 创建数据源发现任务
export const createDiscoverTask = (data: API.DiscoverTaskCreateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/discover/task/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 更新数据源发现任务
export const modifyDiscoverTask = (data: API.DiscoverTaskUpdateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/discover/task/modify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除数据源发现任务
export const deleteDiscoverTask = (data: API.DiscoverTaskDeleteRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/discover/task/delete',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取数据源发现任务详情
export const getDiscoverTaskDetail = (id: number): Promise<BasicFetchResult<API.DiscoverTask>> => {
  return request({
    url: '/api/v1/datasource/discover/task/detail',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { id }
  })
}

// 获取数据源发现任务结果列表
export const getDiscoverTaskResultList = (data: API.DiscoverTaskResultListRequest): Promise<BasicPageResult<API.DiscoverTaskResult[]>> => {
  return request({
    url: '/api/v1/datasource/discover/result/list',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除数据源发现任务
export const deleteDiscoverTaskResult = (data: API.DiscoverTaskResultDeleteRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/discover/result/delete',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 添加数据源
export const addDataSource = (data: API.DataSourceCreateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/discover/result/addDatasource',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
