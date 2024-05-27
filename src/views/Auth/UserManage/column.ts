// 用户表格默认配置
import type { ColumnsState } from '@ant-design/pro-table'

export const defaultColumnState: Record<string, ColumnsState> = {
  userName: {
    show: true
  },
  roleName: {
    show: true
  },
  createTime: {
    show: true
  },
  option: {
    show: true
  }
}
