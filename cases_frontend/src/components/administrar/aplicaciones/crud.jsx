import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import apiCases from '../../../services/apiCases';

const DataGridComponent = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', nombre: '' });
  const [isEdit, setIsEdit] = useState(false);

  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({});

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

  const fetchData = async (pagination, sortModel) => {
    const params = {
      limit: pagination.pageSize,
      skip: pagination.pageSize * pagination.page,
    };

    if (sortModel.length > 0) {
      params.sort_by = sortModel[0].field;
      params.sort_order = sortModel[0].sort;
    }

    if (filterModel.items && filterModel.items.length > 0) {
      filterModel.items.forEach((filter) => {
        params[filter.columnField] = filter.value;
      });
    }

    const response = await apiCases.readAplicaciones(params);
    setData(response.data.data);
    setTotal(response.data.total);
  };

  useEffect(() => {
    fetchData(paginationModel, sortModel, filterModel);
  }, [paginationModel, sortModel, filterModel]);

  const handleOpen = (row) => {
    if (row) {
      setFormData(row);
      setIsEdit(true);
    } else {
      setFormData({ id: '', nombre: '' });
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
    if (isEdit) {
      await apiCases.updateAplicacion(formData.id, formData);
    } else {
      await apiCases.createAplicacion(formData);
    }
    fetchData(paginationModel);
    handleClose();
  };

  const handleDelete = async (id) => {
    await apiCases.deleteAplicacion(id);
    fetchData(paginationModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpen(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>Add New</Button>
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
      <p>Total items: {total}</p>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Aplicacion' : 'Add New Aplicacion'}</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEdit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataGridComponent;