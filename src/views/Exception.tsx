import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Exception: React.FC = () => {
  const navigate = useNavigate()
  return (
    <ETPage>
      <div className=" w-1/2 flex items-center justify-center flex-col">
        <img src="/img/500.png" className=" w-full" alt="" />
      </div>

      <div className="absolute top-1/2 text-2xl text-default ">Sorry～服务器出了点小问题…</div>
      <Button type="primary" className="back" onClick={() => navigate('/')}>
        返回首页
      </Button>
    </ETPage>
  )
}

export default Exception

const ETPage = styled.div`
  @apply w-full h-[100vh] flex items-center justify-center relative;

  .back {
    @apply absolute top-3/5;
  }
`
