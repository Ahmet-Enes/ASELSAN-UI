import axios from "axios";

const api = axios.create({
    baseURL: "https://vendingmachine-be-production.up.railway.app"
});

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        config.headers = {
            "Access-Control-Allow-Origin": "*",
            "token": token
        }
        return config;
    }
);

export default api;