module.exports = {
  extends: '@it-incubator/eslint-config',
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'perfectionist/sort-jsx-props': [
      'off',
    ]
  }
}