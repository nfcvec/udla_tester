import React from 'react';
import { useHistory } from 'react-router-dom';
import ProcessTable from './ProcessTable';

const Assign = () => {
  const history = useHistory();
  const processes = [
    // Ejemplo de datos de procesos
    { id: 1, name: 'Proceso 1' },
    { id: 2, name: 'Proceso 2' },
  ];

  const handleCreate = () => {
    history.push('/stepper/new');
  };

  return (
    <div>
      <button onClick={handleCreate}>Crear Nuevo Proceso</button>
      <ProcessTable processes={processes} />
    </div>
  );
};

export default Assign;
