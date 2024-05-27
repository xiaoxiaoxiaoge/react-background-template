import React, { useRef, useState } from 'react'
import { Button, message, Modal } from 'antd'

import { createSort } from '@/utils/params'
import { cloneDeep } from 'lodash'
import { deleteRole, getRoleListPage } from '@/services/auth/role-manege'
import { useNavigate } from 'react-router-dom'
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { PlusOutlined } from '@ant-design/icons'
import { SortOrder } from 'antd/es/table/interface'
import TableButton from '@/components/NewButton'

const Role: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRows, setSelectedRows] = useState<API.GetRoleListPageResponse[]>([])
  const navigate = useNavigate()

  const getList = async (params: API.GetRoleListPageRequest, sort: Record<string, SortOrder>) => {
    let p = cloneDeep(params)
    if (sort) {
      p = createSort(p, sort)
    }
    const res = await getRoleListPage({
      ...p
    })
    return {
      data: res.data.items,
      total: res.data.totalCount,
      success: true
    }
  }

  const rowSelection = {
    getCheckboxProps: (record: { defaultRole: boolean }) => ({
      disabled: record.defaultRole
    })
  }
  /**
   * 删除
   */
  const handleRemove = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除选中的角色吗？',
      onOk: async () => {
        const ids = selectedRows.map((item) => item.id)
        const { code } = await deleteRole({ ids: ids })
        if (code === 0) {
          message.success('删除成功')
          setSelectedRows([])
          actionRef.current?.reloadAndRest?.()
        }
      }
    })
  }
  const columns: ProColumns<API.GetRoleListPageResponse>[] = [
    {
      title: '角色名称',
      key: 'roleName',
      dataIndex: 'roleName',
      ellipsis: true
    },
    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      search: false,
      ellipsis: true
    },
    {
      title: '关联用户',
      key: 'userName',
      dataIndex: 'userName',
      ellipsis: true,
      search: false
    },
    {
      title: '操作',
      key: 'option',
      width: 100,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return [
          <TableButton key="modify" disabled={record.defaultRole} onClick={() => navigate(`/auth/roleManege/modify?roleId=${record.id}`)}>
            {'编辑'}
          </TableButton>
        ]
      }
    }
  ]
  return (
    <PageContainer title={false}>
      <div>
        <ProTable<API.GetRoleListPageResponse, API.GetRoleListPageRequest>
          form={{ labelWrap: true }}
          headerTitle={'角色列表'}
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 80
          }}
          toolbar={{
            actions: [
              <Button key="new" type="primary" onClick={() => navigate('/auth/roleManege/create')}>
                <PlusOutlined />
                {'新建角色'}
              </Button>,
              selectedRows?.length > 0 && <Button onClick={() => handleRemove()}>{'删除'}</Button>
            ]
          }}
          pagination={{
            defaultPageSize: 10
          }}
          scroll={{ x: 1300 }}
          request={getList}
          columns={columns}
          rowSelection={{
            onChange: (_, rows) => {
              setSelectedRows(rows)
            },
            ...rowSelection
          }}
        />
      </div>
    </PageContainer>
  )
}

export default Role
