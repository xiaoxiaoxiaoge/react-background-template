import { Button, Result } from 'antd'
import React from 'react'
import type { ResultStatusType } from 'antd/es/result'
import { useNavigate } from 'react-router-dom'
interface IProps {
  title?: string
  status?: ResultStatusType
}
const Exception: React.FC<IProps> = ({ title, status }) => {
  const navigate = useNavigate()
  return (
    <Result
      status={status}
      title={title}
      extra={[
        <Button onClick={() => navigate(-1)} key={'back'} type={'primary'} className={'w-30'}>
          返回
        </Button>
      ]}
    />
  )
}

export default Exception
