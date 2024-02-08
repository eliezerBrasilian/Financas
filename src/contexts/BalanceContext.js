import React, {createContext, useContext} from 'react';

import firestore from '@react-native-firebase/firestore';

const BalanceContext = createContext();

export function useBalanceContext() {
  return useContext(BalanceContext);
}

export function BalanceContextProvider({children}) {
  async function loadTotalBalance() {
    try {
      await firestore()
        .collection('Balances')
        .doc(user?.uid)
        .onSnapshot(querySnap => {
          setTotalBalance(querySnap.data().total);
          setValue(querySnap.data().total);
        });
    } catch (error) {}
  }

  async function loadData() {
    setLoadingUser(true);

    const response = await storedUser.getLoadedData();
    setUser(response);
    setLoadingUser(false);
  }

  return (
    <BalanceContext.Provider
      value={{
        loadTotalBalance,
      }}>
      {children}
    </BalanceContext.Provider>
  );
}
