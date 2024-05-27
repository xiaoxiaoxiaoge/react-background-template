import styled from 'styled-components'

export const WrapperRes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #fff;
  .action {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
    > span {
      color: #fff;
      vertical-align: middle;
    }
    svg {
      color: #fff;
    }
  }
  .ant-input-affix-wrapper-lg {
    border-radius: 2px;
  }
  .content_main {
    box-sizing: border-box;
    background-image: url('/img/primary/first_login_back.png');
    background-repeat: no-repeat;
    height: calc(100vh - 100px);
    .content {
      width: 860px;
      margin: auto;
      padding: 132px 0 67px;

      .form {
        padding: 0 236px;
      }
      h2 {
        font-weight: bold;
        font-size: 26px;
        text-align: center;
      }
      h3 {
        margin-top: 38px;
        margin-bottom: 34px;
        font-size: 18px;
        text-align: center;
      }
    }
  }
`
