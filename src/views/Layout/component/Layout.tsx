import React from 'react'
import styled from 'styled-components'

const LayoutPage = (prop: { children: React.ReactNode }) => {
  return <Layout>{prop.children}</Layout>
}

const Layout = styled.div`
  display: flex;
  .ant-breadcrumb a:hover {
    /* background-color: transparent; */
  }
`

export default LayoutPage
