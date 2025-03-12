import { Box, Card, DialogContent, DialogTitle, Typography } from "@mui/material";

const PreviewCasoPrueba = ({ caso }) => {
    return (
        <>
            <DialogTitle>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h6">
                        <strong>Paso a paso</strong>
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box component={Card} p={2}>
                    <Typography variant="body1">
                        {caso?.caso_prueba?.paso_a_paso}
                    </Typography>
                </Box>
            </DialogContent>
        </>
    );
}

export default PreviewCasoPrueba;
