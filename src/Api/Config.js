import axios from 'axios';

const LOCALHOST = 'http://127.0.0.1:8000/';
const RENDER_URL = 'https://squarespace.onrender.com';

const defaultAxiosOptions = {
    baseURL: LOCALHOST
};

export default fetch = axios.create(defaultAxiosOptions);