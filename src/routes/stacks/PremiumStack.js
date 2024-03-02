import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from '../../classes/Navigation';
import PremiumScreen from '../../screens/PremiumScreen/PremiumScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PremiumStack() {
  const nav = new Navigation();
  return (
    <Stack.Navigator
      initialRouteName={nav.screens.PREMIUM}
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name={nav.screens.PREMIUM} component={PremiumScreen} />
    </Stack.Navigator>
  );
}

export {PremiumStack};
