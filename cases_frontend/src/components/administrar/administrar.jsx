import { Box, Button, Container, Tabs, Tab, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import CRUDFuncionalidades from "./aplicaciones/funcionalidades/crud";
import CRUDPantallas from "./aplicaciones/pantallas/crud";
import CRUDTiposPrueba from "./aplicaciones/tipos_prueba/crud";
import CRUDAplicaciones from "./aplicaciones/CRUDAplicaciones";
import CRUDSO from "./aplicaciones/so/crud";
import CRUDTiposUsuario from "./aplicaciones/tipos_usuario/crud";
import CRUDCasoPrueba from "./aplicaciones/casos_prueba/CRUDCasoPrueba";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function Administrar() {
    const [aplicacion, setAplicacion] = useState({});
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton disabled={!aplicacion.nombre} onClick={() => setAplicacion({})}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 1 }}>
                    {aplicacion.nombre || "Administrar aplicaciones"}
                </Typography>
            </Box>
            {!aplicacion.nombre && (
                <Box>
                    <CRUDAplicaciones setAplicacion={setAplicacion} />
                </Box>
            )}
            {aplicacion?.nombre && (
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Casos de Prueba" {...a11yProps(0)} />
                        <Tab label="Funcionalidades" {...a11yProps(1)} />
                        <Tab label="Pantallas" {...a11yProps(2)} />
                        <Tab label="Tipos de Prueba" {...a11yProps(3)} />
                        <Tab label="Sistemas Operativos" {...a11yProps(4)} />
                        <Tab label="Tipos de Usuario" {...a11yProps(5)} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>
                        <CRUDCasoPrueba aplicacion={aplicacion} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <CRUDFuncionalidades aplicacion={aplicacion} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <CRUDPantallas aplicacion={aplicacion} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <CRUDTiposPrueba aplicacion={aplicacion} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <CRUDSO aplicacion={aplicacion} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={5}>
                        <CRUDTiposUsuario aplicacion={aplicacion} />
                    </CustomTabPanel>
                </Box>
            )}
        </>
    );
}

export default Administrar;
