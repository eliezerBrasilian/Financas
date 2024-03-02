import React, {createContext, useContext, useEffect, useState} from 'react';

import {InternalStorage} from '../classes/InternalStorage';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({children}) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setLoadingUser] = useState(true);
  const storedUser = new InternalStorage();

  useEffect(() => {
    //storedUser.clearDataFromDevice();
    loadData();
  }, []);

  async function loadData() {
    setLoadingUser(true);

    const response = await storedUser.getLoadedData();
    setUser(response);
    setLoadingUser(false);
  }

  return (
    <UserContext.Provider
      value={{
        signed: !!user,
        user,
        setUser,
        isLoadingUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}
