import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InformacionDelCaso from "./InformacionDelCaso";
import PreviewCasoPrueba from "./PreviewCasoPrueba";
import FormularioResultado from "./FormularioResultado";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import apiCases from "../../services/apiCases";
import { useAlert } from "../../contexts/AlertContext";

const ProbarCasosWizard = ({ asignaciones, open, setOpen, fetchAsignaciones }) => {
    const showAlert = useAlert();
    const [isViewingInfo, setIsViewingInfo] = useState(true);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [isFillingForm, setIsFillingForm] = useState(false);
    const [elapsedtime, setElapsedtime] = useState(0);
    const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
    const [result, setResult] = useState({
        ok_funcionamiento: false,
        ok_ux: false,
        observaciones: "",
        id_usuario_prueba: ""
    });

    useEffect(() => {
        if (open) {
            setCurrentCaseIndex(0);
            setElapsedtime(0);
            setResult({
                ok_funcionamiento: false,
                ok_ux: false,
                observaciones: "",
                id_usuario_prueba: ""
            });
            setIsViewingInfo(true);
            setIsPreviewing(false);
            setIsFillingForm(false);
        }
    }, [open]);

    useEffect(() => {
        if (isFillingForm) {
            const interval = setInterval(() => {
                setElapsedtime((prevElapsedtime) => prevElapsedtime + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isFillingForm]);

    useEffect(() => {
        if (currentCaseIndex >= asignaciones.length) {
            setOpen(false);
        }

        setIsViewingInfo(true);
        setIsPreviewing(false);
        setIsFillingForm(false);
    }, [currentCaseIndex, asignaciones, setOpen]);

    const handleViewInfo = () => {
        setIsViewingInfo(true);
        setIsPreviewing(false);
        setIsFillingForm(false);
    };

    const handleStartPreview = () => {
        setIsViewingInfo(false);
        setIsPreviewing(true);
        setIsFillingForm(false);
    };

    const handleStartForm = () => {
        setElapsedtime(0);
        setIsViewingInfo(false);
        setIsPreviewing(false);
        setIsFillingForm(true);
    };

    const handleNextCase = () => {
        setIsFillingForm(false);
        setIsViewingInfo(true);
        setElapsedtime(0);
        setResult({
            ok_funcionamiento: false,
            ok_ux: false,
            observaciones: "",
            id_usuario_prueba: ""
        });
        setCurrentCaseIndex((prevIndex) => prevIndex + 1);
    };

    const handleSubmit = async () => {
        if (!result.id_usuario_prueba) {
            showAlert("Debes indicar el usuario que ejecutó el caso de prueba", "error");
            return;
        }

        if (!result.ok_funcionamiento || !result.ok_ux) {
            if (!result.observaciones) {
                showAlert("Debes indicar alguna observación", "error");
                return;
            }
        }
        try {
            const response = await apiCases.createResultado({
                asignacion_id: asignaciones[currentCaseIndex].id,
                id_usuario_prueba: result.id_usuario_prueba,
                tiempo_resolucion: elapsedtime,
                ok_funcionamiento: result.ok_funcionamiento,
                ok_ux: result.ok_ux,
                observaciones: result.observaciones
            });
            if (response.status === 200) {
                showAlert(`Resultado enviado correctamente. Tiempo que tomo: ${elapsedtime} segundos.`, "success");
            }
            fetchAsignaciones();
            handleNextCase();
        } catch (error) {
            console.error("Error al enviar el resultado:", error);
        }
    };

    const handleBack = () => {
        if (isFillingForm) {
            setIsFillingForm(false);
            setIsPreviewing(true);
        } else if (isPreviewing) {
            setIsPreviewing(false);
            setIsViewingInfo(true);
        } else {
            setIsViewingInfo(false);
            setIsPreviewing(false);
            setIsFillingForm(false);
        }
    }

    const handleExit = () => {
        setIsFillingForm(false);
        setOpen(false);
    };

    const currentCase = asignaciones[currentCaseIndex];

    return (
        <>
            <Dialog
                open={open}
                onClose={handleExit}
                fullWidth
                maxWidth="md"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <DialogTitle>
                        {`Probando caso ${currentCaseIndex + 1} de ${asignaciones.length}`}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleExit}>Salir</Button>
                    </DialogActions>
                </Box>
                <DialogContent>
                    {isViewingInfo && (
                        <InformacionDelCaso caso={currentCase} />
                    )}
                    {isPreviewing && (
                        <PreviewCasoPrueba caso={currentCase} />
                    )}
                    {isFillingForm && (
                        <FormularioResultado caso={currentCase} elapsedTime={elapsedtime} result={result} setResult={setResult} />
                    )}
                </DialogContent>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    padding: 2
                }}>
                    <Button onClick={handleBack} disabled={isViewingInfo}>Atrás</Button>
                    {isViewingInfo && (
                        <Button onClick={handleStartPreview}>Continuar</Button>
                    )}
                    {isPreviewing && (
                        <Button onClick={handleStartForm}>Iniciar</Button>
                    )}
                    {isFillingForm && (
                        <Button onClick={handleSubmit}>Enviar</Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProbarCasosWizard;
