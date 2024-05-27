/*
 * @Description:底部版权
 * @Author: dengnanhao
 * @Date: 2021-08-03 10:09:01
 * @LastEditors: dengnanhao
 * @LastEditTime: 2021-08-03 18:16:28
 */
import React from 'react'
import { useSelector } from 'react-redux'
import './index.less'
import { RootState } from '@/store'
import { defaultTheme } from '../../../config/defaultTheme'

const ignoreFooterPathNames = ['/welcome']

const Footer: React.FC = () => {
  const companyName = useSelector((state: RootState) => state.theme.company)
  const versions = useSelector((state: RootState) => state.theme.versions)
  const { pathname } = window.location
  if (!ignoreFooterPathNames.includes(pathname)) {
    return (
      <div
        className="footer bg-transparent relative text-center"
        style={{
          color: '#c5c5c5',
          height: `${defaultTheme.footerHeight}px`,
          lineHeight: `${defaultTheme.footerHeight}px`
        }}
      >
        <span className="copy">Copyright © {companyName}</span>
        <div className="version">正式版 {versions}</div>
      </div>
    )
  }
  return <span> </span>
}

export default Footer
