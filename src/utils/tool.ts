import { message } from 'antd'
import { sm2 } from 'sm-crypto'
export const setSession = (name: string, data: any, source?: any) => {
  let params = source || {}
  if (typeof data === 'object') {
    if (typeof data.isArray === 'function') {
      // 数组全覆盖
      params = data
    } else {
      if (typeof source === 'undefined') {
        params = {}
      }
      // 对象增量覆盖
      for (const key in data) {
        params[key] = data[key]
      }
    }
    sessionStorage.setItem(name, JSON.stringify(params))
  } else {
    params = data
    sessionStorage.setItem(name, params)
  }
  return params
}

/**
 * 读取sessionStorage存储的对象
 * name是对象名, val是对象不存在时返回的默认值
 */
export const getSession = (name: string, val: any) => {
  const v = sessionStorage.getItem(name)
  let w = ''
  if (v == null) {
    return val
  }
  if (typeof v === 'string') {
    try {
      w = JSON.parse(v)
      if (typeof w === 'object' || typeof w === 'boolean') {
        return w
      }
      return v
    } catch (e) {
      return v
    }
  }
}

// sm2 非对称加密
export const Encrypt = (value: string, key: string) => {
  return `04${sm2.doEncrypt(value, key, 1)}`
}
// sm2 非对称解密
export const Decrypt = (value: string, key: string) => {
  return sm2.doDecrypt(value, key, 1)
}

// 判断是否为IE
export const isIE = () => {
  if ((window as any).ActiveXObject || 'ActiveXObject' in window) {
    return true
  }
  return false
}

export const stringToRgb = (str: string) => {
  const template = str.toLowerCase()
  let result = ''
  if (template.indexOf('rgb(') === 0) {
    result = template
  } else if (template.indexOf('rgba(') === 0) {
    const colors = template
      .replace(/rgba\(/g, '')
      .replace(/\)/g, '')
      .split(',')
    const r = colors[0]
    const g = colors[1]
    const b = colors[2]
    result = `rgb(${r},${g},${b})`
  } else if (template.indexOf('#') === 0) {
    let colors = template.replace(/#/g, '')
    const resultArr = []
    if (colors.length === 3) {
      colors = colors.replace(/[0-9a-f]/g, (str) => {
        return str + str
      })
    }
    for (let i = 0; i < colors.length; i += 2) {
      resultArr.push(parseInt(colors[i] + colors[i + 1], 16))
    }
    result = `${resultArr.join(',')}`
  }
  // if (mode === "string") {
  //   return result
  // } else if (mode === "array") {
  return result.replace(/rgb\(/g, '').replace(/\)/g, '').split(',')
  // }
}

// 屏幕放大
export const screenFull = (element: any) => {
  if (element?.RequestFullScreen) {
    element.RequestFullScreen()
  } else if (element?.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element?.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element?.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else {
    message.warning('浏览器不支持全屏')
  }
}

// 屏幕缩小
export const screenExitFull = () => {
  if (document?.exitFullscreen) {
    document.exitFullscreen()
  } else {
    message.warning('浏览器不支持全屏')
  }
}

// 行内样式自适应
export const px2rem = (px: string) => {
  if (/%/gi.test(px)) {
    return px
  } else {
    return `${parseFloat(px) / 10}rem`
  }
}

// 组件适配
export const handleResize = (element: string, designWidth: number, desingnHeight: number) => {
  // 01
  let newScale = 1
  let clientWidth = document.querySelector(element)?.clientWidth
  let clientHeight = document.querySelector(element)?.clientHeight
  if (clientWidth && clientHeight) {
    const scaleWidth = clientWidth / designWidth
    const scaleHeight = clientHeight / desingnHeight
    newScale = Math.min(scaleWidth, scaleHeight)
  }
  return newScale
}
