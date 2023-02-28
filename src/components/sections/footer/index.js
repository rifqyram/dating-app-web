import {Box, Container, Grid, Typography} from "@mui/material";

export default function Footer() {
    return(
        <Box bgcolor='primary.main' color="white" maxWidth='100%' minHeight='80px' sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <Container>
                <Grid container alignItems={'center'}>
                    <Typography component='p' variant={'span'}>@Enigma Camp</Typography>
                </Grid>
            </Container>
        </Box>
    );
}