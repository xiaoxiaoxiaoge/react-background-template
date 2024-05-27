declare namespace API {
  type CountDataAssetChangeResponse = {
    dateString: string
    sourceCount: number
    tableCount: number
  }

  type GetClassiflyCountResponse = {
    level: string
    levelName: string
    count: number
  }

  type TaskStatusCountResponse = {
    dateString: string
    successCount: number
    failCount: number
  }

  type DiscoverCountResponse = {
    dataSourceType: number
    dataSourceTypeName: string
    typeCount: 1
  }
}
