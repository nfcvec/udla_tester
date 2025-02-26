import { Box, FormGroup, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { useProceso } from '../../context/ProcesoContext';

export default function DatosProceso() {
  const { proceso, setProceso } = useProceso();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProceso((prev) => ({ ...prev, [name]: value }));
  };

  return <>
    <Box gap={2} py={2}>
    <code>{JSON.stringify(proceso)}</code>
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
          value={proceso.nombre}
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
          value={proceso.descripcion}
          onChange={handleChange}
        />
      </FormGroup>
    </Box>
  </>
}
