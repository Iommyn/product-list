import axios from 'axios';
import axiosRetry from 'axios-retry';
import { baseURL } from '../utils/constants';
import { createAuthData } from '../utils/helpers';

export const instance = axios.create({
  baseURL: baseURL,
  headers: { 'X-Auth': createAuthData() },
});

axiosRetry(instance, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: axiosRetry.isRetryableError,
});
