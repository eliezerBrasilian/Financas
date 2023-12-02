import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Profile from '../screens/Profile/Profile';
import DadosPessoais from '../screens/PersonalData/DadosPessoais';
import Register from '../screens/Register/Register';
import TypeOfBalanceSelected from '../screens/TypeOfBalanceSelected/TypeOfBalanceSelected';
const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="DadosPessoais" component={DadosPessoais} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="TypeOfBalanceSelected"
        component={TypeOfBalanceSelected}
      />
    </Stack.Navigator>
  );
}
