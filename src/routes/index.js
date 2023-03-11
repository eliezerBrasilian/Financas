import {useContext} from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {Background} from '../components/Background';
import {colors} from '../assets/colors';
import {strings} from '../assets/strings';
import AuthRoutes from './auth.routes';
import App from './app.routes';
import {AuthContext} from '../contexts/auth';
export default function Routes() {
  const {signed, loadingAuth} = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <Background
        colors={[colors.gradiente_1, colors.gradiente_2]}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <ActivityIndicator size={100} color="black" />
        <Text
          style={{
            marginTop: 20,
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          {strings.carregando_text}
        </Text>
      </Background>
    );
  }
  return signed ? <App /> : <AuthRoutes />;
}
