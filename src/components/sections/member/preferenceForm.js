import {useEffect} from "react";

import {getTokenFromSessionStorage} from "services/auth.service";

import {
    Autocomplete,
    Box,
    Button,
    Chip,
    FormHelperText,
    FormLabel,
    Grid,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import SliderRange from "components/ui/slider-range";
import usePreference from "hooks/usePreference";

export default function PreferenceForm({activeStep, handleBack}) {
    const {formik, options, fetchInterests, fetchPreference, fetchMemberInterests} = usePreference();

    useEffect(() => {
        fetchInterests();
        if (getTokenFromSessionStorage()) {
            fetchPreference();
            fetchMemberInterests();
        }
    }, [])


    return (
        <Box component='form' onSubmit={e => formik.handleSubmit(e)}>
            <Grid container justifyContent='center' mb={4}>
                <Typography variant='p' typography='h5' fontWeight='bold'>
                    Preference Form
                </Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormLabel>Interest Age Range</FormLabel>
                    <SliderRange
                        name1='lookingForStartAge'
                        name2='lookingForEndAge'
                        value={[formik.values.lookingForStartAge, formik.values.lookingForEndAge]}
                        setValue={formik.setFieldValue}/>
                    <FormHelperText>Choose your interest age range</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        onChange={formik.handleChange}
                        value={formik.values.lookingForGender}
                        error={formik.touched && Boolean(formik.errors.lookingForGender)}
                        name='lookingForGender'
                        label="Select Gender"
                        helperText={formik.touched && Boolean(formik.errors.lookingForGender) ? formik.errors.lookingForGender : 'Please select your interest gender, interest to: male/female'}
                        size='small'>
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               onChange={formik.handleChange}
                               value={formik.values.lookingForDomicile}
                               error={formik.touched && Boolean(formik.errors.lookingForDomicile)}
                               name='lookingForDomicile'
                               label="City"
                               helperText={formik.touched && Boolean(formik.errors.lookingForDomicile) ? formik.errors.lookingForDomicile : 'Please input your looking domicile'}
                               size='small'
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={options}
                        freeSolo
                        onChange={(e, value) => formik.setFieldValue('interests', value)}
                        value={[...formik.values.interests]}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    size='small'
                                    color='primary'
                                    variant="filled"
                                    sx={{fontWeight: 'bold'}}
                                    label={option}
                                    {...getTagProps({index})}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name='interests'
                                variant="outlined"
                                label="Interests"
                                placeholder="Travelling, Sports, Coding..."
                                size='small'
                                error={formik.touched && Boolean(formik.errors.interests)}
                                helperText={formik.touched && Boolean(formik.errors.interests) ? formik.errors.interests : 'Please input your interests, e.g: Traveling, Coding, Jogging'}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2}}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}>
                    Back
                </Button>
                <Button type='submit'>
                    Finish
                </Button>
            </Box>
        </Box>
    );
}