import { Box, FormGroup, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { useAsignar } from '../context/AsignarContext';

export default function NombreAsignacion() {
  const { asignacion, setAsignacion } = useAsignar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsignacion((prev) => ({ ...prev, [name]: value }));
  };

  return <>
    <Box gap={2} py={2}>
    <code>{JSON.stringify(asignacion)}</code>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel>Da un nombre a la asignación</FormLabel>
        <TextField
          required
          id="nombre-asignacion"
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          name="nombre"
          value={asignacion.nombre}
          onChange={handleChange}
        />
        <FormLabel>Descripción de la asignación</FormLabel>
        <TextField
          id="descripcion-asignacion"
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="descripcion"
          value={asignacion.descripcion}
          onChange={handleChange}
        />
      </FormGroup>
    </Box>
  </>
}
