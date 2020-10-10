import axios from 'axios';

const STAG_URL_HEROKU = 'https://orderbump.herokuapp.com/';
const LOCALHOST = 'http://127.0.0.1:8000/';
const RENDER_URL = 'https://salesjump.onrender.com/';

const defaultAxiosOptions = {
    baseURL: LOCALHOST
};

export default fetch = axios.create(defaultAxiosOptions);