import { generate, presetPalettes } from '@ant-design/colors'
export interface IDefaultTheme {
  themeColor: string
  menuMode: string
  title: string
  loginBac: string
  loginLogo: string
  realMenu: any
  publicKey: string
  company: string
  versions: string
}
// export const subjectColor = generate('#6200ee')
export const subjectColor = generate('#1781b5')

export const defaultTheme = {
  themeColor: subjectColor[5], // 主题色
  menuActiveColor: subjectColor[3], // 菜单激活色
  menuMode: 'vertical', // 标签模式 horizontal vertical mix
  headerHeight: 60, // 头部高度
  breadHeight: 50, // 面包屑高度 (默认高度50)
  footerHeight: 32, // 底部Copyright高度
  title: '数据智能分类分级系统',
  loginBac: '/img/login_bg.png',
  loginForm: '/img/primary/login_form.png',
  loginLogo: '/img/primary/login_logo.png',
  realMenu: null,
  publicKey: '',
  company: '高维数据技术有限公司',
  versions: '1.0.0',
  defaultRoute: [{ menuCode: 'F1-1' }, { menuCode: 'F1-2' }, { menuCode: 'F1-2-7' }]
}
