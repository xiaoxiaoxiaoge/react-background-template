/* 角色 */
import request from '@/utils/request.js'

// 分页列表
export const getRoleListPage = (params: API.GetRoleListPageRequest): Promise<BasicPageResult<API.GetRoleListPageResponse[]>> => {
  return request({
    url: '/api/v1/role/getRoleListPage',
    method: 'POST',
    data: { ...params }
  })
}

// 列表
export const getRoleList = (): Promise<BasicFetchResult<API.GetRoleListResponse[]>> => {
  return request({
    url: '/api/v1/role/getRoleList',
    method: 'POST'
  })
}

// 角色菜单
export const getHalfMenuList = (): Promise<BasicFetchResult<API.GetHalfMenuListResponse[]>> => {
  return request({
    url: '/api/v1/menu/getHalfMenuList',
    method: 'POST'
  })
}

// 新建
export const addRole = (params: API.AddRoleRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/role/addRole',
    method: 'POST',
    data: { ...params }
  })
}

// 获取角色信息
export const getRoleMenuByRoleId = (params: { id: number }): Promise<BasicFetchResult<API.GetRoleMenuByRoleIdResponse>> => {
  return request({
    url: '/api/v1/role/getRoleMenuByRoleId',
    method: 'POST',
    data: { ...params }
  })
}

// 编辑
export const updateRole = (params: API.AddRoleRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/role/updateRole',
    method: 'POST',
    data: { ...params }
  })
}

// 手动中止
export const updateStatus = (params: API.UpdateStatusRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/job/updateStatus',
    method: 'POST',
    data: { ...params }
  })
}
// 删除
export const deleteRole = (params: API.DeleteRoleRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/role/deleteRole',
    method: 'POST',
    data: { ...params }
  })
}
