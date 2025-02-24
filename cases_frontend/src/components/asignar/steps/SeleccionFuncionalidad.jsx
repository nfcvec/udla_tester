import { Box, Typography } from '@mui/material';
import React from 'react';
import CRUDFuncionalidades from '../../administrar/aplicaciones/funcionalidades/crud';

export default function SeleccionFuncionalidad() {
  return <>
    <Box>
      <Typography>Selecciona una funcionalidad</Typography>
      <CRUDFuncionalidades />
    </Box>
  </>;
}
