const { getESLintConfig } = require('@applint/spec')

// https://www.npmjs.com/package/@applint/spec
module.exports = getESLintConfig('react-ts', {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint-config-prettier'],
  plugins: ['eslint-plugin-prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'id-length': ['error', { min: 1 }]
  },
  ignorePatterns: '/dist/*',
  settings: {
    react: {
      version: 'detect'
    }
  }
})
