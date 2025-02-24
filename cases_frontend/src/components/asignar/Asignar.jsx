import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NombreAsignacion from './steps/NombreAsignacion';
import SeleccionAplicacion from './steps/SeleccionAplicacion';
import SeleccionTesters from './steps/SeleccionTesters';
import EnviarAsignaciones from './steps/EnviarAsignaciones';
import SeleccionFuncionalidad from './steps/SeleccionFuncionalidad';

const steps = [
  {
    label: 'Da un nombre a la asignación',
    component: <NombreAsignacion />,
    isComplete: false,
    canProceed: false,
  },
  {
    label: 'Selecciona una aplicación',
    component: <SeleccionAplicacion />,
    isComplete: false,
    canProceed: false,
  },
  {
    label: 'Selecciona las funcionalidades a probar',
    component: <SeleccionFuncionalidad />,
    isComplete: false,
    canProceed: false,
  },
  {
    label: 'Selecciona los testers',
    component: <SeleccionTesters />,
    isComplete: false,
    canProceed: false,
  },
  {
    label: 'Envía las asignaciones',
    component: <EnviarAsignaciones />,
    isComplete: false,
    canProceed: false,
  },
];

export default function Asignar() {
  const [activeStep, setActiveStep] = React.useState(0);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return steps.reduce((acc, step) => {
      if (step.isComplete) {
        acc += 1;
      }
      return acc;
    }, 0);
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step) => !step.isComplete)
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    return steps[step].component;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.isComplete}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Todos los pasos completados - has terminado
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reiniciar</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                onClick={handleNext}
                sx={{ mr: 1 }}
                disabled={!steps[activeStep].canProceed}
              >
                Siguiente
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
