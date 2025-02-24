import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Administrar from './components/administrar/administrar';
import Asignar from './components/asignar/Asignar';
import Resultados from './components/resultados/resultados';
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Container,
} from '@mui/material';
import { ListItemText } from '@mui/material';
import { AlertProvider } from './contexts/AlertContext';

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";

// Sample app imports
import { PageLayout } from "./ui-components/PageLayout";
import { Profile } from "./pages/Profile";
import { Logout } from "./pages/Logout";

// Class-based equivalents of "Profile" component
import { ProfileWithMsal } from "./pages/ProfileWithMsal";
import { ProfileRawContext } from "./pages/ProfileRawContext";
import { ProfileUseMsalAuthenticationHook } from "./pages/ProfileUseMsalAuthenticationHook";
import { Home } from './pages/Home';

const drawerWidth = 140;

function App({ pca }) {
    const navigate = useNavigate();
    const navigationClient = new CustomNavigationClient(navigate);
    pca.setNavigationClient(navigationClient);

    return (
        <MsalProvider instance={pca}>
            <AlertProvider>
                    <PageLayout>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Container sx={{ flexGrow: 1, p: 3, width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` } }}>
                                <Routes>
                                    <Route path="/administrar" element={<Administrar />} />
                                    <Route path="/asignar" element={<Asignar />} />
                                    <Route path="/resultados" element={<Resultados />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/profileWithMsal" element={<ProfileWithMsal />} />
                                    <Route path="/profileRawContext" element={<ProfileRawContext />} />
                                    <Route path="/profileUseMsalAuthenticationHook" element={<ProfileUseMsalAuthenticationHook />} />
                                    <Route path="/logout" element={<Logout />} />
                                    <Route path="*" element={<Home />} /> 
                                </Routes>
                            </Container>
                        </Box>
                    </PageLayout>
            </AlertProvider>
        </MsalProvider>
    );
}

export default App;