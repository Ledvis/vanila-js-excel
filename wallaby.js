module.exports = function(wallaby) {
  return {
    files: ['src/**/*.js'],
    tests: ['src/__tests__/**/*.test.js'],
    autoDetect: true,
    trace: true,
    runMode: 'onsave',
  };
};
