import {Button, Container, Grid, Typography} from "@mui/material";
import loveRe from 'assets/images/love_re.svg';
import {Link} from "react-router-dom";

export default function Home() {
    return(
        <Container>
            <Grid minHeight='100vh' container spacing={2} alignItems='center'>
                <Grid item md={6}>
                    <Typography variant='h3' color='rgba(0,0,0,0.6)' fontWeight='bold'>Find your life partner with a
                        simple way</Typography>
                    <Typography variant='h6' textAlign='justify' my={4}>
                        Simple register on our website and we will find the girl or boy of your dreams. In few
                        simple steps you are joining the Dating website
                    </Typography>
                    <Button component={Link} to='/auth/register' variant='contained' size='large'>
                        Sign Up
                    </Button>
                </Grid>
                <Grid item md={6}>
                    <img className='image-background-home' src={loveRe} alt="background"/>
                </Grid>
            </Grid>
        </Container>
    )
}