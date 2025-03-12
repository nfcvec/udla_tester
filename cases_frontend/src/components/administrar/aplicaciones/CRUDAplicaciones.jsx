import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Container,
} from "@mui/material";
import apiCases from "../../../services/apiCases";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "../../../contexts/AlertContext";

const CRUDAplicaciones = ({ setAplicacion }) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ id: "", nombre: "" });
    const [isEdit, setIsEdit] = useState(false);

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
        pageSize: 20,
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

    const handleOpen = (row) => {
        if (row) {
            setFormData(row);
            setIsEdit(true);
        } else {
            setFormData({ id: "", nombre: "" });
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
        try {
            if (isEdit) {
                await apiCases.updateAplicacion(formData.id, formData);
                showAlert("Aplicación actualizada", "success");
            } else {
                await apiCases.createAplicacion(formData);
                showAlert("Aplicación creada", "success");
            }
            fetchData();
            handleClose();
        } catch (error) {
            showAlert("Error al guardar la aplicación", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiCases.deleteAplicacion(id);
            showAlert("Aplicación eliminada", "success");
            fetchData();
        } catch (error) {
            showAlert("Error al eliminar la aplicación", "error");
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "nombre", headerName: "Nombre", width: 150 },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
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
        <Box display={"flex"} flexDirection={"column"} gap={2} maxHeight={"calc(100vh - 250px)"}>

            <Box textAlign="right">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(null)}
                >
                    Añadir
                </Button>
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
                onRowClick={(row) => setAplicacion(row.row)}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {isEdit ? "Editar aplicacion" : "Agregar nueva aplicacion"}
                </DialogTitle>
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
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEdit ? "Guardar" : "Agregar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CRUDAplicaciones;
