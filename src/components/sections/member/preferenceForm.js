import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";

export default function PreferenceForm({activeStep, handleBack}) {
    const [interests, setInterests] = useState([
            {
                label: 'Makan',
                checked: false
            },
            {
                label: 'Minum',
                checked: false
            },
            {
                label: 'Boker',
                checked: false
            }
        ]
    );

    const handleOnChange = (e) => {
        const {name} = e.target;

        let findInterest = interests.find(item => item.label === name);

        if (findInterest) {
            const mapInterest = interests.map(item => {
                if (item === findInterest) {
                    item.checked = !item.checked;
                }
                return item;
            });
            setInterests(mapInterest);
        }
    }

    return (
        <>
            <Grid container justifyContent='center' mb={4}>
                <Typography variant='p' typography='h5' fontWeight='bold'>
                    Preference Form
                </Typography>
            </Grid>
            <Grid container columnSpacing={2} rowSpacing={1}>
                <Grid item md={6} xs={12}>
                    <TextField
                        required
                        select
                        label="Select"
                        helperText="Please select your interest gender, interest to: male/female"
                        size='small'
                        defaultValue='Male'
                        value='Male'
                        fullWidth>
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth
                               required
                               size='small'
                               id="outlined"
                               label="City"
                               helperText="Please input your looking domicile"
                               variant="outlined"/>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        required
                        size='small'
                        id="outlined"
                        label="Start Age"
                        type='number'
                        helperText="Please input your looking starting age, eg: 18 y.o"
                        variant="outlined"/>
                </Grid>
                <Grid item md={3} xs={12}>
                    <TextField
                        fullWidth
                        required
                        size='small'
                        id="outlined"
                        label="Start Age"
                        type='number'
                        helperText="Please input your looking end age, eg: 40 y.o"
                        variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        required
                        variant="standard">
                        <FormLabel component="label">Interest</FormLabel>
                        <Grid item>
                            {interests.map((interest, idx) => {
                                return (
                                    <FormControlLabel
                                        key={idx}
                                        control={
                                            <Checkbox
                                                checked={interest.checked}
                                                onChange={(e) => handleOnChange(e)}
                                                size='small'
                                                name={interest.label}/>
                                        }
                                        label={interest.label}
                                    />
                                );
                            })}
                        </Grid>
                        <FormHelperText>Pick Min: 1</FormHelperText>
                    </FormControl>
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
                <Button>
                    Finish
                </Button>
            </Box>
        </>
    );
}