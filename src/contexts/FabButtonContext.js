import React, {createContext, useContext, useState, useEffect} from 'react';
const FabButtonContext = createContext();

export const useFabButtonContext = () => {
  return useContext(FabButtonContext);
};

export const FabButtonContextProvider = ({children}) => {
  const [fabButtonVisible, setFabButtonVisible] = useState(true);

  return (
    <FabButtonContext.Provider
      value={{
        fabButtonVisible,
        setFabButtonVisible,
      }}>
      {children}
    </FabButtonContext.Provider>
  );
};
