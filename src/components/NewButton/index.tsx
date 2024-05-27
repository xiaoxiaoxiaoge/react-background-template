import classnames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { BaseButtonProps, NativeButtonProps } from 'antd/es/button/button'
import React from 'react'
export type AnchorButtonProps = {
  href?: string
  target?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick'>

type ButtonTypes = BaseButtonProps & AnchorButtonProps & NativeButtonProps

interface IProps extends ButtonTypes {
  status?: 'primary' | 'ignore' | 'delete'
  loading?: boolean
}
const TableButton: React.FC<IProps> = ({ status, loading, children, ...IProps }) => {
  const defaultClassName = () => {
    return 'text-sm p-0 m-0 border-0 bg-transparent '
  }
  const typeClassNames = () => {
    if (IProps.disabled) {
      return 'text-gray-400 cursor-not-allowed'
    }
    switch (status) {
      case 'primary':
        return 'text-primary hover:text-primary-hover'
      case 'ignore':
        return 'text-warning hover:text-warning-hover'
      case 'delete':
        return 'text-danger hover:text-danger-hover'
      default:
        return 'text-primary hover:text-primary-hover'
    }
  }
  const mergedClassNames = classnames(defaultClassName(), typeClassNames(), IProps.className)
  return (
    <Button className={mergedClassNames} type="link" {...IProps} disabled={IProps.disabled}>
      {loading ? <LoadingOutlined /> : ''}
      {children}
    </Button>
  )
}

Button.displayName = 'Button'

export default TableButton
