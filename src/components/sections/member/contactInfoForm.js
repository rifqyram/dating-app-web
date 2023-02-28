import {useEffect} from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import useContactInfo from "../../../hooks/useContactInfo";

export default function ContactInfoForm({activeStep, handleNext, handleBack}) {
    const {formik, fetchContactInfo} = useContactInfo({handleNext});

    useEffect(() => {
        fetchContactInfo();
    }, []);


    return (
        <Box component='form' onSubmit={e => formik.handleSubmit(e)}>
            <Grid container justifyContent='center' mb={4}>
                <Typography variant='p' typography='h5' fontWeight='bold'>
                    Contact Information Form
                </Typography>
            </Grid>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth
                               onChange={formik.handleChange}
                               value={formik.values.mobilePhoneNumber}
                               error={formik.touched.mobilePhoneNumber &&
                                   Boolean(formik.errors.mobilePhoneNumber)}
                               helperText={formik.touched.mobilePhoneNumber &&
                               Boolean(formik.errors.mobilePhoneNumber) ?
                                   formik.errors.mobilePhoneNumber :
                                   'Please input your mobile phone number'}
                               name='mobilePhoneNumber'
                               size='small'
                               label="Mobile Phone"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               onChange={formik.handleChange}
                               value={formik.values.email}
                               error={formik.touched.email &&
                                   Boolean(formik.errors.email)}
                               helperText={formik.touched.email &&
                               Boolean(formik.errors.email) ?
                                   formik.errors.email :
                                   'Please input your email'}
                               name='email'
                               size='small'
                               label="Email"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               onChange={formik.handleChange}
                               value={formik.values.instagramId}
                               name='instagramId'
                               helperText="Please input your instagram id"
                               size='small'
                               label="Instagram Id"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               onChange={formik.handleChange}
                               value={formik.values.twitterId}
                               name='twitterId'
                               helperText="Please input your twitter id"
                               size='small'
                               label="Twitter Id"
                               variant="outlined"/>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2}}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{mr: 1}}>
                    Back
                </Button>
                <Button type='submit'>
                    Next
                </Button>
            </Box>
        </Box>
    );
}