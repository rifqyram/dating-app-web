import * as yup from 'yup';
import moment from "moment";

export function personalInfoValidation() {
    return yup.object({
        name: yup.string('Please input your name').required('Name is required'),
        gender: yup.string('Please input your gender').required('Gender is required'),
        bod: yup.date('Please input your birth date')
            .test('Should be greater than 18', (value) => moment(value).subtract(18, 'years').toDate())
            .required('Birthdate is required'),
        city: yup.string('Please input your city').required('City is required'),
        selfDescription: yup.string('Please input your self description').required('Self Description is required'),
    });
}