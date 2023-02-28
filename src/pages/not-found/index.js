import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <Container>
            <Grid container
                  minHeight='100vh'
                  alignItems='center'
                  flexDirection='column'
                  justifyContent='center'>
                <Box border={2} p={4} borderRadius={2} textAlign='center'>
                    <Typography typography='h2' fontWeight='bold'>404 Not Found</Typography>
                    <Typography>The page you are looking for does not exist.</Typography>
                    <Button component={Link} to="/">Go back to the homepage</Button>
                </Box>
            </Grid>
        </Container>
    )
}