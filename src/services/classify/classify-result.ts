import request from '@/utils/request.js'
import { AxiosResponse } from 'axios'

export const dataMenu = (): Promise<BasicFetchResult<API.DataMenuResponse[]>> => {
  return request({
    url: '/api/v1/verification/dataMenu',
    method: 'post'
  })
}

// 数据资产目录
export const dataSourceList = (): Promise<BasicFetchResult<API.DataMenuResponseTemp>> => {
  return request({
    url: '/api/v1/verification/dataSourceList',
    method: 'post'
  })
}

export const dataMenuMock = (): Promise<BasicFetchResult<API.DataMenuResponseTemp>> => {
  return request({
    url: '/mock/api/v1/verification/dataSourceList',
    method: 'post'
  })
}
// 数据源下表 列表

export const tablesClassifyStats = (params: { dataSourceId: number }): Promise<BasicFetchResult<API.TablesClassifyStatsResponse>> => {
  return request({
    url: '/api/v1/verification/tablesClassifyStats',
    method: 'post',
    data: params
  })
}

export const tablesClassifyStatsMock = (params: { dataSourceId: number }): Promise<BasicFetchResult<API.TablesClassifyStatsResponse>> => {
  return request({
    url: '/mock/api/v1/verification/tablesClassifyStats',
    method: 'post',
    data: params
  })
}
// 库->表列表
export const tableClassifyResultList = (
  params: API.TableClassifyResultListRequest
): Promise<API.ClassifyBasicPageResultSystom<API.TableClassifyResultListResponse[]>> => {
  return request({
    url: '/api/v1/verification/tableClassifyResultList',
    method: 'post',
    data: params
  })
}

// 库->字段列表
export const fieldClassifyResultList = (
  params: API.FieldClassifyResultListRequest
): Promise<API.ClassifyBasicPageResultTable<API.FieldClassifyResultListResponse[]>> => {
  return request({
    url: '/api/v1/verification/fieldClassifyResultList',
    method: 'post',
    data: params
  })
}

// 字段列表编辑保存
export const updateClassifyResult = (params: API.UpdateClassifyResultRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/verification/updateClassifyResult',
    method: 'post',
    data: params
  })
}

// 字段列表确认
export const verify = (params: { fieldId: number }): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/verification/verify',
    method: 'post',
    data: params
  })
}

// 字段列表 重新识别
export const reidentification = (params: { fieldId: number }): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/verification/reidentification',
    method: 'post',
    data: params
  })
}

// 字段列表 取消忽略
export const updateVerificationStatus = (params: API.updateVerificationStatusRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/verification/updateVerificationStatus',
    method: 'post',
    data: params
  })
}

// 统计信息
export const statisticalData = (): Promise<BasicFetchResult<API.StatisticalDataResponse>> => {
  return request({
    url: '/api/v1/verification/statisticalData',
    method: 'post'
  })
}

// 人工 数据资产目录
export const modifiedDataMenu = (): Promise<BasicFetchResult<API.ModifiedDataMenuResponse[]>> => {
  return request({
    url: '/api/v1/verification/modifiedDataMenu',
    method: 'post'
  })
}

// 人工修改 库->表列表
export const tableClassifyModifyList = (
  params: API.TableClassifyResultListRequest
): Promise<API.ClassifyBasicPageResultSystom2<API.TableClassifyModifyListResponse[]>> => {
  return request({
    url: '/api/v1/verification/tableClassifyModifyList',
    method: 'post',
    data: params
  })
}

// 人工修改 表->字段列表
export const fieldClassifyModifyList = (
  params: API.FieldClassifyResultListRequest
): Promise<API.ClassifyBasicPageResultTable2<API.FieldClassifyModifyListResponse[]>> => {
  return request({
    url: '/api/v1/verification/fieldClassifyModifyList',
    method: 'post',
    data: params
  })
}

// 导出人工修改
export const exportModifiedList = (): Promise<AxiosResponse> => {
  return request({
    url: '/api/v1/verification/exportModifiedList',
    method: 'get',
    responseType: 'blob'
  })
}

// 所有模板树行列表接口
export const getAllModuleTreeList = (): Promise<BasicFetchResult<API.GetAllModuleTreeListResponse[]>> => {
  return request({
    url: '/api/v1/module/getAllModuleTreeList',
    method: 'post'
  })
}

// 所有模板树行列表接口
export const metadata = (params: API.MetadataRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/datasource/field/metadata',
    method: 'post',
    data: params
  })
}

// 批量忽略
export const batchUpdateIgnoreStatus = (params: API.BatchUpdateIgnoreStatusRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/verification/batchUpdateIgnoreStatus',
    method: 'post',
    data: params
  })
}

// 批量确认
export const batchVerify = (params: API.BatchVerifyRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/verification/batchVerify',
    method: 'post',
    data: params
  })
}
