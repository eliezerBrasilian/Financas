import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnLaunch from '../pages/OnLaunch';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import ResetarSenha from '../pages/ResetarSenha';
const Stack = createNativeStackNavigator();
export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnLaunch" component={OnLaunch} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="ResetarSenha" component={ResetarSenha} />
    </Stack.Navigator>
  );
}
