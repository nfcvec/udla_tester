import { Box, FormLabel, CircularProgress, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { useProceso } from '../../context/ProcesoContext';
import { useAlert } from '../../../../contexts/AlertContext';
import apiCases from '../../../../services/apiCases';
export default function SeleccionAplicacion() {
  const { proceso, setProceso } = useProceso();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showAlert = useAlert();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const params = {
      pagination: JSON.stringify({
        pageSize: -1,
        page: 0,
       }),
      filters: search ? JSON.stringify([{ field: 'nombre', operator: 'contains', value: search }]) : undefined,
    };

    try {
      const response = await apiCases.readAplicaciones(params);
      setData(response.data.data);
    } catch (error) {
      showAlert("Error al obtener los datos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [search, open]);

  return <>
    <Box gap={2} py={2}>
      <FormLabel>Selecciona una aplicación</FormLabel>
      <Autocomplete
        id="tags-outlined"
        options={data}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        loading={loading}
        getOptionLabel={(option) => option.nombre}
        value={proceso.aplicacion}
        onChange={(event, newValue) => {
          setProceso((prev) => ({ ...prev, aplicacion: newValue }));
        }}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Aplicaciones"
            placeholder="Selecciona una aplicación"
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  </>;
}
