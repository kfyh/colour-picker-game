/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
};
