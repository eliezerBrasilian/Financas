import React, {createContext, useContext, useEffect, useState} from 'react';

import {AppState} from 'react-native';
import {InternalStorage} from '../classes/InternalStorage';
import {PaymentServices} from '../services/PaymentServices';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({children}) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isPremium, setPremium] = useState(false);
  const [reloadedOnPremium, setReloadOnPremium] = useState(false);
  const storedUser = new InternalStorage();
  const paymentService = new PaymentServices();

  useEffect(() => {
    //storedUser.clearDataFromDevice();
    loadData();
  }, [reloadedOnPremium]);

  const [appState, setAppState] = React.useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      setAppState(nextAppState);

      if (nextAppState === 'active') {
        const premium = await paymentService.getSubscriptionStatus();
        console.log(premium);

        setPremium(premium);
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  async function loadData() {
    setLoadingUser(true);

    const response = await storedUser.getLoadedData();

    setUser(response);
    setLoadingUser(false);
  }

  var handlePremiumAccess = () => {
    setReloadOnPremium(v => !v);
  };

  return (
    <UserContext.Provider
      value={{
        signed: !!user,
        user,
        setUser,
        isLoadingUser,
        isPremium,
        handlePremiumAccess,
      }}>
      {children}
    </UserContext.Provider>
  );
}
