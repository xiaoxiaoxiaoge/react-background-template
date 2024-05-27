import { Modal, message as AntdMessage } from 'antd'
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { indexOf, throttle } from 'lodash'

import { setSession, getSession } from './tool'
import { getServerExceptionMessage } from '@/services/status'
import { refreshToken } from '@/services/user/login'

const request: AxiosInstance = axios.create({
  headers: {},
  baseURL: '/',
  timeout: 1080000
})
const { CancelToken } = axios
export const ignoreMsgCodes = [80002, 80009]
// 用户错误codes
const ACCOUNT_ERROR_CODES = [60001, 60002, 60003]
// token错误codes
const TOKEN_ERROR_CODES = [30001, 30002, 30003, 30004]
export const licenseExpireCodes = [20004]

// export const ignoreMsgCodes = [20002, 20009]
// // 用户错误codes
// const ACCOUNT_ERROR_CODES = [60001, 60002, 60003]
// // token错误codes
// const TOKEN_ERROR_CODES = [20001, 20002, 20003, 20004]
// export const licenseExpireCodes = [20004]

// 需要返回response的接口地址
const RETURN_RESPONSE_URLS = ['/api/v1/module/exportModule', '/api/v1/verification/exportModifiedList']
const CAD_VISOR_URLS = ['/api/v1.0/containers', '/api/v1.1/subcontainers', '/api/v1.0/containers/system.slice']
const CAD_SYSTEM_URL = ['/docker/']
export const ignoreMsgUrls = ['/api/v1/license/checkLicense']
const throwTokenError = (msg = '') => {
  Modal.destroyAll()
  Modal.confirm({
    title: '温馨提示',
    content: msg || '因超时未操作，您已被登出，请重新登录',
    keyboard: false,
    closable: false,
    okCancel: false,
    async onOk() {
      sessionStorage.clear()
      window.location.reload()
    }
  })
}

const throwLicenseError = (msg = '') => {
  Modal.destroyAll()
  Modal.confirm({
    title: '温馨提示',
    content: msg || 'License授权到期',
    keyboard: false,
    closable: false,
    okCancel: false,
    async onOk() {
      sessionStorage.clear()
      window.location.reload()
    }
  })
}

export let cancelFn = (cancel: string) => {
  AntdMessage.info(cancel)
}

// 刷新token时效
const resetToken = (response: AxiosResponse) => {
  // @ts-ignore
  const refreshTokenVal = response.headers.get?.('x-refresh-token')
  const handleRefreshToken = async () => {
    const { data } = await refreshToken()
    const t = `${data?.tokenType} ${data?.tokenValue}`
    setSession('token', t)
    setSession('login_result', data)
  }
  const throttled = throttle(handleRefreshToken, 5 * 1000, { trailing: true })
  if (refreshTokenVal && refreshTokenVal === '1') {
    throttled()
  }
}

// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.cancelToken = new CancelToken((cancel) => {
      cancelFn = cancel
    })
    const token = getSession('token', '')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: unknown) => {
    return Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status, config } = response

    if (status !== 200) {
      AntdMessage.warning(getServerExceptionMessage(status))
      return
    } else {
      if (indexOf(RETURN_RESPONSE_URLS, response.config.url?.split('?')[0]) >= 0) {
        return response
      }
      if (config.url && CAD_VISOR_URLS.includes(config.url?.split('/docker')[0])) {
        return response.data
      }
      if (config.url && CAD_SYSTEM_URL.includes(config.url)) {
        return response.data
      }
    }

    const { code, message } = data || {}
    resetToken(response)
    if (code === 0) {
      return response.data
    }
    if (ACCOUNT_ERROR_CODES.includes(code) && window.location.pathname !== '/login') {
      return throwTokenError(message)
    }
    if (TOKEN_ERROR_CODES.includes(code)) {
      return throwTokenError()
    }
    if (config.url && ignoreMsgUrls.includes(config.url)) {
      return response.data
    }
    if (licenseExpireCodes.includes(code)) {
      return throwLicenseError(message)
    }
    if (code !== 0 && message) {
      AntdMessage.warning(message)
      return Promise.reject(message)
    }
  },
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      AntdMessage.error(getServerExceptionMessage(response.status))
      return Promise.reject(response.data)
    } else {
      AntdMessage.error(error)
    }
  }
)

export default request
