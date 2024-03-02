import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {BalanceContextProvider} from './src/contexts/BalanceContext';
import {ChartScreenContextProvider} from './src/contexts/ChartScreenContext';
import {PlusButtonContextProvider} from './src/contexts/PlusButtonContext';
import {ProfilePictureProvider} from './src/contexts/ProfilePictureContext';
import {RegisterProvider} from './src/contexts/RegisterContext';
import {TabBarContextProvider} from './src/contexts/TabBarContext';
import {UserProvider} from './src/contexts/UserContext';
import Routes from './src/routes/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <UserProvider>
        <BalanceContextProvider>
          <RegisterProvider>
            <TabBarContextProvider>
              <PlusButtonContextProvider>
                <ProfilePictureProvider>
                  <ChartScreenContextProvider>
                    <Routes />
                  </ChartScreenContextProvider>
                </ProfilePictureProvider>
              </PlusButtonContextProvider>
            </TabBarContextProvider>
          </RegisterProvider>
        </BalanceContextProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
