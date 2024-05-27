import { PageContainer } from '@ant-design/pro-components'
import { Empty, Tree, TreeProps } from 'antd'
import React, { Key, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { dataMenu } from '@/services/classify/classify-result'

import useOffsetHeight from '@/hooks/useOffsetHeight'
import { DownOutlined } from '@ant-design/icons'
import ALForm from './components/ALForm'
import ALLibrary from './components/ALLibrary'
import { getOverViewNoCache } from '@/services/dataassetJob/data-ledger'

const ClassifyResult: React.FC = () => {
  const leftRef = useRef(null)
  const treeRef = useRef(null)
  const { height } = useOffsetHeight(treeRef)
  const leftHeight = useOffsetHeight(leftRef)
  const [treeData, setTreeData] = useState<API.DataMenuResponse[]>([])

  // const [treeCheckedKey, setTreeCheckedKey] = useState<Key[]>([treeData[0].key])
  const [treeCheckedKey, setTreeCheckedKey] = useState<Key[]>([])
  const [switchTable, setSwitchTable] = useState(-1) // 1库 2表
  const [checkedId, setCheckedId] = useState(-1) // 选中项Id
  const [stateData, setStateData] = useState<API.ReportOverviewResponse>({
    dataSourceCount: 0,
    tableCount: 0,
    fieldCount: 0,
    fileCount: 0
  })

  useEffect(() => {
    getOverViewNoCache().then((res) => {
      if (res.code == 0) {
        setStateData(res.data)
      }
    })
  }, [])
  const restructureArray = (arr: API.DataMenuResponse[]) => {
    return arr.map((item) => {
      let { title } = item

      if (item.dataSourceTotalCount >= 0) {
        title = `${title} (${item.dataSourceTotalCount})`
      }

      if (item.tableTotalCount && item.tableTotalCount >= 0) {
        title += ` (${item.tableTotalCount})`
      }

      if (item.fieldTotalCount && item.fieldTotalCount >= 0) {
        title = (
          <div style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
            <span>
              {title}({item.fieldTotalCount})
            </span>
          </div>
        )
      }

      if (item.children) {
        item.children = restructureArray(item.children)
      }

      item.title = title
      return item
    })
  }
  const initTreeList = () => {
    dataMenu().then((res) => {
      if (res.code == 0) {
        const arr = restructureArray(res.data)
        setTreeData(arr)
        // setTreeCheckedKey(arr[0]?.key)
      }
    })
  }

  useEffect(() => {
    initTreeList()
  }, [])

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info: any) => {
    setTreeCheckedKey(selectedKeys)
    if (info.node.children) {
      setSwitchTable(-1)
      setSwitchTable(2)
    } else {
      setSwitchTable(-1)
      setSwitchTable(1)
    }
    if (info.node.dataSourceId) {
      setCheckedId(info.node.dataSourceId)
    } else if (info.node.tableId) {
      setCheckedId(info.node.tableId)
    } else {
      setSwitchTable(-1)
    }
  }

  return (
    <PageContainer>
      <CRHead>
        <div className="header_box  mr-6 ">
          <div className="hb_text">
            <div className="hbt_num">{stateData?.dataSourceCount ? stateData?.dataSourceCount : 0}</div>
            <div className="hbt_title">数据源总数</div>
          </div>
          <img src="/img/classify6.png" alt="" className="hb_pic hidden xl:block" />
        </div>
        <div className="header_box mr-6 ">
          <div className="hb_text">
            <div className="hbt_num">{stateData?.tableCount ? stateData?.tableCount : 0}</div>
            <div className="hbt_title">表总数</div>
          </div>
          <img src="/img/classify7.png" alt="" className="hb_pic hidden xl:block" />
        </div>
        <div className="header_box mr-6 ">
          <div className="hb_text">
            <div className="hbt_num">{stateData?.fieldCount ? stateData?.fieldCount : 0}</div>
            <div className="hbt_title">字段总数</div>
          </div>
          <img src="/img/classify1.png" alt="" className="hb_pic hidden xl:block" />
        </div>
        <div className="header_box ">
          <div className="hb_text">
            <div className="hbt_num">{stateData?.fileCount ? stateData?.fileCount : 0}</div>
            <div className="hbt_title">文件总数</div>
          </div>
          <img src="/img/classify8.png" alt="" className="hb_pic hidden xl:block" />
        </div>
      </CRHead>

      <CRMain>
        <div className=" flex">
          <div className="cr_left w-[300px]" id="cr_left" ref={leftRef} style={{ height: `${leftHeight.height - 40}px` }}>
            <div className="crl_title" id="crl_title">
              数据资产目录
            </div>
            <div ref={treeRef} className="crl_tree">
              {treeData.length > 0 && (
                <Tree
                  // expandedKeys={treeCheckedKey}
                  switcherIcon={<DownOutlined />}
                  showLine
                  selectedKeys={treeCheckedKey}
                  onSelect={onSelect}
                  treeData={treeData}
                  defaultExpandedKeys={[treeData[0]?.key]}
                  virtual
                  height={height - 40}
                />
              )}
              {treeData.length <= 0 && <Empty description={'暂无数据资产'} />}
            </div>
          </div>
          <div className="cr_right" style={{ width: 'calc(100% - 305px)', marginLeft: '5px' }}>
            {switchTable !== 1 && switchTable !== 2 && (
              <Empty className={'mt-10'} imageStyle={{ height: '160px' }} description={<div>请点击数据源或数据源表</div>} />
            )}
            {switchTable == 1 && <ALForm checkedId={checkedId} />}
            {switchTable == 2 && <ALLibrary checkedId={checkedId} />}
          </div>
        </div>
      </CRMain>
    </PageContainer>
  )
}

export default ClassifyResult

const CRHead = styled.div`
  @apply w-full flex items-center justify-between;
  .header_box {
    @apply border-none flex items-center box-border justify-between flex-1  h-[121px]  bg-no-repeat bg-cover;
    background: url('/img/card_bg.png');
    padding: 20px 10px;
    border-radius: 5px;
    color: #4e4d4d;
    .hb_pic {
      @apply mr-14 h-[90px];
    }
    .hb_text {
      @apply ml-6 flex flex-col  font-bold;
      .hbt_num {
        font-size: 48px;
        letter-spacing: 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
      }
      .hbt_title {
        @apply mt-1;
        font-size: 14px;
        color: #7b7b7b;
      }
    }
  }
`

const CRMain = styled.div`
  @apply w-full;
  margin-top: 30px;
  .cr_left {
    @apply min-h-[599px];
    background-color: #fff;
    padding: 15px 15px 0;
    .crl_title {
      @apply w-full;
      font-size: 16px;
      margin-bottom: 15px;
    }
  }
  .cr_right {
    padding-left: 10px;
  }
`
