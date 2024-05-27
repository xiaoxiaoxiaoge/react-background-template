import { Button, Form, Input, message as AntMessage, Radio, RadioChangeEvent, Select, Space, Spin, Typography, Cascader, Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { createDataSource, getDataSourceDbs, getDataSourceDetail, getDataSourceTypes, linkDataSource, updateDataSource } from '@/services/datasource/api'
import { addDataSource } from '@/services/datasource/discoverTask'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Encrypt } from '@/utils/tool'
import { getAllSystem } from '@/services/system/api'
import Modal from '@/components/Modal'
import NewModal from '@/components/Modal'
import { DataSourceTypeEnum } from '@/enums/datasourceEnum'

let selectedDb = ''
const { Title } = Typography

interface IProps {
  id?: number
  record?: API.DiscoverTaskResult
  open: boolean
  setOpen: (val: boolean) => void
  successCb?: () => void
}

interface Option {
  value: string
  label: string
  children?: Option[]
}

let systemOption: API.SystemListResponse | undefined = {} as API.SystemListResponse

const DataSourceForm: React.FC<IProps> = ({ id, open, setOpen, successCb, record }) => {
  const [basicForm] = Form.useForm()
  const [otherForm] = Form.useForm()
  const [managerForm] = Form.useForm()
  const [dataSourceTypes, setDataSourceTypes] = useState([] as API.DataSourceType[])
  const [dbsModal, setDbsModal] = useState(false)
  const publicKey = useSelector((state: RootState) => state.theme.publicKey)
  const [manufacturerOptions, setManufacturerOptions] = useState([] as API.Manufacturer[])

  const systems = useMutation(getAllSystem, {
    async onSuccess({ code, data }) {
      if (code === 0 && id) {
        const res = await getDataSourceDetail(id)
        const _data_ = res.data[0]
        if (res.code === 0 && _data_) {
          const system = data?.find((item) => item.systemName === _data_?.systemName)
          if (system) {
            systemOption = system
            setManufacturerOptions(system.manufacturers)
          }
          basicForm.setFieldsValue({
            dataSourceName: _data_?.dataSourceName,
            dataSourceType: _data_?.dataSourceType,
            host: _data_?.host,
            port: _data_?.port,
            username: _data_?.username,
            dbName: _data_?.dbName
          })
          otherForm.setFieldsValue({
            systemName: _data_?.systemName,
            manufacturerName: _data_?.manufacturerName,
            systemVersion: _data_?.systemVersion,
            description: _data_?.description
          })
          managerForm.setFieldsValue({
            managerName: _data_?.managerName,
            managerDept: _data_?.managerDept,
            managerJob: _data_?.managerJob,
            managerPhone: _data_?.managerPhone
          })
        }
      }
    }
  })

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
    if (open && record && record.id) {
      basicForm.setFieldsValue({
        dataSourceName: record.dataSourceName,
        dataSourceType: record.dataSourceType,
        host: record.ip,
        port: record.port
      })
    }
  }, [open])
  // 创建数据源
  const create = useMutation(createDataSource, {
    async onSuccess({ code }) {
      if (code === 0) {
        await onCancel()
        successCb && successCb()
        AntMessage.success('创建成功')
      }
    }
  })
  // 修改数据源
  const modify = useMutation(updateDataSource, {
    async onSuccess({ code }) {
      if (code === 0) {
        await onCancel()
        successCb && successCb()
        AntMessage.success('修改成功')
      }
    }
  })
  // 通过数据源发现任务添加数据源
  const add = useMutation(addDataSource, {
    async onSuccess({ code }) {
      if (code === 0) {
        await onCancel()
        successCb && successCb()
        AntMessage.success('添加成功')
      }
    }
  })
  // 提交表单
  const onFinish = async () => {
    await basicForm.validateFields()
    await otherForm.validateFields()
    await managerForm.validateFields()
    const basic = await basicForm.getFieldsValue()
    basic.password = Encrypt(basic.password, publicKey)
    const other = await otherForm.getFieldsValue()
    const manager = await managerForm.getFieldsValue()
    if (systemOption?.systemName) {
      other.systemName = systemOption?.systemName
      other.systemCode = systemOption?.systemCode
      const manufacturer = systemOption?.manufacturers?.find((item) => item.id === other.manufacturerName)
      other.manufacturerName = manufacturer?.manufacturerName
      other.manufacturerCode = manufacturer?.manufacturerCode
    }
    if (id) {
      // 修改数据源
      modify.mutate({ ...basic, ...other, ...manager, id })
    } else if (!id || !record?.id) {
      // 创建数据源
      create.mutate({ ...basic, ...other, ...manager })
    } else if (record?.id) {
      // 添加数据源
      add.mutate({ id: record.id, ...basic, ...other, ...manager })
    }
  }
  // 取消
  const onCancel = async () => {
    await basicForm.resetFields()
    await otherForm.resetFields()
    await managerForm.resetFields()
    connection.reset()
    dbs.reset()
    add.reset()
    create.reset()
    modify.reset()
    setOpen(false)
    selectedDb = ''
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
      <NewModal
        title={id ? '编辑数据源' : '新增数据源'}
        open={open}
        onCancel={() => onCancel()}
        onOk={() => onFinish()}
        confirmLoading={create.isLoading || modify.isLoading}
        centered
        maskClosable={false}
        width={800}
      >
        <Spin spinning={systems.isLoading}>
          <Title className={'pb-3 px-2'} level={5}>
            连接信息
          </Title>
          <Form name="basic" form={basicForm} labelCol={{ flex: '120px' }} autoComplete="off">
            <Row>
              <Col span={12}>
                <Form.Item label="数据源名称" name="dataSourceName" rules={[{ required: true, message: '数据源名称不能为空' }]}>
                  <Input placeholder={'请输入'} maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
                  <Input placeholder={'请输入'} disabled={!!record?.id} />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <Input placeholder={'请输入'} disabled={!!record?.id} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
                  <Input placeholder={'请输入'} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码不能为空' }]}>
                  <Input.Password placeholder={'请输入'} autoComplete={'new-password'} />
                </Form.Item>
              </Col>
              {dataSourceType !== DataSourceTypeEnum['达梦'] && (
                <Col span={12}>
                  <Form.Item
                    label={dataSourceType === DataSourceTypeEnum['MYSQL'] || dataSourceType === DataSourceTypeEnum['SQL Server'] ? '数据库名' : '实例名'}
                    name="dbName"
                    rules={[
                      {
                        required: true,
                        message: DataSourceTypeEnum['MYSQL'] || dataSourceType === DataSourceTypeEnum['SQL Server'] ? '数据库名' : '实例名' + '不能为空'
                      }
                    ]}
                  >
                    <Input
                      placeholder={'请输入'}
                      disabled={!!id}
                      addonAfter={
                        dataSourceType == 1 && !id ? (
                          <Button rootClassName={'p-0 h-7'} type={'link'} className={'cursor-pointer'} onClick={() => getDbs()} loading={dbs.isLoading}>
                            获取数据库
                          </Button>
                        ) : (
                          ''
                        )
                      }
                    />
                  </Form.Item>
                </Col>
              )}
              <Col span={12}>
                <Form.Item label={' '} colon={false}>
                  <Space className={'cursor-pointer'}>
                    <Button onClick={() => onTestLink()} loading={connection.isLoading}>
                      测试连接
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Title className={'pb-3 px-2'} level={5}>
            系统信息
          </Title>
          <Form name="other" form={otherForm} labelCol={{ flex: '120px' }} autoComplete="off">
            <Row>
              <Col span={12}>
                <Form.Item label="系统名称" name="systemName" rules={[{ required: true, message: '系统名称不能为空' }]}>
                  <Select placeholder={'请选择'} onChange={onSystemChange}>
                    {systems.data?.data?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.systemName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="系统厂商" name="manufacturerName" rules={[{ required: true, message: '系统厂商不能为空' }]}>
                  <Select placeholder={'请选择'}>
                    {manufacturerOptions.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.manufacturerName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="系统版本号" name="systemVersion" rules={[{ required: true, message: '系统版本号不能为空' }]}>
                  <Input placeholder={'请输入'} maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="数据描述" name="description" rules={[{ required: true, message: '数据描述不能为空' }]}>
                  <Input.TextArea showCount rows={2} placeholder={'请输入'} maxLength={200} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Title className={'pb-3 px-2'} level={5}>
            责任主体信息
          </Title>
          <Form name="manager" form={managerForm} labelCol={{ flex: '120px' }} autoComplete="off">
            <Row>
              <Col span={12}>
                <Form.Item label="数据安全责任人" name="managerName">
                  <Input placeholder={'请输入'} maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="部门" name="managerDept">
                  <Input placeholder={'请输入'} maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="职务" name="managerJob">
                  <Input placeholder={'请输入'} maxLength={50} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="联系方式" name="managerPhone">
                  <Input placeholder={'请输入'} maxLength={20} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </NewModal>
      <Modal title={'选择数据库'} open={dbsModal} onCancel={() => setDbsModal(false)} maskClosable={false} onOk={() => onDbsSelected()} destroyOnClose>
        <Radio.Group onChange={onDbsChange} defaultValue={''}>
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
