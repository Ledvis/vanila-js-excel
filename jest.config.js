module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: [
    '<rootDir>/src/__tests__/setup.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/core(.*)$': '<rootDir>/src/core/$1',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
};
