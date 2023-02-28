import {Box, Container, Grid, IconButton, Typography} from "@mui/material";
import logo from "assets/images/logo.svg";
import {Drawer} from "../../ui/drawer/drawer";
import {useState} from "react";
import {Menu} from "@mui/icons-material";
import {getTokenFromSessionStorage} from "../../../services/auth.service";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <Box bgcolor='primary.main' color="white" maxWidth='100%' minHeight='80px' sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <Container>
                <Grid container>
                    <Grid container item xs={6}>
                        <Typography fontFamily='Pacifico, cursive' align='center' component='h2' variant={'h4'}
                                    mr={1}>Eniglove</Typography>
                        <img src={logo} alt='logo'/>
                    </Grid>
                    <Grid container item xs={6} alignItems='center' justifyContent='flex-end'>
                        <IconButton onClick={() => setOpen(!open)}><Menu sx={{color: 'white'}}/></IconButton>
                        <Drawer open={open} setOpen={setOpen}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}