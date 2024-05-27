import type { RuleObject } from 'antd/lib/form'
/**
 * @returns {Boolean}
 * @desc 4~50位的邮箱必须包含@字符
 * @param rule
 * @param value
 * @param cb
 */
export const validEmail = (rule: RuleObject, value: string, cb: (error?: string) => void) => {
  if (!value) {
    cb('邮箱不能为空')
  } else if (value.length < 4 || value.length > 50) {
    cb('请输入4~50个字符之间的邮箱')
  } else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
    cb('邮箱格式错误')
  } else {
    cb()
  }
}

export const validHoldTime = (rule: RuleObject, value: number, cb: (error?: string) => void) => {
  if (!value) {
    cb('文件留存周期不能为空')
  } else if (!/^[0-9]+$/.test(String(value))) {
    cb('文件留存周期只能输入数字')
  } else if (value < 1 || value > 365) {
    cb('请输入1-365范围内数字')
  } else {
    cb()
  }
}

// 校验时间 yyyy-MM-dd HH:mm
export const validDate = (rule: RuleObject, value: string, cb: (error?: string) => void) => {
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})\s(\d{1,2}):(\d{1,2})$/
  if (!value) {
    cb('请输入泄密时间')
  } else if (!reg.test(value)) {
    cb('泄密时间格式错误')
  } else {
    cb()
  }
}

// 检验执行时间
export const validRegularExecTime = (_: unknown, val: { format: (arg0: string) => string | number | Date }, cb: (arg0: string | undefined) => void) => {
  if (!val) {
    cb('请选择执行时间')
  } else if (new Date().getTime() > new Date(val.format('YYYY-MM-DD HH:mm')).getTime()) {
    cb('执行时间需要在当前时间之后')
  } else {
    cb(undefined)
  }
}

// 校验ip 192.168.1.102 | 192.168.1.120-192.168.1.204 | 192.168.2.0/24
export const validIPSegment = (rule: RuleObject, value: string, cb: (error?: string) => void) => {
  const reg = /^((\d{1,3}\.){3}\d{1,3})|((\d{1,3}\.){3}\d{1,3}-(\d{1,3}\.){3}\d{1,3})|((\d{1,3}\.){3}\d{1,3}\/\d{1,2})$/
  const values = value.split('\n')
  values.forEach((value) => {
    if (!value) {
      cb('扫描范围不能为空')
    } else if (!reg.test(value)) {
      cb('扫描地址格式错误')
    } else if (value.indexOf('-') !== -1) {
      // 验证起始ip小于结束ip，且ip范围在1-255之间
      const [start, end] = value.split('-')
      const startArr = start.split('.')
      const endArr = end.split('.')
      if (
        Number(startArr[0]) > Number(endArr[0]) ||
        Number(startArr[1]) > Number(endArr[1]) ||
        Number(startArr[2]) > Number(endArr[2]) ||
        Number(startArr[3]) > Number(endArr[3])
      ) {
        cb('起始ip不能大于结束ip')
      } else if (Number(startArr[0]) < 1 || Number(startArr[0]) > 255 || Number(endArr[0]) < 1 || Number(endArr[0]) > 255) {
        cb('ip范围错误')
      } else if (Number(startArr[1]) < 1 || Number(startArr[1]) > 255 || Number(endArr[1]) < 1 || Number(endArr[1]) > 255) {
        cb('ip范围错误')
      } else if (Number(startArr[2]) < 1 || Number(startArr[2]) > 255 || Number(endArr[2]) < 1 || Number(endArr[2]) > 255) {
        cb('ip范围错误')
      } else if (Number(startArr[3]) < 1 || Number(startArr[3]) > 255 || Number(endArr[3]) < 1 || Number(endArr[3]) > 255) {
        cb('ip范围错误')
      } else {
        cb()
      }
    } else if (value.indexOf('/') !== -1) {
      // 验证ip范围在1-255之间
      const [ip, mask] = value.split('/')
      const ipArr = ip.split('.')
      if (Number(ipArr[0]) < 1 || Number(ipArr[0]) > 255) {
        cb('ip范围错误')
      } else if (Number(ipArr[1]) < 1 || Number(ipArr[1]) > 255) {
        cb('ip范围错误')
      } else if (Number(ipArr[2]) < 1 || Number(ipArr[2]) > 255) {
        cb('ip范围错误')
      } else if (Number(ipArr[3]) < 1 || Number(ipArr[3]) > 255) {
        cb('ip范围错误')
      } else if (Number(mask) < 1 || Number(mask) > 32) {
        cb('掩码范围错误')
      } else {
        cb()
      }
    } else if (value.indexOf('-') === -1 && value.indexOf('/') === -1) {
      // 验证ip范围在1-255之间
      const ipArr = value.split('.')
      if (Number(ipArr[0]) < 1 || Number(ipArr[0]) > 255) {
        cb('ip范围错误')
      } else if (Number(ipArr[1]) < 1 || Number(ipArr[1]) > 255) {
        cb('ip范围错误')
      } else if (Number(ipArr[2]) < 1 || Number(ipArr[2]) > 255) {
        cb('ip范围错误')
      } else if (Number(ipArr[3]) < 1 || Number(ipArr[3]) > 255) {
        cb('ip范围错误')
      } else {
        cb()
      }
    } else {
      cb()
    }
  })
}

// 校验端口 1-65535 | 8081
export const validPortSegment = (rule: RuleObject, value: string, cb: (error?: string) => void) => {
  const reg =
    /^(?:([1-9]\d{0,4})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5]))(?:-([1-9]\d{0,4})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5]))?$/
  const values = value.split('\n')
  values.forEach((value) => {
    if (!value) {
      cb('端口不能为空')
    } else if (!reg.test(value)) {
      cb('端口错误')
    } else if (value.indexOf('-') !== -1) {
      const [start, end] = value.split('-')
      if (Number(start) > Number(end) || Number(start) < 1 || Number(end) > 65535) {
        cb('端口错误')
      } else {
        cb()
      }
    } else if (value.indexOf('-') === -1 && (Number(value) < 1 || Number(value) > 65535)) {
      cb('端口错误')
    } else {
      cb()
    }
  })
}
