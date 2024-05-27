declare namespace API {
  type SystemListRequest = BasicPageParams & {
    systemName: string
  }
  type Manufacturer = {
    id?: number
    manufacturerName: string
    manufacturerCode: string
  }
  type SystemListResponse = {
    id: number
    systemName: string
    systemCode: string
    manufacturers: Manufacturer[]
  }
  // 创建系统请求
  type SystemCreateRequest = {
    systemName: string
    systemCode: string
    manufacturers: Manufacturer[]
  }
  // 修改系统请求
  type SystemUpdateRequest = SystemCreateRequest & {
    id: number
  }
  // 删除系统请求
  type SystemDeleteRequest = {
    ids: number[]
  }
  // 系统详情响应
  type SystemDetailResponse = {
    id: number
    systemName: string
    systemCode: string
    manufacturers: Manufacturer[]
  }
}
