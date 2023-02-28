import axiosInstance from "../api/axiosInstance";

export async function getPartner(params) {
    const {data} = await axiosInstance.get(`/partners`, {
        params
    });
    return data;
}

export async function choosePartner(partner) {
    const {data} = await axiosInstance.post('/partners', partner);
    return data;
}

export async function getAllMatchPartner() {
    const {data} = await axiosInstance.get('/partners/my-matches');
    return data;
}