/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['src/**'],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // An object that configures minimum threshold enforcement for coverage results
    coverageThreshold: { global: { lines: 80, statements: 80, branches: 80 } },

    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',

    // Automatically restore mock state and implementation before every test
    restoreMocks: true,

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/tests/**/?(*.)+(test).ts'],
};

export default config;
