import dotenv from 'dotenv';
import path from 'path';
import usersData from '../data/users.json';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const Config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  headless: process.env.HEADLESS?.trim().toLowerCase() === 'false' ? false : true,
  browser: process.env.BROWSER || 'chromium',
  slowMo: Number(process.env.SLOW_MO) || 0,
  
  // keep sensitive credentials safe in env vars
  users: {
    standard: {
      username: process.env.STANDARD_USER || usersData.standardUser.username,
      password: process.env.STANDARD_PASSWORD || '', // pulled pass straight from .env
    },
    lockedOut: {
      username: process.env.LOCKED_USER || usersData.lockedOutUser.username,
      password: process.env.STANDARD_PASSWORD || '',
    },
  },
};
