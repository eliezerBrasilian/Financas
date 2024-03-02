import React, {createContext, useContext, useState} from 'react';

import {Navigation} from '../classes/Navigation';

const PlusButtonContext = createContext();

export const usePlusButtonContext = () => {
  return useContext(PlusButtonContext);
};

export const PlusButtonContextProvider = ({children}) => {
  const [plusButtonClicked, setPlusButtonClicked] = useState(false);
  const nav = new Navigation();

  function handleClickOnPlusButton() {
    setPlusButtonClicked(true);
    nav.navigateTo(nav.tabs.MAIN_TAB);
  }

  function handleClosePopUpOfPlusButton() {
    setPlusButtonClicked(false);
  }

  return (
    <PlusButtonContext.Provider
      value={{
        plusButtonClicked,
        setPlusButtonClicked,
        handleClickOnPlusButton,
        handleClosePopUpOfPlusButton,
      }}>
      {children}
    </PlusButtonContext.Provider>
  );
};
