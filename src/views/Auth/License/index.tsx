import { Button, Card, Form, Input, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import './index.less'
import { getLicenseDetailInfos, queryServer, updateLicense } from '@/services/License/api'
import { defaultTheme } from '../../../../config/defaultTheme'

const PageName: React.FC = () => {
  const [form] = Form.useForm()
  const [licenseInfo, setLicenseInfo] = useState<API.GetLicenseDetailInfos>()
  const [serverSign, setServerSign] = useState<API.QueryServerResponse[]>([])

  useEffect(() => {
    getLicenseDetailInfos().then((res) => {
      if (res.code == 0) {
        setLicenseInfo(res.data)
      }
    })
  }, [])
  useEffect(() => {
    queryServer().then((res) => {
      if (res.code == 0) {
        setServerSign(res.data)
      }
    })
  }, [])
  const copyServerSign = () => {
    const signs = serverSign.map((item: API.QueryServerResponse) => item.serverSign)

    return (
      <CopyToClipboard text={signs.join(',')} onCopy={() => message.success('复制成功~')}>
        <Button type="link" size="small">
          复制
        </Button>
      </CopyToClipboard>
    )
  }
  const onSubmit = async () => {
    await form.validateFields()
    const value = form.getFieldValue('licenseKey')
    const params = {
      licenseKey: value
    }
    updateLicense(params).then((res) => {
      if (res.code == 0) {
        message.success('授权成功')
        window.location.reload()
      }
    })
  }
  return (
    <div className=" p-4 ">
      <Card title="当前授权信息" bordered={false}>
        <div className=" flex p-4">
          <img src="/img/primary/login_form.png" alt="" className=" w-[200px] " />
          <div className=" ml-4 flex flex-col justify-between">
            <div>
              <div className=" text-lg mb-2">{defaultTheme.title}</div>
              <div>软件版本：{defaultTheme.versions}</div>
            </div>
            <div>
              <div className=" mb-2">可用时间：{licenseInfo?.usableTime || '-'}</div>
              <div className=" mb-2">到期时间：{licenseInfo?.endTime || '-'}</div>
              <div>近期更新时间：{licenseInfo?.updateTime || '-'}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="更新授权" bordered={false} className=" mt-5">
        <Form name="licenseForm" form={form} wrapperCol={{ span: 8 }} className="license_from">
          <Form.Item label={'服务器标识串'} name="serverCode">
            <div>
              {serverSign.map((item) => (
                <div className="code_item" key={item.serverSign}>
                  {item.serverSign} &nbsp;&nbsp;
                  {item.authorizeStatus === 2 && <Tag color="red">{'未授权'}</Tag>}
                </div>
              ))}
              {copyServerSign()}
            </div>
          </Form.Item>
          <Form.Item
            label={'授权密钥'}
            name="licenseKey"
            rules={[
              {
                required: true,
                message: '授权密钥不能为空'
              }
            ]}
          >
            <Input.Search placeholder={'请输入正确的授权密钥'} onSearch={onSubmit} enterButton={'提交验证'} />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default PageName
