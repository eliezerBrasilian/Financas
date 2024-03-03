import React, {createContext, useContext, useState} from 'react';

import {Navigation} from '../classes/Navigation';
import {tags} from '../enums/Tag';

const ChartScreenContext = createContext();

export const useChartScreenContext = () => {
  return useContext(ChartScreenContext);
};

export const ChartScreenContextProvider = ({children}) => {
  const [selectedChartScreenTag, setSelectChartScreenTag] = useState(
    tags.REVENUE,
  );

  const nav = new Navigation();

  function handleSelectChartScreenTag(tag) {
    setSelectChartScreenTag(tag);

    nav.navigateTo(nav.tabs.CHART);
  }

  function handleChangeCurrentTag(newTag) {
    setSelectChartScreenTag(newTag);
  }

  return (
    <ChartScreenContext.Provider
      value={{
        selectedChartScreenTag,
        handleSelectChartScreenTag,
        handleChangeCurrentTag,
      }}>
      {children}
    </ChartScreenContext.Provider>
  );
};
