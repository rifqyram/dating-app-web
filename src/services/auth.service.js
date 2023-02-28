import axiosInstance from "api/axiosInstance";

export async function register(authRequest) {
    const {data} = await axiosInstance.post('/auth/register', authRequest);
    return data;
}

export async function login(authRequest) {
    const {data} = await axiosInstance.post('/auth/login', authRequest);
    return data;
}

export async function getMyInfo() { // from token
    const {data} = await axiosInstance.get('/members/me');
    return data;
}

export function getTokenFromSessionStorage() {
    return sessionStorage.getItem('token');
}

