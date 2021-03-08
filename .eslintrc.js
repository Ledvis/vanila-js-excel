const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  env: {
    'es6': true,
    'browser': true,
    'node': true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // To use Google style in conjunction with ESLint's recommended rule set, extend them both, making sure to list google last
  extends: [
    'eslint:recommended',
    'google',
    'plugin:jest/recommended',
    // "eslint-config-prettier",
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
  },
  settings: { 'import/resolver': 'node' },
  overrides: [
    {
      files: ['src/**'],
      settings: { 'import/resolver': 'webpack' },
    },
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
    // {
    //  files: '**/*.+(ts|tsx)',
    //  parser: '@typescript-eslint/parser',
    //  parserOptions: {
    //    project: './tsconfig.json',
    //  },
    //  plugins: ['@typescript-eslint/eslint-plugin'],
    //  extends: [
    //    'plugin:@typescript-eslint/eslint-recommended',
    //    'plugin:@typescript-eslint/recommended',
    //    'eslint-config-prettier/@typescript-eslint',
    //  ],
    // },
  ],
};
