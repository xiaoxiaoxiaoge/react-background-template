import { ConfigProvider } from 'antd'
import React from 'react'
import { defaultTheme } from '../../../../config/defaultTheme'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Header: React.FC<IProps> = ({ children, ...rest }) => {
  return (
    <ConfigProvider>
      <div
        {...rest}
        className=" w-full text-white bg-cover bg-no-repeat relative px-5 flex  justify-between  fixed z-50"
        style={{ height: defaultTheme.headerHeight, backgroundColor: defaultTheme.themeColor }}
      >
        <img className=" absolute top-0 left-0 h-full  z-10" src="/img/header-bg-left.png" alt="" />
        <img className=" absolute top-0 right-0 h-full  z-10" src="/img/header-bg-right.png" alt="" />
        {children}
      </div>
    </ConfigProvider>
  )
}

export default Header
