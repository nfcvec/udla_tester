import React, { useState, useEffect, useCallback, } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, } from "@mui/material";
import apiCases from "../../../services/apiCases";
import { useAlert } from "../../../contexts/AlertContext";

const SelectorAplicaciones = ({ isMultiple, setAplicacion, setAplicaciones }) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const [sortModel, setSortModel] = useState([]);
    const [filterModel, setFilterModel] = useState({});

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
        const params = {};

        params.sorts = JSON.stringify(sortModel);
        params.filters = JSON.stringify(filterModel.items);
        params.pagination = JSON.stringify(paginationModel);

        try {
            const response = await apiCases.readAplicaciones(params);
            setData(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            showAlert("Error al obtener los datos", "error");
        }
    };

    useEffect(() => {
        fetchData();
    }, [paginationModel, sortModel, filterModel]);





    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "nombre", headerName: "Nombre", width: 150 },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
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
                checkboxSelection={isMultiple}
                onRowClick={(row) => {
                    if (isMultiple) {
                        setAplicaciones((prev) => [...prev, row.row]);
                    } else {
                        setAplicacion(row.row);
                    }
                }}
            />
        </Box>
    );
};

export default SelectorAplicaciones;
