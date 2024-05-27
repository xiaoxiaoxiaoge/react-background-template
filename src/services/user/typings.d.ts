declare namespace API {
  type LoginType = {
    username: string
    password: string
    imageCode: string
    captchaToken: string
  }
  type FirstLoginRequest = {
    newPassword: string
    confirmPassword: string
    email: string
  }
  type UpdatePwd = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }
  type UpdateUserInfoRequset = {
    userName: string
    email: string
  }
  type GetUserInfoResponse = {
    id: number
    userName: string
    email: string
    isDelete: number
  }
  type GetMenuListByUserIdResponse = {
    id: number
    menuCode: string
    menuLevel: number
    menuName: string
    parentMenuCode: string
  }
  type GetMenuListResponse = GetMenuListByUserIdResponse

  type LoginResponseType = {
    firstLogin: boolean
    id: number
    tokenType: string
    tokenValue: string
  }
  type CaptchaInfo = {
    img?: string
    captchaToken?: string
  }

  type ForgetPsdParams = {
    captchaId: string
    captchaCode: string
    userName: string
    newPassword: string
    confirmPassword: string
  }

  type ResetPsdParams = {
    newPassword: string
    confirmPassword: string
    email: string
  }

  type CurrentUser = {
    id?: number
    userName: string
    roleName?: string
    status?: 0 | 1
    email?: string
  }

  type ModifyUserInfoParams = {
    email: string
  }

  type RefreshTokenResponse = {
    tokenType: string
    tokenValue: string
    scopes: string
    firstLogin: boolean
  }
}
