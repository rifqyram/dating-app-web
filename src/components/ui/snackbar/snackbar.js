import {Alert, Snackbar as MUISnackbar, Stack} from "@mui/material";

export default function Snackbar({open, setOpen, severity = 'error', message}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <MUISnackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={(e) => handleClose(e)} severity={severity}>{message}</Alert>
            </MUISnackbar>
        </Stack>
    )
}