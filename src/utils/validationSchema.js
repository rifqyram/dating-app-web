import * as yup from 'yup';
import moment from "moment";
import * as regexpp from "regexpp";

export function personalInfoValidation() {
    return yup.object({
        name: yup.string().required('Name is required'),
        gender: yup.string().required('Gender is required'),
        bod: yup.date('Please input your birth date')
            .test('Should be greater than 18', (value) => moment(value).subtract(18, 'years').toDate())
            .required('Birthdate is required'),
        city: yup.string().required('City is required'),
        selfDescription: yup.string().required('Self Description is required'),
    });
}

export function contactInfoValidation() {
    return yup.object({
        mobilePhoneNumber: yup.string()
            .required('Mobile phone is required'),
        email: yup.string()
            .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
                message: 'Please input valid email'
            })
            .required('Email is required'),
    });
}

export function preferenceValidation() {
    return yup.object({
        lookingForGender: yup.string().required('Gender is required'),
        lookingForDomicile: yup.string().required('City is required'),
        interests: yup.array().min(1, 'Choose Min 1').required('Interest Required')
    });
}

export function authValidation() {
    return yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string().min(8, 'Minimum password length 8 character').required('Password is required'),
    })
}