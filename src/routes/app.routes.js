import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '../assets/colors/colors';
import {DefaultTabBarIcon} from '../components/tabBarComponents/DefaultTabBarIcon';
import {FloatTabBarButton} from '../components/tabBarComponents/FloatTabBarButton';
import {FloatTabBarIcon} from '../components/tabBarComponents/FloatTabBarIcon';
import {HomeStack} from './stacks/HomeStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <DefaultTabBarIcon
              focused={focused}
              imageOnFocused={require('../assets/images/casa_barra.png')}
              imageOnNotFocused={require('../assets/images/casa_barra_cinza.png')}
              colorOnFocused={colors.main_purple}
              colorOnNotFocused={colors.title_bottom_tab}
              title={'Principal'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <DefaultTabBarIcon
              focused={focused}
              imageOnFocused={require('../assets/images/transacoes_roxo.png')}
              imageOnNotFocused={require('../assets/images/transacoes_barra.png')}
              colorOnFocused={colors.main_purple}
              colorOnNotFocused={colors.title_bottom_tab}
              title={'Transações'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ButtonAdd"
        component={HomeStack}
        options={{
          tabBarButton: props => <FloatTabBarButton {...props} />,
          tabBarIcon: ({color, focused, size}) => (
            <FloatTabBarIcon
              image={require('../assets/images/btn_adicionar.png')}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chart"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <DefaultTabBarIcon
              focused={focused}
              imageOnFocused={require('../assets/images/grafo_barra_roxo.png')}
              imageOnNotFocused={require('../assets/images/grafo_barra.png')}
              colorOnFocused={colors.main_purple}
              colorOnNotFocused={colors.title_bottom_tab}
              title={'Principal'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Premium"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <DefaultTabBarIcon
              focused={focused}
              imageOnFocused={require('../assets/images/premium_barra_roxo.png')}
              imageOnNotFocused={require('../assets/images/premium_barra.png')}
              colorOnFocused={colors.main_purple}
              colorOnNotFocused={colors.title_bottom_tab}
              title={'Premium'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export {AppRoutes};
