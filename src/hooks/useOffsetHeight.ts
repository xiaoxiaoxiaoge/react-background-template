import { useEffect, useState } from 'react'
import type { MutableRefObject } from 'react'

// 获取一个元素距离顶部的高度
const useOffsetHeight = (ref: MutableRefObject<null>, parentRefRef?: MutableRefObject<null>) => {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    if (!parentRefRef) {
      if (ref && ref.current) {
        const { clientHeight } = document.body
        // @ts-ignore
        const rect = ref.current?.getBoundingClientRect()
        setHeight(clientHeight - rect.top)
      }
    } else {
      if (ref && ref.current && parentRefRef && parentRefRef.current) {
        // @ts-ignore
        const parentRect = parentRefRef.current?.offsetHeight
        // @ts-ignore
        const rect = ref.current?.offsetTop
        setHeight(parentRect - rect)
      }
    }
  }, [])
  return {
    height
  }
}

export default useOffsetHeight
