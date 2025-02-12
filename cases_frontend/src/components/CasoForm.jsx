import React, { useState, useEffect } from 'react';
import { createCaso, updateCaso } from '../apiService';
import { TextField, Button, Typography, Box } from '@mui/material';

const CasoForm = ({ caso, onClose }) => {
    const [casoData, setCasoData] = useState({
        pantalla: '',
        funcionalidad: '',
        tipo_prueba: '',
        sistema_operativo: '',
        tipo_usuario: '',
        descripcion: ''
    });

    useEffect(() => {
        if (caso) {
            setCasoData(caso);
        }
    }, [caso]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCasoData({ ...casoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (caso) {
            await updateCaso(caso.id, casoData);
        } else {
            await createCaso(casoData);
        }
        onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                {caso ? 'Editar Caso de Prueba' : 'Crear Caso de Prueba'}
            </Typography>
            <TextField
                name="pantalla"
                label="Pantalla"
                value={casoData.pantalla}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="funcionalidad"
                label="Funcionalidad"
                value={casoData.funcionalidad}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="tipo_prueba"
                label="Tipo de Prueba"
                value={casoData.tipo_prueba}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="sistema_operativo"
                label="Sistema Operativo"
                value={casoData.sistema_operativo}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="tipo_usuario"
                label="Tipo de Usuario"
                value={casoData.tipo_usuario}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="descripcion"
                label="Descripción"
                value={casoData.descripcion}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {caso ? 'Actualizar' : 'Crear'}
            </Button>
        </Box>
    );
};

export default CasoForm;