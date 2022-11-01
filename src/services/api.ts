import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://buzzvel-2022-test.herokuapp.com/users',
});
