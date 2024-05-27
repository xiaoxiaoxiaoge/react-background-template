import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import './index.less'
import { ResoultType } from '..'

type IProps = {
  resoultData: ResoultType[]
}
const ResultPage: React.FC<IProps> = ({ resoultData }) => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)
    window.addEventListener('resize', () => {
      chartInstance.resize()
    })
    const option = getOption()
    chartInstance.setOption(option)

    return () => {
      window.removeEventListener('resize', () => {
        chartInstance.resize()
      })
      echarts.dispose(chartInstance)
    }
  }, [resoultData])

  const getOption = () => ({
    color: ['#34C9FD', '#24EBAD', '#FFCF2F', '#FF7400', '#FF0003'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '各分级占比',
        type: 'pie',
        radius: ['45%', '60%'],
        avoidLabelOverlap: false,
        padAngle: 1,
        label: {
          show: true,
          position: 'outside',
          formatter: function (params: { name: any; percent: any }) {
            return `{circle|●} {name|${params.name}} {line|│} {percent|${params.percent}%}`
          },
          rich: {
            circle: {
              fontSize: 14,
              // 手动设置每个标签的颜色
              color: 'inherit'
            },
            name: {
              fontSize: 14,
              color: '#333'
            },
            line: {
              color: '#ccc',
              height: 12,
              width: 4
            },
            percent: {
              fontSize: 14,
              color: '#333'
            }
          },
          textStyle: {
            color: '#262626'
          },
          backgroundColor: '#fff',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 2,
          padding: 6
        },
        labelLine: {
          length: 20,
          length2: 30
        },
        data: resoultData
      }
    ]
  })
  return (
    <div className=" w-full h-full relative">
      <div ref={chartRef} className=" w-full h-full" />
    </div>
  )
}
export default ResultPage
