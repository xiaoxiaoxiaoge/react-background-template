import React, { useEffect } from 'react'
import { App as AntdApp } from 'antd'
import { getRealRoutes, mainRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/index'
import AuthRouter from './routes/utils/authRouter'
import { ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { checkLicense, getMenuListByUserId, loginConfigInfos } from './services/user/login'
import { setFirstLevelMenu, setMenuRoutes, setRealMenu, setPublicKey } from './store/modules/theme'
import './App.css'
import { RootState } from '@/store'
import { getSession } from './utils/tool'
import { defaultTheme } from '../config/defaultTheme'
import 'dayjs/locale/zh-cn'
const App: React.FC = () => {
  const themeColor = useSelector((state: RootState) => state.theme.themeColor)
  const dispatch = useDispatch()
  useEffect(() => {
    loginConfigInfos().then((res) => {
      if (res.code == 0) {
        dispatch(setPublicKey(res.data.publicKey))
      }
    })
  }, [])

  const init = async () => {
    if (getSession('token', '')) {
      const authRes = await checkLicense()
      if (authRes.code === 0) {
        const { code, data } = await getMenuListByUserId()
        if (code == 0) {
          const realRoute = getRealRoutes(mainRoutes, data)
          // @ts-ignore
          dispatch(setRealMenu(realRoute))
          dispatch(setMenuRoutes())
          dispatch(setFirstLevelMenu())
        }
      } else {
        const realRoute = getRealRoutes(mainRoutes, defaultTheme.defaultRoute)
        dispatch(setRealMenu(realRoute))
        dispatch(setMenuRoutes())
        dispatch(setFirstLevelMenu())
      }
    }
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColor,
            borderRadius: 2
          },
          components: {
            Modal: {
              borderRadius: 2
            },
            Message: {
              borderRadius: 2
            }
          }
        }}
      >
        <AntdApp>
          <AuthRouter>
            <Router />
          </AuthRouter>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
