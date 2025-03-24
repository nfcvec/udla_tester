import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import apiCases from "../../services/apiCases";
import ProbarCasosWizard from "./ProbarCasosWizard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const ListaProcesos = ({ accounts }) => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [asignacionesOrdenadas, setAsignacionesOrdenadas] = useState([]);
    const [asignacionesPorProbar, setAsignacionesPorProbar] = useState([]);
    const [selectedProceso, setSelectedProceso] = useState(null);
    const [selectedFuncionalidad, setSelectedFuncionalidad] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchAsignaciones = async () => {
        const response = await apiCases.readAsignaciones({
            filters: JSON.stringify([{
                field: "tester_id",
                operator: "equals",
                value: accounts[0].localAccountId
            }])
        });
        setAsignaciones(response.data.data);
    }

    useEffect(() => {
        fetchAsignaciones();
    }, [accounts]);

    useEffect(() => {
        setAsignacionesOrdenadas(asignaciones.sort(
            (a, b) => a.caso_prueba.funcionalidad.nombre.localeCompare(b.caso_prueba.funcionalidad.nombre)
        ).sort(
            (a, b) => {
                if (a.resultados.length === 0 && b.resultados.length > 0) return -1;
                if (a.resultados.length > 0 && b.resultados.length === 0) return 1;
                return 0;
            }
        ));
    }, [asignaciones]);

    const handleRowClick = (row) => {
        const asignacion = asignaciones.find(asignacion => asignacion.id === row.id);
        setAsignacionesPorProbar([asignacion]);
        setOpen(true);
    }

    const handleProbarFuncionalidad = (row) => {
        setOpen(true);
    }

    const handleSelectedProceso = (row) => {
        setSelectedProceso(row);
        setSelectedFuncionalidad(null);
    }

    const handleSelectedFuncionalidad = (row) => {
        setSelectedFuncionalidad(row);
        setAsignacionesPorProbar(asignaciones
            .filter(asignacion => asignacion.proceso_id === selectedProceso.id)
            .filter(asignacion => asignacion.caso_prueba.funcionalidad.id === row.id)
            .filter(asignacion => 
            asignacion.resultados.length === 0 || 
            asignacion.resultados.some(resultado => !resultado.ok_funcionamiento || !resultado.ok_ux) &&
            !asignacion.resultados.some(resultado => resultado.ok_funcionamiento && resultado.ok_ux)
            )
        );
    }

    const handleBack = () => {
        if (selectedFuncionalidad) {
            setSelectedFuncionalidad(null);
            return;
        }
        if (selectedProceso) {
            setSelectedProceso(null);
        }
    }

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton disabled={!selectedProceso} onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">
                    {selectedFuncionalidad ? selectedFuncionalidad.nombre : selectedProceso ? selectedProceso.nombre : "Probar casos de prueba"}
                </Typography>
            </Box>
            {!selectedProceso &&
                <DataGridProcesos
                    asignaciones={asignacionesOrdenadas}
                    handleSelectedProceso={handleSelectedProceso}
                />}
            {selectedProceso && !selectedFuncionalidad &&
                <DataGridFuncionalidades
                    asignaciones={asignacionesOrdenadas.filter(asignacion => asignacion.proceso_id === selectedProceso.id)}
                    handleSelectedFuncionalidad={handleSelectedFuncionalidad}
                    handleProbarFuncionalidad={handleProbarFuncionalidad}
                />}
            {selectedFuncionalidad && <>
                <Box textAlign={"right"} mb={2}>
                    <Button onClick={handleProbarFuncionalidad} startIcon={<PlayArrowIcon />}>Continuar probando</Button>
                </Box>
                <DataGridAsignaciones
                    asignacionesOrdenadas={asignacionesOrdenadas.filter(asignacion => asignacion.proceso_id === selectedProceso.id)}
                    selectedProceso={selectedProceso}
                    selectedFuncionalidad={selectedFuncionalidad}
                    handleRowClick={handleRowClick}
                />
                <ProbarCasosWizard
                    asignaciones={asignacionesPorProbar}
                    open={open}
                    setOpen={setOpen}
                    fetchAsignaciones={fetchAsignaciones}
                />
            </>}
        </>
    );
}

