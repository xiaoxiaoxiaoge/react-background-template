import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
import viteEslint from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'
const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-styled-windicss']
      }
    }),
    viteEslint({
      failOnError: false
    }),
    viteMockServe({
      mockPath: './mock', // mock目录地址 demo中创建的是mock
      localEnabled: isDev, // 是否在开发环境中启用
      prodEnabled: !isDev, // 是否在生产环境中启用
      supportTs: true, // 是否支持TS
      watchFiles: true
    })
  ],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: 'always',
        globalVars: {
          HeaderHeight: '48px',
          HeaderColor: 'red'
        }
      }
    }
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      // '/api/v1/system': {
      //   target: 'http://localhost:8001'
      // },
      // '/api/v1/datasource': {
      //   target: 'http://localhost:8001'
      // },
      // '/jian': {
      //   target: 'http://192.168.6.156:8003/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/jian/, '')
      // },
      '/api': {
        target: 'http://192.168.1.83'
        // target: 'http://192.168.1.207'
      },
      '/mock': {
        target: 'https://yapi.gwlocal.work',
        changeOrigin: true
      }
    }
  }
})
