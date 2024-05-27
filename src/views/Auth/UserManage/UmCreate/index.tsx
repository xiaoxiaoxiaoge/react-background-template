import React, { useEffect, useState } from 'react'
import { Form, Input, message, Space, Select, Radio, DatePicker, RadioChangeEvent, Button } from 'antd'
import { usePsdValidate } from '@/hooks/usePsdValidate'
import { validEmail } from '@/utils/validate'
import './index.less'
import { getRoleList } from '@/services/auth/role-manege'
import { addUser } from '@/services/auth/user-manage'
import { useSelector } from 'react-redux'
import { Encrypt } from '@/utils/tool'
import { RootState } from '@/store'
import { useMutation } from 'react-query'
import NewModal from '@/components/Modal'

type IProps = {
  isModalAddOpen: boolean
  setIsModalAddOpen: (e: boolean) => void

  resetList: () => void
}

const UmCreate: React.FC<IProps> = ({ isModalAddOpen, setIsModalAddOpen, resetList }) => {
  const publicKey = useSelector((state: RootState) => state.theme.publicKey)
  const [form] = Form.useForm()
  const [roles, setRoles] = useState<API.GetRoleListResponse[]>([])
  const { validPsdBySecureSetting, validConfirmPsd } = usePsdValidate()
  const [timeStatus, setTimeStatus] = useState(0)

  useEffect(() => {
    if (isModalAddOpen) {
      getRoleList().then((res) => {
        if (res.code === 0 && res.data) {
          setRoles(res.data)
        }
        form.setFieldValue(['time', 'useTime'], '1')
      })
    }
  }, [isModalAddOpen])
  const handleTimeStatus = (e: RadioChangeEvent) => {
    setTimeStatus(e.target.value)
  }
  const create = useMutation(addUser, {
    onSuccess: async (res) => {
      if (res.code === 0) {
        message.success('新建成功')
        setIsModalAddOpen(false)
        form.resetFields()
        setTimeStatus(0)
        resetList()
      }
    }
  })

  const handleAddOk = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()
    values.useTime = Number(values.time.useTime)
    if (values.useTime == 2) {
      values.deadLine = form.getFieldValue('time').deadLine.format('YYYY-MM-DD HH:mm:ss')
    } else {
      delete values.time.deadLine
    }
    delete values.time
    create.mutateAsync({
      ...values,
      newPassword: Encrypt(values.newPassword, publicKey),
      confirmPassword: Encrypt(values.confirmPassword, publicKey)
    })
  }

  const handleAddCancel = () => {
    setIsModalAddOpen(false)
    form.resetFields()
    setTimeStatus(0)
  }
  const validAccName = (_: unknown, val: string, cb: any) => {
    if (!val) {
      cb(new Error('用户名不能为空'))
    } else if (!/^[0-9a-zA-Z]*$/.test(val)) {
      cb(new Error('用户名仅支持英文、数字'))
    } else if (val.length > 50) {
      cb(new Error('请输入50个字符以内的用户名'))
    } else {
      cb()
    }
  }
  const validFullName = (_: unknown, val: string, cb: any) => {
    if (!val) {
      cb(new Error('姓名不能为空'))
    } else if (!/^[^\s]*$/.test(val)) {
      cb(new Error('姓名不能包含空格'))
    } else if (!/^.{1,50}$/.test(val)) {
      cb(new Error('请输入50个字符以内的姓名'))
    } else {
      cb()
    }
  }

  return (
    <NewModal
      title="新建用户"
      open={isModalAddOpen}
      onOk={handleAddOk}
      onCancel={handleAddCancel}
      width={560}
      footer={[
        <Button key="back" onClick={handleAddCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={create.isLoading} onClick={handleAddOk}>
          确定
        </Button>
      ]}
    >
      <Form
        className="  bg-white "
        labelCol={{ span: 5 }}
        form={form}
        initialValues={{
          status: 1
        }}
      >
        <Form.Item name="userName" label={'用户名'} required rules={[{ validator: validAccName }]}>
          <Input placeholder={'请输入用户名'} allowClear />
        </Form.Item>
        <Form.Item
          name="roleId"
          label={'关联角色'}
          rules={[
            {
              required: true,
              message: '关联角色不能为空'
            }
          ]}
        >
          <Select placeholder={'请选择关联角色'}>
            {roles.map((role) => {
              return (
                <Select.Option key={role.id} value={role.id}>
                  {role.roleName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item name="newPassword" label={'密码'} required rules={[{ validator: validPsdBySecureSetting }]}>
          <Input.Password autoComplete={'new-password'} type={'password'} placeholder={'请输入密码'} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={'确认密码'}
          required
          rules={[
            {
              validator: (rule, value, cb) => validConfirmPsd(rule, value, cb, form.getFieldValue('newPassword'))
            }
          ]}
        >
          <Input.Password autoComplete={'new-password'} type={'password'} placeholder={'请再次输入密码'} />
        </Form.Item>
        <Form.Item name="fullName" label={'姓名'} required rules={[{ validator: validFullName }]}>
          <Input placeholder={'请输入姓名'} allowClear />
        </Form.Item>
        <Form.Item name="email" label={'邮箱'} required rules={[{ validator: validEmail }]}>
          <Input placeholder={'请输入邮箱'} allowClear />
        </Form.Item>

        <Form.Item label="使用期限" rules={[{ required: true }]}>
          <Space.Compact>
            <Form.Item name={['time', 'useTime']} noStyle rules={[{ required: true, message: '请选择使用期限' }]}>
              <Radio.Group
                onChange={handleTimeStatus}
                style={{
                  lineHeight: '32px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Radio value={'1'}>{'永久'}</Radio>
                <Radio value={'2'}>{'自定义'}</Radio>
              </Radio.Group>
            </Form.Item>
            {timeStatus == 2 && (
              <Form.Item name={['time', 'deadLine']} noStyle rules={[{ required: true, message: '请选择使用期限' }]}>
                <DatePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            )}
          </Space.Compact>
        </Form.Item>
      </Form>
    </NewModal>
  )
}

export default UmCreate
