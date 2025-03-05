import { Typography } from "@mui/material";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

export default function CasosPorProbar() {    
    const { instance } = useMsal();
    const { account } = instance.getActiveAccount();


    return (
        <>
            <Typography variant="h6">
                Casos por probar de {JSON.stringify(account)}
            </Typography>
        </>
    );
}