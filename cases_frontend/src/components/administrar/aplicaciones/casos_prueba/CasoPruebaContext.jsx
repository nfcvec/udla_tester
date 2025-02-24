import React, { createContext } from 'react';

export const CasoPruebaContext = createContext();

export const CasoPruebaProvider = ({ children, value }) => {
  return (
    <CasoPruebaContext.Provider value={value}>
      {children}
    </CasoPruebaContext.Provider>
  );
};
