import React from 'react'
import './index.less'

type IProps = {
  width: number
  height: number
  backgroundColor: string
}

const DotLoding: React.FC<IProps> = ({ width, height, backgroundColor }) => {
  const array = new Array(3).fill('')
  return (
    <span id="loader">
      {array.map((el, index) => {
        return <span key={index} style={{ width: `${width}px`, height: `${height}px`, backgroundColor: `${backgroundColor}` }} />
      })}
    </span>
  )
}

export default DotLoding
