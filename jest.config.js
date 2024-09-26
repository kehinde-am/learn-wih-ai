module.exports = {
    testEnvironment: 'jest-environment-jsdom', 
    moduleNameMapper: {
      
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Runs before each test file
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], 
    moduleDirectories: ['node_modules', '<rootDir>/'], 
  };
  