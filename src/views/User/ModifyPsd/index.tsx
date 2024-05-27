import React, { memo, useState } from 'react'
import { Button, Form, Input, message, Space } from 'antd'
import { usePsdValidate } from '@/hooks/usePsdValidate'
import { useNavigate } from 'react-router-dom'
import { updatePwd } from '@/services/user/login'
import { useSelector } from 'react-redux'
import { Encrypt } from '@/utils/tool'
import { RootState } from '@/store'
import styled from 'styled-components'

const ModifyPsd: React.FC = () => {
  const publicKey = useSelector((state: RootState) => state.theme.publicKey)
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)
  const { validPsdBySecureSetting, validConfirmPsd } = usePsdValidate()
  const navigate = useNavigate()
  const onFinish = (values: API.UpdatePwd) => {
    setSubmitting(true)
    updatePwd({
      oldPassword: Encrypt(values.oldPassword, publicKey),
      newPassword: Encrypt(values.newPassword, publicKey),
      confirmPassword: Encrypt(values.confirmPassword, publicKey)
    })
      .then((res) => {
        if (res.code === 0) {
          message.success('密码修改成功')
          sessionStorage.clear()
          navigate('/')
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <MPsd>
      <Form form={form} wrapperCol={{ md: 6, sm: 8, xs: 12 }} layout={'vertical'} onFinish={onFinish}>
        <Form.Item
          name="oldPassword"
          label={'旧密码'}
          rules={[
            {
              required: true,
              message: '旧密码不能为空'
            }
          ]}
        >
          <Input type={'password'} placeholder={'请输入旧密码'} />
        </Form.Item>
        <Form.Item name="newPassword" label={'新密码'} required rules={[{ validator: validPsdBySecureSetting }]}>
          <Input type={'password'} placeholder={'请输入新密码'} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={'确认新密码'}
          required
          rules={[
            {
              validator: (rule, value, cb) => validConfirmPsd(rule, value, cb, form.getFieldValue('newPassword'))
            }
          ]}
        >
          <Input type={'password'} placeholder={'请重新输入新密码'} />
        </Form.Item>
        <Form.Item wrapperCol={{ md: 6, sm: 8, xs: 12 }}>
          <Space>
            <Button loading={submitting} type="primary" htmlType="submit">
              {'确定'}
            </Button>
            <Button htmlType="button" onClick={() => history.go(-1)}>
              {'返回'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </MPsd>
  )
}

export default memo(ModifyPsd)
const MPsd = styled.div`
  padding: 24px;
`
