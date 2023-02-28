import 'styles/global.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "utils/theme";

import {NotificationProvider} from "context/notificationContext";
import AppRoutes from "routes";

function App() {
    return (
        <NotificationProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <NotificationProvider>
                    <AppRoutes/>
                </NotificationProvider>
            </ThemeProvider>
        </NotificationProvider>
    );
}

export default App;
