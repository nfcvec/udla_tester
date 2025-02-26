import React from 'react';
import { useHistory } from 'react-router-dom';

const ProcessTable = ({ processes }) => {
  const history = useHistory();

  const handleEdit = (processId) => {
    history.push(`/stepper/${processId}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td>{process.id}</td>
              <td>{process.name}</td>
              <td>
                <button onClick={() => handleEdit(process.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;
