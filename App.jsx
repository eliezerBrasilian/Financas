import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {BalanceContextProvider} from './src/contexts/BalanceContext';
import {PlusButtonContextProvider} from './src/contexts/PlusButtonContext';
import {ProfilePictureProvider} from './src/contexts/ProfilePictureContext';
import {RegisterProvider} from './src/contexts/RegisterContext';
import {UserProvider} from './src/contexts/UserContext';
import Routes from './src/routes/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <UserProvider>
        <BalanceContextProvider>
          <RegisterProvider>
            <PlusButtonContextProvider>
              <ProfilePictureProvider>
                <Routes />
              </ProfilePictureProvider>
            </PlusButtonContextProvider>
          </RegisterProvider>
        </BalanceContextProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
