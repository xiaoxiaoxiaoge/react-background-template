import { IRoute } from '..'

export const searchRoute = (path: string, routes: IRoute[] = []): IRoute => {
  let result = {} as IRoute
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}
