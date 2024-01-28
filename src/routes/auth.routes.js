import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Navigation} from '../classes/Navigation';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import {IniciateSession} from '../screens/IniciateSession/IniciateSession';
import Login from '../screens/Login/Login';
import OnAuth from '../screens/OnAuth/OnAuth';
import SignUp from '../screens/SignUp/SignUp';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  const nav = new Navigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={nav.screens.ON_AUTH} component={OnAuth} />
      <Stack.Screen name={nav.screens.SIGN_UP} component={SignUp} />
      <Stack.Screen name={nav.screens.LOGIN} component={Login} />
      <Stack.Screen
        name={nav.screens.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={nav.screens.INICIATE_SESSION}
        component={IniciateSession}
      />
    </Stack.Navigator>
  );
}

export {AuthRoutes};
