import axiosInstance from "api/axiosInstance";

export async function createNewPersonalInformation(personalInfo) {
    const form = new FormData();

    for (let personalInfoKey in personalInfo) {
        form.append(personalInfoKey, personalInfo[personalInfoKey])
    }

    const {data} = await axiosInstance.post('/members/personal-info', form);
    return data;
}

export async function getPersonalInformation() {
    const {data} = await axiosInstance.get(`/members/personal-info`)
    return data;
}

export async function updatePersonalInformation(personalInfo) {
    const form = new FormData();

    for (let personalInfoKey in personalInfo) {
        form.append(personalInfoKey, personalInfo[personalInfoKey])
    }
    const {data} = await axiosInstance.put('/members/personal-info', form);
    return data;
}

export async function downloadProfilePicture(filepath) {
    const {data: image} = await axiosInstance.get(`/members/profile-picture?path=${filepath}`, {responseType: 'blob'})
    return image;
}