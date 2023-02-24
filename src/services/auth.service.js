import axiosInstance from "api/axiosInstance";

async function register(authRequest) {
    const {data} = await axiosInstance.post('auth/register', authRequest);
    return data;
}

async function login(authRequest) {
    const {data} = await axiosInstance.post('auth/login', authRequest);
    return data;
}

export {register, login};