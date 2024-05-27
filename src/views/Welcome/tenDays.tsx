import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import './index.less'
import { TenDatasType } from '.'

type IProps = {
  tenDaysData: TenDatasType
}
const TenDaysPage: React.FC<IProps> = ({ tenDaysData }) => {
  useEffect(() => {
    let myChart = echarts.init(document.getElementById('main'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    myChart.setOption({
      color: ['#1890FF', '#FAD337'],
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
        data: ['表个数', '数据源个数'],
        left: 'right'
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
          data: tenDaysData.time,
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: '表个数',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: number) {
              return `${value as number}`
            }
          },
          data: tenDaysData.tableData
        },
        {
          name: '数据源个数',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: number) {
              return `${value as number}`
            }
          },
          data: tenDaysData.sourceData
        }
      ]
    })

    return window.removeEventListener('resize', () => {
      myChart.resize()
    })
  }, [tenDaysData])
  return <div id="main" className=" w-full h-full" />
}
export default TenDaysPage
