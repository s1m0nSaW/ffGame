import { Box, Button, MobileStepper, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import React from 'react'
import Head from '../components/Head'

import bank from '../img/bank.png'
import choose from '../img/choose.png'
import deals from '../img/deals.png'
import header from '../img/header.png'
import main from '../img/main.png'
import profile from '../img/profile.png'


const images = [
    {
        label: 'Choose',
        imgPath: choose,
    },
    {
        label: 'Header',
        imgPath: header,
    },
    {
        label: 'Main',
        imgPath: main,
    },
    {
        label: 'Deals',
        imgPath: deals,
    },
    {
        label: 'Bank',
        imgPath: bank,
    },
    {
        label: 'Profile',
        imgPath: profile,
    },
];

function Training() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius: 0 }}>
            <Head name={'Обучение'} />
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: '75%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                       
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                       
                    </Button>
                }
            />
        </Paper>
    )
}

export default Training