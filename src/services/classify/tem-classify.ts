import request from '@/utils/request.js'

// 模板列表
export const getModuleList = (): Promise<BasicFetchResult<API.ModuleListResponse[]>> => {
  return request({
    url: '/api/v1/module/moduleList',
    method: 'post'
  })
}

// 分类模板信息
export const moduleInfo = (params: API.ModuleInfoRequest): Promise<BasicFetchResult<API.ModuleInfoResponse>> => {
  return request({
    url: '/api/v1/module/moduleInfo',
    method: 'post',
    data: { ...params }
  })
}

// 分类模板信息
export const gradingInfo = (params: API.GradingInfoRequest): Promise<BasicFetchResult<API.GradingInfoResponse[]>> => {
  return request({
    url: '/api/v1/module/gradingInfo',
    method: 'post',
    data: { ...params }
  })
}

// 新建模板
export const addModule = (params: API.AddModuleRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/addModule',
    method: 'post',
    data: { ...params }
  })
}

// 删除模板
export const deleteModule = (params: API.DeleteModuleRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/deleteModule',
    method: 'post',
    data: { ...params }
  })
}

// 编辑模板
export const updateModule = (params: API.UpdateModuleRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/updateModule',
    method: 'post',
    data: { ...params }
  })
}

// 导入模板
export const uploadModule = (params: FormData): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/upload',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 编辑分级模板
export const updateGradingInfo = (params: API.UpdateGradingInfoRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/updateGradingInfo',
    method: 'post',
    data: { ...params }
  })
}
