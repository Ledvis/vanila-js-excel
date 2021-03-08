const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.css$': require.resolve('./style-mock.js'),
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/core(.*)$': '<rootDir>/src/core/$1',
  },
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-runner-eslint/watch-fix',
  ],
};
