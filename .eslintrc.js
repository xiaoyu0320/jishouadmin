module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    eqeqeq: 0,
    'space-before-function-paren': 0,
    'template-curly-spacing': [2, 'always']
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['vue']
}
