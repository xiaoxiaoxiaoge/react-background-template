import { Tabs, TabsProps } from 'antd'
import DataSourceDiscoverTask from './Task'
import DataSourceDiscoverTaskResult from './Result'
import { useState } from 'react'

const DiscoverTask: React.FC = () => {
  const [currentActiveKey, setCurrentActiveKey] = useState('1')
  const [currentTask, setCurrentTask] = useState<undefined | number>(0)
  const onChange = (key: string) => {
    setCurrentActiveKey(key)
  }

  const onViewResult = (id: number) => {
    setCurrentActiveKey('2')
    setCurrentTask(id)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '发现任务',
      children: <DataSourceDiscoverTask onViewResult={onViewResult} />
    },
    {
      key: '2',
      label: '发现结果',
      children: <DataSourceDiscoverTaskResult taskId={currentTask} setTaskId={setCurrentTask} currentActiveKey={currentActiveKey} />
    }
  ]
  return (
    <div className="datasource-discover-task">
      <Tabs className="mx-10 bg-white" activeKey={currentActiveKey} items={items} onChange={onChange} />
    </div>
  )
}

export default DiscoverTask
