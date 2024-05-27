import { Button, Form, Input, message as AntMessage, Radio, RadioChangeEvent, Select, Space, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { getDataSourceDbs, getDataSourceTypes, linkDataSource } from '@/services/datasource/api'
import { addDataSource } from '@/services/datasource/discoverTask'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Encrypt } from '@/utils/tool'
import { getAllSystem } from '@/services/system/api'
import Modal from '@/components/Modal'

let selectedDb = ''
const { Title } = Typography

interface IProps {
  open: boolean
  setOpen: (val: boolean) => void
  successCb?: () => void
  record: API.DiscoverTaskResult
}

let systemOption: API.SystemListResponse | undefined = {} as API.SystemListResponse

const DataSourceForm: React.FC<IProps> = ({ open, setOpen, successCb, record }) => {
  const [basicForm] = Form.useForm()
  const [otherForm] = Form.useForm()
  const [dataSourceTypes, setDataSourceTypes] = useState([] as API.DataSourceType[])
  const [dbsModal, setDbsModal] = useState(false)
  const publicKey = useSelector((state: RootState) => state.theme.publicKey)
  const [manufacturerOptions, setManufacturerOptions] = useState([] as API.Manufacturer[])

  const systems = useMutation(getAllSystem)

  const connection = useMutation(linkDataSource, {
    async onSuccess({ code }) {
      if (code === 0) {
        AntMessage.success('连接成功')
      }
    }
  })
  const dbs = useMutation(getDataSourceDbs, {
    async onSuccess({ code }) {
      setDbsModal(code === 0)
    }
  })
  const dataSourceType = Form.useWatch('dataSourceType', basicForm)

  useEffect(() => {
    if (open) {
      getDataSourceTypes().then((res) => {
        if (res.code === 0 && res.data) {
          setDataSourceTypes(res.data)
        }
      })
      systems.mutate()
    }
    if (open && record.id) {
      basicForm.setFieldsValue({
        dataSourceName: record.dataSourceName,
        dataSourceType: record.dataSourceType,
        host: record.ip,
        port: record.port
      })
    }
  }, [open])

  const create = useMutation(addDataSource, {
    async onSuccess({ code }) {
      if (code === 0) {
        await onCancel()
        successCb && successCb()
        AntMessage.success('创建成功')
      }
    }
  })
  // 提交表单
  const onFinish = async () => {
    await basicForm.validateFields()
    await otherForm.validateFields()
    const basic = await basicForm.getFieldsValue()
    basic.password = Encrypt(basic.password, publicKey)
    const other = await otherForm.getFieldsValue()
    if (systemOption?.systemName) {
      other.systemName = systemOption?.systemName
      other.systemCode = systemOption?.systemCode
      other.manufacturerName = systemOption?.manufacturers?.find((item) => item.id === other.manufacturerName)?.manufacturerName
      other.manufacturerCode = systemOption?.manufacturers?.find((item) => item.id === other.manufacturerName)?.manufacturerCode
    }
    create.mutate({ id: record.id, ...basic, ...other })
  }
  // 取消
  const onCancel = async () => {
    await basicForm.resetFields()
    await otherForm.resetFields()
    connection.reset()
    dbs.reset()
    create.reset()
    setOpen(false)
  }

  // 获取数据库
  const getDbs = async () => {
    await basicForm.validateFields(['dataSourceName', 'dataSourceType', 'host', 'port', 'username', 'password'])
    const values = await basicForm.getFieldsValue(['dataSourceName', 'dataSourceType', 'host', 'port', 'username', 'password'])
    dbs.mutate(values)
  }
  // 选择数据库类型
  const onDbsChange = (e: RadioChangeEvent) => {
    if (e?.target?.value) {
      selectedDb = e.target.value
    }
  }
  // 选择数据库
  const onDbsSelected = () => {
    if (selectedDb) {
      setDbsModal(false)
      basicForm.setFieldValue('dbName', selectedDb)
    }
  }
  // 测试连接
  const onTestLink = async () => {
    await basicForm.validateFields()
    const basic = await basicForm.getFieldsValue()
    basic.password = Encrypt(basic.password, publicKey)
    connection.mutate(basic)
  }
  // 选择系统
  const onSystemChange = (value: number) => {
    systemOption = systems.data?.data?.find((item) => item.id === value)
    setManufacturerOptions(systemOption ? systemOption.manufacturers : [])
    otherForm.resetFields(['manufacturerName'])
  }
  return (
    <div>
      <Modal
        title={'添加数据源'}
        open={open}
        onCancel={() => onCancel()}
        onOk={() => onFinish()}
        confirmLoading={create.isLoading}
        centered
        maskClosable={false}
      >
        <Spin spinning={systems.isLoading}>
          <Title className={'pb-3 px-2'} level={5}>
            基本信息
          </Title>
          <Form name="basic" form={basicForm} style={{ maxWidth: 600 }} labelCol={{ flex: '100px' }} autoComplete="off">
            <Form.Item label="数据源名称" name="dataSourceName" rules={[{ required: true, message: '数据源名称不能为空' }]}>
              <Input placeholder={'请输入'} maxLength={50} />
            </Form.Item>
            <Form.Item label="数据源类型" name="dataSourceType" rules={[{ required: true, message: '数据源类型不能为空' }]}>
              <Select
                placeholder={'请选择'}
                options={[
                  {
                    label: '关系型数据库',
                    options: dataSourceTypes.filter((item) => item.type === 1)
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              label="主机"
              name="host"
              rules={[
                { required: true, message: '主机不能为空' },
                {
                  pattern: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                  message: '连接地址格式错误'
                }
              ]}
            >
              <Input placeholder={'请输入'} disabled />
            </Form.Item>
            <Form.Item
              label="端口"
              name="port"
              rules={[
                { required: true, message: '端口不能为空' },
                {
                  pattern: /^([1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                  message: '端口错误'
                }
              ]}
            >
              <Input placeholder={'请输入'} disabled />
            </Form.Item>
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
              <Input placeholder={'请输入'} />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空' }]}>
              <Input.Password placeholder={'请输入'} autoComplete={'new-password'} />
            </Form.Item>
            <Form.Item
              label={dataSourceType === 1 ? '数据库名' : '实例名'}
              name="dbName"
              rules={[{ required: true, message: dataSourceType === 1 ? '数据库名' : '实例名' + '不能为空' }]}
            >
              <Input
                placeholder={'请输入'}
                addonAfter={
                  dataSourceType == 1 ? (
                    <Button rootClassName={'p-0 h-7'} type={'link'} className={'cursor-pointer'} onClick={() => getDbs()} loading={dbs.isLoading}>
                      获取数据库
                    </Button>
                  ) : (
                    ''
                  )
                }
              />
            </Form.Item>
            <Form.Item label={' '} colon={false}>
              <Space className={'cursor-pointer'}>
                <Button onClick={() => onTestLink()} loading={connection.isLoading}>
                  测试连接
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <Title className={'pb-3 px-2'} level={5}>
            其它信息
          </Title>
          <Form name="other" form={otherForm} style={{ maxWidth: 600 }} labelCol={{ flex: '100px' }} autoComplete="off">
            <Form.Item label="所属系统" name="systemName" rules={[{ required: true, message: '所属系统不能为空' }]}>
              <Select placeholder={'请选择'} onChange={onSystemChange}>
                {systems.data?.data?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.systemName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="系统厂商" name="manufacturerName" rules={[{ required: true, message: '系统厂商不能为空' }]}>
              <Select placeholder={'请选择'}>
                {manufacturerOptions.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.manufacturerName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="系统版本号" name="systemVersion" rules={[{ required: true, message: '系统版本号不能为空' }]}>
              <Input placeholder={'请输入'} maxLength={50} />
            </Form.Item>
            <Form.Item label="备注" name="description">
              <Input.TextArea showCount rows={2} placeholder={'请输入'} maxLength={200} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Modal title={'选择数据库'} open={dbsModal} onCancel={() => setDbsModal(false)} maskClosable={false} onOk={() => onDbsSelected()}>
        <Radio.Group onChange={onDbsChange}>
          <Space direction="vertical">
            {dbs.data?.data.map((item) => (
              <Radio key={item} value={item}>
                {item}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  )
}
export default DataSourceForm
