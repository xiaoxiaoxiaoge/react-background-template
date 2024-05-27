import { memo, HTMLAttributes, FC } from 'react'
import { Radio } from 'antd'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  lineHeight?: number
  active?: boolean
  isFirstLeaf?: boolean
  prefixLine?: boolean
  suffixLine?: boolean
}

const LineRadio: FC<IProps> = ({ value, children, active = false, isFirstLeaf = false, prefixLine = false, suffixLine = false, lineHeight, ...rest }) => {
  return (
    <div {...rest}>
      <div className={'pl-6 flex items-end relative'}>
        {/* 第一个节点 竖线 */}
        {prefixLine && isFirstLeaf && <span className={'w-[1px] bg-gray-line absolute top-5 left-[4px]'} style={{ height: `${lineHeight}px` }} />}
        {/* 每个节点横线 */}
        {prefixLine && (
          <span
            className={`relative inline-block h-10
            before:content-[''] before:absolute before:left-[-20px] before:top-5 before:w-[20px] before:h-[1px] before:bg-gray-300
          `}
          />
        )}
        <Radio value={value}>
          <div
            className={`h-[40px] leading-[40px] px-4 w-40 truncate 
             ${active ? 'bg-blue-active text-white' : 'border border-gray-line border-solid hover:border-blue-active hover:text-blue-active'}
            `}
          >
            {children}
          </div>
        </Radio>
        {suffixLine && active && (
          <span
            className={`relative inline-block h-10
            before:content-[''] before:absolute before:right-[-4px] before:top-5 before:w-[20px] before:h-[1px] before:bg-gray-line
          `}
          />
        )}
      </div>
    </div>
  )
}

export default memo(LineRadio)
