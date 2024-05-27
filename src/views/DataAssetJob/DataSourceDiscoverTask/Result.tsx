import { ActionType, PageContainer, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components'
import { message, Popconfirm } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { getDiscoverTaskResultList, deleteDiscoverTaskResult, getAllDiscoverTaskList } from '@/services/datasource/discoverTask'
import { createSort } from '@/utils/params'
import DataSourceForm from '../DataSource/Form'
import TableButton from '@/components/NewButton'
import { getDataSourceTypes } from '@/services/datasource/api'

interface IProps {
  taskId?: number
  setTaskId?: (id: number | undefined) => void
  currentActiveKey: string
}

const DataSourceDiscoverTaskResult: React.FC<IProps> = ({ taskId, setTaskId, currentActiveKey }) => {
  const actionRef = useRef<ActionType>()
  const ref = useRef<ProFormInstance>()
  const [formModal, setFormModal] = useState(false)
  const [record, setRecord] = useState({} as API.DiscoverTaskResult)
  useEffect(() => {
    if (taskId) {
      ref.current?.setFieldsValue({ taskId })
      actionRef.current?.reload()
    }
  }, [taskId, currentActiveKey])

  const columns: ProColumns<API.DiscoverTaskResult>[] = [
    {
      dataIndex: 'dataSourceName',
      title: '数据源名称'
    },
    {
      dataIndex: 'dataSourceType',
      title: '数据源类型',
      valueType: 'select',
      request: async () => {
        const res = await getDataSourceTypes()
        if (res.code === 0) {
          const { data } = res
          data.push({
            label: '未知',
            value: 0,
            type: 1
          })
          return data
        }
        return []
      }
    },
    {
      dataIndex: 'ip',
      title: 'IP地址',
      hideInSearch: true
    },
    {
      dataIndex: 'port',
      title: '端口',
      hideInSearch: true
    },
    {
      dataIndex: 'taskId',
      title: '关联任务',
      valueType: 'select',
      request: async () => {
        const res = await getAllDiscoverTaskList()
        if (res.code === 0 && res.data.length > 0) {
          return res.data.map((item) => ({
            label: item.taskName,
            value: item.id
          }))
        }
        return []
      },
      fieldProps: {
        onClear: () => setTaskId && setTaskId(undefined)
      }
    },
    {
      dataIndex: 'status',
      title: '状态',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '已添加',
          status: 'Success'
        },
        2: {
          text: '未添加',
          status: 'Default'
        }
      }
    },

    {
      dataIndex: 'createTime',
      title: '发现时间',
      hideInSearch: true,
      valueType: 'dateTime',
      sorter: true
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (_: unknown, record) => [
        <TableButton
          key="result"
          onClick={() => {
            setRecord(record)
            setFormModal(true)
          }}
        >
          添加源
        </TableButton>,
        <Popconfirm
          key="delete"
          title="删除数据源发现结果"
          description="删除发现结果不影响已经添加的数据源！"
          onConfirm={() => onDelete(record.id)}
          okText="确认"
          cancelText="取消"
        >
          <TableButton key="delete" className="p-0 m-0">
            删除
          </TableButton>
        </Popconfirm>
      ]
    }
  ]

  const mDel = useMutation(deleteDiscoverTaskResult, {
    async onSuccess({ code }) {
      if (code === 0) {
        message.success('删除成功')
        actionRef.current?.reload()
      }
    }
  })
  const getList = async (params: API.DiscoverTaskResultListRequest, sort?: Record<string, any>) => {
    if (sort) {
      params = createSort(params, sort)
    }
    if (taskId) {
      params.taskId = taskId
    }
    if (params.dataSourceType === 0) {
      params.dataSourceType = -1
    }
    const res = await getDiscoverTaskResultList(params)
    return {
      data: res.data.items,
      success: true,
      total: res.data.totalCount
    }
  }

  const onDelete = async (id: number) => {
    if (id) {
      mDel.mutate({ id })
    } else {
      message.error('请选择需要删除的数据源发现结果')
    }
  }
  return (
    <PageContainer>
      <ProTable<API.DiscoverTaskResult, API.DiscoverTaskResultListRequest>
        columns={columns}
        headerTitle={false}
        rowKey={'id'}
        formRef={ref}
        actionRef={actionRef}
        request={getList}
        tableAlertRender={false}
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 10
        }}
        onReset={() => setTaskId && setTaskId(undefined)}
      />
      {/* 添加数据源 */}
      <DataSourceForm
        record={record}
        open={formModal}
        setOpen={setFormModal}
        successCb={() => {
          actionRef.current?.reload()
        }}
      />
    </PageContainer>
  )
}

export default DataSourceDiscoverTaskResult
