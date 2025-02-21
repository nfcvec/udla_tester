import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Container, Select, MenuItem } from '@mui/material';
import apiCases from '../../../../services/apiCases';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CRUDCasoPrueba = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    paso_a_paso: '',
    funcionalidad_id: '',
    so_id: '',
    tipo_prueba_id: '',
    pantalla_id: '',
    aplicacion_id: '',
    tipo_usuario_id: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({});
  const [aplicaciones, setAplicaciones] = useState([]);
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [sos, setSos] = useState([]);
  const [tiposPrueba, setTiposPrueba] = useState([]);
  const [pantallas, setPantallas] = useState([]);
  const [tiposUsuario, setTiposUsuario] = useState([]);

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

    if (filterModel.items && filterModel.items.length > 0) {
      filterModel.items.forEach((filter) => {
        params.filter_column = filter.field;
        params.filter_value = filter.value;
      });
    }

    const response = await apiCases.readCasosPrueba(params);
    setData(response.data.data);
    setTotal(response.data.total);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, sortModel, filterModel]);

  const handleOpen = async (row) => {
    const [aplicacionesResponse, funcionalidadesResponse, sosResponse, tiposPruebaResponse, pantallasResponse, tiposUsuarioResponse] = await Promise.all([
      apiCases.readAplicaciones({ limit: -1 }),
      apiCases.readFuncionalidades({ limit: -1 }),
      apiCases.readSos({ limit: -1 }),
      apiCases.readTiposPrueba({ limit: -1 }),
      apiCases.readPantallas({ limit: -1 }),
      apiCases.readTiposUsuario({ limit: -1 })
    ]);

    setAplicaciones(aplicacionesResponse.data.data);
    setFuncionalidades(funcionalidadesResponse.data.data);
    setSos(sosResponse.data.data);
    setTiposPrueba(tiposPruebaResponse.data.data);
    setPantallas(pantallasResponse.data.data);
    setTiposUsuario(tiposUsuarioResponse.data.data);

    if (row) {
      setFormData(row);
      setIsEdit(true);
    } else {
      setFormData({
        id: '',
        paso_a_paso: '',
        funcionalidad_id: '',
        so_id: '',
        tipo_prueba_id: '',
        pantalla_id: '',
        aplicacion_id: '',
        tipo_usuario_id: ''
      });
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
    const payload = { ...formData };

    if (isEdit) {
      await apiCases.updateCasoPrueba(formData.id, payload);
    } else {
      await apiCases.createCasoPrueba(payload);
    }
    fetchData();
    handleClose();
  };

  const handleDelete = async (id) => {
    await apiCases.deleteCasoPrueba(id);
    fetchData();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'paso_a_paso', headerName: 'Paso a Paso', width: 150 },
    { field: 'funcionalidad', headerName: 'Funcionalidad', width: 150, valueGetter: (params) => params.nombre },
    { field: 'so', headerName: 'SO', width: 150, valueGetter: (params) => params.nombre },
    { field: 'tipo_prueba', headerName: 'Tipo Prueba', width: 150, valueGetter: (params) => params.nombre },
    { field: 'pantalla', headerName: 'Pantalla', width: 150, valueGetter: (params) => params.nombre },
    { field: 'aplicacion', headerName: 'Aplicacion', width: 150, valueGetter: (params) => params.nombre },
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
    <Container>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <Box
          textAlign="right">
          <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>Add New</Button>
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
          checkboxSelection
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEdit ? 'Edit Caso Prueba' : 'Add New Caso Prueba'}</DialogTitle>
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
            <Select
              margin="dense"
              name="funcionalidad_id"
              label="Funcionalidad"
              fullWidth
              value={formData.funcionalidad_id}
              onChange={handleChange}
            >
              {funcionalidades.map((funcionalidad) => (
                <MenuItem key={funcionalidad.id} value={funcionalidad.id}>{funcionalidad.nombre}</MenuItem>
              ))}
            </Select>
            <Select
              margin="dense"
              name="so_id"
              label="SO"
              fullWidth
              value={formData.so_id}
              onChange={handleChange}
            >
              {sos.map((so) => (
                <MenuItem key={so.id} value={so.id}>{so.nombre}</MenuItem>
              ))}
            </Select>
            <Select
              margin="dense"
              name="tipo_prueba_id"
              label="Tipo Prueba"
              fullWidth
              value={formData.tipo_prueba_id}
              onChange={handleChange}
            >
              {tiposPrueba.map((tipoPrueba) => (
                <MenuItem key={tipoPrueba.id} value={tipoPrueba.id}>{tipoPrueba.nombre}</MenuItem>
              ))}
            </Select>
            <Select
              margin="dense"
              name="pantalla_id"
              label="Pantalla"
              fullWidth
              value={formData.pantalla_id}
              onChange={handleChange}
            >
              {pantallas.map((pantalla) => (
                <MenuItem key={pantalla.id} value={pantalla.id}>{pantalla.nombre}</MenuItem>
              ))}
            </Select>
            <Select
              margin="dense"
              name="tipo_usuario_id"
              label="Tipo Usuario"
              fullWidth
              value={formData.tipo_usuario_id}
              onChange={handleChange}
            >
              {tiposUsuario.map((tipoUsuario) => (
                <MenuItem key={tipoUsuario.id} value={tipoUsuario.id}>{tipoUsuario.nombre}</MenuItem>
              ))}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              name="paso_a_paso"
              label="Paso a Paso"
              type="text"
              fullWidth
              value={formData.paso_a_paso}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary">{isEdit ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default CRUDCasoPrueba;