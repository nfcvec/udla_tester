import React, { useState } from "react";
import DataGridCasoPrueba from "./DataGridCasoPrueba";
import FormularioCasoPrueba from "./FormularioCasoPrueba";
import apiCases from "../../../../services/apiCases";
import { CasoPruebaProvider } from "./CasoPruebaContext";
import { useAlert } from '../../../../contexts/AlertContext';

const CRUDCasoPrueba = ({ aplicacion }) => {
    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const [sortModel, setSortModel] = useState([]);
    const [filterModel, setFilterModel] = useState({});
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });
    const [formData, setFormData] = useState({
        id: "",
        paso_a_paso: "",
        funcionalidad_id: "",
        so_id: "",
        tipo_prueba_id: "",
        pantalla_id: "",
        aplicacion_id: "",
        tipo_usuario_id: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    const showAlert = useAlert();

    const handleOpen = (row) => {
        if (row) {
            setFormData(row);
            setIsEdit(true);
        } else {
            setFormData({
                id: "",
                paso_a_paso: "",
                funcionalidad_id: "",
                so_id: "",
                tipo_prueba_id: "",
                pantalla_id: "",
                aplicacion_id: aplicacion.id,
                tipo_usuario_id: "",
            });
            setIsEdit(false);
        }
        setOpen(true);
    };

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
            const response = await apiCases.readCasosPrueba(params);
            setData(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            showAlert("Error al obtener los datos", "error");
        }
    };

    return (
        <CasoPruebaProvider
            value={{
                open,
                handleClose: () => setOpen(false),
                handleOpen,
                fetchData,
                aplicacion,
                formData,
                setFormData,
                isEdit,
                setIsEdit,
                data,
                total,
                sortModel,
                setSortModel,
                filterModel,
                setFilterModel,
                paginationModel,
                setPaginationModel,

            }}
        >
            <DataGridCasoPrueba />
            <FormularioCasoPrueba />
        </CasoPruebaProvider>
    );
};

export default CRUDCasoPrueba;
