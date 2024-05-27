import React from 'react'
import { Result, Spin } from 'antd'
import { SpinProps } from 'antd/es/spin'

interface IProps extends SpinProps {
  error?: unknown
  errorText?: string
}
const Loading: React.FC<IProps> = ({ error = null, errorText = '加载错误，请联系管理员！', ...rest }) => {
  if (error) {
    return <Result status="error" title={errorText} />
  }
  return (
    <Spin {...rest} className={'w-full h-full flex justify-center items-center'}>
      {rest.children}
    </Spin>
  )
}

export default Loading
