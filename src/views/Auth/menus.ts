import { cloneDeep } from 'lodash'

export type Menu = {
  title: string
  key: string
  disabled?: boolean
  children?: Menu[]
}

export const menusTree: Menu[] = [
  {
    title: '首页',
    key: 'F1-1',
    disabled: true
  },
  {
    title: '数据资产管理',
    key: 'F1-6',
    children: [
      {
        title: '数据源管理',
        key: 'F1-6-1'
      },
      {
        title: '数据源发现',
        key: 'F1-6-2'
      }
    ]
  },
  {
    title: '数据资产作业',
    key: 'F1-3',
    children: [
      {
        title: '分类分级作业',
        key: 'F1-3-1'
      },
      {
        title: '数据资产目录',
        key: 'F1-3-2'
      }
    ]
  },
  {
    title: '数据分类分级',
    key: 'F1-4',
    children: [
      {
        title: '分类分级模板管理',
        key: 'F1-4-1'
      },
      {
        title: '分类分级结果确认',
        key: 'F1-4-2'
      }
    ]
  },
  {
    title: '数据资产地图',
    key: 'F1-5',
    children: [
      {
        title: '分类分级报告',
        key: 'F1-5-1'
      }
    ]
  },
  {
    title: '系统管理',
    key: 'F1-2',
    children: [
      {
        title: '角色管理',
        key: 'F1-2-1'
      },
      {
        title: '用户管理',
        key: 'F1-2-2'
      },
      {
        title: '数据权限',
        key: 'F1-2-3'
      },
      {
        title: '分类分级规则配置',
        key: 'F1-2-4'
      },
      {
        title: '系统厂商管理',
        key: 'F1-2-5'
      },
      {
        title: '日志管理',
        key: 'F1-2-6'
      },
      {
        title: '授权许可',
        key: 'F1-2-7'
      },
      {
        title: '运行维护',
        key: 'F1-2-8'
      }
    ]
  }
]

// 创建/修改租户：只存在于特定水印的菜单
// export const menusOnlyPc = ['T2-2-2-1', 'T2-3-1', 'T2-7-6'];

const filterMenuRelationShip = (menus: Menu[], m: Map<any, any>) => {
  menus.forEach((menu) => {
    if (menu.children && menu.children.length > 0) {
      m.set(
        menu.key,
        menu.children.map((item) => item.key)
      )
      filterMenuRelationShip(menu.children, m)
    } else {
      m.set(menu.key, [])
    }
  })
}

export const getMenuRelationShip = (menus = menusTree) => {
  const m = new Map()
  filterMenuRelationShip(menus, m)
  return m
}

// 角色权限：菜单不包含“认证管理”部分
export const getRoleMenus = () => {
  const index = menusTree.findIndex((menuModule) => menuModule.key === 'T2-4')
  const data = cloneDeep(menusTree)
  data.splice(index, 1)
  return data
}

export const getMenuTreeByKey = (keys: string[]) => {
  const selectedMenus: Menu[] = []
  const getTrees = (menus: Menu[], data: Menu[]) => {
    menus.forEach((item) => {
      if (keys.includes(item.key)) {
        data?.push({
          title: item.title,
          key: item.key,
          disabled: item.disabled || false
        })
        if (item.children && item.children?.length > 0) {
          data[data.length - 1].children = []
          // @ts-ignore
          getTrees(item.children, data[data.length - 1].children)
        }
      }
    })
  }
  getTrees(menusTree, selectedMenus)
  return selectedMenus
}

// 获取tree扩展key
export const getExpandKeys = (menus: Menu[]) => {
  const keys: string[] = []
  const _getExpandKeys = (_menus: Menu[], _keys: string[]) => {
    _menus.forEach((menu) => {
      if (menu.children && menu.children.length) {
        _keys.push(menu.key)
        _getExpandKeys(menu.children, _keys)
      }
    })
  }
  _getExpandKeys(menus, keys)
  return keys
}
