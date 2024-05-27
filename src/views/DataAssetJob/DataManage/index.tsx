import React, { useEffect, useRef, useState } from 'react'
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, message, Modal, Progress } from 'antd'
import DataCreate from './DataCreate'
import DataDetails from './DataDetails/index'
import { deletejob, getJobList } from '@/services/dataassetJob/data-manage'
import { cloneDeep, findIndex } from 'lodash'
import { createSort } from '@/utils/params'
import DataError from './DataError'
import { getUsedInfo } from '@/services/auth/rule-config'
import { FormInstance } from 'antd/lib/form'
import { datasourceOptions } from '@/services/datasource/api'
import { SortOrder } from 'antd/es/table/interface'
import { PlusOutlined } from '@ant-design/icons'
import DataEdit from './DataEdit'
import { dataStatus } from './config'
import type { ProColumns } from '@ant-design/pro-components'
import TableButton from '@/components/NewButton'

import './index.less'
import { useMutation } from 'react-query'
import { getModuleList } from '@/services/classify/tem-classify'

const DataMannage: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [activeKey, setActiveKey] = useState('0')
  const [isClassifyJob, setIsClassifyJob] = useState(false)
  const [isTaskEdit, setIsTaskEdit] = useState(false)
  const [isTaskDetails, setIsTaskDetails] = useState(false)
  const [isTaskError, setIsTaskError] = useState(false)
  const [taskId, setTaskId] = useState(0)
  const [dataTotal, setDataTotal] = useState<JobData<API.GetJobListResponse[]>>()
  const [dsOptions, setDSOptions] = useState<API.DatasourceOptionsResponse[]>([])
  const [tempOptions, setTempDSOptions] = useState<API.ModuleListResponse[]>([])
  const [newestRuleInfo, setNewestRuleInfo] = useState({} as API.GetUsedInfoResponse) // 最新规则集
  const [polling, setPolling] = useState<number | undefined>(undefined)
  const resetGetList = () => {
    actionRef.current?.reload()
  }
  const list = useMutation(getModuleList, {
    onSuccess: (res) => {
      if (res.code == 0) {
        const arr = res.data
        const ser: API.ModuleListResponse[] = []
        arr.forEach((el) => {
          ser.push(el)
        })
        setTempDSOptions(ser)
      }
    }
  })

  // 作业对象
  useEffect(() => {
    if (isClassifyJob || isTaskEdit) {
      datasourceOptions().then((res) => {
        if (res.code == 0) {
          setDSOptions(res.data)
        }
      })
      list.mutate()
    }
  }, [isClassifyJob, isTaskEdit])
  // 规则集
  useEffect(() => {
    getUsedInfo().then((res) => {
      if (res.code == 0) {
        // setSession('rules', res.data)
        setNewestRuleInfo(res.data)
      }
    })
  }, [])

  const getList = async (params: API.GetJobListRequest, sort: Record<string, SortOrder>) => {
    let p = cloneDeep(params)

    if (Number(activeKey) > 0) {
      if (activeKey == '2') {
        p.jobStatus = [1, 2]
      } else {
        p.jobStatus = [Number(activeKey)]
      }
    }

    if (sort) {
      p = createSort(p, sort)
    }
    const res = await getJobList({
      ...p
    })
    if (findIndex(res.data.items, ['jobStatus', 3]) >= 0) {
      setPolling(2000)
    } else {
      setPolling(undefined)
    }

    setDataTotal(res.data)
    return {
      data: res.data.items,
      total: res.data.totalCount,
      success: true
    }
  }
  const changeActiveKey = (key: string) => {
    setActiveKey(key)
    actionRef.current?.reload()
  }

  const taskDetails = (id: number) => {
    setTaskId(id)
    setIsTaskDetails(true)
  }
  const taskEdit = (id: number) => {
    setTaskId(id)
    setIsTaskEdit(true)
  }
  const taskDel = (val: { id: number; jobName: string }) => {
    Modal.confirm({
      title: '删除',
      content: `确定要删除任务“${val.jobName}”吗？一旦删除，不可恢复，请谨慎操作！`,
      onOk: async () => {
        const ids = [val.id]
        const { code } = await deletejob({ ids })
        if (code === 0) {
          message.success('删除成功')
          actionRef.current?.reload()
        }
      }
    })
  }
  const columns: ProColumns<API.GetJobListResponse>[] = [
    {
      title: '作业名称',
      key: 'jobName',
      // sorter: true,
      dataIndex: 'jobName',
      ellipsis: true
    },
    {
      title: '数据源名称',
      key: 'dataSourceName',
      dataIndex: 'dataSourceName',
      ellipsis: true
    },
    {
      title: '规则集',
      key: 'ruleSetName',
      dataIndex: 'ruleSetName',
      search: false,
      render: (_, record) => {
        return <div>{record.ruleSetName + record.ruleSetVersion}</div>
      }
    },
    {
      title: '分类分级作业',
      key: 'dataSourceName',
      dataIndex: 'dataSourceName',
      ellipsis: true
    },
    {
      title: '执行策略',
      key: 'executionStrategy',
      dataIndex: 'executionStrategy',
      search: false,
      render: (_, record) => {
        return (
          <div>
            {/* {record.executionStrategy === 1 && <div style={{ color: '#52C41A' }}>即时执行</div>} */}
            {record.executionStrategy === 2 && <div style={{ color: '#1859b5' }}>定时执行</div>}
            {record.executionStrategy === 3 && <div>周期执行</div>}
          </div>
        )
      }
    },

    {
      title: '执行进度',
      key: 'executionProgress',
      dataIndex: 'executionProgress',
      search: false,
      render: (_, record) => {
        return <Progress style={{ width: '80%' }} percent={record.executionProgress} />
      }
    },
    {
      title: '执行次数',
      key: 'runCount',
      dataIndex: 'runCount',
      ellipsis: true,
      search: false
    },

    {
      title: '状态',
      key: 'jobStatus',
      dataIndex: 'jobStatus',
      search: false,
      render: (_, record) => {
        return <div>{dataStatus[findIndex(dataStatus, { value: record.jobStatus })]?.label}</div>
      }
    },
    {
      title: '下次执行时间',
      key: 'nextRunTime',
      dataIndex: 'nextRunTime',
      sorter: true,
      hideInSearch: true,
      width: 150
    },
    {
      title: '最近执行时间',
      key: 'startTime',
      dataIndex: 'startTime',
      sorter: true,
      hideInSearch: true,
      width: 150
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      sorter: true,
      hideInSearch: true
    },
    {
      title: '完成时间',
      key: 'endTime',
      dataIndex: 'endTime',
      sorter: true,
      hideInSearch: true
    },
    // jobStatus 1.未启动-仅保存；2.未启动；3执行中；4.已完成；5.手动终止；6.异常中断；
    {
      title: '操作',
      key: 'option',
      width: 130,
      fixed: 'right',
      valueType: 'option',
      render: (_, record) => [
        <TableButton key="detail" onClick={() => taskDetails(record.id)}>
          详情
        </TableButton>,
        <TableButton key="edit" disabled={record.jobStatus == 3} onClick={() => taskEdit(record.id)}>
          编辑
        </TableButton>,
        // (record.jobStatus == 1 || record.jobStatus == 2) && (
        <TableButton key="delete" disabled={record.jobStatus === 3} onClick={() => taskDel(record)}>
          删除
        </TableButton>
        // )
      ]
    }
  ]

  const renderBadge = (count: number | undefined) => {
    return <span>（{count}）</span>
  }
  const addJob = () => {
    setIsClassifyJob(true)
  }
  const reset = (form: FormInstance<any> | undefined) => {
    form?.resetFields()
    form?.submit()
    setActiveKey('0')
  }

  return (
    <PageContainer>
      <ProTable<API.GetJobListResponse, API.GetJobListRequest>
        actionRef={actionRef}
        columns={columns}
        request={getList}
        polling={polling}
        search={{
          optionRender: (_, { form }) => [
            <Button key="reset" onClick={() => reset(form)}>
              重置
            </Button>,
            <Button key="search" type="primary" onClick={() => form?.submit()}>
              查询
            </Button>,
            <Button key="new" type="primary" onClick={addJob}>
              <PlusOutlined />
              新建作业
            </Button>
          ]
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: '0',
                label: <span>全部{renderBadge(dataTotal?.allCount)}</span>
              },
              {
                key: '2',
                label: (
                  <span>
                    未启动
                    {renderBadge(dataTotal?.notStartCount)}
                  </span>
                )
              },
              {
                key: '3',
                label: (
                  <span>
                    执行中
                    {renderBadge(dataTotal?.underExecutionCount)}
                  </span>
                )
              },
              {
                key: '4',
                label: (
                  <span>
                    已完成
                    {renderBadge(dataTotal?.completedCount)}
                  </span>
                )
              },
              {
                key: '5',
                label: (
                  <span>
                    手动中止
                    {renderBadge(dataTotal?.manualAbortCount)}
                  </span>
                )
              },
              {
                key: '6',
                label: (
                  <span>
                    异常中断
                    {renderBadge(dataTotal?.abortCount)}
                  </span>
                )
              }
            ],
            onChange: (key) => {
              changeActiveKey(key as string)
            }
          }
        }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10
        }}
        scroll={{ x: 1300 }}
        dateFormatter="string"
      />
      {isClassifyJob && (
        <DataCreate
          isClassifyJob={isClassifyJob}
          setIsClassifyJob={setIsClassifyJob}
          dsOptions={dsOptions}
          resetGetList={resetGetList}
          newestRuleInfo={newestRuleInfo}
          tempOptions={tempOptions}
        />
      )}
      {isTaskEdit && (
        <DataEdit
          isTaskEdit={isTaskEdit}
          setIsTaskEdit={setIsTaskEdit}
          resetGetList={resetGetList}
          taskId={taskId}
          newestRuleInfo={newestRuleInfo}
          tempOptions={tempOptions}
        />
      )}
      {isTaskDetails && (
        <DataDetails
          resetGetList={resetGetList}
          isTaskDetails={isTaskDetails}
          setIsTaskDetails={setIsTaskDetails}
          setIsTaskError={setIsTaskError}
          taskId={taskId}
        />
      )}
      {isTaskError && <DataError isTaskError={isTaskError} setIsTaskError={setIsTaskError} taskId={taskId} />}
    </PageContainer>
  )
}

export default DataMannage
