import RouteNavigation from "../routes/routeNavigation";
import {useFormik} from "formik";
import {createNewPreference, getPreference, updatePreference} from "../services/preference.service";
import {createNewInterest, getInterests, getMemberInterests, updateMemberInterest} from "../services/interests.service";
import {useState} from "react";
import {preferenceValidation} from "../utils/validationSchema";
import {useNotification} from "../context/notificationContext";

export default function usePreference() {
    const [options, setOptions] = useState([]);
    const {navigateTo} = RouteNavigation();
    const {handleNotification} = useNotification();

    const formik = useFormik({
        initialValues: {
            preferenceId: '',
            lookingForGender: '',
            lookingForDomicile: '',
            lookingForStartAge: 18,
            lookingForEndAge: 40,
            interests: []
        },
        validationSchema: preferenceValidation(),
        onSubmit: async values => {
            const interests = {interests: [...values.interests]}

            if (!values.preferenceId) {
                await createPreference(values, interests);
                navigateTo('/partner');
                return;
            }
            await updateDataPreference(values, interests);
            navigateTo('/partner');
        }
    })

    async function createPreference(values, interests) {
        try {
            await Promise.all([
                await createNewPreference(values),
                await createNewInterest(interests)
            ]);
            handleNotification({
                message: 'Success save member info',
                severity: 'success'
            });
        } catch (e) {
            console.log(e)
        }
    }

    async function updateDataPreference(values, interests) {
        try {
            await Promise.all([
                await updatePreference(values),
                await updateMemberInterest(interests)
            ])
            handleNotification({
                message: 'Success save member info',
                severity: 'success'
            });

        } catch (e) {
            console.log(e);
        }
    }

    async function fetchMemberInterests() {
        try {
            const {data} = await getMemberInterests();
            const interests = data.map(i => i.interest);
            await formik.setFieldValue('interests', [...interests]);
        } catch (e) {
        }
    }

    async function fetchInterests() {
        try {
            const {data} = await getInterests();
            const interests = data.map(i => i.interest);
            setOptions(interests);
        } catch (e) {
        }
    }

    async function fetchPreference() {
        try {
            const {data} = await getPreference();
            if (Object.keys(data).length !== 0) {
                await formik.setFieldValue('preferenceId', data.preferenceId);
                await formik.setFieldValue('lookingForGender', data.lookingForGender);
                await formik.setFieldValue('lookingForDomicile', data.lookingForDomicile);
                await formik.setFieldValue('lookingForStartAge', data.lookingForStartAge);
                await formik.setFieldValue('lookingForEndAge', data.lookingForEndAge);
            }
        } catch (e) {
        }
    }

    return {
        formik,
        options,
        fetchInterests,
        fetchMemberInterests,
        fetchPreference
    }
}