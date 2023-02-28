import axios from "axios";
import {getTokenFromSessionStorage} from "services/auth.service";
import RouteNavigation from "../routes/routeNavigation";
import {useNavigate} from "react-router-dom";

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