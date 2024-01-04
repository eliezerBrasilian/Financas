import {Text, View} from 'react-native';

import {colors} from '../assets/colors/colors';
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
        <Text style={{color: colors.main_blue}}>Carregando...</Text>
      </View>
    );
  } else return signed ? <AppRoutes /> : <AuthRoutes />;
}
