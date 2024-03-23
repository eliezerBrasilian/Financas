import React, {createContext, useContext, useState} from 'react';

import {GoogleAdsService} from '../services/GoogleAdsService';
import {Navigation} from '../classes/Navigation';
import {tags} from '../enums/Tag';
import {useUserContext} from './UserContext';

const ChartScreenContext = createContext();

export const useChartScreenContext = () => {
  return useContext(ChartScreenContext);
};

export const ChartScreenContextProvider = ({children}) => {
  var googleAdsService = new GoogleAdsService();

  const [selectedChartScreenTag, setSelectChartScreenTag] = useState(
    tags.REVENUE,
  );
  const {isPremium} = useUserContext();

  const nav = new Navigation();

  function handleSelectChartScreenTag(tag) {
    setSelectChartScreenTag(tag);

    if (!isPremium) googleAdsService.showAds();

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
