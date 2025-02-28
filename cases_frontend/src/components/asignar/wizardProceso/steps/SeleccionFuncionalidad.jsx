import { Box, FormLabel, Typography, CircularProgress } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useProceso } from '../../context/ProcesoContext';
import { useAlert } from '../../../../contexts/AlertContext';
import apiCases from '../../../../services/apiCases';

export default function SeleccionFuncionalidad({
  selectedProceso,
  setSelectedProceso,
}) {

  const handleSelect = (funcionalidades) => {
    setSelectedProceso((prev) => ({ ...prev, funcionalidades }));
  };

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
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
    };
    // Always filter by aplicacion.id if present
    let filters = [];

    if (selectedProceso?.aplicacion?.id) {
      filters.push({
        field: 'aplicacion_id',
        operator: 'equals',
        value: selectedProceso?.aplicacion?.id,
      });
    }

    if (search) {
      filters.push({
        field: 'nombre',
        operator: 'contains',
        value: search,
      });
    }

    if (filters.length > 0) {
      params.filters = JSON.stringify(filters);
    }

    try {
      const response = await apiCases.readFuncionalidades(params);
      setData(response.data.data);
      setTotal(response.data.total);
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

  useEffect(() => {
    setSearch('');
    handleClose();
  }
    , [selectedProceso]);

  return <>
    <Box gap={2} py={2}>
      <FormLabel>Selecciona las funcionalidades</FormLabel>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={data}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        loading={loading}
        value={selectedProceso.funcionalidades}
        getOptionLabel={(option) => option.nombre}
        onChange={(event, newValue) => {
          setSelectedProceso((prev) => ({ ...prev, funcionalidades: newValue }));
        }}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            variant="outlined"
            label="Funcionalidades"
            placeholder="Selecciona las funcionalidades"
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
