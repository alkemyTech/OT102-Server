module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 13
  },
  rules: {
    'linebreak-style': 0,
    semi: [2, 'never'],
    'no-console': 'error',
    'prefer-const': 'error',
    'comma-dangle': [2, 'never'],
    'no-shadow': 'off'
  }
}
