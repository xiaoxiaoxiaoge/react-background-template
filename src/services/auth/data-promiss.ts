import request from '../../utils/request.js'

// 权限列表

export const getAuthListPage = (params: API.GetAuthListPageRequest): Promise<BasicPageResult<API.GetAuthListPageResponse[]>> => {
  return request({
    url: '/api/v1/auth/getAuthListPage',
    method: 'POST',
    data: { ...params }
  })
}

// 获取用户列表
export const getUserRoleListPage = (params: API.GetUserRoleListPageRequest): Promise<BasicPageResult<API.GetUserRoleListPageResponse[]>> => {
  return request({
    url: '/api/v1/auth/getUserRoleListPage',
    method: 'POST',
    data: { ...params }
  })
}

// 编辑
export const editAuth = (params: API.EditAuthRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/auth/editAuth',
    method: 'POST',
    data: { ...params }
  })
}

// 已经选中
export const getAuthOwnerList = (params: { id: number }): Promise<BasicFetchResult<{ userIds: number[] }>> => {
  return request({
    url: '/api/v1/auth/getAuthOwnerList',
    method: 'POST',
    data: { ...params }
  })
}

// 默认选中项
export const getDefaultIds = (): Promise<BasicFetchResult<number[]>> => {
  return request({
    url: '/api/v1/auth/getDefaultIds',
    method: 'POST'
  })
}
