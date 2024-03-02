import React, {createContext, useContext} from 'react';

const TabBarContext = createContext();

export const useTabBarContext = () => {
  return useContext(TabBarContext);
};

export const TabBarContextProvider = ({children}) => {
  const [tabBarVisible, setTabBarVisible] = React.useState('visible');

  function showTabBar() {
    setTabBarVisible('visible');
  }

  function hideTabBar() {
    setTabBarVisible('none');
  }
  return (
    <TabBarContext.Provider
      value={{
        showTabBar,
        hideTabBar,
        tabBarVisible,
      }}>
      {children}
    </TabBarContext.Provider>
  );
};
