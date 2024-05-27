/**
 * mix模式中 菜单切割导致菜单选中与菜单展开逻辑与其他两种不同 需要单独处理
 */
import { Drawer, Dropdown, Layout, MenuProps, Space } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { defaultTheme } from '../../../config/defaultTheme'
import { useSelector } from 'react-redux'
import { searchRoute } from '@/routes/utils/index.'
import { mainRoutes, MenuRoute } from '@/routes'
import { findIndex } from 'lodash'
import Header from './component/Header'
import LeftSide from './component/LeftSide'
import Bread from './component/Bread'
import { getSession } from '@/utils/tool'
import { loginOut } from '@/services/user/login'
import Footer from '@/components/Footer'
import { RootState } from '@/store'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import './index.less'
import TopHorizontal from './component/TopMenu/TopHorizontal'
import TopMix from './component/TopMenu/TopMix'
import NewTab from './component/NewTab'
const { Content } = Layout

// import { setMenuMode, setThemeColor } from '@/store/modules/theme'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const PageLayout: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const firstLevelMenu = useSelector((state: RootState) => state.theme.firstLevelMenu) // 一级菜单 mix模式使用
  const menuRoutes = useSelector((state: RootState) => state.theme.menuRoutes) // 全部菜单
  const [topMenu, setTopMenu] = useState(menuRoutes) // 顶部菜单
  const [leftMenu, setLeftMenu] = useState<MenuRoute[] | null>(menuRoutes) // 左侧菜单

  const menuMode = useSelector((state: RootState) => state.theme.menuMode) // 菜单模式
  // Sider
  const [openKeys, setOpenKeys] = useState<string[]>([]) // 菜单展开项
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]) // 当前选中项
  const [selectedMixKeys, setSelectedMixKeys] = useState<string[]>([]) // mix模式当前选中项   mix模式单独处理 处理逻辑与另外两种不一样

  const username = getSession('userInfo', {}).userName

  // Drawer
  const [open, setOpen] = useState(false)
  const handleOpen = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey])
    } else {
      setOpenKeys([])
    }
  }
  // 切换mix模式菜单切换
  const changeTopMenu = (e: string) => {
    const Index = findIndex(menuRoutes, { key: e })
    const menu = menuRoutes[Index]?.children
    if (menu) {
      setLeftMenu(menu)
    } else {
      setLeftMenu(null)
    }
  }
  useEffect(() => {
    const obj = searchRoute(location.pathname, mainRoutes)
    const rank = location.pathname.split('/')
    const newOpenkeys = rank.slice(0, 2).join('/')
    setOpenKeys([newOpenkeys])
    if (obj.isShow) {
      setSelectedKeys([rank.slice(0, rank.length - 1).join('/')])
    } else {
      setSelectedKeys([location.pathname])
    }
    if (menuMode == 'mix') {
      setSelectedMixKeys([rank.slice(0, 2).join('/')])
      if (rank.length <= 2) {
        const Index = findIndex(menuRoutes, { key: newOpenkeys })
        const menu = menuRoutes[Index]?.children
        if (menu && menu[0].key) {
          navigate(String(menu[0].key))
        }
      }
    }
  }, [location.pathname])

  // 监控菜单模式修改
  useEffect(() => {
    if (menuMode == 'mix') {
      setTopMenu(firstLevelMenu)
      const rank = location.pathname.split('/')
      const route = rank.slice(0, 2).join('/')

      changeTopMenu(route)
      setSelectedMixKeys([route])
    } else {
      setLeftMenu(menuRoutes)
      setTopMenu(menuRoutes)
    }
  }, [menuMode, menuRoutes])

  const logOut = async () => {
    sessionStorage.clear()
    window.location.reload()
    await loginOut()
    return
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={() => navigate('/modifyUser')}>个人中心</div>
    },
    {
      key: '2',
      label: <div onClick={() => navigate('/modifyPsd')}>修改密码</div>
    },
    {
      key: '3',
      label: <div onClick={logOut}>退出登录</div>
    }
  ]

  // const showDrawer = () => {
  //   setOpen(true)
  // }
  const onClose = () => {
    setOpen(false)
  }
  const onResize = useCallback(() => {
    if (document.documentElement.clientWidth > 640) {
      setOpen(false)
    }
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize)
  })

  // useEffect(() => {
  //   window.addEventListener('resize', function () {
  //     const dom = document.getElementById('leftSide')
  //     console.log(dom?.style.width)
  //   })
  // }, [])
  // //修改主题配置
  // const onThemeChange = (e: RadioChangeEvent) => {
  //   dispatch(setThemeColor(e.target.value))
  // }
  // //修改菜单配置
  // const onMenuChange = (e: RadioChangeEvent) => {
  //   dispatch(setMenuMode(e.target.value))
  // }

  return (
    <Space className="layout" direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header>
          <div className=" flex " style={{ flex: 1 }}>
            {/* 头部左侧  屏幕尺寸不同展示不同 */}
            <Space className={'cursor-pointer mr-10   items-center hidden sm:flex'} onClick={() => navigate('/')}>
              <img className={'mt-1 h-8'} src="/logo.png" alt="logo" />
              <span className={'text-lg ml-1'}>{defaultTheme.title}</span>
            </Space>
            <Space className={'cursor-pointer mr-10 flex items-center block sm:hidden '}>
              <img className={'mt-1 h-8'} src="/logo.png" alt="logo" />
              <MenuUnfoldOutlined className="text-xl" onClick={() => setOpen(true)} />
            </Space>

            {/* 头部菜单 */}
            {menuMode == 'horizontal' && (
              <TopHorizontal
                topMenu={topMenu}
                changeTopMenu={changeTopMenu}
                openKeys={openKeys}
                setOpenKeys={setOpenKeys}
                selectedKeys={selectedKeys}
                handleOpen={handleOpen}
              />
            )}

            {/* 侧边栏菜单 */}
            <Drawer className=" block sm:hidden" width={208} placement="left" closable={false} onClose={onClose} open={open}>
              <LeftSide type={1} leftMenu={menuRoutes} openKeys={openKeys} setOpenKeys={setOpenKeys} selectedKeys={selectedKeys} handleOpen={handleOpen} />
            </Drawer>

            {menuMode == 'mix' && <TopMix topMenu={topMenu} changeTopMenu={changeTopMenu} selectedMixKeys={selectedMixKeys} />}
            {menuMode == 'vertical' && <Bread />}
          </div>

          <Dropdown menu={{ items }} placement="bottomLeft" className=" z-20">
            <Space className={'cursor-pointer'}>
              <img height={32} src="/img/avatar_default.png" alt="" />
              <div>{username}</div>
            </Space>
          </Dropdown>
        </Header>

        <Layout>
          <div className=" flex items-start justify-start">
            {menuMode != 'horizontal' && leftMenu && (
              <LeftSide type={2} leftMenu={leftMenu} openKeys={openKeys} setOpenKeys={setOpenKeys} selectedKeys={selectedKeys} handleOpen={handleOpen} />
            )}
            <div style={{ flex: 1, overflow: 'auto', height: 'calc(100vh - 62px)' }}>
              <Content style={{ boxSizing: 'border-box', minHeight: 'calc(100vh - 98px)', position: 'relative' }}>
                {menuMode !== 'vertical' && <Bread />}
                {menuMode == 'vertical' && <NewTab leftMenu={leftMenu} />}
                {children}
                <Outlet />
              </Content>
              <Footer />
            </div>
          </div>
        </Layout>
      </Layout>
    </Space>
  )
}
export default PageLayout
