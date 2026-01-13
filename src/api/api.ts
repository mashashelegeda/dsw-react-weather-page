import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5', // <- прямо здесь
});

api.interceptors.request.use((config) => {
    config.params = {
        ...(config.params || {}),
        appid: 'be0ebe43cad14307de07690772996a84', // твой ключ
    };
    return config;
});

export default api;
