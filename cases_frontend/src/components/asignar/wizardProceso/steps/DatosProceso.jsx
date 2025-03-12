import { Box, FormGroup, FormLabel, TextField } from '@mui/material';
import React from 'react';

export default function DatosProceso({
  selectedProceso,
  setSelectedProceso,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProceso((prev) => ({ ...prev, [name]: value }));
  };

  return <>
    <Box gap={2} py={2}>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel>Da un nombre a la asignación</FormLabel>
        <TextField
          required
          id="nombre-proceso"
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          name="nombre"
          value={selectedProceso?.nombre}
          onChange={handleChange}
        />
        <FormLabel>Descripción de la asignación</FormLabel>
        <TextField
          id="descripcion-proceso"
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="descripcion"
          value={selectedProceso?.descripcion}
          onChange={handleChange}
        />
      </FormGroup>
    </Box>
  </>;
}
