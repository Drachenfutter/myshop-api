import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  silent: false,
  clearMocks: true,
  preset: 'ts-jest',
  collectCoverage: true,
  testTimeout: 6000,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts']
};

export default config;