import axiosInstance from "../api/axiosInstance";

export async function createNewPreference(preference) {
    const {data} = await axiosInstance.post('/members/preferences', preference);
    return data;
}

export async function getPreference() {
    const {data} = await axiosInstance.get('/members/preferences');
    return data;
}

export async function updatePreference(preference) {
    const {data} = await axiosInstance.put('/members/preferences', preference);
    return data;
}