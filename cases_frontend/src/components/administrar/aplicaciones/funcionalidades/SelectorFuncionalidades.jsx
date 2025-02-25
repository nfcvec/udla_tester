import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import apiCases from '../../../../services/apiCases';
import { useAlert } from '../../../../contexts/AlertContext';

const SelectorFuncionalidades = ({ aplicacion, isMultiple, funcionalidad, funcionalidades, setFuncionalidad, setFuncionalidades }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [
      {
        columnField: 'aplicacion_id', operatorValue: 'equals', value: aplicacion
          ? aplicacion.id
          : ''
      },
    ],
  });
  const [selectionModel, setSelectionModel] = useState(
    funcionalidad
      ? [funcionalidad.id]
      : funcionalidades
        ? funcionalidades.map((func) => func.id)
        : []
  );

  const showAlert = useAlert();

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  const handleFilterModelChange = useCallback((newFilterModel) => {
    setFilterModel(newFilterModel);
  }, []);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const fetchData = async () => {
    const params = {
      limit: paginationModel.pageSize,
      skip: paginationModel.page * paginationModel.pageSize,
    };

    if (sortModel.length > 0) {
      params.sort_by = sortModel[0].field;
      params.sort_order = sortModel[0].sort;
    }
    // Always filter by aplicacion.id if present
    let filters = [];

    if (aplicacion && aplicacion.id) {
      filters.push({ field: 'aplicacion_id', operator: 'equals', value: aplicacion.id });
    }

    if (filterModel.items && filterModel.items.length > 0) {
      filters = filters.concat(filterModel.items);
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, sortModel, filterModel]);

  useEffect(() => {
    if (isMultiple) {
      setFuncionalidades(
        data.filter((func) => selectionModel.includes(func.id))
      );
    } else {
      setFuncionalidad(
        data.find((func) => func.id === selectionModel[0])
      );
    }
  }, [selectionModel]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
  ];

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <code>{JSON.stringify(selectionModel)}</code>
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
        rowSelection="multiple"
        keepNonExistentRowsSelected 
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={(newSelection) => {
          console.log('Seleccion:', newSelection);
          setSelectionModel(newSelection);
        }}
        checkboxSelection={isMultiple}
      />
    </Box>
  );
};

export default SelectorFuncionalidades;