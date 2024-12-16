module.exports = {
  extends: "@it-incubator/stylelint-config",
    rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['tailwind']
      }
    ],
    'scss/double-slash-comment-whitespace-inside': 'never'
  }
};
