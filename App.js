import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import {colors} from './src/assets/colors';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.gradiente_1}
        barStyle={'light-content'}
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
