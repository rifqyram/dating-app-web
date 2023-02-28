import RouteNavigation from "../../routes/routeNavigation";
import {useFormik} from "formik";
import {getMyInfo, login} from "services/auth.service";
import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {useNotification} from "../../context/notificationContext";
import {authValidation} from "../../utils/validationSchema";

export default function Login() {
    const {navigateTo} = RouteNavigation();
    const {handleNotification} = useNotification();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: authValidation(),
        onSubmit: async (values) => {
            try {
                const {data} = await login(values);
                sessionStorage.setItem('token', data.token);
                navigateTo('/partner');
            } catch (e) {
                if (e.response.status === 500) {
                    handleNotification({
                        message: 'An Internal Server Error',
                        severity: 'error',
                    })
                } else if (e.response.status === 401) {
                    handleNotification({
                        message: 'Invalid Username or Credential',
                        severity: 'error',
                    })
                }
            }
        }
    })

    async function fetchGetInfo() {
        try {
            const {data} = await getMyInfo();
            if (Object.keys(data).length !== 0) {
                navigateTo('/partner')
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        fetchGetInfo();
    }, []);

    return (
        <Container sx={{minHeight: '100vh'}}>
            <Box component='form' onSubmit={e => formik.handleSubmit(e)}>
                <Grid container mx='auto' borderRadius={12} minHeight='75vh' alignItems='center'>
                    <Grid container
                          item
                          display='flex'
                          flexDirection='column'
                          justifyContent='center'
                          alignItems='center'
                          xs={12}
                          md={6}
                          px={{xs: 2, md: 4}}
                          gap={2}
                          boxShadow={{md: 2}}
                          borderRadius={3}
                          minHeight={500}>
                        <Typography variant='p' typography='h3'>Sign in</Typography>
                        <Typography fontWeight='bold'>Use Your Username and Password
                            to Sign in</Typography>
                        <TextField
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            error={formik.touched && Boolean(formik.errors.username)}
                            helperText={formik.errors.username}
                            label='Username'
                            name='username'
                            variant='standard'/>
                        <TextField
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.touched && Boolean(formik.errors.password)}
                            helperText={formik.errors.password}
                            label='Password'
                            name='password'
                            type='password'
                            variant='standard'/>
                        <Typography display={{xs: 'flex', md: 'none'}} variant='p'>
                            'Dont have any account?'
                            <Typography ml={1} color='primary.main' variant='span'>
                                'Create Account'
                            </Typography>
                        </Typography>
                        <Grid item>
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{width: 300, fontWeight: 'bold'}}>
                                Log In
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item
                          display={{xs: 'none', md: 'flex'}}
                          flexDirection='column'
                          xs={12}
                          md={6}
                          bgcolor='primary.main'
                          color='white'
                          minHeight={500}
                          alignItems='center'
                          justifyContent='center'
                          sx={{borderRadius: '0 12px 12px 0'}}>
                        <Typography variant='p' typography='h4'>Please, Sign in</Typography>
                        <Typography variant='p' typography='h6' my={1}>or</Typography>
                        <Box width={200}
                             height={40}
                             component={Link}
                             to={'/auth/register'}
                             bgcolor='white'
                             borderRadius={1}
                             display='flex'
                             justifyContent='center'
                             sx={{cursor: 'pointer', textDecoration: 'none'}}
                             alignItems='center'>
                            <Typography color='primary.main' fontWeight='bold'>Create Account</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );

}