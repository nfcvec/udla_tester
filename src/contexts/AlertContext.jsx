import React, { createContext, useState, useContext, useCallback } from 'react';
import { Alert, Stack } from '@mui/material';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, severity) => {
        setAlert({ message, severity });
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }, []);

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            {alert && (
                <Stack sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 9999 }} spacing={2}>
                    <Alert severity={alert.severity}>{alert.message}</Alert>
                </Stack>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};
