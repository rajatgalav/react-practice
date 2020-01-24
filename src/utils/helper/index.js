import { get, mapKeys, keys, forEach, includes, some } from 'lodash';

export const responseType = {
    success: 'success',
    subErrors: 'subErrors',
    error: 'error',
};

export function extractResponse(response, callback) {
    let type = '';
    let data;
      type = responseType.success;
      data = get(response, 'payload');
    // } else {
    //   type = responseType.error;
    //   data = get(response, 'error.data.error_message', 'Something went wrong.');
    // }
    if (callback) {
      callback(type, data);
    }
}

export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key) {
  return localStorage.getItem(key);
}