import {useFormik} from "formik";
import {
    createNewContactInformation,
    getContactInformation,
    updateContactInformation
} from "../services/memberContactInfo.service";
import {getTokenFromSessionStorage} from "../services/auth.service";
import {contactInfoValidation} from "../utils/validationSchema";

export default function useContactInfo({handleNext}) {
    const formik = useFormik({
        initialValues: {
            memberContactId: null,
            mobilePhoneNumber: '',
            email: '',
            instagramId: '',
            twitterId: ''
        },
        validationSchema: contactInfoValidation(),
        onSubmit: async values => {
            if (!values.memberContactId) {
                await createNewContactInformation(values);
                handleNext();
                return;
            }
            await updateContactInformation(values);
            handleNext();
        }
    });

    async function fetchContactInfo() {
        if (!getTokenFromSessionStorage()) return null;
        try {
            const {data} = await getContactInformation();
            await formik.setValues(data);
        } catch (e) {
            console.log(e);
        }
    }

    return {formik, fetchContactInfo}
}