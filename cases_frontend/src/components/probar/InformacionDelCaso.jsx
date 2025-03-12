import { Box, Card, DialogContent, DialogTitle, Typography } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const InformacionDelCaso = ({ caso }) => {
    return (
        <>
            <DialogTitle>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <ReportProblemIcon color="warning" fontSize="large" />
                    <Typography variant="h6">
                        <strong>Recuerda</strong>
                    </Typography>
                    <Typography variant="h6">
                        <strong>Para realizar estas pruebas debes tener:</strong>
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box component={Card} p={2}>
                    <Typography variant="h6">
                        <strong>Tipo de usuario:</strong> {caso?.caso_prueba?.tipo_usuario?.nombre}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Pantalla:</strong> {caso?.caso_prueba?.pantalla?.nombre}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Sistema operativo:</strong> {caso?.caso_prueba?.so?.nombre}
                    </Typography>
                    <Typography variant="h6">
                        <strong>Tipo de prueba:</strong> {caso?.caso_prueba?.tipo_prueba?.nombre}
                    </Typography>
                </Box>
            </DialogContent>
        </>
    );
}

export default InformacionDelCaso;
