import {useState} from "react";
import {useFormik} from "formik";
import {personalInfoValidation} from "../utils/validationSchema";
import moment from "moment/moment";
import {
    createNewPersonalInformation,
    downloadProfilePicture, getPersonalInformation,
    updatePersonalInformation
} from "../services/member.service";
import Swal from "sweetalert2";

export function usePersonalInfo({handleNext}) {
    const [previewImage, setPreviewImage] = useState('');
    const [errorPicture, setErrorPicture] = useState({});

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

            if (!previewImage) {
                setErrorPicture({...errorPicture, profilePicture: 'Please choose your profile picture'})
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
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                text: 'Personal Info Successfully Saved',
                timer: 1500,
            });
            handleNext();
        } catch (e) {
            console.log(e)
        }
    }

    async function updatePersonalData(values) {
        try {
            await updatePersonalInformation(values);
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                text: 'Personal Info Successfully Saved',
                timer: 1500,
            });
            handleNext();
        } catch (e) {
            console.log(e)
        }
    }

    function handleFileChange(e) {
        const {files} = e.target;
        if (files.length === 0) return;

        setErrorPicture({...errorPicture, profilePicture: null})
        const fileSize = e.target.files[0].size;
        const file = Math.round((fileSize / 512));

        if (file >= 512) {
            setErrorPicture({...errorPicture, profilePicture: 'Max upload image: 512kb'})
            return;
        }

        setPreviewImage(URL.createObjectURL(files[0]));
    }

    async function fetchProfilePicture(profilePicture) {
        try {
            const image = await downloadProfilePicture(profilePicture);
            setPreviewImage(URL.createObjectURL(image));
            await formik.setFieldValue('profilePicture', null);
        } catch (e) {
            console.log(e);
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
            console.log(e);
        }
    }

    return {
        formik,
        previewImage,
        errorPicture,
        handleFileChange,
        fetchPersonalInformation
    }
}