import { Box, FormLabel, Typography } from '@mui/material';
import React from 'react';
import SelectorFuncionalidades from '../../administrar/aplicaciones/funcionalidades/SelectorFuncionalidades';
import { useAsignar } from '../context/AsignarContext';

export default function SeleccionFuncionalidad() {
  const { asignacion, setAsignacion } = useAsignar();

  const handleSelect = (funcionalidades) => {
    setAsignacion((prev) => ({ ...prev, funcionalidades }));
  };

  return <>
    <Box gap={2} py={2}>
      <code>{JSON.stringify(asignacion)}</code>
      <FormLabel>Selecciona una funcionalidad</FormLabel>
      <SelectorFuncionalidades aplicacion={asignacion.aplicacion} isMultiple={true} setFuncionalidades={handleSelect} funcionalidades={asignacion.funcionalidades} />
    </Box>
  </>;
}
