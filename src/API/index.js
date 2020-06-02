/**
 * Axios instance preset
 */
// Dependencies
import axios from 'axios';

// Settings
const protocol = 'http://';
const host = '127.0.0.1:3000';
const path = '/api/';
const timeout = 10000;
const API_KEY = 'secret_key';

// Vars
const Authorization = `Bearer ${API_KEY}`;
export const originalURL = `${protocol}${host}`;
export const baseURL = `${originalURL}${path}`;

const http = axios.create({
  baseURL,
  timeout,
  headers: {
    Authorization,
  },
  withCredentials: true,
});

export default http;
