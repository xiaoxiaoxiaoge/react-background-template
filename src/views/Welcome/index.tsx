import React from 'react'
import styled from 'styled-components'
import './index.less'

export type TenDatasType = {
  time: string[]
  tableData: number[]
  sourceData: number[]
}
export type ResoultType = {
  value: number
  name: string
}
export type FiveDaysType = {
  time: string[]
  successData: number[]
  fileData: number[]
}
export type FindType = {
  value: number
  name: string
}
// const baseSize = 16
const WelcomePage: React.FC = () => {
  return (
    <div className="page-wrapper">
      <div className="welcome">
        <div className="content">
          <Welcome>
            <div className="text_box">
              <div>
                <span className="text_user">123456</span> 您好！
              </div>
              <div className="text_title">欢迎使用数据智能分类分级系统</div>
            </div>
          </Welcome>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage

export const Welcome = styled.div`
  @apply w-full bg-cover bg-no-repeat bg-center;
  height: calc(100vh - 60px);
  background-image: url('/img/primary/welcome.png');
  .text_box {
    @apply pt-6 pl-28 text-3xl;
    .text_user {
      color: #0f77ff;
    }
    .text_title {
      @apply leading-loose font-bold;
      letter-spacing: 7px;
      color: #363637;
    }
  }
`
