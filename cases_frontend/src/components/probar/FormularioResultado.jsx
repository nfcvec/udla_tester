import { Box, Card, DialogContent, DialogTitle, FormControlLabel, FormLabel, TextField, Typography, Checkbox } from "@mui/material";
import PreviewCasoPrueba from "./PreviewCasoPrueba";
import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";

const FormularioResultado = ({
    elapsedTime,
    caso,
    result,
    setResult,
}) => {
    const alert = useAlert();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResult(prevResult => ({
            ...prevResult,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setResult(prevResult => ({
            ...prevResult,
            [name]: checked
        }));
    };



    return (
        <>
            <DialogTitle>
                <PreviewCasoPrueba caso={caso} />
            </DialogTitle>
            <DialogContent>
                <Box component={Card} p={2} gap={2} display="flex" flexDirection="column">
                    <FormLabel>
                        Indica el usuario que ejecutó el caso de prueba:
                    </FormLabel>
                    <TextField
                        label="Usuario"
                        name="id_usuario_prueba"
                        value={result.id_usuario_prueba}
                        onChange={handleInputChange}
                        required={true}
                    />
                    <FormLabel>
                        Activa la casilla si el caso de prueba pasó la prueba de:
                    </FormLabel>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="ok_funcionamiento"
                                checked={result.ok_funcionamiento}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Funcionamiento"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="ok_ux"
                                checked={result.ok_ux}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Diseño"
                    />
                    <TextField
                        label="Observaciones"
                        name="observaciones"
                        value={result.observaciones}
                        multiline
                        rows={4}
                        onChange={handleInputChange}
                        required={!result.ok_funcionamiento || !result.ok_ux}
                    />
                </Box>
            </DialogContent>
        </>
    );
}

export default FormularioResultado;
