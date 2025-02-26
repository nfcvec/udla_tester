import React from 'react';
import { useAsignar } from '../context/AsignarContext';
import { Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, FormLabel, Stack, Typography } from '@mui/material';
import SelectorCasoPrueba from '../../administrar/aplicaciones/casos_prueba/SelectorCasoPrueba';

export default function EnviarAsignaciones() {
  const { asignacion, setAsignacion } = useAsignar();
  const [open, setOpen] = React.useState(false);
  return <>

    <FormLabel>Enviar asignaciones</FormLabel>
    <Box>
      <SelectorCasoPrueba
        prefilters={[
          {
            field: 'aplicacion_id',
            operator: 'equals',
            value: asignacion.aplicacion.id
          },
          {
            field: 'funcionalidad_id',
            operator: 'isAnyOf',
            value: asignacion.funcionalidades.map(f => f.id)
          }
        ]}
        isMultiple={true}
        casoPrueba={asignacion.casoPrueba}
        casosPrueba={asignacion.casosPrueba}
        setCasoPrueba={(cp) => setAsignacion({ ...asignacion, casoPrueba: cp })}
        setCasosPrueba={(cps) => setAsignacion({ ...asignacion, casosPrueba: cps })}

      />
    </Box>
    <Box>
      <Button
        onClick={
          () => setOpen(true)
        }>Asignar</Button>
    </Box>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Selecciona un tester</DialogTitle>
      <DialogContent>
        <Stack>{asignacion.testers.map(t => <Button
          key={t.id}
          onClick={() => {
            setOpen(false);
          }}
        >{t.displayName}</Button>)}</Stack>
      </DialogContent>
    </Dialog>

  </>
}
