import axios from 'axios';

const axiosInstanse = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getUsers = () => axiosInstanse.get('/users');
export const postUsers = (data) => axiosInstanse.post('/users', data);
export const deleteUsers = (id) => axiosInstanse.delete(`/users/${id}`);