import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { executionTime } from '../config'
import { jobAdd } from '@/services/dataassetJob/data-manage'
import { RangePickerProps } from 'antd/es/date-picker'
import moment from 'moment'
import { useMutation } from 'react-query'
import NewModal from '@/components/Modal'
import { validRegularExecTime } from '@/utils/validate'
import { getModuleList } from '@/services/classify/tem-classify'
type IProps = {
  isClassifyJob: boolean
  setIsClassifyJob: (e: boolean) => void
  dsOptions: API.DatasourceOptionsResponse[]
  tempOptions: API.ModuleListResponse[]
  resetGetList: () => void
  newestRuleInfo: API.GetUsedInfoResponse
}

const validJobName = (_: unknown, val: string, cb: any) => {
  if (!val) {
    cb(new Error('作业名称不能为空'))
  } else if (val.length > 20 || val.length < 1) {
    cb(new Error('请输入20个字符以内的作业名称'))
  } else {
    cb()
  }
}
const DataCreate: React.FC<IProps> = ({ isClassifyJob, setIsClassifyJob, dsOptions, tempOptions, resetGetList, newestRuleInfo }) => {
  const [form] = Form.useForm()
  const [dataSetSizeValue, setDataSetSizeValue] = useState<number | null>()

  // const [verify, setVerify] = useState(false)

  const executionStrategy = Form.useWatch('executionStrategy', form)
  // const dataSourceId = Form.useWatch('dataSourceId', form)

  // 初始化设置值
  useEffect(() => {
    if (isClassifyJob) {
      form.setFieldsValue({
        ruleSetId: newestRuleInfo?.ruleSetName + newestRuleInfo?.ruleSetVersion || null,
        executionStrategy: 2,
        updateStrategy: 1
      })
    }
  }, [isClassifyJob])
  useEffect(() => {
    if (executionStrategy == 3) {
      form.setFieldValue('updateStrategy', 1)
      form.setFieldValue('dataSetSize', 0)
      setDataSetSizeValue(0)
    } else {
      form.setFieldValue('dataSetSize', null)
      setDataSetSizeValue(null)
    }
  }, [executionStrategy])

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < moment().startOf('days')
  }
  const handleDSChange = (e: number | null) => {
    setDataSetSizeValue(e)
  }

  const create = useMutation(jobAdd, {
    onSuccess: async (res) => {
      if (res.code == 0) {
        message.success('新建成功')
        setIsClassifyJob(false)
        form.resetFields()
        resetGetList()
      }
    }
  })
  const handleOk = async (operationType: number) => {
    await form.validateFields()
    // setVerify(true)

    // if (form.getFieldValue('executionStrategy') == 1) {
    //   confirm({
    //     title: '即时执行',
    //     icon: <ExclamationCircleFilled />,
    //     content: '确认新增即时执行作业',
    //     onOk() {
    //       const params = form.getFieldsValue()
    //       if (params.executionStrategy == 2) {
    //         params.regularExecutionTime = params.regularExecutionTime.format('YYYY-MM-DD HH:mm')
    //       }
    //       params.dataSetSize = Number(params.dataSetSize)
    //       params.ruleSetId = rules.id
    //       create.mutateAsync(params)
    //     }
    //   })
    // } else {
    const params = form.getFieldsValue()
    if (params.executionStrategy == 2) {
      params.regularExecutionTime = params.regularExecutionTime.format('YYYY-MM-DD HH:mm')
    }
    if (params.executionStrategy == 3) {
      params.updateStrategy = 1
    }
    if (!params.remark) {
      params.remark = ''
    }
    if (params.dataSetSize) {
      params.dataSetSize = Number(params.dataSetSize)
      if (params.dataSetSize > 20) {
        params.dataSetSize = 20
      }
    }

    params.ruleSetId = newestRuleInfo?.id
    params.operationType = operationType
    create.mutateAsync(params)
    // }
  }

  const handleCancel = () => {
    setIsClassifyJob(false)
    form.resetFields()
    // setVerify(false)
  }
  return (
    <NewModal
      title="新增分类分级作业"
      open={isClassifyJob}
      onCancel={handleCancel}
      className="modalSet"
      centered
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,

        <Button key="submit" type="primary" loading={create.isLoading} onClick={() => handleOk(1)}>
          保存
        </Button>,
        <Button key="submitStart" type="primary" loading={create.isLoading} onClick={() => handleOk(2)}>
          保存并启动
        </Button>
      ]}
    >
      <div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <div className=" font-bold text-base mb-4 ">基本信息</div>
          <Form.Item label="作业名称" name="jobName" required rules={[{ validator: validJobName }]}>
            <Input placeholder="请输入作业名称" allowClear />
          </Form.Item>
          <Form.Item label="作业对象" name="dataSourceId" rules={[{ required: true, message: '作业对象不能为空' }]}>
            <Select style={{ width: 200 }} options={dsOptions} placeholder="请选择作业对象" />
          </Form.Item>
          <Form.Item label="执行策略" name="executionStrategy" rules={[{ required: true, message: '请选择' }]}>
            <Radio.Group>
              <Radio key="2" value={2}>
                {' '}
                定时执行{' '}
              </Radio>
              <Radio key="3" value={3}>
                {' '}
                周期执行{' '}
              </Radio>
            </Radio.Group>
          </Form.Item>
          {executionStrategy == 2 && (
            <Form.Item label="选择执行时间" name="regularExecutionTime" required rules={[{ validator: validRegularExecTime }]}>
              <DatePicker
                placeholder="请选择"
                disabledDate={disabledDate}
                //  disabledTime={disabledTime}
                showTime
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          )}
          {executionStrategy == 3 && (
            <Form.Item name="periodicExecutionTime" label="选择执行时间" rules={[{ required: true }]}>
              <Select placeholder="请选择" allowClear options={executionTime} />
            </Form.Item>
          )}
          <Form.Item label="分类分级模板" name="dataSourceId" rules={[{ required: true, message: '分类分级模板不能为空' }]}>
            <Select style={{ width: 200 }} options={tempOptions} fieldNames={{ label: 'moduleName', value: 'moduleId' }} placeholder="请选择分类分级模板" />
          </Form.Item>
          <Form.Item label="识别规则集" name="ruleSetId" rules={[{ required: true, message: '识别规则集不能为空' }]}>
            <Input type="text" disabled bordered={false} />
          </Form.Item>
          <Form.Item label="更新策略" name="updateStrategy" rules={[{ required: true, message: '请选择' }]}>
            <Radio.Group>
              <Radio value={1}> 增量更新 </Radio>
              {executionStrategy != 3 && <Radio value={2}> 全量更新 </Radio>}
            </Radio.Group>
          </Form.Item>

          <Form.Item label="抽样数据集大小" name="dataSetSize">
            <Row gutter={16}>
              <Col span={7}>
                <InputNumber
                  name="dataSetSize"
                  disabled={executionStrategy == 3}
                  min={0}
                  max={20}
                  placeholder="0-20"
                  value={dataSetSizeValue}
                  onChange={handleDSChange}
                />
              </Col>
              <Col span={6}>
                <div style={{ lineHeight: '32px' }}>条记录</div>
              </Col>
            </Row>
          </Form.Item>

          <div className=" font-bold text-base mt-8 mb-4 ">其他信息</div>
          <Form.Item label="备注" name="remark">
            <TextArea showCount rows={4} maxLength={100} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </div>
    </NewModal>
  )
}

export default DataCreate
