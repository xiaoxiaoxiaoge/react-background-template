import request from '@/utils/request'

export const updateLicense = (params: API.UpdateLicenseRequset): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/license/updateLicense',
    method: 'post',
    data: { ...params }
  })
}

export const queryServer = (): Promise<BasicFetchResult<API.QueryServerResponse[]>> => {
  return request({
    url: '/api/v1/license/queryServer',
    method: 'post'
  })
}

export const getLicenseDetailInfos = (): Promise<BasicFetchResult<API.GetLicenseDetailInfos>> => {
  return request({
    url: '/api/v1/license/getLicenseDetailInfos',
    method: 'post'
  })
}
