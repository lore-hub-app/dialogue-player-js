module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
};
