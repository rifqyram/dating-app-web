import {useEffect, useState} from "react";
import {Container, Step, StepLabel, Stepper} from "@mui/material";
import PersonalInfoForm from "components/sections/member/personalInfoForm";
import ContactInfoForm from "components/sections/member/contactInfoForm";
import PreferenceForm from "components/sections/member/preferenceForm";

const steps = ['Personal Info', 'Contact Info', 'Preference'];

export default function Setup() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (steps.length - 1 === activeStep) return;
        setActiveStep((prevActiveStep) => {
            let number = prevActiveStep + 1;
            return number;
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            let number = prevActiveStep - 1;
            return number;
        });
    };

    useEffect(() => {
    }, [])

    const formContent = (step) => {
        switch (step) {
            case 0:
                return <PersonalInfoForm activeStep={activeStep} handleNext={handleNext} handleBack={handleBack}/>
            case 1:
                return <ContactInfoForm activeStep={activeStep} handleNext={handleNext} handleBack={handleBack}/>
            case 2:
                return <PreferenceForm activeStep={activeStep} handleBack={handleBack}/>
            default:
                return <Container>404: Not Found</Container>
        }
    }

    return (
        <Container sx={{minHeight: '100vh'}}>
            <Stepper sx={{my: 4}} activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {formContent(activeStep)}
            </>
        </Container>
    );
}