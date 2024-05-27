import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Notfound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <NFPages>
      <div className=" w-1/2 flex items-center justify-center">
        <img src="/img/404.png" className=" w-full" alt="" />
      </div>
      <div className="absolute  top-2/3 text-2xl text-default">Sorry～页面找不到了…</div>
      <Button type="primary" className="back" onClick={() => navigate('/')}>
        返回首页
      </Button>
    </NFPages>
  )
}

export default Notfound

const NFPages = styled.div`
  @apply w-full h-[100vh] flex items-center justify-center relative;
  .back {
    @apply absolute top-3/4;
  }
`
