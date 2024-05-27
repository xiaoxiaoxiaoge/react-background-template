import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import './index.less'
import { FiveDaysType } from '..'

type IProps = {
  fiveDaysData: FiveDaysType
}

const FiveDaysPage: React.FC<IProps> = ({ fiveDaysData }) => {
  useEffect(() => {
    let myChart = echarts.init(document.getElementById('five'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        show: true,
        data: ['成功', '失败'],
        right: 0
      },
      grid: {
        left: '5%',
        top: '12%',
        right: '5%',
        bottom: '18%'
      },
      xAxis: [
        {
          type: 'category',
          data: fiveDaysData.time,
          axisPointer: {
            type: 'shadow'
          },
          axisTick: {
            alignWithLabel: true
          },
          triggerEvent: true
        }
      ],
      yAxis: [
        {
          type: 'value',
          interval: 50,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: '成功',
          type: 'bar',
          stack: 'Search Engine',
          label: {
            show: true,
            color: '#595959'
          },
          tooltip: {
            valueFormatter: function (value: number) {
              return `${value as number}`
            }
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#00F7F7' },
              { offset: 1, color: '#EFEFEF' }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: fiveDaysData.successData
        },
        {
          name: '失败',
          type: 'bar',
          stack: 'Search Engine',
          label: {
            show: true,
            position: 'top',
            color: '#FF7743'
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FF7743' },
              { offset: 1, color: '#efefef' }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          tooltip: {
            valueFormatter: function (value: number) {
              return `${value as number}`
            }
          },
          data: fiveDaysData.fileData
        }
      ]
    })
    return window.removeEventListener('resize', () => {
      myChart.resize()
    })
  }, [fiveDaysData])
  return (
    <div className=" w-full h-full">
      <div id="five" className=" w-full h-full" />
    </div>
  )
}
export default FiveDaysPage
