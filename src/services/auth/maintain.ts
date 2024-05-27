/* 角色 */
import request from '@/utils/request.js'

// 获取运行时长
export const systemUpTime = (): Promise<BasicFetchResult<{ runningTime: number }>> => {
  return request({
    url: '/api/v1/systemTime/systemUpTime',
    method: 'POST'
  })
}

// 获取系统信息
export const getSystemInfo = (): Promise<BasicFetchResult<API.GetSystemInfoResponse>> => {
  return request({
    url: '/api/v1/systemInfo/getSystemInfo',
    method: 'POST'
  })
}

// 总服务数据
export const containers = (): Promise<API.Containers> => {
  return request({
    url: '/api/v1.0/containers',
    method: 'POST',
    data: {
      num_stats: 60,
      num_samples: 0
    }
  })
}

export const systemSlice = (): Promise<API.Containers> => {
  return request({
    url: '/api/v1.0/containers/system.slice',
    method: 'POST',
    data: {
      num_stats: 60,
      num_samples: 0
    }
  })
}

// 所有服务Id
export const subContainers = (): Promise<API.SubContainers[]> => {
  return request({
    url: '/api/v1.1/subcontainers/docker',
    method: 'POST',
    data: {
      num_stats: 2,
      num_samples: 0
    }
  })
}

// 子服务数据
export const singleContainers = (id: string): any => {
  return request({
    url: '/api/v1.0/containers/docker/' + `${id}`,
    method: 'POST',
    data: {
      num_stats: 60,
      num_samples: 0
    }
  })
}

// 子服务数据
export const apiDocker = (): any => {
  return request({
    url: '/docker/',
    method: 'GET'
  })
}
