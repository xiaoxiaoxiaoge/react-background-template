import React, { useEffect, useRef, useState } from 'react'
import { Button, Tabs } from 'antd'
import { IRoute, MenuRoute } from '@/routes'
import { cloneDeep, findIndex } from 'lodash'
import { useNavigate } from 'react-router-dom'
import path from 'path'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

type IProps = {
  leftMenu: MenuRoute[] | null
}
const NewTab: React.FC<IProps> = ({ leftMenu }) => {
  const [activeKey, setActiveKey] = useState('/welcome')
  const [items, setItems] = useState([{ label: '首页', key: '/welcome', closable: false }])
  const navigate = useNavigate()
  const onChange = (key: string) => {
    console.log(key)
    setActiveKey(key)
  }
  const filterRoute = (path: string, routes: IRoute[] = []) => {
    let result = {}
    for (const item of routes) {
      if (item.key === path) return item
      if (item.children) {
        const res = filterRoute(path, item.children)
        if (Object.keys(res).length) result = res
      }
    }
    return result
  }
  // 获取当前的路径
  const getCurrentTab = () => {
    if (findIndex(items, ['key', location.pathname]) < 0) {
      const obj = filterRoute(location.pathname, leftMenu)
      setItems([...items, obj])
      setActiveKey(obj.key)
    }
  }
  useEffect(() => {
    getCurrentTab()
  }, [location.pathname])

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey)
    const newPanes = items.filter((pane) => pane.key !== targetKey)
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
      setActiveKey(key)
      navigate(key)
    }
    setItems(newPanes)
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action !== 'add') {
      remove(targetKey)
    }
  }

  const onTabClick = (key, event) => {
    console.log(key, event)
    navigate(key)
    history.pushState({}, '', key)
  }
  return (
    <div>
      <Tabs animated hideAdd onChange={onChange} activeKey={activeKey} type="editable-card" onEdit={onEdit} items={items} onTabClick={onTabClick} />
    </div>
  )
}

export default NewTab
