import { useLocation, useNavigate } from 'react-router-dom'
import { searchRoute } from './index.'
import { defaultRoutes, mainRoutes } from '..'
import React, { useEffect } from 'react'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement
}
/** 路由守卫组件 */
const AuthRouter = ({ children }: IProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const obj = searchRoute(location.pathname, [...mainRoutes, ...defaultRoutes])
  const blLogin = sessionStorage.getItem('token')

  useEffect(() => {
    if (obj && obj.needLogin && !blLogin) {
      navigate('/login')
    } else if (!obj.path) {
      navigate('/404')
    }
  }, [blLogin, location.pathname])

  return children
}

export default AuthRouter
