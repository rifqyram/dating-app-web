import {Box, Slider, Typography} from "@mui/material";

export default function SliderRange({value, setValue, name1, name2}) {
    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue('lookingForStartAge', newValue[0]);
        } else {
            setValue('lookingForEndAge', newValue[1]);
        }
    };

    return (
        <>
            <Box display='flex' justifyContent='space-between' mt={1}>
                <Typography variant='p' fontSize={14}>Minimum Age: {value[0]}</Typography>
                <Typography variant='p' fontSize={14}>Maximum Age: {value[1]}</Typography>
            </Box>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                min={18}
                max={40}
                onChange={(e, newValue, activeThumb) => handleChange(e, newValue, activeThumb)}
                valueLabelDisplay="auto"
                disableSwap
            />
        </>
    );
}