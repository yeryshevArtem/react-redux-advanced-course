import axios from 'axios';
import {FETCH_USERS} from './types';

const ROOT_URL = 'https://jsonplaceholder.typicode.com';
export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}/users`);

  return {
    type: FETCH_USERS,
    payload: request
  };
}
