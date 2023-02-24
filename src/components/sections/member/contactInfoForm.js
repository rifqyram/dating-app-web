import {Box, Button, Grid, TextField, Typography} from "@mui/material";

export default function ContactInfoForm({activeStep, handleNext, handleBack}) {
    return(
        <>
            <Grid container justifyContent='center' mb={4}>
                <Typography variant='p' typography='h5' fontWeight='bold'>
                    Contact Information Form
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <TextField fullWidth
                               required
                               size='small'
                               id="outlined"
                               label="Mobile Phone"
                               helperText="Please input your mobile phone number"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               required
                               size='small'
                               id="outlined"
                               label="Email"
                               helperText="Please input your email"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               size='small'
                               id="outlined"
                               label="Instagram Id"
                               helperText="Please input your instagram id"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               size='small'
                               id="outlined"
                               label="Twitter Id"
                               helperText="Please input your twitter id"
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
                <Button onClick={handleNext}>
                    Next
                </Button>
            </Box>
        </>
    );
}