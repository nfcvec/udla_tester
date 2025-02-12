import React, { useState } from 'react';
import CasosList from './components/CasosList';
import CasoForm from './components/CasoForm';
import { Container, Typography, Button, Modal, Box } from '@mui/material';

function App() {
    const [open, setOpen] = useState(false);
    const [selectedCaso, setSelectedCaso] = useState(null);

    const handleOpen = (caso) => {
        setSelectedCaso(caso);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedCaso(null);
        setOpen(false);
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Gestión de Casos de Prueba
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
                Agregar Caso de Prueba
            </Button>
            <CasosList onEdit={handleOpen} />
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <CasoForm caso={selectedCaso} onClose={handleClose} />
                </Box>
            </Modal>
        </Container>
    );
}



export default App;