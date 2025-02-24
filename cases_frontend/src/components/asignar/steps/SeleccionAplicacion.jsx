import { Box, Typography } from '@mui/material';
import React from 'react';
import CRUDAplicaciones from '../../administrar/aplicaciones/CRUDAplicaciones';

export default function SeleccionAplicacion() {
  return <>
    <Box>
      <Typography>Selecciona una aplicación</Typography>
      <CRUDAplicaciones />
    </Box>
  </>;
}
