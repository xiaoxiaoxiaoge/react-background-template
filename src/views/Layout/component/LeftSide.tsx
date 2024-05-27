import styled from 'styled-components'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { MenuRoute } from '../../../routes'
import { useNavigate } from 'react-router-dom'
import { defaultTheme } from '../../../../config/defaultTheme'

type IProps = {
  leftMenu: MenuRoute[]
  openKeys: string[]
  setOpenKeys: (e: string[]) => void
  selectedKeys: string[]
  handleOpen: (e: string[]) => void
  type: number
}

const SiderPage: React.FC<IProps> = ({ leftMenu, openKeys, setOpenKeys, selectedKeys, handleOpen, type }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [showControlSider, setShowControlSider] = useState(true)
  const navicate = useNavigate()

  useEffect(() => {}, [location.pathname])
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const onClick: MenuProps['onClick'] = (e) => {
    navicate(e.key)
    setOpenKeys(e.keyPath)
  }
  const ListenResize = () => {
    const screenWidth = document.body.offsetWidth
    if (screenWidth <= 768) {
      setCollapsed(true)
      setShowControlSider(false)
    } else {
      setCollapsed(false)
      setShowControlSider(true)
    }
  }
  useEffect(() => {
    ListenResize()
  }, [])
  useEffect(() => {
    window.addEventListener('resize', ListenResize)
    return () => window.removeEventListener('resize', ListenResize) // 监控屏幕尺寸
  }, [])
  return (
    <MenuLeft>
      {type == 2 && (
        <div className=" bg-white hidden sm:block" style={{ height: 'calc( 100vh - 60px)', boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)' }}>
          <Menu
            id="leftSider"
            onClick={onClick}
            mode={'inline'}
            inlineCollapsed={collapsed}
            items={leftMenu}
            style={{ width: collapsed ? '80px' : '208px' }}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={handleOpen}
          />
          {showControlSider && type == 2 && <ControlSider onClick={toggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</ControlSider>}
        </div>
      )}
      {type == 1 && (
        <div className=" bg-white " style={{ height: 'calc( 100vh - 60px)' }}>
          <Menu
            onClick={onClick}
            mode={'inline'}
            inlineCollapsed={false}
            items={leftMenu}
            style={{ width: '208px' }}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={handleOpen}
          />
        </div>
      )}
    </MenuLeft>
  )
}
const MenuLeft = styled.div`
  .ant-menu-light {
    .ant-menu-item-selected::after {
      width: 4px;
      background-color: ${defaultTheme.themeColor};
    }
  }
`
const ControlSider = styled.div`
  @apply fixed bottom-0 left-5 mb-3;
`

export default SiderPage
