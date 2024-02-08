import {BalanceContextProvider} from './src/contexts/BalanceContext';
import {FabButtonContextProvider} from './src/contexts/FabButtonContext';
import {NavigationContainer} from '@react-navigation/native';
import {ProfilePictureProvider} from './src/contexts/ProfilePictureContext';
import React from 'react';
import {RegisterProvider} from './src/contexts/RegisterContext';
import Routes from './src/routes/routes';
import {StatusBar} from 'react-native';
import {UserProvider} from './src/contexts/UserContext';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <UserProvider>
        <BalanceContextProvider>
          <RegisterProvider>
            <FabButtonContextProvider>
              <ProfilePictureProvider>
                <Routes />
              </ProfilePictureProvider>
            </FabButtonContextProvider>
          </RegisterProvider>
        </BalanceContextProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
