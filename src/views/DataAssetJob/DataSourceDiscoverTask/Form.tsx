import { Form, Input, message as AntMessage, Radio, Select, DatePicker } from 'antd'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { createDiscoverTask, modifyDiscoverTask, getDiscoverTaskDetail } from '@/services/datasource/discoverTask'
import Modal from '@/components/Modal'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import { DiscoverTaskStrategyEnum } from '@/enums/datasourceEnum'
import { validIPSegment, validPortSegment, validRegularExecTime } from '@/utils/validate'

interface IProps {
  id?: number
  open: boolean
  setOpen: (val: boolean) => void
  successCb?: () => void
}

const DiscoverTaskForm: React.FC<IProps> = ({ id, open, setOpen, successCb }) => {
  const [form] = Form.useForm()

  dayjs.extend(customParseFormat)
  const strategy = Form.useWatch('execStrategy', form)

  useEffect(() => {
    if (id && open) {
      getDiscoverTaskDetail(id).then((res) => {
        if (res.code === 0) {
          const { taskName, regularExecTime, ipSegment, portSegment, execStrategy, periodicExecTime } = res.data
          form.setFieldsValue({
            taskName,
            ipSegment,
            portSegment,
            execStrategy,
            periodicExecTime,
            regularExecTime: regularExecTime ? dayjs(regularExecTime, 'YYYY-MM-DD HH:mm') : null
          })
        }
      })
    }
  }, [open])

  const create = useMutation(createDiscoverTask, {
    async onSuccess({ code }) {
      if (code === 0) {
        await onCancel()
        successCb && successCb()
        AntMessage.success('创建成功')
      }
    }
  })

  const modify = useMutation(modifyDiscoverTask, {
    async onSuccess({ code }) {
      if (code === 0) {
        await onCancel()
        successCb && successCb()
        AntMessage.success('修改成功')
      }
    }
  })
  // 提交表单
  const onFinish = async () => {
    await form.validateFields()
    const values = await form.getFieldsValue()
    const regularExecTime = values.regularExecTime ? values.regularExecTime.format('YYYY-MM-DD HH:mm') : ''
    if (id) {
      modify.mutate({
        ...values,
        id,
        regularExecTime
      })
    } else {
      create.mutate({
        ...values,
        regularExecTime
      })
    }
  }
  // 取消
  const onCancel = async () => {
    await form.resetFields()
    create.reset()
    modify.reset()
    setOpen(false)
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day')
  }

  return (
    <div>
      <Modal
        title={id ? '编辑数据源发现任务' : '新建数据源发现任务'}
        open={open}
        onCancel={() => onCancel()}
        onOk={() => onFinish()}
        confirmLoading={create.isLoading || modify.isLoading}
        centered
        maskClosable={false}
      >
        <Form name="basic" form={form} style={{ maxWidth: 600 }} labelCol={{ flex: '110px' }} autoComplete="off">
          <Form.Item label="任务名称" name="taskName" validateTrigger="onBlur" rules={[{ whitespace: false, required: true, message: '任务名称不能为空' }]}>
            <Input placeholder={'请输入'} maxLength={50} />
          </Form.Item>
          <Form.Item label="扫描范围" name="ipSegment" required validateTrigger="onBlur" rules={[{ validator: validIPSegment }]}>
            <Input.TextArea
              placeholder={`支持单个IP、IP段、子网掩码（支持24），多个网段以换行分隔，格式如下：
192.168.1.1
192.168.1.2-192.168.1.200
192.168.2.0/24`}
              rows={5}
            />
          </Form.Item>
          <Form.Item label="指定端口" name="portSegment" required validateTrigger="onBlur" rules={[{ validator: validPortSegment }]}>
            <Input.TextArea
              placeholder={`指定端口可有效节约扫描时间，支持单个端口、端口段，多个端口以换行分隔，格式如下：
89
100-62021
23`}
              rows={5}
            />
          </Form.Item>
          <Form.Item label="执行策略" name="execStrategy" rules={[{ required: true, message: '请选择执行策略' }]}>
            <Radio.Group>
              <Radio value={1}>立即执行</Radio>
              <Radio value={2}>定时执行</Radio>
              <Radio value={3}>周期执行</Radio>
            </Radio.Group>
          </Form.Item>
          {strategy === DiscoverTaskStrategyEnum['定时执行'] && (
            <Form.Item label="定时执行时间" name="regularExecTime" required rules={[{ validator: validRegularExecTime }]}>
              <DatePicker format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} disabledDate={disabledDate} showTime />
            </Form.Item>
          )}
          {strategy === DiscoverTaskStrategyEnum['周期执行'] && (
            <Form.Item label="周期执行时间" name="periodicExecTime" rules={[{ required: true, message: '请选择周期执行时间' }]}>
              <Select
                style={{ width: '100%' }}
                placeholder="请选择周期执行时间"
                options={[
                  { value: 1, label: '每天0点' },
                  { value: 2, label: '每天4点' },
                  { value: 3, label: '每周二0点' },
                  { value: 4, label: '每周二4点' },
                  { value: 5, label: '每月一日0点' },
                  { value: 6, label: '每月一日4点' }
                ]}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}
export default DiscoverTaskForm
