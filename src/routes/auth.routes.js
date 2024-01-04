import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Login from '../screens/Login/Login';
import {Navigation} from '../classes/Navigation';
import OnAuth from '../screens/OnAuth/OnAuth';
import SignUp from '../screens/SignUp/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  const nav = new Navigation();

  return (
    <Stack.Navigator
      //  initialRouteName={nav.screens.ON_AUTH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={nav.screens.ON_AUTH} component={OnAuth} />
      <Stack.Screen name={nav.screens.SIGN_UP} component={SignUp} />
      <Stack.Screen name={nav.screens.LOGIN} component={Login} />
      <Stack.Screen name={'ForgotPass'} component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export {AuthRoutes};
