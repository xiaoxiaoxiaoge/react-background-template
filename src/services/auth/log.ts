/* 角色 */
import request from '@/utils/request.js'

// 服务监控信息
export const logList = (params: API.LogListRequest): Promise<BasicPageResult<API.LogListResponse[]>> => {
  return request({
    url: '/api/v1/log/list',
    method: 'POST',
    data: { ...params }
  })
}
