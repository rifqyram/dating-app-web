import 'App.css';
import 'styles/global.css';
import Setup from "./pages/setup";
import {Box, Container, Typography} from "@mui/material";

function App() {

    return (
        <div className="app">
            <Box sx={{
                backgroundColor: 'pink',
                maxWidth: '100%',
                minHeight: '75px',
                display: 'flex',
                alignItems: 'center'
            }} mb={4}>
                <Container>
                    <Typography align='center' component='h2' fontWeight='bold' variant={'h5'}>Eniglove</Typography>
                </Container>
            </Box>
            <Setup/>
        </div>
    );
}

export default App;
