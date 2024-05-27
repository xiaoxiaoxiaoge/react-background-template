import { handleResize, screenExitFull, screenFull } from '@/utils/tool'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import React, { useEffect, useState } from 'react'
import './index.less'
import FiveDaysPage from '@/views/Welcome/fiveDays.tsx'
import { Card } from 'antd'
import FindPage from '@/views/Welcome/Find'

const PageName: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [scale, setScale] = useState(1)
  const [bigScreenHeight, setBigScreenHeight] = useState(924)
  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', () => {
      const isFullScreen = document.fullscreenElement
      if (isFullScreen) {
        setBigScreenHeight(1080)
        setIsFullScreen(true)
      } else {
        setBigScreenHeight(924)
        setIsFullScreen(false)
      }
    })
  }, [])
  useEffect(() => {
    const init = () => {
      setScale(handleResize('.screen', 1912, bigScreenHeight))
    }
    init()
    window.addEventListener('resize', init)
    return () => {
      window.removeEventListener('resize', init)
    }
  }, [bigScreenHeight])
  const full = () => {
    const bigScreen = document.querySelector('.screen')
    screenFull(bigScreen)
  }
  return (
    <div className="screen">
      <div
        id="bigScreen"
        style={{
          height: `${bigScreenHeight}px`,
          transform: `translate(-50%, -50%) scale(${scale})`
        }}
        className=" text-white"
      >
        <div className="content">
          {!isFullScreen && <FullscreenOutlined className="absolute full" onClick={full} />}
          {isFullScreen && <FullscreenExitOutlined className=" absolute full" onClick={screenExitFull} />}
          <div className=" w-full text-white text-center title h-[40px]">数据资产展示大屏</div>
          <div className=" w-full p-4 box-border" style={{ height: 'calc(100% - 40px)' }}>
            <div className=" w-full h-[50%] flex items-start mb-2">
              <Card
                title={
                  <div className="flex items-end">
                    <div>近10日数据资产变动统计</div>
                    <span className=" text-sm text-slate-300">（数据最后更新：2024-05-10 00:00）</span>
                  </div>
                }
                bordered={false}
                className=" w-[33%] h-full mr-2"
              >
                <div>123</div>
              </Card>
              <Card
                title={
                  <div className="flex items-end">
                    <div>近10日数据资产变动统计</div>
                    <span className=" text-sm text-slate-300">（数据最后更新：2024-05-10 00:00）</span>
                  </div>
                }
                bordered={false}
                className=" w-[33%] h-full mr-2"
              >
                <div>123</div>
              </Card>
              <Card
                title={
                  <div className="flex items-end">
                    <div>近10日数据资产变动统计</div>
                    <span className=" text-sm text-slate-300">（数据最后更新：2024-05-10 00:00）</span>
                  </div>
                }
                bordered={false}
                className=" w-[33%] h-full mr-2"
              >
                <div>123</div>
              </Card>
            </div>
            <div className=" w-full h-[50%] flex items-start">
              <Card
                title={
                  <div className="flex items-end">
                    <div>近10日数据资产变动统计</div>
                    <span className=" text-sm text-slate-300">（数据最后更新：2024-05-10 00:00）</span>
                  </div>
                }
                bordered={false}
                className=" w-[33%] h-full mr-2"
              >
                <div>123</div>
              </Card>
              <Card
                title={
                  <div className="flex items-end">
                    <div>近10日数据资产变动统计</div>
                    <span className=" text-sm text-slate-300">（数据最后更新：2024-05-10 00:00）</span>
                  </div>
                }
                bordered={false}
                className=" w-[33%] h-full mr-2"
              >
                <div>123</div>
              </Card>
              <Card
                title={
                  <div className="flex items-end">
                    <div>近10日数据资产变动统计</div>
                    <span className=" text-sm text-slate-300">（数据最后更新：2024-05-10 00:00）</span>
                  </div>
                }
                bordered={false}
                className=" w-[33%] h-full mr-2"
              >
                <div>123</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageName
