import { getSourceList } from '@/services/dataassetJob/data-ledger'
import { createSort } from '@/utils/params'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { SortOrder } from 'antd/es/table/interface'
import { cloneDeep, findIndex } from 'lodash'

import React, { memo, useEffect, useRef, useState } from 'react'
import { sourceType } from '../config'
import useOffsetHeight from '@/hooks/useOffsetHeight'

import { Input } from 'antd'
const { Search } = Input

export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const waitTime = async (time = 100) => {
  await waitTimePromise(time)
}

type IProps = {
  checkedId: number
}

const ALForm: React.FC<IProps> = ({ checkedId }) => {
  const tableRef = useRef(null)
  const actionRef = useRef<ActionType>()
  const [searchValue, setSearchValue] = useState('')
  const { height } = useOffsetHeight(tableRef)

  const columns: ProColumns[] = [
    {
      title: '字段名称',
      key: 'columnName',
      dataIndex: ['tableObj', 'columnName'],
      ellipsis: true
    },
    {
      title: '字段描述',
      key: 'columnDesc',
      dataIndex: ['tableObj', 'columnDesc'],
      ellipsis: true
    },
    {
      title: '字段类型(包含长度)',
      key: 'columnType',
      dataIndex: ['tableObj', 'columnType']
    },
    {
      title: '所属表',
      key: 'belongTable',
      dataIndex: ['tableObj', 'belongTable']
    },
    {
      title: '所属库类型',
      key: 'sourceType',
      dataIndex: 'sourceType',
      render: (_, record) => {
        return <div>{sourceType[findIndex(sourceType, { value: record.sourceType })]?.label}</div>
      }
    },
    {
      title: '所属数据源',
      key: 'belongSource',
      dataIndex: 'belongSource'
    },
    {
      title: '所属系统',
      key: 'belongSystem',
      dataIndex: 'belongSystem'
    }
  ]

  useEffect(() => {
    setSearchValue('')
    actionRef.current?.reset?.()
  }, [checkedId])
  const getList = async (params: API.GetSourceListRequest, sort: Record<string, SortOrder>) => {
    let p = cloneDeep(params)
    p.sourceId = checkedId
    p.dataType = 'table'
    if (sort) {
      p = createSort(p, sort)
    }
    if (searchValue) {
      p.name = searchValue
    }
    const res = await getSourceList({
      ...p
    })
    return {
      data: res.data.items,
      total: res.data.totalCount,
      success: true
    }
  }
  const onSearch = () => {
    actionRef.current?.reset?.()
  }
  const onChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchValue(e.target.value)
  }
  return (
    <div ref={tableRef}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={getList}
        editable={{
          type: 'multiple'
        }}
        rowKey="tableId"
        search={false}
        headerTitle={<Search placeholder="请输入字段名称" value={searchValue} onChange={onChange} onSearch={onSearch} style={{ width: 200 }} />}
        scroll={{ x: 1300, y: height - 207 }}
        // options={false}
        pagination={{
          defaultPageSize: 10
        }}
        dateFormatter="string"
      />
    </div>
  )
}

export default memo(ALForm)
