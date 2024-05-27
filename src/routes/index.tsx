import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import lazyComponent from './utils/LazyLoad'

import Layout from '../views/Layout/index'
import IconFont from '@/components/IconFont'
import { RootState } from '@/store'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'

const Welcome = lazyComponent(() => import('../views/Welcome'))

const Login = lazyComponent(() => import('../views/User/Login/index'))
const Exception = lazyComponent(() => import('../views/Exception'))
const ResetPsd = lazyComponent(() => import('../views/User/ResetPsd/index'))
const ModifyPsd = lazyComponent(() => import('../views/User/ModifyPsd/index'))
const ModifyUser = lazyComponent(() => import('../views/User/ModifyUser/index'))
const UserManege = lazyComponent(() => import('../views/Auth/UserManage/index'))
const UmCreate = lazyComponent(() => import('../views/Auth/UserManage/UmCreate/index'))
const UmModify = lazyComponent(() => import('../views/Auth/UserManage/UmModify/index'))
const RoleManege = lazyComponent(() => import('../views/Auth/RoleManege/index'))
const RmCreate = lazyComponent(() => import('../views/Auth/RoleManege/RmCreate/index'))
const RmModify = lazyComponent(() => import('../views/Auth/RoleManege/RmModify/index'))

// const Test = lazyComponent(() => import('../views/test'))

const ManageDate = lazyComponent(() => import('../views/DataAssetJob/DataManage/index'))

const CreateDate = lazyComponent(() => import('../views/DataAssetJob/DataManage/DataCreate/index'))
const DetailsDate = lazyComponent(() => import('@/views/DataAssetJob/DataManage/DataDetails/index'))
const ErrorDate = lazyComponent(() => import('../views/DataAssetJob/DataManage/DataError/index'))
const AssetLedger = lazyComponent(() => import('../views/DataAssetJob/DataLedger/index'))

const BigScreen = lazyComponent(() => import('../views/BigScreen/index'))
const License = lazyComponent(() => import('../views/Auth/License/index'))
const NotFound = lazyComponent(() => import('../views/404'))

export interface IRoute {
  path: string
  label?: string
  icon?: React.ReactNode
  key: string
  element?: React.ReactNode | JSX.Element
  needLogin?: boolean
  hidden?: boolean
  code?: string
  children?: IRoute[]
  default?: boolean
  isShow?: boolean
  routes?: IRoute[]
}

export const defaultRoutes: IRoute[] = [
  {
    path: '/',
    key: '/',
    element: <Navigate to="/welcome" />
  },

  {
    path: '/login',
    key: '/login',
    element: <Login />
  },
  {
    path: '/resetPsd',
    key: '/resetPsd',
    element: <ResetPsd />
  },
  {
    path: '/modifyPsd',
    key: '/modifyPsd',
    element: <Layout>{<ModifyPsd />}</Layout>,
    needLogin: true
  },
  {
    path: '/modifyUser',
    key: '/modifyUser',
    element: <Layout>{<ModifyUser />}</Layout>,
    needLogin: true
  },
  {
    path: '/500',
    key: '/500',
    element: <Exception />
  },
  {
    path: '/404',
    key: '/404',
    element: <NotFound />
  }

  // {
  //   path: '*',
  //   key: '*',
  //   element: <NotFound />
  // }
]

