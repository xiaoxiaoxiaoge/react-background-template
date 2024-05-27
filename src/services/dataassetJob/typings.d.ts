type JobData<T> = {
  totalCount: number
  allCount: number
  notStartCount: number
  underExecutionCount: number
  completedCount: number
  manualTerminationCount: number
  abortCount: number
  manualAbortCount: number
  items: T
}
type BasicJobPageResult<T> = {
  code: number
  message: string
  data: JobData<T>
}

declare namespace API {
  type GetJobListRequestGetList = BasicPageParams & {
    jobName?: string
    dataSourceName?: string
    jobStatus?: number
  }
  type GetJobListRequest = BasicPageParams & {
    jobName?: string
    dataSourceName?: string
    jobStatus?: number[]
  }
  type GetJobListResponse = {
    id: number
    jobName: string
    dataSourceName: string
    ruleSetName: string
    ruleSetVersion: string
    executionStrategy: number
    executionProgress: number
    startTime: string
    endTime: string
    jobStatus: number
  }
  type JobAddRequest = {
    jobName: string
    dataSourceId: number
    executionStrategy: number
    regularExecutionTime?: string
    periodicExecutionTime?: number
    ruleSetId: number
    updateStrategy: number
    dataSetSize: number
    remark: string
    operationType: number
  }
  type GetInfoResponse = JobAddRequest & {
    id: number
    ruleSetName: string
    ruleSetVersion: string
  }
  type JobUpdateRequest = {
    id: number
    executionStrategy: number
    regularExecutionTime?: string
    periodicExecutionTime?: number
    updateStrategy: number
    dataSetSize: number
    remark: string
    operationType: number
  }
  type UpdateStatusRequest = {
    id: number
    jobStatus: number
  }
  type DeleteJobRequest = {
    ids: number[]
  }
  type GetDetailInfoRequest = {
    id: number
  }
  type GetDetailInfoResponse = {
    jobName: string
    dataSourceName: string
    executionStrategy: number
    dataSetSize: number
    startTime: string
    endTime: string
    remark: string
    jobStatus: number
    executionProgress: number
    updateStrategy: number
    ruleSetName: string
    ruleSetVersion: string
  }
  type GetExceptionInfoRequest = {
    id: number
  }
  type GetExceptionInfoResponse = {
    jobName: string
    startTime: string
    endTime: string
    exceptionMessage: string
    executionProgress: number
  }
  type GetSourceListRequest = BasicPageParams & {
    dataType: string
    sourceId: number
    name?: string
  }
  type GSListResponseItem = {
    DBObj: {
      tableName: string
      tableDesc: string
      columnCount: number
      tableDataCount: number
    }
    tableObj: {
      columnName: string
      columnDesc: string
      columnType: string
      belongTable: string
    }
    sourceType: string
    belongSource: string
    belongSystem: string
  }

  type GetSourceListResponse = {
    totalCount: number
    items: GSListResponseItem[]
  }

  type ReportOverviewResponse = {
    dataSourceCount: number
    tableCount: number
    tableRecordCount?: number
    fileCount: number
    fieldCount: number
    tableGradedCount?: number
    tableIgnoredCount?: number
    fieldGradedCount?: number
    fieldIgnoredCount?: number
  }
}
