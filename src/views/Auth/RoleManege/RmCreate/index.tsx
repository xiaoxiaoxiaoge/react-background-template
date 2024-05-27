import React, { Key, useState } from 'react'
import { Button, Form, Input, message, Space, Tree } from 'antd'
import { useMount } from '@/hooks/useMount'
import './index.less'
import { addRole, getHalfMenuList } from '@/services/auth/role-manege'
import TextArea from 'antd/es/input/TextArea'
import { PageContainer } from '@ant-design/pro-components'
import { Menu, getExpandKeys, getMenuTreeByKey } from '../../menus'
import './index.less'
import { useMutation } from 'react-query'

const RoleCreate: React.FC = () => {
  const [form] = Form.useForm()
  const [treeData, setTreeData] = useState<Menu[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['F1-1'])
  const [expandKeys, setExpandKeys] = useState<Key[]>([])
  useMount(() => {
    form.setFieldsValue({
      menuCodeList: ['F1-1']
    })
  })

  const onCheck = (_keys_: Key[], e: { halfCheckedKeys?: Key[] }) => {
    setCheckedKeys(_keys_)
    let keys: Key[] = []
    if (e.halfCheckedKeys) {
      keys = [..._keys_, ...e.halfCheckedKeys]
    } else {
      keys = [..._keys_]
    }
    form.setFieldsValue({
      menuCodeList: keys
    })
  }
  const create = useMutation(addRole, {
    onSuccess: async (res) => {
      if (res.code === 0) {
        message.success('新建成功')
        history.go(-1)
      }
    }
  })

  const onFinish = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()
    create.mutateAsync(values)
  }

  const validRoleName = (_: unknown, val: string, cb: any) => {
    if (!val) {
      cb(new Error('角色名称不能为空'))
    } else if (!/^[^\s]*$/.test(val)) {
      cb(new Error('请输入40个字符以内的角色名'))
    } else if (val.length > 40 || val.length < 1) {
      cb(new Error('请输入40个字符以内的角色名'))
    } else {
      cb()
    }
  }

  // 展开收起
  const onExpand = (expandedKeys: Key[], e: { expanded: boolean; node: Menu }) => {
    if (!e.expanded) {
      const keys: Key[] = []
      expandedKeys.forEach((expendedKey: any) => {
        if (!expendedKey?.includes(e.node.key)) {
          keys.push(expendedKey)
        }
      })
      setExpandKeys(keys)
    } else {
      setExpandKeys(expandedKeys)
    }
  }

  useMount(async () => {
    const { code, data } = await getHalfMenuList()
    if (code === 0 && data?.length) {
      const trees = getMenuTreeByKey(data.map((item) => item.menuCode))
      setTreeData(trees)
      setExpandKeys(getExpandKeys(trees))
    }
  })

  return (
    <PageContainer className="role_create_wrapper" title={false}>
      <Form className="form_wrapper text-center" wrapperCol={{ md: 8, sm: 10, xs: 12 }} form={form} layout={'vertical'}>
        <div className=" font-bold text-base mb-4 text-left">基本信息</div>
        <Form.Item name="roleName" label={'角色名称'} required rules={[{ validator: validRoleName }]}>
          <Input placeholder={'请输入角色名称'} allowClear />
        </Form.Item>
        <Form.Item name="description" label={'描述'}>
          <TextArea showCount rows={4} placeholder="请输入描述" maxLength={200} />
        </Form.Item>
        <div className=" font-bold text-base mb-4 text-left">菜单权限</div>
        <Form.Item
          name="menuCodeList"
          label={'菜单权限'}
          required
          rules={[
            {
              required: true,
              message: '请选择菜单权限'
            }
          ]}
        >
          <Tree
            treeData={treeData}
            checkable
            defaultExpandAll
            onCheck={(keys, checkInfo) => onCheck(keys as Key[], checkInfo)}
            checkedKeys={checkedKeys}
            expandedKeys={expandKeys}
            onExpand={onExpand}
          />
        </Form.Item>
        <Space>
          <Button htmlType="button" className=" w-24" onClick={() => history.go(-1)}>
            {'取消'}
          </Button>
          <Button type="primary" className=" w-24" loading={create.isLoading} onClick={() => onFinish()}>
            {'确定'}
          </Button>
        </Space>
      </Form>
    </PageContainer>
  )
}

export default RoleCreate
