import React, { Key, useState } from 'react'
import { Button, Form, Input, message, Space, Tree } from 'antd'
import { intersection } from 'lodash'

import { useMount } from '@/hooks/useMount'
import './index.less'
import { useLocation } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import { getHalfMenuList, getRoleMenuByRoleId, updateRole } from '@/services/auth/role-manege'
import { PageContainer } from '@ant-design/pro-components'
import { Menu, getExpandKeys, getMenuRelationShip, getMenuTreeByKey } from '../../menus'
import { useMutation } from 'react-query'

const RoleModify: React.FC = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const [treeData, setTreeData] = useState<Menu[]>([])
  const [expandKeys, setExpandKeys] = useState<Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  useMount(async () => {
    const { code, data } = await getHalfMenuList()
    if (code === 0 && data?.length) {
      const trees = getMenuTreeByKey(data.map((item) => item.menuCode))
      setTreeData(trees)
      setExpandKeys(getExpandKeys(trees))
    }
  })

  useMount(async () => {
    const res = await getRoleMenuByRoleId({
      id: Number(location.search.split('=')[1])
    })
    if (res.code === 0 && res.data) {
      const { roleName, description, menuCodes } = res.data
      const menuMap = getMenuRelationShip()
      const menuKeyList: Key[] = []
      menuCodes.forEach((key) => {
        const values = menuMap.get(key)
        if (values.length > 0) {
          let len = 0
          values.forEach((val: Menu) => {
            const v = menuMap.get(val)
            if (v.length) {
              len += v.length
            } else {
              len += 1
            }
          })
          if (intersection(menuCodes, values).length === len) {
            menuKeyList.push(key)
          }
        } else {
          menuKeyList.push(key)
        }
      })
      setCheckedKeys(menuKeyList)
      form.setFieldsValue({
        roleName: roleName,
        description: description,
        menuCodeList: menuKeyList
      })
    }
  })

  // 展开收起
  const onExpand = (expandedKeys: Key[], e: { expanded: boolean; node: Menu }) => {
    if (!e.expanded) {
      const keys: string[] = []
      expandedKeys.forEach((expendedKey: any) => {
        if (!expendedKey.includes(e.node.key)) {
          keys.push(expendedKey)
        }
      })
      setExpandKeys(keys)
    } else {
      setExpandKeys(expandedKeys)
    }
  }

  const onCheck = (checkedKeysValue: any, e: { halfCheckedKeys?: Key[] }) => {
    setCheckedKeys(checkedKeysValue)
    let keys: Key[] = []
    if (e.halfCheckedKeys) {
      keys = [...checkedKeysValue, ...e.halfCheckedKeys]
    } else {
      keys = [...checkedKeysValue]
    }
    form.setFieldsValue({
      menuCodeList: keys
    })
  }
  const create = useMutation(updateRole, {
    onSuccess: async (res) => {
      if (res.code === 0) {
        message.success('修改成功')
        history.go(-1)
      }
    }
  })
  const onFinish = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()
    create.mutateAsync({
      roleId: location.search.split('=')[1],
      ...values
    })
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
  return (
    <PageContainer className="role_modify_wrapper" title={false}>
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
          label="角色权限"
          required
          rules={[
            {
              required: true,
              message: '请选择角色权限'
            }
          ]}
        >
          <Tree treeData={treeData} checkable defaultExpandAll onCheck={onCheck} checkedKeys={checkedKeys} expandedKeys={expandKeys} onExpand={onExpand} />
        </Form.Item>
        <Space>
          <Button htmlType="button" className=" w-24" onClick={() => history.go(-1)}>
            {'返回'}
          </Button>
          <Button type="primary" className=" w-24" loading={create.isLoading} onClick={() => onFinish()}>
            {'确定'}
          </Button>
        </Space>
      </Form>
    </PageContainer>
  )
}

export default RoleModify
