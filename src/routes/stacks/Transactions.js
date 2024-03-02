import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from '../../classes/Navigation';
import {TransactionsHistory} from '../../screens/TransactionsHistory/TransactionsHistory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Transactions() {
  const nav = new Navigation();
  return (
    <Stack.Navigator
      initialRouteName={nav.screens.HOME}
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen name={nav.screens.HOME} component={TransactionsHistory} />
    </Stack.Navigator>
  );
}

export {Transactions};
