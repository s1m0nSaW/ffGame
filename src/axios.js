import axios from "axios";

const instance = axios.create({
    baseURL: 'https://financial-freedom-game.ru',
});

export default instance;