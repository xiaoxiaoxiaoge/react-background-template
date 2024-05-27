import { PlusOutlined } from '@ant-design/icons'
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import React, { useRef, useState, Key } from 'react'
import { useMutation } from 'react-query'
import { deleteDataSource, getDataSourceList, getDataSourceTypes } from '@/services/datasource/api'
import { createSort } from '@/utils/params'
import DataSourceForm from './Form'
import TableButton from '@/components/NewButton'
import { getAllSystem } from '@/services/system/api'
import { defaultColumnsState } from './column'

let selectedKeys: Key[] = []
const DataSource: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(defaultColumnsState)
  const [formModal, setFormModal] = useState(false)
  const [recordId, setRecordId] = useState(0)

  const columns: ProColumns<API.DataSourceRecord>[] = [
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
          return res.data
        }
        return []
      }
    },
    {
      dataIndex: 'systemName',
      title: '系统名称',
      valueType: 'select',
      request: async () => {
        const res = await getAllSystem()
        if (res.code === 0) {
          return res.data.map((item) => {
            return {
              label: item.systemName,
              value: item.systemName
            }
          })
        }
        return []
      }
    },
    {
      dataIndex: 'desc',
      title: '主机端口',
      hideInSearch: true,
      width: 150,
      render: (_, record) => {
        return (
          <span>
            {record.host}:{record.port}
          </span>
        )
      }
    },
    {
      dataIndex: 'managerName',
      title: '负责人',
      hideInSearch: true
    },
    {
      dataIndex: 'managerDept',
      title: '部门',
      hideInSearch: true
    },
    {
      dataIndex: 'managerJob',
      title: '职位',
      hideInSearch: true
    },
    {
      dataIndex: 'managerPhone',
      title: '联系方式',
      hideInSearch: true
    },
    // {
    //   dataIndex: 'desc',
    //   title: '简要信息',
    //   hideInSearch: true,
    //   render: (_, record) => {
    //     return (
    //       <span>
    //         连接地址：{record.host}；端口：{record.port}；用户名：{record.username}
    //       </span>
    //     )
    //   }
    // },
    {
      dataIndex: 'status',
      title: '连接状态',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: {
          text: '连接成功',
          status: 'Success'
        },
        2: {
          text: '连接失败',
          status: 'Error'
        }
      }
    },
    {
      dataIndex: 'createTime',
      title: '添加时间',
      hideInSearch: true,
      valueType: 'dateTime',
      sorter: true
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 100,
      render: (_: unknown, record) => [
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
          title="删除数据源"
          description={`确定要删除数据源${record.dataSourceName}吗? 一旦删除，不可恢复，请谨慎操作！`}
          onConfirm={() => onDelete([record.id])}
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

  const mDel = useMutation(deleteDataSource, {
    async onSuccess({ code }) {
      if (code === 0) {
        message.success('删除成功')
        actionRef.current?.reload()
      }
    }
  })
  const getList = async (params: API.DataSourceRequest, sort?: Record<string, any>) => {
    if (sort) {
      params = createSort(params, sort)
    }
    if (params.dataSourceType) {
      params.dataSourceType = Number(params.dataSourceType)
    }
    const res = await getDataSourceList(params)
    return {
      data: res.data.items,
      success: true,
      total: res.data.totalCount
    }
  }

  const onDelete = async (ids: Key[]) => {
    if (ids.length) {
      mDel.mutate(ids)
    } else {
      message.error('请选择需要删除的数据源')
    }
  }
  return (
    <PageContainer>
      <ProTable<API.DataSourceRecord, API.DataSourceRequest>
        columns={columns}
        columnsState={{ value: columnsStateMap, onChange: setColumnsStateMap }}
        headerTitle={'数据源列表'}
        rowKey={'id'}
        actionRef={actionRef}
        request={getList}
        rowSelection={{
          onChange(ids) {
            selectedKeys = ids || []
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
            新增数据源
          </Button>,
          <Popconfirm
            key="delete"
            title="删除数据源"
            description="确认删除选中的数据源？一旦删除，不可恢复，请谨慎操作！"
            onConfirm={() => onDelete(selectedKeys)}
            okText="确认"
            cancelText="取消"
          >
            <Button loading={mDel.isLoading}>删除</Button>
          </Popconfirm>
        ]}
        scroll={{ x: 1300 }}
      />
      {/* 添加数据源 */}
      <DataSourceForm
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

export default DataSource
