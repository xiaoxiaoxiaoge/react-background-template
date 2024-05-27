declare namespace API {
  type AddModuleRequest = {
    moduleName: string
    description: string
  }
  type ModuleListResponse = {
    moduleId: number
    moduleName: string
    description: string
    moduleStatus: number
  }
  type ModuleInfoRequest = {
    moduleId: number
  }
  type ModuleInfoResponse = {
    moduleId: number
    moduleName: string
    description: string
  }
  type GradingInfoRequest = {
    moduleId: number
  }
  type GradingInfoResponse = {
    grading: number
    gradingStr: string
    description: string
  }

  type DeleteModuleRequest = {
    moduleId: number
  }
  type UpdateModuleRequest = {
    moduleId: number
    moduleName: string
    description: string
  }

  type UpdateGradingInfoRequest = {
    moduleId: number
    grading: number
    description: string
  }
  type TableList = {
    key: number
    title: string
    feildTotalCount: number
    toBeClassified: boolean
  }

  type DataMenu = {
    key: number
    title: string
    dataSourceLock: boolean
    tableTotalCount: number
    children: TableList[]
  }
  type DataMenuResponse = {
    disabled?: boolean
    key: Key
    title: string | React.ReactNode
    dataSourceTotalCount: number
    dataSourceLock: boolean
    tableTotalCount?: number
    fieldTotalCount?: number
    toBeClassified?: boolean
    dataSourceId: number
    newDataSourceId?: number
    tableId?: number
    children?: DataMenuResponse[]
  }

  type DataMenuResponseTempItems = {
    dataSourceId: number
    dataSourceName: string
    dataSourceLock: string
  }

  type DataMenuResponseTemp = {
    items: DataMenuResponseTempItems[]
  }

  type TablesClassifyStatsResponseItem = {
    num: number
    tableName: string
    tableId: number
    confirmedProportion: number
  }

  type TablesClassifyStatsResponse = {
    dataSourceId: number
    dataSourceConfirmedProportion: number
    dataSourceDesc: string
    tableStats: {
      totalTableCount: number
      confirmedTableCount: string
      toBeConfirmedTableCount: string
      ignoredTableCount: string
    }
    items: TablesClassifyStatsResponseItem[]
  }

  type ModifiedDataMenuResponse = {
    key: Key
    title: string | React.ReactNode
    dataSourceTotalCount: number
    tableTotalCount?: number
    fieldTotalCount?: number
    dataSourceLock: boolean
    dataSourceId: number
    children?: DataMenuResponse[]
  }
  type TableClassifyResultListRequest = BasicPageParams & {
    dataSourceId: number
    confirmState: number
    grade: number
  }

  type ClassifyBasicPageResultSystom<T> = {
    code: number
    message: string
    data: {
      totalCount: number
      totalFieldCount: number
      systemName: string
      toBeConfirmedCount: number
      ignoredCount: number
      confirmedCount: number
      systemHitClassCount: number
      modifiedCount: number
      items: T
    }
  }

  type ClassifyBasicPageResultSystom<T> = {
    code: number
    message: string
    data: {
      totalCount: number
      systemName: string
      toBeConfirmedCount: number
      ignoredCount: number
      confirmedCount: number
      items: T
    }
  }
  type ClassifyBasicPageResultSystom2<T> = {
    code: number
    message: string
    data: {
      totalCount: number
      systemName: string
      items: T
    }
  }
  type TableClassifyModifyListResponse = {
    tableId: number
    tableName: string
    description: string
    dataTotalCount: number
    classNames: string
    grading: number
  }

  type ClassifyBasicPageResultTable<T> = {
    code: number
    message: string
    data: {
      totalCount: number
      tableName: string
      toBeConfirmedCount: number
      ignoredCount: number
      confirmedCount: number
      systemHitClassCount: number
      modifiedCount: number
      tableDesc: string
      items: T
    }
  }

  type ClassifyBasicPageResultTable2<T> = {
    code: number
    message: string
    data: {
      totalCount: number
      tableName: string
      items: T
    }
  }

  type TableClassifyResultListResponse = {
    tableId: number
    tableName: string
    description: string
    dataTotalCount: number
    classNames: string
    grading: string
    tableStatus: number
    dataSourceType: number
    dataSourceName: string
    dbName: string
  }

  type FieldClassifyModifyListResponse = {
    fieldId: number
    fieldName: string
    description: string
    fieldRemark: string
    fieldType: string
    dataSamples: string
    classNames: string
    grading: number
  }

  // type GetAllModuleTreeListResponseItem = {
  //   key: number
  //   title: string
  //   sort: number
  //   classLink: string
  //   children?: GetAllModuleTreeListResponse[]
  // }

  type GetAllModuleTreeListResponse = {
    key: number
    title: string
    sort?: number
    classLink?: string
    moduleId?: number
    children: GetAllModuleTreeListResponse[]
  }

  type FieldClassifyResultListRequest = BasicPageParams & {
    tableId: number
    confirmState: number
    weight: number
  }

  type ClassifyBasicPageResult<T> = {
    code: number
    message: string
    data: {
      totalCount: number
      tableName: string
      toBeConfirmedCount: number
      ignoredCount: number
      confirmedCount: number
      items: T
    }
  }
  type Class = {
    key: string[]
    title: string
    classLinks: string
  }
  type FieldClassifyResultListResponse = {
    weight: number
    fieldId: number
    fieldName: string
    description: string
    fieldRemark: string
    fieldType: string
    dataSamples: string
    fieldStatus: number
    classInfo: {
      key: string[]
      title: string
      classLinks: string
      weightList: string
      classGradings: string
    }
    grading: number
    identificationFail: boolean
    reidentificationStatus: number
  }

  type UpdateClassifyResultRequest = {
    fieldId: number
    fieldRemark: string
    classIdList: string[]
  }

  type updateVerificationStatusRequest = {
    tableId?: number
    fieldId?: number
    status: number
  }
  type ModuleTreeListRequest = {
    moduleId: string | number
  }
  type ModuleTreeListResponse = {
    key: number
    title: string
    moduleId: number
    sort: number
    classLink?: string
    children: ModuleTreeListResponse[]
  }
  type SubClassListRequest = {
    classId?: number
    className?: string
    grading?: number
    moduleId?: number
  }
  type SubClassListResponse = {
    classId: number
    className: string
    grading: number
    description: string
  }
  type AddClassRequest = {
    moduleId: number
    className: string
    grading: number
    description: string
    parentId: number
    sort: number
  }
  type UpdateClassRequest = {
    classId: number
    className: string
    grading: number
    description: string
  }

  type DeleteClassRequest = {
    classId: number
  }

  type ModuleChangeLogRequest = {
    moduleId: number
  }
  type ExportModuleRequest = ModuleChangeLogRequest

  type ExportModuleChangeLogRequest = ModuleChangeLogRequest
  type ModuleChangeLog = {
    changeType: number
    changeInfo: string[]
  }
  type ModuleChangeLogResponse = {
    date: string
    version: string
    contentVoList: ModuleChangeLog[]
  }
  type StatisticalDataResponse = {
    fieldTotalCount: string
    classifiedTotalCount: string
    ignoredTotalCount: string
    modifiedTotalCount: string
    hitRate: string
  }
  type ClassDetailRequest = {
    classId: number
  }
  type ClassDetailResponse = {
    moduleId: number
    className: string
    parentId: number
    grading: number
    description: string
    sort: number
  }
  type MetadataRequest = {
    dataSourceId: number
    tableId: number
    fieldId: number
    sampleCount: number
  }

  type BatchUpdateIgnoreStatusRequest = {
    tableIdList?: Key[]
    fieldIdList?: Key[]
  }

  type BatchVerifyRequest = {
    fieldIdList: Key[]
  }
}
