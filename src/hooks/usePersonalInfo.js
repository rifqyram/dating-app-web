import {useState} from "react";
import {useFormik} from "formik";
import {personalInfoValidation} from "utils/validationSchema";
import moment from "moment/moment";
import {
    createNewPersonalInformation,
    downloadProfilePicture, getPersonalInformation,
    updatePersonalInformation
} from "../services/memberPersonalInfo.service";
export function usePersonalInfo({handleNext}) {
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            personalInformationId: null,
            profilePicture: null,
            name: '',
            gender: '',
            bod: null,
            city: '',
            selfDescription: '',
        },
        validationSchema: personalInfoValidation(),
        onSubmit: async values => {
            const profileData = {
                ...values,
                bod: moment(values.bod).format('YYYY-MM-DD')
            }
            setErrors(null);

            if (!previewImage) {
                setErrors({...errors, profilePicture: 'Please choose your profile picture'})
                return;
            }

            if (!values.personalInformationId) {
                await createNewPersonalData(profileData);
                return;
            }

            await updatePersonalData(profileData);
        }
    })

    async function createNewPersonalData(values) {
        try {
            await createNewPersonalInformation(values);
            handleNext();
        } catch (e) {
        }
    }

    async function updatePersonalData(values) {
        try {
            await updatePersonalInformation(values);;
            handleNext();
        } catch (e) {
        }
    }

    function handleFileChange(e) {
        const {files} = e.target;
        if (files.length === 0) return

        setErrors({...errors, profilePicture: null})
        const fileSize = e.target.files[0].size;
        const file = Math.round((fileSize / 1024));

        if (file >= 512) {
            setErrors({...errors, profilePicture: 'Max upload image: 512kb'})
            return;
        }

        formik.setFieldValue('profilePicture', files[0]);
        setPreviewImage(URL.createObjectURL(files[0]));
    }

    async function fetchProfilePicture(profilePicture) {
        try {
            const image = await downloadProfilePicture(profilePicture);
            setPreviewImage(URL.createObjectURL(image));
            await formik.setFieldValue('profilePicture', null);
        } catch (e) {
        }
    }

    async function fetchPersonalInformation() {
        try {
            const {data} = await getPersonalInformation();
            if (data) {
                await formik.setValues(data)
                await fetchProfilePicture(data.profilePicture);
            }
        } catch (e) {
        }
    }

    return {
        formik,
        previewImage,
        errors,
        handleFileChange,
        fetchPersonalInformation
    }
}