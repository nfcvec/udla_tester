import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Container, FormControl, InputLabel, NativeSelect, Select, MenuItem, Typography } from '@mui/material';
import apiCases from '../../../../services/apiCases';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAlert } from '../../../../contexts/AlertContext';

const CRUDFuncionalidades = ({ aplicacion }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', nombre: '' });
  const [isEdit, setIsEdit] = useState(false);

  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({});
  const [aplicaciones, setAplicaciones] = useState([]);

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

    if (aplicacion.id) {
      filters.push({
        field: "aplicacion_id",
        operator: "equals",
        value: aplicacion.id,
      });
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


  const handleOpen = (row) => {
    // get all aplicaciones
    apiCases.readAplicaciones({
      limit: -1,
    }).then((response) => {
      setAplicaciones(response.data.data);
    });

    if (row) {
      setFormData(row);
      setIsEdit(true);
    } else {
      setFormData({ id: '', nombre: '', aplicacion_id: aplicacion.id });
      setIsEdit(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const aplicacion = aplicaciones.find(app => app.id === formData.aplicacion_id);
    const payload = {
      ...formData,
      aplicacion,
    };

    try {
      if (isEdit) {
        await apiCases.updateFuncionalidad(formData.id, payload);
        showAlert("Funcionalidad actualizada", "success");
      } else {
        await apiCases.createFuncionalidad(payload);
        showAlert("Funcionalidad creada", "success");
      }
      fetchData();
      handleClose();
    } catch (error) {
      showAlert("Error al guardar la funcionalidad", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiCases.deleteFuncionalidad(id);
      showAlert("Funcionalidad eliminada", "success");
      fetchData();
    } catch (error) {
      showAlert("Error al eliminar la funcionalidad", "error");
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleOpen(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <Box
        textAlign="right">
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Funcionalidad' : 'Add New Funcionalidad'}</DialogTitle>
        <DialogContent>
          <Select
            autoFocus
            margin="dense"
            name="aplicacion_id"
            label="Aplicacion"
            fullWidth
            value={formData.aplicacion_id}
            onChange={handleChange}
          >
            {aplicaciones.map((aplicacion) => (
              <MenuItem key={aplicacion.id} value={aplicacion.id}>{aplicacion.nombre}</MenuItem>
            ))}
          </Select>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={formData.nombre}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            {isEdit ? "Guardar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CRUDFuncionalidades;