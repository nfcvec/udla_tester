import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import CRUDFuncionalidades from './aplicaciones/funcionalidades/crud';
import CRUDPantallas from './aplicaciones/pantallas/crud';
import CRUDTiposPrueba from './aplicaciones/tipos_prueba/crud';
import CRUDAplicaciones from './aplicaciones/crud';

function Administrar() {

    const [aplicacion, setAplicacion] = useState({});

    return (
        <>
            {!aplicacion.nombre && <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h3">Seleccione una aplicacion</Typography>
                <CRUDAplicaciones setAplicacion={setAplicacion} />
            </Box>}
            {aplicacion?.nombre && <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center' }}>
                <Button onClick={() => setAplicacion({})}>Volver</Button>
                <CRUDFuncionalidades aplicacion={aplicacion} />
                <CRUDPantallas aplicacion={aplicacion} />
                <CRUDTiposPrueba aplicacion={aplicacion} />
            </Box>}
        </>
    );
}



export default Administrar;