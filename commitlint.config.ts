export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-empty': [2, 'always'],
    'footer-empty': [2, 'always'],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['web', 'core', 'server', 'types']],
  },
};