// @ts-ignore
export const mainRoutes: IRoute[] = [
  {
    path: '/welcome',
    label: '首页',
    key: '/welcome',
    needLogin: true,
    element: <Layout>{<Welcome />}</Layout>,
    icon: <IconFont type="icon-a-shouyecopy" style={{ fontSize: '30px' }} />,
    code: 'F1-1'
  },
  {
    path: '/bigScreen',
    label: '数据资产大屏',
    key: '/bigScreen',
    code: 'F1-5-1',
    element: <BigScreen />,
    needLogin: true,
    hidden: true
  },
  {
    path: '/dataAssetJob',
    label: '数据资产作业',
    key: '/dataAssetJob',
    icon: <IconFont type="icon-a-shujuzichanzuoyecopy" style={{ fontSize: '30px' }} />,
    element: <Layout />,
    code: 'F1-3',
    needLogin: true,
    children: [
      {
        path: '/dataAssetJob/dateManage',
        label: '分类分级作业',
        key: '/dataAssetJob/dateManage',
        element: <ManageDate />,
        code: 'F1-3-1',
        needLogin: true
      },
      {
        path: '/dataAssetJob/dateManage/createData',
        label: '新建作业',
        key: '/dataAssetJob/dateManage/createData',
        element: <CreateDate />,
        code: 'F1-3-1',
        needLogin: true,
        hidden: true
      },
      {
        path: '/dataAssetJob/dateManage/detailsData',
        label: '任务详情',
        key: '/dataAssetJob/dateManage/detailsData',
        element: <DetailsDate />,
        code: 'F1-3-1',
        needLogin: true,
        hidden: true
      },
      {
        path: '/dataAssetJob/dateManage/errorData',
        label: '异常详情',
        key: '/dataAssetJob/dateManage/errorData',
        element: <ErrorDate />,
        code: 'F1-3-1',
        needLogin: true,
        hidden: true
      },
      {
        path: '/dataAssetJob/dataLedger',
        label: '数据资产目录',
        key: '/dataAssetJob/dataLedger',
        element: <AssetLedger />,
        code: 'F1-3-2',
        needLogin: true
      }
    ]
  },
  {
    path: '/auth',
    label: '系统管理',
    key: '/auth',
    icon: <IconFont type="icon-a-ICON-xitongguanliCopy2" style={{ fontSize: '30px' }} />,
    element: <Layout />,
    needLogin: true,
    code: 'F1-2',
    children: [
      {
        path: '/auth/userManege',
        label: '用户管理',
        key: '/auth/userManege',
        element: <UserManege />,
        code: 'F1-2-2',
        needLogin: true
      },
      {
        path: '/auth/userManege/create',
        label: '新建用户',
        key: '/auth/userManege/create',
        element: <UmCreate />,
        code: 'F1-2-2',
        needLogin: true,
        hidden: true
      },
      {
        path: '/auth/userManege/modify',
        label: '编辑用户',
        key: '/auth/userManege/modify',
        element: <UmModify />,
        code: 'F1-2-2',
        needLogin: true,
        hidden: true
      },
      {
        path: '/auth/roleManege',
        label: '角色管理',
        key: '/auth/roleManege',
        element: <RoleManege />,
        code: 'F1-2-1',
        needLogin: true
      },
      {
        path: '/auth/roleManege/create',
        label: '新建角色',
        key: '/auth/roleManege/create',
        element: <RmCreate />,
        code: 'F1-2-2',
        needLogin: true,
        hidden: true
      },
      {
        path: '/auth/roleManege/modify',
        label: '编辑角色',
        key: '/auth/roleManege/modify',
        element: <RmModify />,
        code: 'F1-2-2',
        needLogin: true,
        hidden: true
      },
      {
        path: '/auth/license',
        label: '授权许可',
        key: '/auth/license',
        needLogin: true,
        element: <License />,
        code: 'F1-2-7'
      }
    ]
  }
]

export interface MenuRoute extends MenuItemType {
  label?: string
  icon?: React.ReactNode
  children?: MenuRoute[]
}

export const getRealRoutes = (data: IRoute[], tempData: API.GetMenuListResponse[] | { menuCode: string }[]) => {
  const result: IRoute[] = []

  for (const i of data) {
    const item = i
    if (tempData.some((tempItem) => tempItem?.menuCode === item.code)) {
      const children = getRealRoutes(item.children || [], tempData)
      let newItem = {} as IRoute
      if (children.length > 0) {
        newItem = { ...item, children }
      } else {
        delete item.children
        newItem = { ...item }
      }
      result.push(newItem)
    }
    if (item.children && item.children.length > 0) {
      getRealRoutes(item.children || [], tempData)
    }
  }
  return result
}

const Router = () => {
  const rs = useSelector((state: RootState) => state.theme.realMenu)
  if (!rs) {
    return useRoutes([...defaultRoutes])
  }
  return useRoutes([...rs, ...defaultRoutes])
}

// layout 所有菜单
export const extractLabelsAndKeys = (routes: IRoute[]) => {
  const result: MenuRoute[] = []
  for (const route of routes) {
    let newRoute = {} as MenuRoute
    if (!route.hidden) {
      newRoute = { label: route.label, key: route.key, icon: route.icon }
    }
    if (route.children) {
      newRoute.children = extractLabelsAndKeys(route.children)
    }
    if (newRoute && newRoute.key) {
      result.push(newRoute)
    }
  }
  return result
}
// 获取所有一级菜单
export const getFirstLevelMenu = (routes: IRoute[]) => {
  const result: MenuRoute[] = []

  for (const route of routes) {
    let newRoute = {} as MenuRoute
    if (!route.hidden) {
      newRoute = { label: route.label, key: route.key, icon: route.icon }
      result.push(newRoute)
    }
  }
  return result
}

export const layoutRoutes = (routes: IRoute[]) => {
  routes.map((el) => {
    if (!el.needLogin) {
      if (el.children && el.children.length > 0) {
        el.routes = layoutRoutes(el.children)
      }
      return el
    }
  })
  return routes
}

export default Router
