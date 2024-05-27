declare namespace API {
  type DataSourceRequest = BasicPageParams & {
    dataSourceName?: string
    dataSourceType?: number
    systemName?: string
  }
  type DataSourceRecord = {
    id: number
    dataSourceName: string
    dataSourceType: string
    host: string
    port: string
    username: string
    status: number
    dbName: string
    systemName: string
    description: string
    manufacturerName: string
    systemVersion: string
    isDeleted: number
    password?: string
  }
  type DataSourceType = {
    label: string
    value: number
    type: number
  }
  type DataSourceDbsRequest = {
    dataSourceName: string
    dataSourceType: string
    host: string
    port: string
    username: string
    password: string
  }
  type DataSourceLinkRequest = {
    dataSourceName: string
    dataSourceType: string
    host: string
    port: string
    username: string
    password: string
    dbName: string
  }
  type DataSourceCreateRequest = DataSourceLinkRequest & {
    systemName: string
    manufacturerName: string
    systemVersion: string
    description: string
  }
  type DataSourceUpdateRequest = DataSourceCreateRequest & {
    id: number
  }
  type DatasourceOptionsResponseOptions = {
    label: string
    value: number
    type: number
  }
  type DatasourceOptionsResponse = {
    label: string
    options: DatasourceOptionsResponseOptions[]
  }

  // 数据源发现任务请求参数
  type DiscoverTaskListRequest = BasicPageParams & {
    taskName?: string
    execStrategy?: number
  }
  // 数据源发现任务记录
  type DiscoverTask = {
    id: number
    taskName: string
    ipSegment: string
    portSegment: string
    execStrategy: number
    execStatus: number
    lastExecTime: string
    createdTime: string
    regularExecTime: string
    periodicExecTime: number
  }
  // 数据源发现任务创建请求参数
  type DiscoverTaskCreateRequest = {
    taskName: string
    ipSegment: string
    portSegment: string
    execStrategy: number
    regularExecTime?: string
    periodicExecTime?: number
  }
  // 数据源发现任务更新请求参数
  type DiscoverTaskUpdateRequest = DiscoverTaskCreateRequest & {
    id: number
  }
  // 数据源发现任务删除请求参数
  type DiscoverTaskDeleteRequest = {
    ids: number[]
  }
  // 数据源发现任务结果列表参数
  type DiscoverTaskResultListRequest = BasicPageParams & {
    taskId?: number
    dataSourceType?: number
    dataSourceName?: string
    status?: number
  }
  // 数据源发现任务结果记录
  type DiscoverTaskResult = {
    id: number
    taskId: number
    dataSourceType: number
    dataSourceName: string
    ip: string
    port: string
    status: number
    createdTime: string
  }
  // 数据源发现结果删除请求参数
  type DiscoverTaskResultDeleteRequest = {
    id: number
  }
}
