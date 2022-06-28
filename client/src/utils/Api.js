import axios from 'axios';
const baseUrl = 'http://localhost:7000/api';

export const getAllScores = () => {
  return axios.get(baseUrl + '/user/scores').catch((err) => console.error(err));
};

export const getUserInfoById = (id) =>
  axios.get(`${baseUrl}/user/${id}`).catch((err) => console.error(err));
