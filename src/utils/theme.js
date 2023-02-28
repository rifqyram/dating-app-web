import {createTheme} from "@mui/material";
import {red} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: '#5b0834',

        },
        error: {
            main: red[400],
        }
    },
    typography: {
        fontFamily: [
            'sans-serif',
            'Montserrat',
        ]
    }
})

export default theme