export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 30000,
  // Load .env.test before every test file
  globalSetup: './tests/globalSetup.js',
  // Force-close after tests finish
  // Needed because the MySQL connection pool stays open otherwise
  forceExit: true
}