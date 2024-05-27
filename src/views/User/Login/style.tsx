import styled from 'styled-components'

export const Login = styled.div`
  @apply bg-center bg-no-repeat flex items-center justify-center;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #2d3356;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .login_box {
    width: 100%;
    height: 100%;
    .content_box {
      @apply flex items-center justify-center;
      width: 100%;
      height: 100%;
      .content {
        @apply flex;
        max-width: 1000px;
        max-height: 700px;
        background-color: #fff;
        .left_pic {
          display: block;
          width: 50%;
          min-width: 450px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right_form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 50%;
          min-width: 450px;
          padding: 24px 45px 0;
          background-color: #fff;
          box-sizing: border-box;
          .header {
            margin-bottom: 40px;
            .header_content {
              display: flex;
              align-items: center;
              justify-content: center;
              .logo {
                height: 30px;
                margin-right: 10px;
              }
              .title {
                width: 100%;
                color: rgba(0, 0, 0, 0.85);
                font-weight: 500;
                font-size: 24px;
                font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
                letter-spacing: 1px;
              }
            }
          }
          .form_content {
            .icon {
              margin-left: 16px;
              color: rgba(0, 0, 0, 0.2);
              font-size: 24px;
              vertical-align: middle;
              cursor: pointer;
              transition: color 0.3s;
            }

            .other {
              margin-top: 24px;
              line-height: 22px;
              text-align: left;
              .register {
                float: right;
              }
            }
            .ant-input-lg {
              border-radius: 0;
            }
            .ant-btn-lg {
              border-radius: 0;
            }

            .captche_code {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .footer {
    position: absolute;
    height: 32px;
    padding: 0 16px;
    color: #c5c5c5;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    background-color: transparent;
    bottom: 0;
    width: 100%;
    .version {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0 24px;
      text-align: right;
    }
  }
`
