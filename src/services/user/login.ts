import request from '@/utils/request'

export const loginOut = (): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/login/permitAll/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const loginConfigInfos = (): Promise<BasicFetchResult<{ publicKey: string }>> => {
  return request({
    url: '/api/v1/login/permitAll/loginConfigInfos',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getCaptcha = (): Promise<BasicFetchResult<API.CaptchaInfo>> => {
  return request({
    url: '/api/v1/captcha/permitAll/getCaptcha',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const login = (params: API.LoginType): Promise<BasicFetchResult<API.LoginResponseType>> => {
  return request({
    url: '/api/v1/login/permitAll/loginSystem',
    method: 'post',
    data: { ...params }
  })
}

// 首次登录
export const firstLogin = (params: API.FirstLoginRequest): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/user/firstLogin',
    method: 'post',
    data: { ...params }
  })
}

// 修改密码
export const updatePwd = (params: API.UpdatePwd): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/user/updatePwd',
    method: 'post',
    data: { ...params }
  })
}

// 获取用户信息
export const getUserInfo = (): Promise<BasicFetchResult<API.GetUserInfoResponse>> => {
  return request({
    url: '/api/v1/user/getUserInfo',
    method: 'post'
  })
}

// 修改个人信息
export const updateUserInfo = (params: API.UpdateUserInfoRequset): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/user/updateUserInfo',
    method: 'post',
    data: { ...params }
  })
}

// 获取菜单
export const getMenuList = (): Promise<BasicFetchResult<API.GetMenuListResponse>> => {
  return request({
    url: '/api/v1/menu/getMenuList',
    method: 'post'
  })
}

// 用户菜单
export const getMenuListByUserId = (): Promise<BasicFetchResult<API.GetMenuListByUserIdResponse[]>> => {
  return request({
    url: '/api/v1/menu/getMenuListByUserId',
    method: 'post'
  })
}

// 刷新token
export const refreshToken = (): Promise<BasicFetchResult<API.RefreshTokenResponse>> => {
  return request({
    url: '/api/v1/personal/refreshToken',
    method: 'post'
  })
}

// license校验
export const checkLicense = (): Promise<BasicFetchResult<null>> => {
  return request({
    url: '/api/v1/license/checkLicense',
    method: 'post'
  })
}
