/* 角色 */
import request from '../../utils/request.js'

// 列表
export const getUserListPage = (params: API.GetUserListPageRequest): Promise<BasicPageResult<API.GetUserListPageResponse[]>> => {
  return request({
    url: '/api/v1/user/getUserListPage',
    method: 'POST',
    data: { ...params }
  })
}

// //角色菜单
// export const getHalfMenuList = (): Promise<BasicFetchResult<API.getHalfMenuListResponse[]>> => {
//     return request({
//         url: '/api/v1/menu/getHalfMenuList',
//         method: 'POST',
//     });
// }

// 新建
export const addUser = (params: API.AddUserRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/user/addUser',
    method: 'POST',
    data: { ...params }
  })
}

// //获取角色信息
// export const getRoleMenuByRoleId = (params: { roleId: string }): Promise<BasicFetchResult<API.GetRoleMenuByRoleIdResponse>> => {
//     return request({
//         url: '/api/v1/role/getRoleMenuByRoleId',
//         method: 'POST',
//         data: { ...params },
//     });
// }

// 启停
export const editStatus = (params: API.EditStatusRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/user/editStatus',
    method: 'POST',
    data: { ...params }
  })
}

// 编辑
export const editUser = (params: API.EditUserRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/user/editUser',
    method: 'POST',
    data: { ...params }
  })
}

// 删除
export const deleteUser = (params: API.DeleteUserRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/user/deleteUser',
    method: 'POST',
    data: { ...params }
  })
}
