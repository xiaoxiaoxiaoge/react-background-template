declare namespace API {
  type GetAuthListPageRequest = BasicPageParams & {
    dataSourceName: string
    dataSourceType: string
    systemName: string
  }
  type GetAuthListPageResponse = {
    id: number
    dataSourceName: string
    dataSourceType: string
    systemName: string
    authOwnerShip: string
    createdTime: string
  }
  type GetUserRoleListPageRequest = BasicPageParams & {
    userName: string
    fullName: string
    email: string
  }
  type GetUserRoleListPageResponse = {
    id: number
    userName: string
    fullName: string
    email: string
    roleName: string
    systemOrDatasourceUser: boolean
  }
  type EditAuthRequest = {
    id: number
    userIds: number[]
  }

  type GetRoleListPageRequest = BasicPageParams & {
    dataSourceName?: string
    dataSourceType?: string
    systemName?: string
    isDefaultRole: boolean
    roleId: number
  }

  type GetRoleListPageResponse = {
    id: number
    defaultRole: boolean
    userName: string
    description?: string
    roleName: string
  }

  type GetRoleListResponse = {
    id: number
    roleName: string
  }

  type GetHalfMenuListResponse = {
    id: number
    menuCode: string
    menuName: string
    menuLevel: number
    parentMenuCode?: string
  }
  type GetRoleMenuByRoleIdResponse = {
    roleName: string
    description: string
    menuCodes: string[]
  }
  type AddRoleRequest = {
    roleName: string
    description: string
    menuCodeList: string[]
  }
  type UpdateStatusRequest = {
    id: number
    jobStatus: number
  }
  type DeleteRoleRequest = {
    ids: number[]
  }
  // 用户
  type GetUserListPageRequest = BasicPageParams & {
    userId: number
    userName: string
    fullName: string
    email: string
    isDelete: number
  }

  type AddUserRequest = {
    userName: string
    roleId: number
    newPassword: string
    confirmPassword: string
    fullName: string
    email: string
    useTime: number
    deadLine: string
  }

  type GetUserListPageResponse = {
    userName: string
    fullName: string
    email: string
    roleName: string
    useTime: string
    deadLine: string
    status: number
    createTime: string
    id: number
  }
  type EditStatusRequest = {
    id: number
    status: number
  }

  type EditUserRequest = {
    id: number
    fullName?: string
    email?: string
    useTime?: number
    deadLine?: string
    status?: number
  }

  type DeleteUserRequest = {
    ids: number[]
  }
  type AccountRecordParams = BasicPageParams & {
    userName?: string
    roleId?: string
    status?: number
  }

  type AccountRecord = {
    deadLine: ReactNode
    useTime: number
    id: number
    userName: string
    roleName: string
    roleId: number
    createTime: string
    email?: string
    status?: number
  }

  type AccountCreateParams = {
    roleIdSet: number[]
    userName: string
    password: string
    confirmPassword: string
    email: string
    status: number
  }

  type AccountDeleteParams = {
    ids: number[]
  }

  type AccountModifyParams = {
    id: number
    status: number
    email: string
  }

  type AccountInfoParams = {
    id: string
  }

  type RoleRecordParams = BasicPageParams & {
    roleName?: string
  }

  type RoleRecord = {
    defaultRole: boolean | undefined
    roleId: number
    id: number
    roleCode: string
    roleName: string
    menuCodeList?: string[]
    createTime: string
  }

  type RoleCreateParams = {
    menuCodeList: string[]
    roleName: string
  }

  type RoleDeleteParams = {
    roleIdList: number[]
  }

  type RoleModifyParams = {
    menuCodeList: string[]
    roleName: string
    roleId: number
  }

  type RoleInfoParams = {
    roleId: string
  }

  type TenantRecordParams = BasicPageParams & {
    tenantName?: string
    userName?: string
    status?: number
  }

  type TenantRecord = {
    id: string
    tenantName: string
    userId: string
    userName: string
    usedProportion: number
    status: number
    expireTime: string
    createTime: string
  }
  type TenantCreateParams = {
    tenantInfo: {
      id: string
      tenantName: string
      webSiteUrl: string
      status: number
      expireTime: string
    }
    userInfo: {
      userName: string
      password: string
      confirmPassword: string
      email: string
      tenantId: string
    }
    watermarkInfos: {
      watermarkType: number
      authNum: number
      tenantId: string
    }[]
    menuCodes?: string[]
  }

  type TenantDetailParams = {
    id: string
    userId: string
  }

  type TenantDetail = {
    tenantInfo: {
      tenantName: string
      webSiteUrl: string
      status: number
      expireTime: string
    }
    userInfo: {
      userName: string
      email: string
    }
    watermarkInfos: {
      watermarkType: number
      totalCount: number
      usedCount: number
      restCount: number
      endTime: string
    }[]
    menuCodes: string[]
  }

  type AccessTokenRecordsParams = BasicPageParams & {
    id?: number
  }

  type AccessTokenRecord = {
    id: number
    tokenCreater: string
    createTime: string
    remark: string
    tokenValue: string
  }

  type AccessTokenCreateParams = {
    remark: string
  }

  type AccessTokenModifyParams = {
    id: number
    remark: string
  }

  type AccessTokenDeleteParams = {
    ids: number[]
  }

  type HmacRecordsParams = BasicPageParams & {
    description?: string
    username?: string
  }

  type HmacRecord = {
    id: number
    username: string
    secret: string
    description: string
    createTime: string
  }

  type HmacCreateParams = {
    username: string
    description?: string
  }

  type HmacModifyParams = {
    id: number
    username: string
    description?: string
  }

  type HmacDeleteParams = {
    ids: number[]
  }
  type WmTempRecordsParams = BasicPageParams & {
    moduleName?: string
    moduleId?: number
    orderStr?: string
    orderType?: 'asc' | 'desc'
    watermarkType?: number
  }
  type GetListRequest = BasicPageParams & {
    ruleStatus: string
  }
  type GetListfoResponse = {
    id: number
    ruleSetName: string
    ruleSetVersion: string
    moduleMD5: string
    username: string
    createTime: string
    ruleSetStatus: number
  }
  type UpdateRequest = {
    id: number
    ruleSetStatus: number
  }
  type GetUsedInfoResponse = {
    id: number
    ruleSetName: string
    ruleSetVersion: string
  }
  type GetModuleMd5Response = {
    md5: string
  }

  type SystemInfoResponse = {
    system: string
    ip: string
    mac: string
    cpu: number
    arm: number
    storage: number
    cpuUsed: number
    armUsed: number
    storageUsed: number
    runningTime: number
    connectDatabaseNum: number
    linkFileServiceNum: number
    userNum: number
    serverNum: number
  }

  type ServiceInformationResponse = {
    index: number
    id: string
    name: string // 服务名
    description?: string // 描述
    cpuUsageRate: number // cpu使用率
    memoryUsageRate: number // 内存使用率
    state?: number // 运行状态（1：正在运行 2：已停止）
  }

  type LogListRequest = BasicPageParams & {
    operateUser?: string
    operateDescription?: string
    operateResult?: string
    minOperateTime?: string
    maxOperateTime?: string
    operateTime?: string[]
  }

  type LogListResponse = {
    id?: string // 编号
    operateUser?: string // 操作用户
    operateIp?: string // 操作ip
    operateDescription?: string // 操作描述
    params?: string // 请求参数
    operateResult?: number // 操作结果(1: 成功 2：失败)
    errorMessage?: string // 操作失败信息
    operateTime?: string // 操作时间
  }

  type Containers = {
    spec: {
      memory: {
        limit: number
      }
    }
    stats: {
      memory: {
        usage: number
      }
      timestamp: string
      cpu: {
        usage: {
          total: number
          per_cpu_usage: number[]
        }
      }
      filesystem: {
        capacity: number
        usage: number
      }[]
    }[]
  }

  type SubContainers = {
    namespace?: string
    id: string
    aliases: string[]
  }

  type GetSystemInfoResponse = {
    system: string
    ip: string
    mac: string
    userNum: string
    serverDescList: { serverName: string; description: string }[]
  }
}
