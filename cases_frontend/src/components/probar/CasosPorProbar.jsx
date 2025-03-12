import { Box, Button, Typography } from "@mui/material";
import { AuthenticatedTemplate, MsalAuthenticationTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import ListaProcesos from "./ListaProcesos";

export default function CasosPorProbar() {
    const { accounts } = useMsal();

    return (
        <>
            <MsalAuthenticationTemplate interactionType="redirect">
                <AuthenticatedTemplate>
                    <CasosPorProbarContent accounts={accounts} />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <Typography variant="h6">
                        <center>¡Hola! Debes iniciar sesión para continuar...</center>
                    </Typography>
                </UnauthenticatedTemplate>
            </MsalAuthenticationTemplate>
        </>
    );
}

const CasosPorProbarContent = ({ accounts }) => {
    return (
        <>
            <ListaProcesos accounts={accounts} />
        </>
    );
}