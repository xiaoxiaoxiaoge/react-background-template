/* 规则配置 */
import request from '../../utils/request.js'

// 列表
export const ruleGetList = (params: API.GetListRequest): Promise<BasicPageResult<API.GetListfoResponse[]>> => {
  return request({
    url: '/api/v1/ruleSet/getList',
    method: 'POST',
    data: { ...params }
  })
}

// 导入
export const statusUpload = (params: FormData): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/ruleSet/upload',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 修改状态
export const updateStatus = (params: API.UpdateRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/ruleSet/updateStatus',
    method: 'POST',
    data: params
  })
}

// 已启动规则集
export const getUsedInfo = (): Promise<BasicFetchResult<API.GetUsedInfoResponse>> => {
  return request({
    url: '/api/v1/ruleSet/getUsedInfo',
    method: 'GET'
  })
}

// 规则集导入校验MD5
export const getModuleMd5 = (): Promise<BasicFetchResult<API.GetModuleMd5Response>> => {
  return request({
    url: '/api/v1/module/getModuleMd5',
    method: 'POST'
  })
}
