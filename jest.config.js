module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|tinycolor2)/)',
  ],
  collectCoverageFrom: ['src/**/*.js', '!src/**/__tests__/**'],
};
