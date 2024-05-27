import request from '@/utils/request'
import { Key } from 'react'

// 获取数据源列表
export const getDataSourceList = (data: API.DataSourceRequest): Promise<BasicPageResult<API.DataSourceRecord[]>> => {
  return request({
    url: '/api/v1/datasource/list',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取数据源类型
export const getDataSourceTypes = (): Promise<BasicFetchResult<API.DataSourceType[]>> => {
  return request({
    url: '/api/v1/datasource/types',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取数据库
export const getDataSourceDbs = (data: API.DataSourceDbsRequest): Promise<BasicFetchResult<string[]>> => {
  return request({
    url: '/api/v1/datasource/dbs',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 测试连接数据库
export const linkDataSource = (data: API.DataSourceLinkRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/connection',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 创建数据源
export const createDataSource = (data: API.DataSourceCreateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除数据源
export const deleteDataSource = (params: Key[]): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/delete',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      ids: params
    }
  })
}

// 数据源详情
export const getDataSourceDetail = (id: number): Promise<BasicFetchResult<API.DataSourceRecord[]>> => {
  return request({
    url: '/api/v1/datasource/detail',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      id
    }
  })
}
// 修改数据源
export const updateDataSource = (data: API.DataSourceUpdateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/update',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取作业对象
export const datasourceOptions = (): Promise<BasicFetchResult<API.DatasourceOptionsResponse[]>> => {
  return request({
    url: '/api/v1/datasource/options',
    method: 'GET'
    // headers: {
    //     'Content-Type': 'application/json',
    // }
  })
}
