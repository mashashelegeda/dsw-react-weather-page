import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
    if (config.url) {
        const separator = config.url.includes('?') ? '&' : '?';
        config.url = config.url + separator + '&units=metric' + '&appid=' + import.meta.env.VITE_API_KEY;
    }

    return config;
});

export default api;
