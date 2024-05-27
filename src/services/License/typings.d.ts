declare namespace API {
  type UpdateLicenseRequset = {
    licenseKey?: string
  }

  type QueryServerResponse = {
    authorizeStatus: number
    createTime: string
    id: string
    salt: string
    serverSign: string
    updateTime: string
  }

  type GetLicenseDetailInfos = {
    updateTime?: string
    endTime?: string
    usableTime?: string
  }
}
