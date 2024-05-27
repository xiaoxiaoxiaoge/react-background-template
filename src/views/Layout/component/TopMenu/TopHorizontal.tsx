import styled from 'styled-components'
import { Menu, MenuProps } from 'antd'
import React, { memo, useEffect } from 'react'
import { MenuRoute } from '../../../../routes'
import { useNavigate } from 'react-router-dom'
import { defaultTheme } from '../../../../../config/defaultTheme'

type IProps = {
  topMenu: MenuRoute[]
  changeTopMenu: (e: string) => void
  openKeys: string[]
  setOpenKeys: (e: string[]) => void
  selectedKeys: string[]
  handleOpen: (e: string[]) => void
}

const TopHorizontal: React.FC<IProps> = ({ topMenu, changeTopMenu, setOpenKeys, selectedKeys, handleOpen }) => {
  const navicate = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    navicate(e.key)
    changeTopMenu(e.key)
    setOpenKeys(e.keyPath)
  }
  useEffect(() => {
    console.log(topMenu)
  }, [])
  return (
    <TopMenu className="top-menu" style={{ height: `${defaultTheme.headerHeight}px`, lineHeight: `${defaultTheme.headerHeight}px` }}>
      <Menu className=" hidden sm:block" onClick={onClick} mode={'horizontal'} items={topMenu} selectedKeys={selectedKeys} onOpenChange={handleOpen} />
    </TopMenu>
  )
}

export default memo(TopHorizontal)

const TopMenu = styled.div`
  @apply w-full min-w-0 flex-1;
  .ant-menu {
    height: ${`${defaultTheme.headerHeight}px`};
    line-height: ${`${defaultTheme.headerHeight}px`};
    background-color: transparent;
    .ant-menu-item .ant-menu-item-icon {
      vertical-align: -0.3em;
    }
  }
  .ant-menu-light {
    .ant-menu-submenu-title,
    .ant-menu-item {
      color: #fff;
    }
    .ant-menu-item,
    .ant-menu-submenu {
      top: 0;
      margin-top: 0;
    }
    .ant-menu-submenu-title {
      display: flex;
      align-items: center;
      height: ${`${defaultTheme.headerHeight}px`};
      line-height: ${`${defaultTheme.headerHeight}px`};
    }
    .ant-menu-submenu-selected,
    .ant-menu-submenu:hover,
    .ant-menu-item:hover,
    .ant-menu-item-selected,
    .ant-menu-item-open,
    .ant-menu-submenu-active,
    .ant-menu-submenu-open {
      background-color: ${defaultTheme.menuActiveColor};
    }
    .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected):hover {
      color: #fff;
    }
  }
`
