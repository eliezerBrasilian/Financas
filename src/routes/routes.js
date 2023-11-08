import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useFirebase} from '../contexts/AuthContext';
import {View, Text} from 'react-native';
import {colors} from '../assets/colors/colors';
export default function Routes() {
  const {signed, isLoadingApp} = useFirebase();

  if (isLoadingApp) {
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
