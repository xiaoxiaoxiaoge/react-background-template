import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'

import { cloneDeep } from 'lodash'
import { Login } from './style'
import { checkLicense, getCaptcha, getMenuListByUserId, getUserInfo, login } from '@/services/user/login'
import { setFirstLevelMenu, setMenuRoutes, setRealMenu } from '@/store/modules/theme'
import { getRealRoutes, mainRoutes } from '@/routes'
import { useDispatch, useSelector } from 'react-redux'
import { Encrypt, getSession } from '@/utils/tool'
import { RootState } from '@/store'
import { useMutation } from 'react-query'
import { ProFormCaptcha } from '@ant-design/pro-form'
import { defaultTheme } from '../../../../config/defaultTheme'

const PageName: React.FC = () => {
  const dispatch = useDispatch()
  const publicKey = useSelector((state: RootState) => state.theme.publicKey)
  const [form] = Form.useForm()
  const [captche, setCaptche] = useState<API.CaptchaInfo>({
    img: '',
    captchaToken: ''
  })
  // const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const validAccount = (_: unknown, val: string, cb: (arg0: string | undefined) => void) => {
    if (!val) {
      cb('账号不能为空')
    } else if (!/^[0-9a-zA-Z]{1,40}$/.test(val)) {
      cb('账号只能由字母和数字组成且40个字符以内')
    } else {
      cb(undefined)
    }
  }

  const handleCaptcha = async () => {
    getCaptcha().then((res) => {
      if (res.code == 0) {
        setCaptche({ ...res.data })
      }
    })
  }
  useEffect(() => {
    handleCaptcha()
  }, [])
  const create = useMutation(login, {
    onSuccess: async (res) => {
      if (res.code == 0) {
        message.success('登录成功')
        sessionStorage.setItem('token', res.data.tokenValue)
        await getUserInfo().then((re) => {
          sessionStorage.setItem('userInfo', JSON.stringify(re.data))
        })
        if (res.data?.firstLogin) {
          navigate('/resetPsd')
        } else {
          navigate('/welcome')
          const token = getSession('token', '')
          if (token) {
            const authRes = await checkLicense()
            if (authRes.code === 0) {
              getMenuListByUserId().then((rer) => {
                if (rer.code == 0) {
                  const menus = rer.data
                  const realRoute = getRealRoutes(mainRoutes, menus)
                  const r = realRoute
                  // @ts-ignore
                  dispatch(setRealMenu(r))
                  dispatch(setMenuRoutes())
                  dispatch(setFirstLevelMenu())
                }
              })
            } else {
              const realRoute = getRealRoutes(mainRoutes, defaultTheme.defaultRoute)
              dispatch(setRealMenu(realRoute))
              dispatch(setMenuRoutes())
              dispatch(setFirstLevelMenu())
            }
          }
        }
      }
    },
    onError: async () => {
      handleCaptcha()
    }
  })
  const handleSubmit = async () => {
    await form.validateFields()
    const params = cloneDeep(form.getFieldsValue())
    params.captchaToken = captche.captchaToken
    params.password = Encrypt(params.password, publicKey)
    create.mutate(params)
  }

  return (
    <Login style={{ backgroundImage: `url(${defaultTheme.loginBac})` }}>
      <div className="login_box">
        <div className="content_box">
          <div className="content">
            <div className="left_pic">
              <img src="/img/primary/login_form.png" alt="" />
            </div>
            <div className="right_form">
              <div className="header">
                <div className="header_content">
                  {/* <img className="logo" src={defaultTheme.loginLogo} /> */}
                  <span className="title">欢迎使用{defaultTheme.title}V1.0</span>
                </div>
              </div>
              <div className="form_content">
                <Form
                  layout={'vertical'}
                  form={form}
                  onFinish={async () => {
                    return
                  }}
                >
                  <Form.Item name="username" required={false} rules={[{ validator: validAccount }]}>
                    <Input autoComplete={'on'} size={'large'} placeholder={'请输入账号'} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    required={false}
                    rules={[
                      {
                        required: true,
                        message: '密码不能为空'
                      }
                    ]}
                  >
                    <Input.Password autoComplete={'on'} size={'large'} type={'password'} placeholder={'请输入密码'} />
                  </Form.Item>
                  <ProFormCaptcha
                    name="imageCode"
                    required={false}
                    fieldProps={{ size: 'large' }}
                    captchaProps={{
                      size: 'large',
                      disabled: false,
                      style: { padding: 0, border: 'none' }
                    }}
                    placeholder={'请输入验证码'}
                    captchaTextRender={() => <img className="captche_code" src={`data:image/png;base64,${captche.img}`} alt={'验证码'} />}
                    rules={[
                      {
                        required: true,
                        message: '验证码不能为空'
                      }
                    ]}
                    onGetCaptcha={handleCaptcha}
                  />
                  {/* <div style={{ marginBottom: "24px", textAlign: "right" }}>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => navigate("/forgetPsd")}
                    >
                      {"忘记密码？"}
                    </Button>
                  </div> */}
                  <Form.Item>
                    <Button
                      htmlType={'submit'}
                      loading={create.isLoading}
                      type={'primary'}
                      size={'large'}
                      style={{ width: '100%', marginTop: '24px' }}
                      onClick={() => handleSubmit()}
                    >
                      {'登 录'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{
          background: 'transparent',
          color: '#c5c5c5'
        }}
      >
        <span className="copy">Copyright © 高维数据技术有限公司</span>
        <div className="version">正式版 1.0.0</div>
      </div>
    </Login>
  )
}

export default PageName
