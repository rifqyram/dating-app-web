import {useEffect} from "react";
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import moment from "moment";
import {usePersonalInfo} from "hooks/usePersonalInfo";
import anonymousProfilePicture from 'assets/images/avatar_anonymous.jpeg'

export default function PersonalInfoForm({activeStep, handleNext, handleBack}) {
    const {
        formik: {values, errors, touched, setFieldValue, handleChange, handleSubmit},
        previewImage,
        errorPicture,
        fetchPersonalInformation,
        handleFileChange
    } = usePersonalInfo({handleNext});

    useEffect(() => {
        fetchPersonalInformation();
    }, []);

    return (
        <>
            <Box component='form' onSubmit={(e) => handleSubmit(e)}>
                <Grid container item xs={12} justifyContent='center' mb={4}>
                    <Typography variant='p' typography='h5' fontWeight='bold'>
                        Personal Information Form
                    </Typography>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    <Grid container item md={4} xs={12} sx={{mb: {xs: 2}}} spacing={2}>
                        <Grid container item xs={12} justifyContent='center' sx={{minHeight: 250}}>
                            <img className='profile-pics'
                                 src={previewImage || anonymousProfilePicture} alt='profile'
                                 loading='lazy'/>
                        </Grid>
                        <Grid container item xs={12} justifyContent='center'>
                            <Button variant='contained' component='label'>
                                Choose Picture
                                <input
                                    onChange={e => handleFileChange(e)}
                                    type="file"
                                    hidden
                                    accept="image/*"/>
                            </Button>
                        </Grid>
                        <Grid container item xs={12} justifyContent='center'>
                            <FormHelperText
                                error={Boolean(errorPicture.profilePicture)}>{errorPicture.profilePicture}</FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container item spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth
                                           onChange={handleChange}
                                           value={values.name}
                                           name='name'
                                           label="Name"
                                           error={Boolean(errors.name)}
                                           helperText={touched.name &&
                                           Boolean(errors.name) ?
                                               errors.name :
                                               "Please input your name"}
                                           size='small'
                                           variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    onChange={handleChange}
                                    value={values.gender}
                                    name='gender'
                                    label="Select Gender"
                                    error={Boolean(errors.gender)}
                                    helperText={touched.gender &&
                                    Boolean(errors.gender) ?
                                        errors.gender :
                                        "Please input your gender"} size='small'>
                                    <MenuItem value='Male'>Male</MenuItem>
                                    <MenuItem value='Female'>Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <MobileDatePicker
                                        maxDate={moment().subtract(18, 'years')}
                                        minDate={moment().subtract(75, "years")}
                                        onChange={(date) => setFieldValue('bod', date)}
                                        value={values.bod}
                                        defaultCalendarMonth={moment().subtract(18, 'years')}
                                        inputFormat="YYYY-MM-DD"
                                        name='bod'
                                        label="Birth of Date"
                                        renderInput={params =>
                                            <TextField
                                                fullWidth
                                                name='bod'
                                                size='small'
                                                error={Boolean(errors.bod)}
                                                helperText={touched.bod &&
                                                Boolean(errors.bod) ?
                                                    errors.bod :
                                                    "Please input your birth date"}
                                                {...params}
                                            />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth
                                           onChange={handleChange}
                                           value={values.city}
                                           error={Boolean(errors.city)}
                                           helperText={touched.city &&
                                           Boolean(errors.city) ?
                                               errors.city :
                                               "Please input your city"}
                                           name='city'
                                           label="City"
                                           size='small'
                                           variant="outlined"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    onChange={handleChange}
                                    value={values.selfDescription}
                                    error={Boolean(errors.selfDescription)}
                                    helperText={touched.selfDescription &&
                                    Boolean(errors.selfDescription) ?
                                        errors.selfDescription :
                                        "Please input your self description"}
                                    name='selfDescription'
                                    label="Self Description"
                                    rows={4}
                                    size='small'/>
                            </Grid>
                        </Grid>
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
                    <Button type='submit'>Next</Button>
                </Box>
            </Box>
        </>
    )
}