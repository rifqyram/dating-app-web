import axiosInstance from "../api/axiosInstance";

export async function createNewInterest(interest) {
    const {data} = await axiosInstance.post('/members/interests', interest);
    return data;
}

export async function getInterests() {
    const {data} = await axiosInstance.get('/members/interests')
    return data;
}

export async function getMemberInterests() {
    const {data} = await axiosInstance.get('/members/interests/my-interests');
    return data;
}

export async function updateMemberInterest(interest) {
    const {data} = await axiosInstance.put('/members/interests', interest)
    return data;
}