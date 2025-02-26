import React from 'react';
import Button from '@mui/material/Button';
import { AsignarProvider } from './context/AsignarContext';
import AsignarStepper from './AsignarStepper';
import SelectorProcesos from '../administrar/procesos/SelectorProcesos';

export default function Asignar() {
  const [showStepper, setShowStepper] = React.useState(false);

  const handleAgregarClick = () => {
    setShowStepper(true);
  };

  return (
    <AsignarProvider>
      {showStepper ? (
        <AsignarStepper setShowStepper={setShowStepper}/>
      ) : (<>
        <Button variant="contained" onClick={handleAgregarClick}>
          Agregar
        </Button>


        <SelectorProcesos
          isMultiple={false}
          setProceso={() => { }}
          setProcesos={() => { }}
        />
      </>
      )}
    </AsignarProvider>
  );
}
