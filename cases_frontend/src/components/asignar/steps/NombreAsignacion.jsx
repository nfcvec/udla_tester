import { Box, FormGroup, FormLabel, TextField } from '@mui/material';
import React from 'react';

export default function NombreAsignacion() {
  return <>
  <Box>
    <FormGroup>
      <FormLabel>Da un nombre a la asignación</FormLabel>
      <TextField />
    </FormGroup>
  </Box>
  </>
}
