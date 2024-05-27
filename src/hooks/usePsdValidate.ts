/**
 * 动态校验密码
 */
import { RuleObject } from 'antd/es/form'

export enum PsdValidEnum {
  Capital = 1,
  Lowercase,
  Number,
  SpecialChar
}
type PsdSecureSetting = {
  id?: number
  minLength: number
  passwordSec?: string[]
  pwdSecList: number[]
  expireDay?: number
}
export const usePsdValidate = () => {
  const psdSetting: PsdSecureSetting = {
    minLength: 8,
    pwdSecList: [1]
  }
  const validPsdBySecureSetting = (rule: RuleObject, value: string, cb: (error?: string) => void) => {
    const { pwdSecList } = psdSetting
    if (!value) {
      return cb('密码不能为空')
    }
    if (value.length < 8 || value.length > 50) {
      const msg = '请输入8~50个字符之间的密码'
      return cb(msg)
    }
    if (!/^[^\s]*$/.test(value)) {
      return cb('密码不能包含空格')
    }
    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$%\*-\+=:,\\?\[\]\{}]).{6,16}$/
    if (pwdSecList.includes(PsdValidEnum.Capital)) {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+]).{5,50}$/.test(value)) {
        return cb('密码必须同时包含大小写字母、数字、特殊字符')
      }
    }

    // if (pwdSecList.includes(PsdValidEnum.Capital)) {
    //   if (!/^(?:(?=.*[A-Z])).{1,}$/.test(value)) {
    //     return cb('密码必须包含大写字母');
    //   }
    // }
    // if (pwdSecList.includes(PsdValidEnum.Lowercase)) {
    //   if (!/^(?:(?=.*[a-z])).{1,}$/.test(value)) {
    //     return cb('密码必须包含小写字母');
    //   }
    // }
    // if (pwdSecList.includes(PsdValidEnum.Number)) {
    //   if (!/^(?:(?=.*[0-9])).{1,}$/.test(value)) {
    //     return cb('密码必须包含数字');
    //   }
    // }
    // if (pwdSecList.includes(PsdValidEnum.SpecialChar)) {
    //   if (!/^(?:(?=.*[~!@#$%^&*()_+])).{1,}$/.test(value)) {
    //     return cb('密码必须包含特殊字符，如：～＠＃＄％＾＆＊（）＿＋');
    //   }
    // }
    cb()
  }

  const validConfirmPsd = (rule: RuleObject, value: string, cb: (error?: string) => void, psd: string) => {
    if (!value) {
      cb('确认密码不能为空')
    } else if (value !== psd) {
      cb('两次密码不一致，请重新输入')
    } else {
      cb()
    }
  }

  // useMount(async () => {
  //   const res = await getPsdSecureSetting();
  //   if (res.status === 0 && res.data) {
  //     setPsdSetting({ ...res.data });
  //   }
  // });

  return { psdSetting, validPsdBySecureSetting, validConfirmPsd }
}
