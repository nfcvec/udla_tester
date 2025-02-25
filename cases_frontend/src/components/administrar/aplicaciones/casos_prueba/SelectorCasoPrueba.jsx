import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import apiCases from '../../../../services/apiCases';
import { useAlert } from '../../../../contexts/AlertContext';

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
        pageSize: 5,
        page: 0,
    });

    const [selectionModel, setSelectionModel] = useState(
        isMultiple
            ? (casosPrueba || []).map((cp) => cp.id)
            : casoPrueba
                ? [casoPrueba.id]
                : []
    );

    const fetchData = async () => {
        const params = {
            pagination: JSON.stringify(paginationModel),
        };

        if (sortModel.length > 0) {
            params.sort = JSON.stringify(sortModel);
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

    const handleSortModelChange = (newSortModel) => {
        setSortModel(newSortModel);
    };

    const handleFilterModelChange = useCallback((newFilterModel) => {
        setFilterModel(newFilterModel);
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'paso_a_paso', headerName: 'Paso a Paso', width: 200 },
        { field: 'funcionalidad', headerName: 'Funcionalidad', width: 150, valueGetter: (params) => params.nombre },
        { field: 'so', headerName: 'SO', width: 150, valueGetter: (params) => params.nombre },
        { field: 'tipo_prueba', headerName: 'Tipo Prueba', width: 150, valueGetter: (params) => params.nombre },
        { field: 'pantalla', headerName: 'Pantalla', width: 150, valueGetter: (params) => params.nombre },
        { field: 'tipo_usuario', headerName: 'Tipo Usuario', width: 150, valueGetter: (params) => params.nombre },
    ];

    return (
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
            getRowId={(row) => row.id}
            checkboxSelection={isMultiple}
            disableRowSelectionOnClick={!isMultiple}
            rowSelection={isMultiple ? 'multiple' : 'single'}
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection);
            }}
        />
    );
}