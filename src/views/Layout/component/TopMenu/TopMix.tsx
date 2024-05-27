import styled from 'styled-components'
import { Menu, MenuProps } from 'antd'
import React, { memo, useEffect } from 'react'
import { MenuRoute } from '../../../../routes'
import { useNavigate } from 'react-router-dom'
import { defaultTheme } from '../../../../../config/defaultTheme'

type IProps = {
  topMenu: MenuRoute[]
  changeTopMenu: (e: string) => void
  selectedMixKeys: string[]
}

const TopMix: React.FC<IProps> = ({
  topMenu,
  changeTopMenu,
  //   openKeys,
  //   setOpenKeys,
  selectedMixKeys
  //   handleOpen,
}) => {
  // const menuMode = useSelector((state: any) => state.theme.menuMode)
  const navigator = useNavigate()
  useEffect(() => {
    console.log(topMenu)
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    navigator(e.key)
    changeTopMenu(e.key)
  }
  return (
    <TopMenu>
      <Menu className=" hidden sm:block" onClick={onClick} mode={'horizontal'} items={topMenu} selectedKeys={selectedMixKeys} />
    </TopMenu>
  )
}

export default memo(TopMix)

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
