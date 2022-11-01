import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://buzzvel-api.herokuapp.com',
});
