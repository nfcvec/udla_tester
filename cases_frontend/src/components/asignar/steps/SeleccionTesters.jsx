import { Autocomplete, FormLabel } from '@mui/material';
import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../../../authConfig";
import { callMsGraphUsers } from '../../../utils/MSGraphUsersCall';
import { useAsignar } from '../context/AsignarContext';

export default function SeleccionTesters() {
  const { instance, inProgress } = useMsal();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const { asignacion, setAsignacion } = useAsignar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inProgress === InteractionStatus.None) {
          const usersResponse = await callMsGraphUsers(instance, search);
          setUsers(usersResponse.value);
        }
      } catch (e) {
        if (e instanceof InteractionRequiredAuthError) {
          instance.acquireTokenRedirect({
            scopes: loginRequest.scopes,
            account: instance.getActiveAccount()
          });
        }
      }
    };

    fetchData();
  }, [inProgress, instance, search]);

  return <>
    <Box gap={2} py={2}>
      <code>{JSON.stringify(asignacion)}</code>
      <FormLabel>Selecciona los testers</FormLabel>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={users}
        getOptionLabel={(option) => option.displayName}
        value={asignacion.testers}
        onChange={(event, newValue) => {
          setAsignacion((prev) => ({ ...prev, testers: newValue }));
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            variant="outlined"
            label="Testers"
            placeholder="Selecciona los testers"
          />
        )}
      />
    </Box>
  </>;
}
