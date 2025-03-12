import { Button, FormLabel, Typography, Avatar, Stack, Box, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridDeleteIcon } from "@mui/x-data-grid";
import { callMsGraphUserDetails } from "../../utils/MsGraphUserDetails";
import { useProceso } from "./context/ProcesoContext";
import apiCases from "../../services/apiCases";
import { deepOrange, deepPurple } from '@mui/material/colors';
import SelectorCasoPrueba from "../administrar/aplicaciones/casos_prueba/SelectorCasoPrueba";

export default function EnviarAsignaciones() {
  const { proceso, setProceso } = useProceso();
  const [testers, setTesters] = useState([]);
  const [casosPrueba, setCasosPrueba] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTester, setSelectedTester] = useState(null)
  const [asignaciones, setAsignaciones] = useState([]);

  const fetchAsignacionesProceso = async () => {
    const asignaciones = await apiCases.readAsignaciones({
      filters: JSON.stringify([
        {
          field: "proceso_id",
          operator: "equals",
          value: proceso.id
        }
      ])
    });
    setAsignaciones(asignaciones.data.data);
  }

  const handleSelectTester = (tester) => {
    console.log("Tester", tester);
    setSelectedTester(tester);
  }

  const handleDeleteAsignacion = async (asignacion) => {
    console.log("Eliminar asignacion", asignacion);
    await apiCases.deleteAsignacion(asignacion.id);
    fetchAsignacionesProceso();
  }


  useEffect(() => {
    const fetchTesters = async () => {
      if (proceso && Array.isArray(proceso.testers_proceso)) {
        const testers_ids = proceso.testers_proceso.map(tester => tester.tester_id);
        const testers = await Promise.all(testers_ids.map(async (tester_id) => {
          const tester = await callMsGraphUserDetails({ userId: tester_id });
          return tester;
        }));
        setTesters(testers);
      } else {
        console.error("Proceso or proceso.testers is not defined or not an array");
      }
    };

    fetchTesters();
    fetchAsignacionesProceso();
  }, [proceso]);

  const handleAgregarClick = () => {
    setOpen(true);
  }



  const handleAsignarClick = async () => {
    const asignaciones = casosPrueba.map(casoPrueba => ({
      proceso_id: proceso.id,
      tester_id: selectedTester.id,
      caso_prueba_id: casoPrueba.id
    }));

    await Promise.all(asignaciones.map(asignacion => apiCases.createAsignacion(asignacion)));

    console.log("Asignaciones", asignaciones);

    setOpen(false);

    fetchAsignacionesProceso();
  }


  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<GridDeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteAsignacion(params.row)}
          // deshabilitar si asignacion.resultados.length > 0
          disabled={params.row.resultados?.length > 0}
        />,
      ],
    },
    {
      field: "funcionalidad",
      headerName: "Funcionalidad",
      width: 150,
      valueGetter: (params) => params?.nombre
    },
    {
      field: "so",
      headerName: "Sistema Operativo",
      width: 150,
      valueGetter: (params) => params?.nombre
    },
    {
      field: "tipo_prueba",
      headerName: "Tipo de Prueba",
      width: 150,
      valueGetter: (params) => params?.nombre
    },
    {
      field: "pantalla",
      headerName: "Pantalla",
      width: 150,
      valueGetter: (params) => params?.nombre
    },
    {
      field: "tipo_usuario",
      headerName: "Tipo de Usuario",
      width: 150,
      valueGetter: (params) => params?.nombre
    },
    {
      field: "paso_a_paso",
      headerName: "Paso a Paso",
      width: 300,
    }
  ];

  return (
    <>
      <Typography variant="h6">Enviar Asignaciones</Typography>
      <FormLabel>Testers del proceso</FormLabel>
      <Stack direction="row" spacing={2}>
        {testers.map((tester, index) => (
          <Avatar
            key={index}
            sx={{
              bgcolor: index % 2 === 0 ? deepOrange[500] : deepPurple[500],
              width: selectedTester?.id === tester.id ? 56 : 40,
              height: selectedTester?.id === tester.id ? 56 : 40,
            }}
            title={tester.displayName}
            onClick={() => handleSelectTester(tester)}
          >
            {tester.displayName.charAt(0)}
          </Avatar>
        ))}
      </Stack>
      {selectedTester?.displayName && (<>
        <Box mt={2} display={'flex'} flexDirection={'column'} gap={2} height={400} width="100%">
          <FormLabel>Casos asignados a {selectedTester.displayName}</FormLabel>
          <Box textAlign="right">
            <Button variant="contained" onClick={handleAgregarClick}>
              Asignar
            </Button>
          </Box>
          <DataGrid
            rows={
              Array.isArray(asignaciones) ? asignaciones.filter((asignacion) => asignacion.tester_id === selectedTester.id).map((asignacion) => ({ ...asignacion.caso_prueba, id: asignacion.id })) : []
            }
            columns={columns}  
            checkboxSelection={false}
          />
        </Box></>) || <Typography variant="body1">Seleccione un tester para ver sus asignaciones</Typography>}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl" fullWidth>
        <Box p={2} display={'flex'} flexDirection={'column'} gap={2} sx={{
          height: 600,
        }} >
          <FormLabel>Seleccionar los casos a asignar a {selectedTester?.displayName}</FormLabel>
          <SelectorCasoPrueba isMultiple={true} prefilters={
            [{
              field: "funcionalidad_id",
              operator: "isAnyOf",
              value: proceso.funcionalidades_proceso.map(funcionalidad => funcionalidad.funcionalidad_id)
            },
            {
              field: "id",
              operator: "isNoneOf",
              value: asignaciones.map(asignacion => asignacion.caso_prueba_id)
            },
            ]
          } casosPrueba={casosPrueba} setCasosPrueba={setCasosPrueba} />
          <Box textAlign="right">
            <Button variant="contained" onClick={handleAsignarClick}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}