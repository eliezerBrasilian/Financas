import {Image, View} from 'react-native';

import {useUserContext} from '../contexts/UserContext';
import {AppRoutes} from './app.routes';
import {AuthRoutes} from './auth.routes';

export default function Routes() {
  const {signed, isLoadingUser} = useUserContext();

  if (isLoadingUser) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/images/Splashscreen_1.png')} />
      </View>
    );
  } else return signed ? <AppRoutes /> : <AuthRoutes />;
}
