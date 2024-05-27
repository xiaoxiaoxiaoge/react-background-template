import { forwardRef, HTMLAttributes } from 'react'
import classnames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons'

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'ignore' | 'delete'
  loading?: boolean
  disabled?: boolean
}
const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ type = 'primary', disabled = false, loading = false, children, style, className = '', ...rest }, ref) => {
    const typeClassNames = () => {
      if (disabled) {
        return 'text-gray-400 cursor-not-allowed'
      }
      switch (type) {
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
    const mergedClassNames = classnames('text-sm p-0 m-0 border-0 bg-transparent cursor-pointer  ', className || typeClassNames())
    return (
      <button
        className={mergedClassNames}
        style={{
          ...style
        }}
        ref={ref}
        {...rest}
        disabled={disabled || loading}
      >
        {loading ? <LoadingOutlined /> : ''}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
