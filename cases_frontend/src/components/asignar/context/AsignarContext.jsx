import React, { createContext, useContext, useState } from 'react';

const AsignarContext = createContext();

export const AsignarProvider = ({ children }) => {
  const [asignacion, setAsignacion] = useState({
    nombre: '',
    descripcion: '',
    aplicacion: null,
    funcionalidades: [],
    testers: [],
  });


  return (
    <AsignarContext.Provider value={{ asignacion, setAsignacion }}>
      {children}
    </AsignarContext.Provider>
  );
};

export const useAsignar = () => useContext(AsignarContext);
