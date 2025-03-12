import React, { useState, useEffect, useCallback, useContext } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Button, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import apiCases from '../../../../services/apiCases';
import { CasoPruebaContext } from './CasoPruebaContext';
import { useAlert } from '../../../../contexts/AlertContext';

const DataGridCasoPrueba = () => {
  const { handleOpen, data, total, fetchData, sortModel, setSortModel, filterModel, setFilterModel, paginationModel, setPaginationModel, aplicacion } = useContext(CasoPruebaContext);
  const showAlert = useAlert();

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  const handleFilterModelChange = useCallback((newFilterModel) => {
    setFilterModel(newFilterModel);
  }, []);

  useEffect(() => {
    fetchData();
  }, [paginationModel, sortModel, filterModel]);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este caso de prueba?");
      if (confirmed) {
        await apiCases.deleteCasoPrueba(id);
        showAlert("Caso de prueba eliminado", "success");
        fetchData();
      }
    } catch (error) {
      showAlert("Error al eliminar el caso de prueba", "error");
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'paso_a_paso', headerName: 'Paso a Paso', width: 150 },
    { field: 'funcionalidad', headerName: 'Funcionalidad', width: 150, valueGetter: (params) => params.nombre },
    { field: 'so', headerName: 'Sis. Op.', width: 150, valueGetter: (params) => params.nombre },
    { field: 'tipo_prueba', headerName: 'Tipo Prueba', width: 150, valueGetter: (params) => params.nombre },
    { field: 'pantalla', headerName: 'Pantalla', width: 150, valueGetter: (params) => params.nombre },
    { field: 'tipo_usuario', headerName: 'Tipo Usuario', width: 150, valueGetter: (params) => params.nombre },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          onClick={() => handleOpen(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} maxHeight={"calc(100vh - 250px)"}>

      <Box textAlign="right">
        <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>Añadir</Button>
      </Box>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={total}
        paginationMode="server"
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        filterMode="server"
        onFilterModelChange={handleFilterModelChange}
        checkboxSelection={false}
      />
    </Box>
  );
};

export default DataGridCasoPrueba;
