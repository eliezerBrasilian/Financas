import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from '../../classes/Navigation';
import {ChartScreen} from '../../screens/ChartScreen/ChartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ChartStack() {
  const nav = new Navigation();
  return (
    <Stack.Navigator
      initialRouteName={nav.screens.CHART_SCREEN}
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name={nav.screens.CHART_SCREEN} component={ChartScreen} />
    </Stack.Navigator>
  );
}

export {ChartStack};
