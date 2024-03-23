import React, {createContext, useContext, useEffect, useState} from 'react';

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

  async function loadData() {
    setLoadingUser(true);

    const response = await storedUser.getLoadedData();
    const premium = await paymentService.getSubscriptionStatus();
    console.log(premium);

    setPremium(premium);

    setUser(response);
    setLoadingUser(false);
  }

  var handlePremiumAccess = () => {
    setPremium(true);
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
