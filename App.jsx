import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {FirebaseProvider} from './src/contexts/AuthContext';
import {FabButtonContextProvider} from './src/contexts/FabButtonContext';
import {ProfilePictureProvider} from './src/contexts/ProfilePictureContext';
import {RegisterProvider} from './src/contexts/RegisterContext';
import Routes from './src/routes/routes';
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <FirebaseProvider>
        <RegisterProvider>
          <FabButtonContextProvider>
            <ProfilePictureProvider>
              <Routes />
            </ProfilePictureProvider>
          </FabButtonContextProvider>
        </RegisterProvider>
      </FirebaseProvider>
    </NavigationContainer>
  );
}
