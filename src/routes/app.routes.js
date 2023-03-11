import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Registro from '../pages/Registro';
import GastoOuEntrada from '../pages/GastoOuEntrada';
import Reserva from '../pages/Reserva';
import Perfil from '../pages/Perfil';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Registro} name="Registro" />
      <Stack.Screen component={GastoOuEntrada} name="GastoOuEntrada" />
      <Stack.Screen component={Reserva} name="Reserva" />
      <Stack.Screen component={Perfil} name="Perfil" />
    </Stack.Navigator>
  );
}
