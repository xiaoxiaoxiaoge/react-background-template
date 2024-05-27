import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import './index.less'
import { FindType } from '..'

type IProps = {
  findData: FindType[]
}
const FindPage: React.FC<IProps> = ({ findData }) => {
  useEffect(() => {
    let myChart = echarts.init(document.getElementById('find'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          padAngle: 2,
          label: {
            normal: {
              show: true,
              // alignTo: 'edge',
              formatter: function (params: { name: any; percent: any }) {
                return `{name|${params.name}}\n{percent|${params.percent}%}`
              },
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              rich: {
                time: {
                  fontSize: 10,
                  color: '#999'
                }
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 27,
              length2: 0
            }
          },
          labelLayout: function (params: { labelRect: { x: number; width: any }; labelLinePoints: any }) {
            const isLeft = params.labelRect.x < myChart.getWidth() / 2
            const points = params.labelLinePoints
            // Update the end point.
            points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width
            return {
              labelLinePoints: points
            }
          },
          data: findData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    return window.removeEventListener('resize', () => {
      myChart.resize()
    })
  }, [findData])
  return <div id="find" className=" w-full h-full" />
}
export default FindPage
