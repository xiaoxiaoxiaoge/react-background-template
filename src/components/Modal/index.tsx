import { Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import type { ModalProps } from 'antd/lib'

type IProps = ModalProps

const NewModal: React.FC<IProps> = ({ className, children, ...rest }) => {
  return (
    <ModalBox className={className}>
      <Modal className="modalSet" {...rest}>
        {children}
      </Modal>
    </ModalBox>
  )
}

export default NewModal

const ModalBox = styled.div`
  .modalSet {
    .ant-modal-content {
      @apply p-0;
    }
    .ant-modal-body {
      @apply px-6 pt-4 pb-4;
    }
    .ant-modal-header {
      @apply px-6 py-3;
      border-bottom: 1px solid #f0f0f0;
    }
    .ant-modal-title {
      @apply decoration-[#333];
    }
    .ant-modal-footer {
      @apply px-6 py-3;
      border-top: 1px solid #f0f0f0;
    }
  }
`
