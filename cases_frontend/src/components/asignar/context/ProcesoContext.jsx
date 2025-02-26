import React, { createContext, useContext, useState } from 'react';

const ProcesoContext = createContext();

export const ProcesoProvider = ({ children }) => {
  const [proceso, setProceso] = useState({
    nombre: '',
    descripcion: '',
    aplicacion: null,
    funcionalidades: [],
    testers: [],
  });

  return (
    <ProcesoContext.Provider value={{ proceso, setProceso }}>
      {children}
    </ProcesoContext.Provider>
  );
};

export const useProceso = () => useContext(ProcesoContext);