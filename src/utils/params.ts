export function createSort(params: Record<string, any>, sort: Record<string, any>): any {
  const [key] = Object.keys(sort)
  if (!key) {
    return params
  }
  params.orderField = key
  params.orderType = sort[key] === 'ascend' ? 'asc' : 'desc'
  return params
}

export function createTime(params: Record<string, unknown>, timeRange: [string, string]) {
  const [minCreateTime, maxCreateTime] = timeRange
  return {
    ...params,
    minCreateTime,
    maxCreateTime
  }
}

export function createFormData(params: Record<string, string>): FormData {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key])
  })
  return formData
}

// 获取react路由参数http://192.xxx.xx.xx?id=xxx&name=xxx
export function getQueryVariable(variable: string): string | null {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return null
}
