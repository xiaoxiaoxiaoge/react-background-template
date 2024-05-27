import React, { useEffect } from 'react'
import { Descriptions, Form, Progress, Spin } from 'antd'
import { getExceptionInfo } from '@/services/dataassetJob/data-manage'
import './index.less'
import NewModal from '@/components/Modal'
import { useMutation } from 'react-query'
type IProps = {
  isTaskError: boolean
  setIsTaskError: (e: boolean) => void
  taskId: number
}

const DataError: React.FC<IProps> = ({ isTaskError, setIsTaskError, taskId }) => {
  const [form] = Form.useForm()
  const errorDetails = useMutation(getExceptionInfo, {
    onSuccess: (res) => {
      if (res.code === 0) {
        form.setFieldsValue({
          ...res.data
        })
      }
    }
  })
  useEffect(() => {
    const id = taskId
    errorDetails.mutateAsync(id)
  }, [])
  const handleErrorOk = async () => {
    setIsTaskError(false)
  }
  const handleErrorCancel = () => {
    setIsTaskError(false)
  }
  return (
    <NewModal title="异常详情" centered open={isTaskError} onOk={handleErrorOk} onCancel={handleErrorCancel} footer={false} className="error-modal">
      <Spin className={'pb-3'} spinning={errorDetails.isLoading}>
        <Descriptions column={1} labelStyle={{ width: '134px', textAlign: 'right', display: 'inline-block', paddingRight: '6px' }}>
          <Descriptions.Item label="作业名称">{errorDetails?.data?.data?.jobName || '-'}</Descriptions.Item>
          <Descriptions.Item label="执行进度">
            <Progress percent={errorDetails?.data?.data?.executionProgress} />
          </Descriptions.Item>
          <Descriptions.Item label="最近执行时间">{errorDetails?.data?.data?.startTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="完成时间">{errorDetails?.data?.data?.endTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="异常信息">{errorDetails?.data?.data?.exceptionMessage || '-'}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </NewModal>
  )
}

export default DataError
