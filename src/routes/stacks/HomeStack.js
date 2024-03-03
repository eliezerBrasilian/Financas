import DadosPessoais from '../../screens/PersonalData/DadosPessoais';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import {Navigation} from '../../classes/Navigation';
import PremiumScreen from '../../screens/PremiumScreen/PremiumScreen';
import Profile from '../../screens/Profile/Profile';
import Register from '../../screens/Register/Register';
import TypeOfBalanceSelected from '../../screens/TypeOfBalanceSelected/BalanceSelected';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  const nav = new Navigation();
  return (
    <Stack.Navigator
      initialRouteName={nav.screens.HOME}
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name={nav.screens.HOME} component={HomeScreen} />
      <Stack.Screen name={nav.screens.PROFILE} component={Profile} />
      <Stack.Screen
        name={nav.screens.PERSONAL_DATA}
        component={DadosPessoais}
      />
      <Stack.Screen name={nav.screens.REGISTER} component={Register} />
      <Stack.Screen
        name={nav.screens.TYPE_OF_BALANCE_SELECTED}
        component={TypeOfBalanceSelected}
      />
      <Stack.Screen name={nav.screens.PREMIUM} component={PremiumScreen} />
    </Stack.Navigator>
  );
}

export {HomeStack};
