import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';
import {StatusBar} from 'react-native';
import {FirebaseProvider} from './src/contexts/AuthContext';
import {FileProvider} from './src/contexts/FileContext';
import {FabButtonContextProvider} from './src/contexts/FabButtonContext';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <FirebaseProvider>
        <FileProvider>
          <FabButtonContextProvider>
            <Routes />
          </FabButtonContextProvider>
        </FileProvider>
      </FirebaseProvider>
    </NavigationContainer>
  );
}
