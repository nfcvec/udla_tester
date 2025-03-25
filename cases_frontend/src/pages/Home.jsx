import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Container, Stack } from "@mui/material";

export function Home() {
  const { accounts } = useMsal();
  const user = accounts[0];
  const roles = user?.idTokenClaims?.roles || [];

  return (
    <>
      <AuthenticatedTemplate>
        <Container>
          <Typography variant="h6">
            ¡Bienvenido a la aplicación de clasificación de casos de prueba!
          </Typography>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <Stack spacing={2} direction="row">
            {roles.includes("Admin") && (
              <>
                <Button component={RouterLink} to="/administrar">
                  Administrar casos de prueba
                </Button>
                <Button component={RouterLink} to="/procesos">
                  Administrar procesos de prueba
                </Button>
              </>
            )}
            {roles.includes("Tester") && (
              <Button component={RouterLink} to="/probar">
                Probar casos asignados
              </Button>
            )}
          </Stack>
        </Container>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Typography variant="h6">
          <center>¡Hola! Debes iniciar sesión para continuar...</center>
        </Typography>
      </UnauthenticatedTemplate>
    </>
  );
}