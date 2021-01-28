module.exports = {
  ...require('./jest-common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  setupFiles: ['<rootDir>/src/__tests__/setup.js'],
};
