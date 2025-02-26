import React, { useState, useEffect, useContext } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import apiCases from "../../../../services/apiCases";
import { CasoPruebaContext } from "./CasoPruebaContext";
import { useAlert } from '../../../../contexts/AlertContext';

const FormularioCasoPrueba = () => {
    const {
        open,
        handleClose,
        fetchData,
        aplicacion,
        formData,
        setFormData,
        isEdit,
    } = useContext(CasoPruebaContext);
    const showAlert = useAlert();
    const [aplicaciones, setAplicaciones] = useState([]);
    const [funcionalidades, setFuncionalidades] = useState([]);
    const [sos, setSos] = useState([]);
    const [tiposPrueba, setTiposPrueba] = useState([]);
    const [pantallas, setPantallas] = useState([]);
    const [tiposUsuario, setTiposUsuario] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            const filters = [];
            if (aplicacion.id) {
                filters.push({
                    field: "aplicacion_id",
                    operator: "equals",
                    value: aplicacion.id,
                });
            }

            const [
                funcionalidadesResponse,
                sosResponse,
                tiposPruebaResponse,
                pantallasResponse,
                tiposUsuarioResponse,
            ] = await Promise.all([
                apiCases.readFuncionalidades({
                    limit: -1,
                    filters: JSON.stringify(filters),
                }),
                apiCases.readSos({
                    limit: -1,
                    filters: JSON.stringify(filters),
                }),
                apiCases.readTiposPrueba({
                    limit: -1,
                    filters: JSON.stringify(filters),
                }),
                apiCases.readPantallas({
                    limit: -1,
                    filters: JSON.stringify(filters),
                }),
                apiCases.readTiposUsuario({
                    limit: -1,
                    filters: JSON.stringify(filters),
                }),
            ]);

            setAplicaciones([aplicacion]);
            setFuncionalidades(funcionalidadesResponse.data.data);
            setSos(sosResponse.data.data);
            setTiposPrueba(tiposPruebaResponse.data.data);
            setPantallas(pantallasResponse.data.data);
            setTiposUsuario(tiposUsuarioResponse.data.data);
        };

        fetchOptions();
    }, []);

    const handleChange = (e, value, name) => {
        setFormData({ ...formData, [name]: value.id });
    };

    const handleKeystroke = async (e, value, name, apiMethod, state, setState) => {
        if (!value) return;

        if (e.key === "Enter" || e.key === "Tab") {
            const found = state.find((item) => item.nombre === value);
            if (found) {
                setFormData({ ...formData, [name]: found.id });
            } else {
                const payload = { nombre: value, aplicacion_id: aplicacion.id };
                const response = await apiMethod(payload);
                setState([...state, response.data]);
                setFormData({ ...formData, [name]: response.data.id });
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = { ...formData };

            if (isEdit) {
                await apiCases.updateCasoPrueba(formData.id, payload);
                showAlert("Caso de prueba actualizado", "success");
            } else {
                await apiCases.createCasoPrueba(payload);
                showAlert("Caso de prueba creado", "success");
            }
            fetchData();
            handleClose();
        } catch (error) {
            showAlert("Error al guardar el caso de prueba", "error");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {isEdit ? "Editar caso de prueba" : "Agregar caso de prueba"}
            </DialogTitle>
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    width={512}
                    p={2}
                    gap={2}
                >
                    <Autocomplete
                        autoFocus
                        margin="dense"
                        options={aplicaciones}
                        getOptionLabel={(option) => option.nombre}
                        fullWidth
                        freeSolo
                        value={
                            aplicaciones.find(
                                (option) => option.id === formData.aplicacion_id
                            ) || null
                        }
                        onChange={(e, value) =>
                            handleChange(e, value, "aplicacion_id")
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Aplicacion" />
                        )}
                    />
                    <Autocomplete
                        margin="dense"
                        options={funcionalidades}
                        getOptionLabel={(option) => option.nombre}
                        fullWidth
                        freeSolo
                        value={
                            funcionalidades.find(
                                (option) =>
                                    option.id === formData.funcionalidad_id
                            ) || null
                        }
                        onChange={(e, value) =>
                            handleChange(e, value, "funcionalidad_id")
                        }
                        onKeyDown={(e) =>
                            handleKeystroke(e, e.target.value, "funcionalidad_id", apiCases.createFuncionalidad, funcionalidades, setFuncionalidades)
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Funcionalidad" />
                        )}
                    />
                    <Autocomplete
                        margin="dense"
                        options={sos}
                        getOptionLabel={(option) => option.nombre}
                        fullWidth
                        freeSolo
                        value={
                            sos.find(
                                (option) => option.id === formData.so_id
                            ) || null
                        }
                        onChange={(e, value) => handleChange(e, value, "so_id")}
                        onKeyDown={(e) =>
                            handleKeystroke(e, e.target.value, "so_id", apiCases.createSo, sos, setSos)
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Sis. Op." />
                        )}
                    />
                    <Autocomplete
                        margin="dense"
                        options={tiposPrueba}
                        getOptionLabel={(option) => option.nombre}
                        fullWidth
                        freeSolo
                        value={
                            tiposPrueba.find(
                                (option) =>
                                    option.id === formData.tipo_prueba_id
                            ) || null
                        }
                        onChange={(e, value) =>
                            handleChange(e, value, "tipo_prueba_id")
                        }
                        onKeyDown={(e) =>
                            handleKeystroke(e, e.target.value, "tipo_prueba_id", apiCases.createTipoPrueba, tiposPrueba, setTiposPrueba)
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tipo Prueba" />
                        )}
                    />
                    <Autocomplete
                        margin="dense"
                        options={pantallas}
                        getOptionLabel={(option) => option.nombre}
                        fullWidth
                        freeSolo
                        value={
                            pantallas.find(
                                (option) => option.id === formData.pantalla_id
                            ) || null
                        }
                        onChange={(e, value) =>
                            handleChange(e, value, "pantalla_id")
                        }
                        onKeyDown={(e) =>
                            handleKeystroke(e, e.target.value, "pantalla_id", apiCases.createPantalla, pantallas, setPantallas)
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Pantalla" />
                        )}
                    />
                    <Autocomplete
                        margin="dense"
                        options={tiposUsuario}
                        getOptionLabel={(option) => option.nombre}
                        fullWidth
                        freeSolo
                        value={
                            tiposUsuario.find(
                                (option) =>
                                    option.id === formData.tipo_usuario_id
                            ) || null
                        }
                        onChange={(e, value) =>
                            handleChange(e, value, "tipo_usuario_id")
                        }
                        onKeyDown={(e) =>
                            handleKeystroke(e, e.target.value, "tipo_usuario_id", apiCases.createTipoUsuario,tiposUsuario, setTiposUsuario)
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tipo Usuario" />
                        )}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="paso_a_paso"
                        label="Paso a Paso"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.paso_a_paso}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                paso_a_paso: e.target.value,
                            })
                        }
                    />
                </Box>
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
    );
};

export default FormularioCasoPrueba;
