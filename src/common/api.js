import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use(
    async (config) => {
        config.headers = {
            "Access-Control-Allow-Origin": "*",
        }
        return config;
    }
);

export default api;