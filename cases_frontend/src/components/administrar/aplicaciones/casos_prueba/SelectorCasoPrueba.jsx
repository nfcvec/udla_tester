import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import apiCases from '../../../../services/apiCases';
import { useAlert } from '../../../../contexts/AlertContext';
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

export default function SelectorCasoPrueba({
    prefilters,
    isMultiple,
    casoPrueba,
    casosPrueba,
    setCasoPrueba,
    setCasosPrueba,
}) {
    const showAlert = useAlert();

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [sortModel, setSortModel] = useState([]);
    const [filterModel, setFilterModel] = useState({ items: [] });
    const [paginationModel, setPaginationModel] = useState({
        pageSize: -1,
        page: 0,
    });
    const [selectionModel, setSelectionModel] = useState(
        isMultiple
            ? Array.isArray(casosPrueba) ? casosPrueba.map((cp) => cp.id) : []
            : casoPrueba
            ? [casoPrueba.id]
            : []
    );

    const [selectedFilters, setSelectedFilters] = useState({
        funcionalidad: [],
        so: [],
        tipo_usuario: [],
    });

    const fetchData = async () => {
        const params = {
            pagination: JSON.stringify(paginationModel),
        };

        if (sortModel.length > 0) {
            params.sorts = JSON.stringify(sortModel);
        }

        // Construir filtros si aplicacion tiene ID
        const filters = [];
        
        if (prefilters) {
            filters.push(...prefilters);
        }

        if (filterModel.items && filterModel.items.length > 0) {
            filters.push(...filterModel.items);
        }

        if (filters.length > 0) {
            params.filters = JSON.stringify(filters);
        }

        try {
            const response = await apiCases.readCasosPrueba(params);
            setData(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            showAlert('Error al obtener los casos de prueba', 'error');
        }
    };

    useEffect(() => {
        fetchData();
    }, [paginationModel, sortModel, filterModel]);

    useEffect(() => {
        if (isMultiple) {
            setCasosPrueba(
                data.filter((cp) => selectionModel.includes(cp.id))
            );
        } else {
            setCasoPrueba(
                data.find((cp) => cp.id === selectionModel[0]) || null
            );
        }
    }, [selectionModel, data]);

    const columns = [
        { field: 'funcionalidad', headerName: 'Funcionalidad', width: 150, valueGetter: (params) => params.nombre },
        { field: 'so', headerName: 'Sis. Op.', width: 150, valueGetter: (params) => params.nombre },
        { field: 'tipo_usuario', headerName: 'Tipo Usuario', width: 150, valueGetter: (params) => params.nombre },
        { field: 'tipo_prueba', headerName: 'Tipo Prueba', width: 150, valueGetter: (params) => params.nombre },
        { field: 'pantalla', headerName: 'Pantalla', width: 150, valueGetter: (params) => params.nombre },
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'paso_a_paso', headerName: 'Paso a Paso', width: 200 },
    ];

    const renderSelect = (label, filterKey, dataKey) => (
        <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={selectedFilters[filterKey]}
                onChange={(event) => {
                    setSelectedFilters((prev) => ({
                        ...prev,
                        [filterKey]: event.target.value,
                    }));
                }}
                label={label}
                sx={{ width: '100%' }}
            >
                {[...new Set(
                    data
                        .filter((cp) => {
                            const matchesFuncionalidad = selectedFilters.funcionalidad.length === 0 || selectedFilters.funcionalidad.includes(cp.funcionalidad.nombre);
                            const matchesSO = selectedFilters.so.length === 0 || selectedFilters.so.includes(cp.so.nombre);
                            const matchesTipoUsuario = selectedFilters.tipo_usuario.length === 0 || selectedFilters.tipo_usuario.includes(cp.tipo_usuario.nombre);
                            return (
                                (filterKey === 'funcionalidad' ? matchesSO && matchesTipoUsuario :
                                filterKey === 'so' ? matchesFuncionalidad && matchesTipoUsuario :
                                matchesFuncionalidad && matchesSO)
                            );
                        })
                        .map((cp) => cp[dataKey].nombre)
                )].map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: { sm: 'column', md: 'row' },
                justifyContent: 'between',
                alignItems: 'center',
                mb: 2,
                gap: 2,
            }}
        >
            {renderSelect('Funcionalidad', 'funcionalidad', 'funcionalidad')}
            {renderSelect('Sistema Operativo', 'so', 'so')}
            {renderSelect('Tipo de Usuario', 'tipo_usuario', 'tipo_usuario')}
        </Box>
        <DataGrid
            rows={data.filter((cp) => {
                const matchesFuncionalidad = selectedFilters.funcionalidad.length === 0 || selectedFilters.funcionalidad.includes(cp.funcionalidad.nombre);
                const matchesSO = selectedFilters.so.length === 0 || selectedFilters.so.includes(cp.so.nombre);
                const matchesTipoUsuario = selectedFilters.tipo_usuario.length === 0 || selectedFilters.tipo_usuario.includes(cp.tipo_usuario.nombre);
                return matchesFuncionalidad && matchesSO && matchesTipoUsuario;
            })}
            columns={columns}
            disableColumnFilter
            disableColumnSorting
            disableColumnMenu
            getRowId={(row) => row.id}
            checkboxSelection={isMultiple}
            disableRowSelectionOnClick={!isMultiple}
            rowSelection={isMultiple}
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection);
            }}
        />
        </>
    );
}