import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp/SignUp';
import Login from '../screens/Login/Login';
import OnAuth from '../screens/OnAuth/OnAuth';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="OnAuth"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnAuth" component={OnAuth} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
