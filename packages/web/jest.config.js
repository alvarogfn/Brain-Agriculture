/* eslint-disable unicorn/prefer-module */
const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: '../coverage',
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [compilerOptions.baseUrl],
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testEnvironment: 'jsdom',
  testRegex: String.raw`.*\.test\.tsx?$`,
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
