import axios from 'axios';
const baseUrl = 'http://localhost:7000/api';

export const register = (login, password) =>
  axios
    .post(baseUrl + '/user/registration', {
      email: login,
      password: password,
    })
    .catch((err) => console.error(err));

export const singin = (login, password) =>
  axios
    .post(baseUrl + '/user/login', {
      email: login,
      password: password,
    })
    .catch((err) => console.error(err));

export const check = (token) =>
  axios
    .get(baseUrl + '/user/auth', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.error(err));
