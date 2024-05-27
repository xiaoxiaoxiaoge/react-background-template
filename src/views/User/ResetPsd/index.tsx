import React, { memo, useRef, useState } from 'react'
// import SelectLang from "@/components/SelectLang";

import { Form, message, Input, Space } from 'antd'
import { usePsdValidate } from '@/hooks/usePsdValidate'
import { validEmail } from '@/utils/validate'

import { WrapperRes } from './style'
import Footer from '@/components/Footer'
import { defaultTheme } from '../../../../config/defaultTheme'
import { cloneDeep } from 'lodash'
import { firstLogin } from '@/services/user/login'
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import Header from '@/views/Layout/component/Header'
import { useSelector } from 'react-redux'
import { Encrypt } from '@/utils/tool'
import { RootState } from '@/store'

const ResetPsd: React.FC = () => {
  const publicKey = useSelector((state: RootState) => state.theme.publicKey)
  const formRef = useRef<ProFormInstance>()
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)
  const { validPsdBySecureSetting, validConfirmPsd } = usePsdValidate()
  const handleSubmit = async () => {
    await form.validateFields()
    const params = cloneDeep(form.getFieldsValue())
    params.newPassword = Encrypt(params.newPassword, publicKey)
    params.confirmPassword = Encrypt(params.confirmPassword, publicKey)
    setSubmitting(true)
    const res = await firstLogin(params)
    setSubmitting(false)
    if (res.code === 0) {
      message.success('密码重置成功，请重新登录')
      sessionStorage.removeItem('token')
      history.go(-1)
    }
  }

  return (
    <WrapperRes className="wrapper">
      <div>
        <Header className={'px-5 flex items-center'}>
          <Space className={'cursor-pointer'}>
            <img className={'mt-1'} src="/logo.png" height={32} alt="logo" />
            <span className={'text-lg ml-1'}>{defaultTheme.title}</span>
          </Space>
        </Header>

        <div className="content_main">
          <div className="content">
            <h2>
              <a style={{ color: 'rgba(12, 159, 223, 1)' }}>{'您好'}，</a>
              <span>{`欢迎进入${defaultTheme.title}后台`}</span>
            </h2>
            <h3>{'首次登录请设置新密码、绑定邮箱'}</h3>
            <div className="form">
              <ProForm
                formRef={formRef}
                form={form}
                layout="horizontal"
                submitter={{
                  searchConfig: {
                    submitText: '确定'
                  },
                  render: (_: unknown, dom) => dom.pop(),
                  submitButtonProps: {
                    loading: submitting,
                    size: 'large',
                    style: {
                      width: '100%'
                    }
                  }
                }}
                onFinish={async () => {
                  await handleSubmit()
                }}
              >
                <Form.Item name="newPassword" required rules={[{ validator: validPsdBySecureSetting }]}>
                  <Input size={'large'} type={'password'} placeholder={'新密码'} autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  required
                  rules={[
                    {
                      validator: (rule, value, cb) => validConfirmPsd(rule, value, cb, formRef.current?.getFieldValue('newPassword'))
                    }
                  ]}
                >
                  <Input size={'large'} type={'password'} placeholder={'确认密码'} autoComplete="new-password" />
                </Form.Item>
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large'
                  }}
                  placeholder={'邮箱'}
                  rules={[{ validator: validEmail }]}
                />
              </ProForm>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </WrapperRes>
  )
}

export default memo(ResetPsd)
