import { Button, FormLabel, Typography, Avatar, Stack, Box, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { callMsGraphUserDetails } from "../../utils/MsGraphUserDetails";
import { useProceso } from "./context/ProcesoContext";
import apiCases from "../../services/apiCases";
import { deepOrange, deepPurple } from '@mui/material/colors';
import SelectorCasoPrueba from "../administrar/aplicaciones/casos_prueba/SelectorCasoPrueba";

export default function EnviarAsignaciones() {
  const [userId, setUserId] = useState('');
  const { proceso, setProceso } = useProceso();
  const [testers, setTesters] = useState([]);
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [casosPrueba, setCasosPrueba] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTester, setSelectedTester] = useState(null)
  const [selectedTesterCasosPrueba, setSelectedTesterCasosPrueba] = useState([]);
  
  const fetchSelectedTesterCasosPrueba = async () => {
    if (selectedTester) {
      const asignaciones = await apiCases.readAsignaciones({
        filters: JSON.stringify([
          {
            field: "proceso_id",
            operator: "equals",
            value: proceso.id
          },
          {
            field: "tester_id",
            operator: "equals",
            value: selectedTester.id
          }])
      });
      
      console.log("Asignaciones", asignaciones);
      setSelectedTesterCasosPrueba(
        asignaciones.data.data.map(asignacion => asignacion.caso_prueba)

      )}
  }

  const handleSelectTester = (tester) => {
    console.log("Tester", tester);
    setSelectedTester(tester);
  }

  useEffect(() => {
    fetchSelectedTesterCasosPrueba();
  }, [selectedTester]);

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

    const fetchFuncionalidades = async () => {
      if (proceso && Array.isArray(proceso.funcionalidades_proceso)) {
        const funcionalidades_ids = proceso.funcionalidades_proceso.map(funcionalidad => funcionalidad.funcionalidad_id);
        const funcionalidades = await Promise.all(funcionalidades_ids.map(async (funcionalidad_id) => {
          const funcionalidad = await apiCases.readFuncionalidad(funcionalidad_id);
          return funcionalidad.data;
        }));
        setFuncionalidades(funcionalidades);
      } else {
        console.error("Proceso or proceso.funcionalidades is not defined or not an array");
      }
    };

    const fetchCasosPrueba = async () => {
      if (proceso && Array.isArray(proceso.funcionalidades_proceso)) {
        const funcionalidades_ids = proceso.funcionalidades_proceso.map(funcionalidad => funcionalidad.funcionalidad_id);
        const casosPrueba = await apiCases.readCasosPrueba({
          filters: JSON.stringify([{
            field: "funcionalidad_id",
            operator: "isAnyOf",
            value: funcionalidades_ids
          }])
        });
        setCasosPrueba(casosPrueba.data);
      } else {
        console.error("Proceso or proceso.funcionalidades is not defined or not an array");
      }
    }

    fetchTesters();
    // fetchFuncionalidades();
    // fetchCasosPrueba();
  }, [proceso]);

  const handleAgregarClick = () => {
    console.log("Agregar");
    setOpen(true);
  }

  

  const handleAsignarClick = () => {
//     curl -X 'POST' \
//   'http://127.0.0.1:8000/asignacion/' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "proceso_id": 1,
//   "tester_id": "string",
//   "caso_prueba_id": 1
// }'
    const asignaciones = casosPrueba.map(casoPrueba => ({
      proceso_id: proceso.id,
      tester_id: selectedTester.id,
      caso_prueba_id: casoPrueba.id
    }));

    for (const asignacion of asignaciones) {
      apiCases.createAsignacion(asignacion);
    }

    console.log("Asignaciones", asignaciones);
    setOpen(false);
  }


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "funcionalidad",
      headerName: "Funcionalidad",
      width: 150,
      valueGetter: (params) => params.nombre
    },
    {
      field: "so",
      headerName: "Sistema Operativo",
      width: 150,
      valueGetter: (params) => params.nombre
    },
    {
      field: "tipo_prueba",
      headerName: "Tipo de Prueba",
      width: 150,
      valueGetter: (params) => params.nombre
    },
    {
      field: "pantalla",
      headerName: "Pantalla",
      width: 150,
      valueGetter: (params) => params.nombre
    },
    {
      field: "tipo_usuario",
      headerName: "Tipo de Usuario",
      width: 150,
      valueGetter: (params) => params.nombre
    },
    {
      field: "paso_a_paso",
      headerName: "Paso a Paso",
      width: 300,
    },
  ];

  return (
    <>
      <Typography variant="h6">Enviar Asignaciones</Typography>
      <FormLabel>Buscar usuario de graph</FormLabel>
      <Stack direction="row" spacing={2}>
        {testers.map((tester, index) => (
          <Avatar
            key={index}
            sx={{ bgcolor: index % 2 === 0 ? deepOrange[500] : deepPurple[500] }}
            title={tester.displayName}
            onClick={() => handleSelectTester(tester)}
          >
            {tester.displayName.charAt(0)}
          </Avatar>
        ))}
      </Stack>
      <FormLabel>Usuario seleccionado: {selectedTester ? selectedTester.displayName : "Ninguno"}</FormLabel>
      <Box textAlign="right">
        <Button variant="contained" onClick={handleAgregarClick}>
          Agregar
        </Button>
      </Box>
      <Box mt={2}>
        <DataGrid
          rows={Array.isArray(selectedTesterCasosPrueba) ? selectedTesterCasosPrueba : []}
          columns={columns}
          pageSizeOptions={[5]}
          paginationModel={{ pageSize: 5, page: 0 }}
          rowCount={selectedTesterCasosPrueba.length}
          paginationMode="client"
          checkboxSelection={false}
        />
      </Box>

      <pre>{JSON.stringify(selectedTesterCasosPrueba, null, 2)}</pre>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box p={2}>
          <FormLabel>Seleccionar los casos a asignar al tester</FormLabel>
          <SelectorCasoPrueba isMultiple={true} prefilters={
            [{
              field: "funcionalidad_id",
              operator: "isAnyOf",
              value: proceso.funcionalidades_proceso.map(funcionalidad => funcionalidad.id)
            }]
          } casosPrueba={casosPrueba} setCasosPrueba={setCasosPrueba} />
          <Box textAlign="right"> 
            <Button variant="contained" onClick={handleAsignarClick}>
              Asignar
            </Button>
            </Box>
        </Box>
      </Dialog>
    </>
  );
}