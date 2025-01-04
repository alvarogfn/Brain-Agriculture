const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', __dirname],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  modulePaths: [compilerOptions.baseUrl],
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  testRegex: '.*\\.test\\.tsx?$',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
