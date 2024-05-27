import { Suspense, lazy } from 'react'
import Loading from '@/components/Loading'

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyComponent = (Comp: any) => {
  const ImComp = lazy(Comp)
  const LC = () => {
    return (
      <Suspense fallback={<Loading style={{ position: 'absolute', top: 0 }} spinning size={'large'} />}>
        <ImComp />
      </Suspense>
    )
  }
  return LC
}

export default lazyComponent
