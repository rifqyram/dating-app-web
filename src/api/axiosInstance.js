import axios from "axios";
import {getTokenFromSessionStorage} from "../services/member.service";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API}`
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getTokenFromSessionStorage();
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;