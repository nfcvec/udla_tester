import React, { useEffect } from 'react';
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
import { AsignarProvider, useAsignar } from './context/AsignarContext';

export default function Asignar() {
  const [steps, setSteps] = React.useState([
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
  ]);
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <AsignarProvider>
      <AsignarContent steps={steps} setSteps={setSteps} activeStep={activeStep} setActiveStep={setActiveStep} />
    </AsignarProvider>
  );
}

function AsignarContent({ steps, setSteps, activeStep, setActiveStep }) {
  const { asignacion } = useAsignar();

  useEffect(() => {
    if (activeStep === 0 && asignacion.nombre) {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[0].canProceed = true;
        return newSteps;
      });
    }
  }, [asignacion.nombre, activeStep]);

  useEffect(() => {
    if (activeStep === 1 && asignacion.aplicacion) {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[1].canProceed = true;
        return newSteps;
      });
    }
  }, [asignacion.aplicacion, activeStep]);

  useEffect(() => {
    if (activeStep === 2 && asignacion.funcionalidades.length > 0) {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[2].canProceed = true;
        return newSteps;
      });
    }
  }, [asignacion.funcionalidades, activeStep]);  
  
  useEffect(() => {
    if (activeStep === 3 && asignacion.testers.length > 0) {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[3].canProceed = true;
        return newSteps;
      });
    }
  }, [asignacion.testers, activeStep]);

  const totalSteps = () => steps.length;

  const completedSteps = () => steps.filter(step => step.isComplete).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex(step => !step.isComplete)
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => steps[step].component;

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
