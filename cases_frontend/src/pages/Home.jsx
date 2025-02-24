import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Container, Stack } from "@mui/material";

export function Home() {
  return (
    <>
      <AuthenticatedTemplate>
        <Container>
          <Typography variant="h6">
            ¡Bienvenido a la aplicación de clasificación de casos de prueba!
          </Typography>
            <Stack spacing={2} direction="row">
                <Button component={RouterLink} to="/administrar">
                  Administrar
                </Button>
                <Button component={RouterLink} to="/asignar">
                  Asignar
                </Button>
                <Button component={RouterLink} to="/resultados">
                  Resultados
                </Button>
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