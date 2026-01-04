module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
 
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};