import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { callMsGraphUserDetails } from "../../utils/MsGraphUserDetails";
import { useProceso } from "./context/ProcesoContext";
import apiCases from "../../services/apiCases";

export default function EnviarAsignaciones() {
  const [userId, setUserId] = useState('');
  const { proceso, setProceso } = useProceso();
  const [testers, setTesters] = useState([]);
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [casosPrueba, setCasosPrueba] = useState([]);

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
     //los caso de prueba se consultan por funcionalidad, se debe incluir en los parametros de la consulta 
     //params.filters=JSON.stringify({
      //  field: "funcionalidad_id",
      //  operator: "isAnyOf",
      //  value: funcionalidades_ids
       //
      //})
      if (proceso && Array.isArray(proceso.funcionalidades_proceso)) {
        const funcionalidades_ids = proceso.funcionalidades_proceso.map(funcionalidad => funcionalidad.funcionalidad_id);
        const casosPrueba = await apiCases.readCasosPrueba({filters:JSON.stringify([{
          field: "funcionalidad_id",
          operator: "isAnyOf",
          value: funcionalidades_ids
        }])});
        setCasosPrueba(casosPrueba.data);
      } else {
        console.error("Proceso or proceso.funcionalidades is not defined or not an array");
      }
    }

    fetchTesters();
    fetchFuncionalidades();
    fetchCasosPrueba();
  }, [proceso]);



  return (
    <>
      <Typography variant="h6">Enviar Asignaciones</Typography>
      <FormLabel>Buscar usuario de graph</FormLabel>
      <pre>{JSON.stringify(testers, null, 2)}</pre>
      <FormLabel>Funcionalidades del Proceso</FormLabel>
      <pre>{JSON.stringify(funcionalidades, null, 2)}</pre>
      <FormLabel>Casos de Prueba del Proceso</FormLabel>
      <pre>{JSON.stringify(casosPrueba, null, 2)}</pre> 
    </>
  );
}