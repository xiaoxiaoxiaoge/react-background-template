import React, { useEffect, useState } from 'react'
import { Form, Input, message, Space, Select, Radio, DatePicker, RadioChangeEvent, Button } from 'antd'
import { validEmail } from '@/utils/validate'
import './index.less'
import { getRoleList } from '@/services/auth/role-manege'
import dayjs from 'dayjs'
import { editUser } from '@/services/auth/user-manage'
import { useMutation } from 'react-query'
import NewModal from '@/components/Modal'

type IProps = {
  isModalMdOpen: boolean
  setIsModalMdOpen: (e: boolean) => void
  resetList: () => void
  editList?: API.GetUserListPageResponse
}

const UmModify: React.FC<IProps> = ({ isModalMdOpen, setIsModalMdOpen, resetList, editList }) => {
  const [form] = Form.useForm()
  const [roles, setRoles] = useState<API.GetRoleListResponse[]>([])
  const [timeStatus, setTimeStatus] = useState('0')
  // 初始化获取数据
  useEffect(() => {
    if (editList) {
      if (editList.deadLine) {
        form.setFieldsValue({
          // roleName: editList.roleId,
          userName: editList.userName,
          email: editList.email,
          roleName: editList.roleName,
          fullName: editList.fullName,
          time: {
            useTime: String(editList.useTime),
            deadLine: dayjs(editList.deadLine, 'YYYY-MM-DD HH:mm:ss')
          }
        })
      } else {
        form.setFieldsValue({
          // roleName: editList.roleId,
          userName: editList.userName,
          email: editList.email,
          roleName: editList.roleName,
          fullName: editList.fullName,
          time: {
            useTime: String(editList.useTime)
          }
        })
      }
      if (editList.useTime) {
        setTimeStatus(editList.useTime)
      }

      getRoleList().then((res) => {
        if (res.code === 0 && res.data) {
          setRoles(res.data)
        }
      })
    }
  }, [editList])

  const handleTimeStatus = (e: RadioChangeEvent) => {
    setTimeStatus(e.target.value)
  }
  const create = useMutation(editUser, {
    onSuccess: async (res) => {
      if (res.code === 0) {
        setIsModalMdOpen(false)
        message.success('修改成功')

        form.resetFields()
        setTimeStatus('0')
        resetList()
      }
    }
  })
  const handleMdOk = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()
    values.id = editList?.id
    values.useTime = values.time.useTime
    if (values.useTime == 2) {
      values.deadLine = values.time.deadLine.format('YYYY-MM-DD HH:mm:ss')
    }

    delete values.time
    create.mutateAsync({ ...values })
  }

  const handleMdCancel = () => {
    setIsModalMdOpen(false)
    // form.resetFields();
    // setTimeStatus(0);
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
      title="编辑用户"
      open={isModalMdOpen}
      onOk={handleMdOk}
      onCancel={handleMdCancel}
      width={560}
      footer={[
        <Button key="back" onClick={handleMdCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={create.isLoading} onClick={handleMdOk}>
          确定
        </Button>
      ]}
    >
      <Form className=" bg-white " form={form} labelCol={{ span: 5 }}>
        <Form.Item name="userName" label={'用户名'} required rules={[{ validator: validAccName }]}>
          <Input placeholder={'请输入用户名'} disabled />
        </Form.Item>
        <Form.Item
          name="roleName"
          label={'关联角色'}
          rules={[
            {
              required: true,
              message: '请选择关联角色'
            }
          ]}
        >
          <Select placeholder={'请选择关联角色'} disabled>
            {roles.map((role) => {
              return (
                <Select.Option key={role.id} value={role.id}>
                  {role.roleName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item name="fullName" label={'姓名'} required rules={[{ validator: validFullName }]}>
          <Input placeholder={'请输入姓名'} allowClear />
        </Form.Item>
        <Form.Item name="email" label={'邮箱'} required rules={[{ validator: validEmail }]}>
          <Input placeholder={'请输入邮箱'} allowClear />
        </Form.Item>
        <Form.Item label="使用期限">
          <Space.Compact>
            <Form.Item name={['time', 'useTime']} noStyle rules={[{ required: true, message: '请选择使用期限' }]}>
              <Radio.Group onChange={handleTimeStatus} className=" leading-8 flex items-center">
                <Radio value={'1'}>{'永久'}</Radio>
                <Radio value={'2'}>{'自定义'}</Radio>
              </Radio.Group>
            </Form.Item>
            {timeStatus == '2' && (
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

export default UmModify
