import request from '@/utils/request'
import { Key } from 'react'

// 获取数据源列表
export const getSystemList = (data: API.SystemListRequest): Promise<BasicPageResult<API.SystemListResponse[]>> => {
  return request({
    url: '/api/v1/system/list',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 创建系统信息
export const createSystem = (data: API.SystemCreateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/system/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 修改系统信息
export const updateSystem = (data: API.SystemUpdateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/system/update',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除系统信息
export const deleteSystem = (ids: Key[]): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/system/delete',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      ids
    }
  })
}

// 获取所有系统信息
export const getAllSystem = (): Promise<BasicFetchResult<API.SystemListResponse[]>> => {
  return request({
    url: '/api/v1/system/all',
    method: 'GET'
  })
}

// 获取系统详情
export const getSystemDetail = (id: number): Promise<BasicFetchResult<API.SystemDetailResponse>> => {
  return request({
    url: '/api/v1/system/detail',
    method: 'GET',
    params: {
      id
    }
  })
}
