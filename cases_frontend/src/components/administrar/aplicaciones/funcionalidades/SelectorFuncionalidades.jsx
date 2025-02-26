import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import apiCases from '../../../../services/apiCases';
import { useAlert } from '../../../../contexts/AlertContext';

const SelectorFuncionalidades = ({ prefilters, isMultiple, funcionalidad, funcionalidades, setFuncionalidad, setFuncionalidades }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
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
      pagination: JSON.stringify(paginationModel),
    };

    if (sortModel.length > 0) {
      params.sorts = JSON.stringify(sortModel);
    }

    const filters = [];

    if (prefilters) {
      filters.push(...prefilters);
    }


    if (filterModel.items) {
      filterModel.items.forEach((item) => {
        filters.push({
          field: item.field,
          operator: item.operator,
          value: item.value,
        });
      });
    }

    if (filters.length > 0) {
      params.filters = JSON.stringify(filters);
    }

    if (paginationModel) {
      params.pagination = JSON.stringify(paginationModel);
    }

    if (sortModel) {
      params.sort = JSON.stringify(sortModel);
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