import request from '@/utils/request.js'
import { getSession } from '@/utils/tool'
import { AxiosResponse } from 'axios'

// 分类树列表
export const getModuleTreeList = (data: API.ModuleTreeListRequest): Promise<BasicFetchResult<API.ModuleTreeListResponse[]>> => {
  return request({
    url: '/api/v1/module/getModuleTreeList',
    method: 'post',
    data
  })
}
// 类分级列表
export const getSubClassList = (data: API.SubClassListRequest): Promise<BasicPageResult<API.SubClassListResponse[]>> => {
  return request({
    url: '/api/v1/module/getSubClassList',
    method: 'post',
    data
  })
}
// 新建分类接口
export const addClass = (data: API.AddClassRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/addClass',
    method: 'post',
    data
  })
}

// 更新分类接口
export const updateClass = (data: API.UpdateClassRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/updateClass',
    method: 'post',
    data
  })
}
// 删除分类接口
export const deleteClass = (data: API.DeleteClassRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/module/deleteClass',
    method: 'post',
    data
  })
}
// 获取模板维护记录接口
export const getModuleChangeLog = (data: API.ModuleChangeLogRequest): Promise<BasicFetchResult<API.ModuleChangeLogResponse[]>> => {
  return request({
    url: '/api/v1/module/getModuleChangeLog',
    method: 'post',
    data
  })
}

// 导出模板维护记录接口
export const exportModuleChangeLog = (data: API.ExportModuleRequest): string => {
  return `/api/v1/module/exportModuleChangeLog?moduleId=${data.moduleId}&access_token=${getSession('token', '')}`
}
// 导出分类分级模板
export const exportClassModule = (data: API.ExportModuleChangeLogRequest): string => {
  return `/api/v1/module/exportModule?moduleId=${data.moduleId}&access_token=${getSession('token', '')}`
}

// 导出分类分级模板
export const exportModule = (data: API.ExportModuleChangeLogRequest): Promise<AxiosResponse> => {
  return request({
    url: `/api/v1/module/exportModule?moduleId=${data.moduleId}`,
    method: 'get',
    responseType: 'blob'
  })
}
// 获取单个分类详情
export const getClassDetail = (data: API.ClassDetailRequest): Promise<BasicFetchResult<API.ClassDetailResponse>> => {
  return request({
    url: '/api/v1/module/classInfo',
    method: 'post',
    data
  })
}
