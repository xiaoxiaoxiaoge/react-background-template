import React, { memo, useEffect, useState } from 'react'
import { Button, Form, Input, message, Space } from 'antd'
import { useMount } from '@/hooks/useMount'
import { cloneDeep } from 'lodash'
import { updateUserInfo } from '@/services/user/login'
import styled from 'styled-components'

const ModifyUser: React.FC = () => {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)
  const info = sessionStorage.getItem('userInfo')
  const userInfo = info ? JSON.parse(info) : null
  useEffect(() => {
    form.setFieldValue('userName', userInfo.userName)
  }, [])

  const onFinish = async () => {
    await form.validateFields()

    setSubmitting(true)
    const params = cloneDeep(form.getFieldsValue())
    delete params.userName
    updateUserInfo(params)
      .then((res) => {
        if (res.code === 0) {
          message.success('邮件修改成功')
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const validEmail = (_: unknown, val: string, cb: any) => {
    if (!val) {
      cb(new Error('邮箱不能为空'))
    } else if (!/[@]/.test(val)) {
      cb(new Error('邮箱必须包含@字符'))
    } else if (val.length < 4 || val.length > 40) {
      cb(new Error('请输入4~40位的邮箱'))
    } else {
      cb()
    }
  }

  useMount(async () => {
    // const { status, data } = await getCurrentUser();
    // if (status === 0) {
    //   setUserInfo(data);
    //   form.setFieldsValue({
    //     username: data.userName,
    //     email: data.email,
    //   });
    // }
  })

  return (
    <MUser>
      <Form form={form} wrapperCol={{ md: 6, sm: 8, xs: 12 }} layout={'vertical'} onFinish={onFinish}>
        <Form.Item name="userName" label={'账号'}>
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item name="email" label={'邮箱'} rules={[{ validator: validEmail }]}>
          <Input placeholder={'请输入邮箱'} />
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
    </MUser>
  )
}

export default memo(ModifyUser)

const MUser = styled.div`
  padding: 24px;
`
