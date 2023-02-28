import axiosInstance from "api/axiosInstance";

export async function createNewContactInformation(contactInfo) {
    const {data} = await axiosInstance.post('/members/contact-info', contactInfo)
    return data;
}

export async function getContactInformation() {
    const {data} = await axiosInstance.get('/members/contact-info')
    return data;
}

export async function updateContactInformation(contactInfo) {
    const {data} = await axiosInstance.put('/members/contact-info', contactInfo)
    return data;
}