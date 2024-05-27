import request from '@/utils/request'

// 获取数据源列表
export const getJobList = (data: API.GetJobListRequest): Promise<BasicJobPageResult<API.GetJobListResponse[]>> => {
  return request({
    url: '/api/v1/job/getList',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 新建作业
export const jobAdd = (data: API.JobAddRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/job/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 单个作业数据
export const getInfo = (data: number): Promise<BasicFetchResult<API.GetInfoResponse>> => {
  return request({
    url: '/api/v1/job/getInfo' + `?id=${data}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 编辑作业
export const jobUpdate = (data: API.JobUpdateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/job/update',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 手动停止
export const updateStatus = (data: API.UpdateStatusRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/job/updateStatus',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除
export const deletejob = (data: API.DeleteJobRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/job/delete',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 作业详情
export const getDetailInfo = (data: number): Promise<BasicFetchResult<API.GetDetailInfoResponse>> => {
  return request({
    url: '/api/v1/job/getDetailInfo' + `?id=${data}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 异常详情
export const getExceptionInfo = (data: number): Promise<BasicFetchResult<API.GetExceptionInfoResponse>> => {
  return request({
    url: '/api/v1/job/getExceptionInfo' + `?id=${data}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