const DataGridProcesos = ({ asignaciones, handleSelectedProceso }) => {
    const [asignacionesPendientes, setAsignacionesPendientes] = useState(asignaciones.filter(asignacion => asignacion.resultados.length === 0));
    const [procesos, setProcesos] = useState([]);

    useEffect(() => {
        setAsignacionesPendientes(asignaciones.filter(asignacion => asignacion.resultados.length === 0));
    }, [asignaciones]);

    useEffect(() => {
        const fetchProcesos = async () => {
            const procesosIds = [...new Set(asignacionesPendientes.map(asignacion => asignacion.proceso_id))];
            console.log(procesosIds);
            const procesosList = [];
            for (const procesoId of procesosIds) {
                const response = await apiCases.readProceso(procesoId);
                procesosList.push(response.data);
            }
            setProcesos(procesosList);
        }
        fetchProcesos();
    }, [asignacionesPendientes]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'descripcion', headerName: 'Descripción', width: 200 },
        { field: 'pendientes', headerName: 'Casos pendientes', width: 200 }
    ];

    return (<>
        <Box display={"flex"} flexDirection={"column"} gap={2} maxHeight={"calc(100vh - 250px)"}>
            <Typography variant="h6">Selecciona un proceso</Typography>
            <Typography variant="body2">Selecciona un proceso para ver las funcionalidades y casos de prueba pendientes</Typography>
            <Typography variant="body2">Haz clic en una fila para seleccionar un proceso</Typography>
            <DataGrid
                rows={procesos.map(proceso => ({
                    id: proceso.id,
                    nombre: proceso.nombre,
                    descripcion: proceso.descripcion,
                    pendientes: asignacionesPendientes.filter(asignacion => asignacion.proceso_id === proceso.id).length
                }))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                onRowClick={(params) => handleSelectedProceso(params.row)}
            />
        </Box>
    </>

    );
}

const DataGridFuncionalidades = ({ asignaciones, handleSelectedFuncionalidad, handleProbarFuncionalidad }) => {
    const [funcionalidades, setFuncionalidades] = useState([]);

    useEffect(() => {
        const uniqueFuncionalidades = [...new Map(asignaciones.map(asignacion => [asignacion.caso_prueba.funcionalidad.id, asignacion.caso_prueba.funcionalidad])).values()];
        setFuncionalidades(uniqueFuncionalidades);
    }, [asignaciones]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'pendientes', headerName: 'Casos pendientes', width: 200 },
        {
            field: 'probar', headerName: 'Probar', width: 200, renderCell: (params) => (
                <Button onClick={() => handleProbarFuncionalidad(params.row)} startIcon={<PlayArrowIcon />}>Probar</Button>
            )
        }
    ];

    return (<>
        <Box display={"flex"} flexDirection={"column"} gap={2} maxHeight={"calc(100vh - 250px)"}>
            <Typography variant="h6">Selecciona una funcionalidad</Typography>
            <Typography variant="body2">Selecciona una funcionalidad para ver los casos de prueba pendientes</Typography>
            <Typography variant="body2">Haz clic en una fila para seleccionar una funcionalidad</Typography>
            <DataGrid
                rows={funcionalidades.map(funcionalidad => ({
                    id: funcionalidad.id,
                    nombre: funcionalidad.nombre,
                    pendientes: asignaciones.filter(asignacion => asignacion.caso_prueba.funcionalidad.id === funcionalidad.id && asignacion.resultados.length === 0).length
                }))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                onRowClick={(params) => handleSelectedFuncionalidad(params.row)}
            />
        </Box>
    </>
    );
}

const DataGridAsignaciones = ({ asignacionesOrdenadas, handleRowClick }) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'funcionalidad', headerName: 'Funcionalidad', width: 200, valueGetter: (params) => params.nombre },
        { field: 'pantalla', headerName: 'Pantalla', width: 200, valueGetter: (params) => params.nombre },
        { field: 'tipo_prueba', headerName: 'Tipo de Prueba', width: 200, valueGetter: (params) => params.nombre },
        { field: 'so', headerName: 'Sistema Operativo', width: 200, valueGetter: (params) => params.nombre },
        { field: 'paso_a_paso', headerName: 'Paso a paso', width: 200 },
        {
            field: 'resultados',
            headerName: 'Resultados',
            width: 200,
            valueGetter: (params) => {
                if (!params.length) {
                    return "Pendiente";
                }
                const hasErrors = params.some(resultado => !resultado.ok_funcionamiento || !resultado.ok_ux);
                return hasErrors ? "Con errores" : "Completado";
            }
        }
    ];

    return (<>
        <Box display={"flex"} flexDirection={"column"} gap={2} maxHeight={"calc(100vh - 250px)"}>
            <Typography variant="h6">Asignaciones</Typography>
            <DataGrid
                rows={asignacionesOrdenadas
                    .map(asignacion => ({
                        id: asignacion.id,
                        funcionalidad: asignacion.caso_prueba.funcionalidad,
                        pantalla: asignacion.caso_prueba.pantalla,
                        tipo_prueba: asignacion.caso_prueba.tipo_prueba,
                        tipo_usuario: asignacion.caso_prueba.tipo_usuario,
                        so: asignacion.caso_prueba.so,
                        paso_a_paso: asignacion.caso_prueba.paso_a_paso,
                        resultados: asignacion.resultados
                    }))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                onRowClick={handleRowClick}
            />
        </Box>
    </>
    );
}

export default ListaProcesos;
