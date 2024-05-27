import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { findIndex } from 'lodash'
import { Button, Descriptions, message, Progress, Spin } from 'antd'

import { getDetailInfo, updateStatus } from '@/services/dataassetJob/data-manage'
import { strategy } from '../config'
import NewModal from '@/components/Modal'

type IProps = {
  resetGetList: () => void
  isTaskDetails: boolean
  setIsTaskDetails: (e: boolean) => void
  setIsTaskError: (e: boolean) => void
  taskId: number
}

const DataDetails: React.FC<IProps> = ({ isTaskDetails, setIsTaskDetails, setIsTaskError, taskId, resetGetList }) => {
  const detail = useMutation(getDetailInfo)
  const suspend = useMutation(updateStatus, {
    onSuccess: (res) => {
      if (res.code === 0) {
        message.success('中止成功')
        setIsTaskDetails(false)
        resetGetList()
      }
    }
  })

  useEffect(() => {
    detail.mutate(taskId)
  }, [])

  const _renderFooter = () => {
    const { jobStatus } = detail?.data?.data || {}
    if (jobStatus === 6) {
      return (
        <Button className={'bg-warning text-white border-0'} onClick={() => setIsTaskError(true)}>
          异常查看
        </Button>
      )
    }
    if (jobStatus === 2) {
      return (
        <Button type="primary" danger loading={suspend.isLoading} onClick={() => suspend.mutate({ id: taskId, jobStatus: 5 })}>
          手动中止
        </Button>
      )
    }
    return false
  }

  return (
    <NewModal
      title={`${detail?.data?.data?.jobName}-作业详情`}
      open={isTaskDetails}
      onOk={() => setIsTaskDetails(false)}
      centered
      onCancel={() => setIsTaskDetails(false)}
      footer={_renderFooter()}
    >
      <Spin className={'pb-3'} spinning={detail.isLoading}>
        <Descriptions title="基本信息" column={1} labelStyle={{ width: '134px', textAlign: 'right', display: 'inline-block', paddingRight: '6px' }}>
          <Descriptions.Item label="作业名称">{detail?.data?.data?.jobName || '-'}</Descriptions.Item>
          <Descriptions.Item label="数据源对象">{detail?.data?.data?.dataSourceName}</Descriptions.Item>
          <Descriptions.Item label="执行策略">
            {strategy[findIndex(strategy, { value: detail?.data?.data?.executionStrategy })]?.label || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="分类分级模板">
            {detail?.data?.data?.ruleSetName ? detail?.data?.data?.ruleSetName + detail?.data?.data?.ruleSetVersion : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="识别规则集">
            {detail?.data?.data?.ruleSetName ? detail?.data?.data?.ruleSetName + detail?.data?.data?.ruleSetVersion : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="更新策略">
            {detail?.data?.data?.updateStrategy ? (detail?.data?.data?.updateStrategy == 1 ? '增量更新' : '全量更新') : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="抽样数据集大小">{detail?.data?.data?.dataSetSize || 0}条记录</Descriptions.Item>
          <Descriptions.Item label="执行进度">
            <Progress percent={detail?.data?.data?.executionProgress} />
          </Descriptions.Item>
          <Descriptions.Item label="最近执行时间">{detail?.data?.data?.startTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="完成时间">{detail?.data?.data?.endTime || '-'}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="其他信息" column={1} labelStyle={{ width: '134px', textAlign: 'right', display: 'inline-block', paddingRight: '6px' }}>
          <Descriptions.Item label="备注">{detail?.data?.data?.remark || '-'}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </NewModal>
  )
}
export default DataDetails
