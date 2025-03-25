import { Box, Dialog, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";


const ResultadosProceso = ({
    open,
    setOpen,
    resultados,
}) => {

    const handleExcel = () => {
        const resultadosAsRows = resultados.map((resultado) => {
            return {
                ID: resultado.id,
                Fecha: new Date(resultado.created_at).toLocaleString(),
                Tester: resultado.tester.displayName,
                "ID Usuario Prueba": resultado.id_usuario_prueba,
                "Tiempo Resolución": resultado.tiempo_resolucion,
                Funciona: resultado.ok_funcionamiento,
                "UX Aprobada": resultado.ok_ux,
                Observaciones: resultado.observaciones,
                "Paso a Paso": resultado.paso_a_paso,
                Aplicación: resultado.aplicacion.nombre,
                Pantalla: resultado.pantalla.nombre,
                Funcionalidad: resultado.funcionalidad.nombre,
                "Tipo de Prueba": resultado.tipo_prueba.nombre,
                "Tipo de Usuario": resultado.tipo_usuario.nombre,
                "Sistema Operativo": resultado.so.nombre,
            };
        });
        
        const ws = XLSX.utils.json_to_sheet(resultadosAsRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Resultados");
        XLSX.writeFile(wb, "resultados.xlsx");
    };




    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'created_at', headerName: 'Fecha', width: 150, valueGetter: (params) => new Date(params).toLocaleString() },
        { field: 'tester', headerName: 'Tester', width: 200, valueGetter: (params) => params?.displayName },
        { field: 'id_usuario_prueba', headerName: 'ID Usuario Prueba', width: 150 },
        { field: 'tiempo_resolucion', headerName: 'Tiempo Resolución', width: 150 },
        { field: 'ok_funcionamiento', headerName: 'Funciona', width: 100, type: 'boolean' },
        { field: 'ok_ux', headerName: 'UX Aprobada', width: 100, type: 'boolean' },
        { field: 'observaciones', headerName: 'Observaciones', width: 300 },
        { field: 'paso_a_paso', headerName: 'Paso a Paso', width: 300 },
        { field: 'aplicacion', headerName: 'Aplicación', width: 150, valueGetter: (params) => params?.nombre },
        { field: 'pantalla', headerName: 'Pantalla', width: 150, valueGetter: (params) => params?.nombre },
        { field: 'funcionalidad', headerName: 'Funcionalidad', width: 150, valueGetter: (params) => params?.nombre },
        { field: 'tipo_prueba', headerName: 'Tipo de Prueba', width: 150, valueGetter: (params) => params?.nombre },
        { field: 'tipo_usuario', headerName: 'Tipo de Usuario', width: 150, valueGetter: (params) => params?.nombre },
        { field: 'so', headerName: 'Sistema Operativo', width: 150, valueGetter: (params) => params?.nombre },
    ];

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6">Resultados del Proceso</Typography>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <IconButton onClick={handleExcel}>Exportar a Excel</IconButton>
                <DataGrid
                    rows={resultados}
                    columns={columns}
                />
            </Box>
        </Dialog>
    );
}

export default ResultadosProceso;