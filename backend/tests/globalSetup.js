// tests/globalSetup.js
// Runs once before all test files
// Loads .env.test so every test uses the right DB and credentials

import { config } from 'dotenv'

export default async function globalSetup() {
  config({ path: '.env.test' })
}