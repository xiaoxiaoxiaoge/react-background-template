// 面包屑
import { Breadcrumb } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IRoute, mainRoutes } from '@/routes'

const getRoutesPathAndName = (routes: IRoute[]): Record<string, string> => {
  let ret: Record<string, string> = {}
  for (const route of routes) {
    if (route.path && route.label && route.path != '/' && route.label != '首页') {
      ret[route.path] = route.label
      if (route.children) {
        ret = { ...ret, ...getRoutesPathAndName(route.children) }
      }
    }
  }
  return ret
}

const Bread: React.FC = () => {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const breadcrumbNameMap = getRoutesPathAndName(mainRoutes)
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    if (index == 0) {
      return {
        key: url,
        title: breadcrumbNameMap[url]
      }
    } else if (index == pathSnippets.length - 1) {
      return {
        title: breadcrumbNameMap[url]
      }
    } else {
      return {
        key: url,
        title: <Link to={url}>{breadcrumbNameMap[url]}</Link>
      }
    }
  })

  return (
    <div
      style={{
        padding: '0 20px',
        lineHeight: '50px',
        height: '50px',
        display: breadcrumbItems.length > 1 ? 'flex' : 'none',
        alignItems: 'center'
      }}
    >
      <Breadcrumb items={breadcrumbItems} />
    </div>
  )
}

export default Bread
