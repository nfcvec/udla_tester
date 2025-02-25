import { Box, FormLabel, Typography } from '@mui/material';
import React from 'react';
import CRUDAplicaciones from '../../administrar/aplicaciones/CRUDAplicaciones';
import SelectorAplicaciones from '../../administrar/aplicaciones/SelectorAplicaciones';
import { useAsignar } from '../context/AsignarContext';

export default function SeleccionAplicacion() {
  const { asignacion, setAsignacion } = useAsignar();

  const handleSelect = (aplicacion) => {
    setAsignacion((prev) => ({ ...prev, aplicacion }));
  };

  return <>
    <Box gap={2} py={2}>
    <code>{JSON.stringify(asignacion)}</code>
      <FormLabel variant="h4">Selecciona una aplicación</FormLabel>
      <SelectorAplicaciones setAplicacion={handleSelect} aplicacion={asignacion.aplicacion} />
    </Box>
  </>;
}
