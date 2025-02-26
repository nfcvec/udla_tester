import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DatosAsignacion from './steps/DatosAsignacion';
import SeleccionAplicacion from './steps/SeleccionAplicacion';
import SeleccionTesters from './steps/SeleccionTesters';
import SeleccionFuncionalidad from './steps/SeleccionFuncionalidad';
import { useAsignar } from './context/AsignarContext';
import apiCases from '../../services/apiCases';
import { useAlert } from '../../contexts/AlertContext';

export default function AsignarStepper({ setShowStepper }) {
  const [steps, setSteps] = React.useState([
    {
      label: 'Da un nombre a la asignación',
      component: <DatosAsignacion />,
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
  ]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleStep = (step) => (event) => {
    setActiveStep(step);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AsignarContent
        steps={steps}
        setSteps={setSteps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        anchorEl={anchorEl}
        setShowStepper={setShowStepper}
      />
    </>
  );
}

function AsignarContent({ steps, setSteps, activeStep, setActiveStep, anchorEl, setShowStepper }) {
  const { asignacion } = useAsignar();
  const showAlert = useAlert();

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

  const handleSaveProceso = async () => {
    //crear proceso: {
    //   "nombre": "string",
    //   "descripcion": "string",
    //   "fecha_creacion": "2025-02-26T13:59:56.970Z",
    //   "aplicacion_id": 0
    // }
    let proceso = {
      nombre: asignacion.nombre,
      descripcion: asignacion.descripcion,
      fecha_creacion: new Date().toISOString(),
      aplicacion_id: asignacion.aplicacion.id,
    };

    try {
      const response = await apiCases.createProceso(proceso);
      proceso.id = response.data.id;
    }
    catch (error) {
      showAlert("Error al crear el proceso", "error");
      console.log(error);
      return;
    }

    // crear funcionalidades del proceso
    // {
    //   "funcionalidad_id": 0,
    //   "proceso_id": 0
    // }

    const funcionalidades = asignacion.funcionalidades.map((funcionalidad) => {
      return {
        funcionalidad_id: funcionalidad.id,
        proceso_id: proceso.id,
      };
    });

    try {
      const response_funcionalidades = [];
      for (const funcionalidad of funcionalidades) {
        response_funcionalidades.push(await apiCases.createFuncionalidadesProceso(funcionalidad));
      }
    }
    catch (error) {
      showAlert("Error al crear las funcionalidades del proceso", "error");
      console.log(error);
      return;
    }

    // crear testers del proceso
    // {
    //   "tester_id": 0,
    //   "proceso_id": 0
    // }

    const testers = asignacion.testers.map((tester) => {
      return {
        tester_id: tester.id,
        proceso_id: proceso.id,
      };
    });

    try {
      for (const tester of testers) {
        await apiCases.createTestersProceso(tester);
      }

      showAlert("Proceso creado correctamente", "success");
      setShowStepper(false);

    }
    catch (error) {
      showAlert("Error al crear los testers del proceso", "error");
    }
  };




  const handleNext = () => {
    if (isLastStep()) {
      handleSaveProceso();
    } else {
      const newActiveStep = isLastStep() && !allStepsCompleted()
        ? steps.findIndex(step => !step.isComplete)
        : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      setShowStepper(false);
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
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
