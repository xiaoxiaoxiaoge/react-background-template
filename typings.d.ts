type BasicPageParams = {
  current: number
  pageSize: number
  orderType?: string
  orderField?: string
}

type BasicPageResult<T> = {
  code: number
  message: string
  data: {
    totalCount: number
    items: T
  }
}

type BasicFetchResult<T> = {
  data: T
  message: string
  code: number
}

declare type Nullable<T> = T | null
