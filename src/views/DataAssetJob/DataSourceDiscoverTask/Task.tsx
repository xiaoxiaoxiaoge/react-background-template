import { PlusOutlined } from '@ant-design/icons'
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import React, { useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { getDiscoverTaskList, deleteDiscoverTask } from '@/services/datasource/discoverTask'
import { createSort } from '@/utils/params'
import DataSourceDiscoverTaskForm from './Form'
import TableButton from '@/components/NewButton'
import { getKeyByValue } from '@/enums'
import { DiscoverTaskStrategyEnum, PeriodicExecTimeEnum } from '@/enums/datasourceEnum'

let selectedKeys: number[] = []

interface IProps {
  onViewResult: (id: number) => void
}

const DataSourceDiscoverTask: React.FC<IProps> = ({ onViewResult }) => {
  const actionRef = useRef<ActionType>()
  const [formModal, setFormModal] = useState(false)
  const [recordId, setRecordId] = useState(0)

  const columns: ProColumns<API.DiscoverTask>[] = [
    {
      dataIndex: 'taskName',
      title: '任务名称'
    },
    {
      dataIndex: 'ipSegment',
      title: '扫描范围',
      hideInSearch: true,
      ellipsis: true
    },
    {
      dataIndex: 'portSegment',
      title: '端口',
      hideInSearch: true,
      ellipsis: true
    },
    {
      dataIndex: 'execStrategy',
      title: '执行策略',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '立即执行'
        },
        2: {
          text: '定时执行'
        },
        3: {
          text: '周期执行'
        }
      },
      render: (_, { execStrategy, regularExecTime, periodicExecTime }) => {
        if (DiscoverTaskStrategyEnum['周期执行'] === execStrategy) {
          return <span>{getKeyByValue(PeriodicExecTimeEnum, periodicExecTime)}执行</span>
        } else if (DiscoverTaskStrategyEnum['定时执行'] === execStrategy) {
          return <span>在{regularExecTime}执行</span>
        }
        return <span>立即执行</span>
      }
    },
    {
      dataIndex: 'execStatus',
      title: '执行状态',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '等待执行',
          status: 'Default'
        },
        2: {
          text: '执行中',
          status: 'Processing'
        },
        3: {
          text: '执行成功',
          status: 'Success'
        },
        4: {
          text: '执行失败',
          status: 'Error'
        }
      }
    },
    {
      dataIndex: 'lastExecTime',
      title: '最近执行时间',
      hideInSearch: true
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      hideInSearch: true,
      valueType: 'dateTime',
      sorter: true
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 170,
      render: (_: unknown, record) => [
        <TableButton key="result" disabled={record.execStatus !== 3} onClick={() => onViewResult(record.id)}>
          查看结果
        </TableButton>,
        <TableButton
          key="editable"
          onClick={() => {
            setRecordId(record.id)
            setFormModal(true)
          }}
        >
          编辑
        </TableButton>,
        <Popconfirm
          key="pop"
          title="删除数据源发现任务"
          description={'发现结果同步删除，但不影响已经添加的数据源！'}
          onConfirm={() => onDelete([record.id])}
          okText="确认"
          cancelText="取消"
          disabled={record.execStatus === 2}
        >
          <TableButton disabled={record.execStatus === 2} key="delete" className="p-0 m-0">
            删除
          </TableButton>
        </Popconfirm>
      ]
    }
  ]

  const mDel = useMutation(deleteDiscoverTask, {
    async onSuccess({ code }) {
      if (code === 0) {
        message.success('删除成功')
        actionRef.current?.reload()
      }
    }
  })
  const getList = async (params: API.DiscoverTaskListRequest, sort?: Record<string, any>) => {
    if (sort) {
      params = createSort(params, sort)
    }
    if (params.execStrategy) {
      params.execStrategy = Number(params.execStrategy)
    }
    const res = await getDiscoverTaskList(params)
    return {
      data: res.data.items,
      success: true,
      total: res.data.totalCount
    }
  }

  const onDelete = async (ids: number[]) => {
    if (ids.length) {
      mDel.mutate({ ids })
    } else {
      message.error('请选择需要删除的数据源发现任务')
    }
  }
  return (
    <PageContainer>
      <ProTable<API.DiscoverTask, API.DiscoverTaskListRequest>
        columns={columns}
        headerTitle={false}
        rowKey={'id'}
        actionRef={actionRef}
        request={getList}
        rowSelection={{
          onChange(ids) {
            selectedKeys = (ids || []) as number[]
          },
          getCheckboxProps: (record) => {
            return {
              disabled: record.execStatus === 2
            }
          }
        }}
        pagination={{
          defaultPageSize: 10
        }}
        tableAlertRender={false}
        toolBarRender={() => [
          <Button
            key="add"
            icon={<PlusOutlined />}
            onClick={() => {
              setFormModal(true)
              setRecordId(0)
            }}
            type="primary"
          >
            新建任务
          </Button>,
          <Popconfirm
            key="delete"
            title="删除数据源发现任务"
            description="发现结果同步删除，但不影响已经添加的数据源！"
            onConfirm={() => onDelete(selectedKeys)}
            okText="确认"
            cancelText="取消"
          >
            <Button loading={mDel.isLoading}>删除</Button>
          </Popconfirm>
        ]}
        scroll={{ x: 1300 }}
      />
      {/* 创建/修改任务 */}
      <DataSourceDiscoverTaskForm
        id={recordId}
        open={formModal}
        setOpen={setFormModal}
        successCb={() => {
          actionRef.current?.reload()
        }}
      />
    </PageContainer>
  )
}

export default DataSourceDiscoverTask
