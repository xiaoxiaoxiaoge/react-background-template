declare namespace API {
  type OverviewResponse = {
    dataSourceCount: number
    tableCount: number
    tableRecordCount: number
    fieldCount: number
    tableGradedCount: number
    tableIgnoredCount: number
    fieldGradedCount: number
    fieldIgnoredCount: number
    fileCount: number
    reportTime: string
  }
  type TopologyResponse = {
    key: number
    title: string
    containFields: number
    grading: number
    children: TopologyResponse[]
  }
  type SystemStatisticResponse = {
    systemName: string
    fieldCount: number
    fieldGradedCount: number
    fieldIgnoredCount: number
    gradingOneFieldCount: number
    gradingTwoFieldCount: number
    gradingThreeFieldCount: number
    gradingFourFieldCount: number
    gradingFiveFieldCount: number
  }
  type TableOrFieldStatisticRequest = {
    statisticType: string // 'field' | 'table'
  }
  type TableOrFieldStatisticResponse = {
    totalCount: number
    gradingOneFieldCount: number
    gradingTwoFieldCount: number
    gradingThreeFieldCount: number
    gradingFourFieldCount: number
    gradingFiveFieldCount: number
  }
  type ClassFieldTopRequest = {
    grading: number
  }
  type ClassFieldTopResponse = {
    className: string
    classCount: number
    grading: number
  }
  type SystemAssetDetailRequest = BaiscPageParams & {
    systemName?: string
    classLink?: string
    fieldName?: string
  }
  type SystemAssetDetailResponse = {
    fieldName: string
    classLink: string
    systemName: string
    tableNames: string
    grading: number
  }
}
