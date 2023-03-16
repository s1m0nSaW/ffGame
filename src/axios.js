import axios from "axios";

const URL1 = 'https://financial-freedom-game.ru'

const instance = axios.create({
    baseURL: URL1,
});

export default instance;