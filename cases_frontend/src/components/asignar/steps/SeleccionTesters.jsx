import { Autocomplete } from '@mui/material';
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function SeleccionTesters() {

  const [testers, setTesters] = useState([{
    id: 1,
    nombre: 'Tester 1'
  }, {
    id: 2,
    nombre: 'Tester 2'
  }]);
  const [selectedTesters, setSelectedTesters] = useState([]);

  return <>
    <Box>
      <Typography>Selecciona los testers</Typography>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={testers}
        getOptionLabel={(option) => option.nombre}
        filterSelectedOptions
        value={selectedTesters}
        onChange={(event, newValue) => {
          setSelectedTesters(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Testers"
            placeholder="Selecciona los testers"
          />
        )}
      />
    </Box>
  </>;
}
