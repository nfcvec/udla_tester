import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SelectorProcesos from '../administrar/procesos/SelectorProcesos';
import ProcesoStepper from './wizardProceso/ProcesoStepper';
import { ProcesoProvider, useProceso } from './context/ProcesoContext';
import { Box, FormLabel, IconButton, TextField, Typography } from '@mui/material';
import { callMsGraphUserDetails } from '../../utils/MsGraphUserDetails';
import EnviarAsignaciones from './EnviarAsignaciones';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function AdministrarProcesos() {
  return (
    <>
      <ProcesoProvider>
        <AsignarContent />
      </ProcesoProvider>
    </>
  );
}

export const AsignarContent = () => {
  const [showStepper, setShowStepper] = useState(false);
  const { proceso, setProceso } = useProceso();

  const handleAgregarClick = () => {
    setShowStepper(true);
  };



  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton disabled={!proceso.nombre} onClick={() => setProceso({})}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          {proceso.nombre || "Lista de procesos de prueba"}
        </Typography>
      </Box>
      {proceso.nombre && (
        <EnviarAsignaciones />
      )}
      {!proceso.nombre && (
        <>
          <CRUDProceso
            showStepper={showStepper}
            setShowStepper={setShowStepper}
            setProceso={setProceso}
            handleAgregarClick={handleAgregarClick}
          />
        </>
      )}
    </>
  );
}

export const CRUDProceso = ({
  showStepper,
  setShowStepper,
  setProceso,
  handleAgregarClick,
}) => {

  return (
    <>
      {showStepper ? (
        <ProcesoStepper setShowStepper={setShowStepper} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box textAlign="right">
              <Button variant="contained" onClick={handleAgregarClick}>
                Agregar
              </Button>
            </Box>
            <SelectorProcesos
              isMultiple={false}
              setProceso={setProceso}
              setProcesos={() => { }}
            />
          </Box>
        </>
      )}</>
  )

}
