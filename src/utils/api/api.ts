import axios from 'axios';

const currentUser = 'TEST';
const currentPassword = '123123123';

export const api = axios.create({
    baseURL: 'https://lv001.excellent.lv:7002/api/1',
    timeout: 5000,
    auth: {
        username: currentUser,
        password: currentPassword,
    },
});