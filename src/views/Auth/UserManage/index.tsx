import React, { useRef, useState } from 'react'
import { Button, message, Modal, Switch } from 'antd'
import { createSort } from '@/utils/params'
import { cloneDeep } from 'lodash'
import { PlusOutlined } from '@ant-design/icons'
import { deleteUser, editStatus, getUserListPage } from '@/services/auth/user-manage'
import UmCreate from './UmCreate'
import UmModify from './UmModify'
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { getSession } from '@/utils/tool'
import { SortOrder } from 'antd/es/table/interface'
import TableButton from '@/components/NewButton'

const Account: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [selectedRows, setSelectedRows] = useState<API.GetUserListPageResponse[]>([])
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalMdOpen, setIsModalMdOpen] = useState(false)
  const [editList, setEditList] = useState<API.GetUserListPageResponse>()
  const resetList = () => {
    actionRef.current?.reload()
  }
  // const getAlertHeight = () => {
  //   let CHeight = document.querySelector('.ant-pro-table-alert')?.clientHeight
  //   setAlertHeight(CHeight ? CHeight + 10 : 0)
  // }
  // useEffect(() => {
  //   getAlertHeight()
  //   setAlertHeight(40)
  // }, [selectedRows])

  // useEffect(() => {
  //   window.addEventListener('resize', getAlertHeight)
  // }, [])

  const getList = async (params: API.GetUserListPageRequest, sort: Record<string, SortOrder>) => {
    let p = cloneDeep(params)
    if (sort) {
      p = createSort(p, sort)
    }

    const userIds = getSession('userId', '')
    p.userId = userIds
    const res = await getUserListPage(p)
    return {
      data: res.data.items,
      total: res.data.totalCount,
      success: true
    }
  }
  const edit = (e: API.GetUserListPageResponse) => {
    setEditList(e)
    setIsModalMdOpen(true)
  }

  /**
   * 删除
   */
  const handleRemove = () => {
    Modal.confirm({
      title: '删除',
      content: '确定删除勾选的用户吗？',
      onOk: async () => {
        const ids = selectedRows.map((item) => item.id)
        const { code } = await deleteUser({ ids })
        if (code === 0) {
          message.success('删除成功')
          setSelectedRows([])
          actionRef.current?.reloadAndRest?.()
        }
      }
    })
  }
  const handleChangeStatus = (e: API.GetUserListPageResponse) => {
    const params = {
      id: e.id,
      status: e.status == 0 ? 1 : 0
    }

    editStatus(params).then((res) => {
      if (res.code == 0) {
        actionRef.current?.reload()
      }
    })
  }

  const columns: ProColumns<API.GetUserListPageResponse>[] = [
    {
      title: '用户名',
      key: 'userName',
      dataIndex: 'userName',
      ellipsis: true
    },
    {
      title: '姓名',
      key: 'fullName',
      dataIndex: 'fullName',
      ellipsis: true
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      ellipsis: true
    },

    {
      title: '关联角色',
      key: 'roleName',
      dataIndex: 'roleName',
      ellipsis: true,
      search: false
    },
    {
      title: '使用期限',
      key: 'useTime',
      dataIndex: 'useTime',
      ellipsis: true,
      search: false,
      render: (_, record) => {
        return <div>{record.useTime == '1' ? '永久' : record.deadLine}</div>
      }
    },
    {
      title: '启用状态',
      key: 'status',
      dataIndex: 'status',
      ellipsis: true,
      search: false,
      render: (_, record) => {
        return <Switch checked={record.status == 1} onChange={() => handleChangeStatus(record)} />
      }
    },
    {
      title: '添加时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      sorter: true,
      hideInSearch: true,
      render: (text, record) => {
        return <span>{record.createTime || '-'}</span>
      }
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return [
          <TableButton key="modify" onClick={() => edit(record)}>
            {'编辑'}
          </TableButton>
        ]
      }
    }
  ]
  return (
    <PageContainer title={false}>
      <div>
        <ProTable<API.GetUserListPageResponse, API.GetUserListPageRequest>
          form={{ labelWrap: true }}
          headerTitle={'用户列表'}
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 80
          }}
          toolbar={{
            actions: [
              <Button key="new" type="primary" onClick={() => setIsModalAddOpen(true)}>
                <PlusOutlined />
                {'新建用户'}
              </Button>,
              selectedRows?.length > 0 && <Button onClick={() => handleRemove()}>{'删除'}</Button>
            ]
          }}
          pagination={{
            defaultPageSize: 10
          }}
          request={getList}
          columns={columns}
          rowSelection={{
            onChange: (_, rows) => {
              setSelectedRows(rows)
            }
          }}
          scroll={{ x: 1300 }}
        />

        <UmCreate isModalAddOpen={isModalAddOpen} setIsModalAddOpen={setIsModalAddOpen} resetList={resetList} />
        <UmModify isModalMdOpen={isModalMdOpen} setIsModalMdOpen={setIsModalMdOpen} resetList={resetList} editList={editList} />
      </div>
    </PageContainer>
  )
}

export default Account
