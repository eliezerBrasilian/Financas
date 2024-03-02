import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '../assets/colors/colors';
import {Navigation} from '../classes/Navigation';
import {DefaultTabBarIcon} from '../components/tabBarComponents/DefaultTabBarIcon';
import {FloatTabBarButton} from '../components/tabBarComponents/FloatTabBarButton';
import {FloatTabBarIcon} from '../components/tabBarComponents/FloatTabBarIcon';
import {useTabBarContext} from '../contexts/TabBarContext';
import {ChartStack} from './stacks/ChartStack';
import {HomeStack} from './stacks/HomeStack';
import {PremiumStack} from './stacks/PremiumStack';
import {Transactions} from './stacks/Transactions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppRoutes() {
  const tabs = new Navigation().tabs;
  const {tabBarVisible, showTabBar, hideTabBar} = useTabBarContext();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          display: tabBarVisible,
        },
      }}>
      <Tab.Screen
        name={tabs.MAIN_TAB}
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
        name={tabs.TRANSACTION}
        component={Transactions}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <DefaultTabBarIcon
              focused={focused}
              imageOnFocused={require('../assets/images/transacoes_roxo.png')}
              imageOnNotFocused={require('../assets/images/transacoes_cinza.png')}
              colorOnFocused={colors.main_purple}
              colorOnNotFocused={colors.title_bottom_tab}
              title={'Histórico'}
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
        name={tabs.CHART}
        component={ChartStack}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <DefaultTabBarIcon
              focused={focused}
              imageOnFocused={require('../assets/images/grafico_roxo.png')}
              imageOnNotFocused={require('../assets/images/grafico_cinza.png')}
              colorOnFocused={colors.main_purple}
              colorOnNotFocused={colors.title_bottom_tab}
              title={'Gráficos'}
            />
          ),
        }}
      />

      <Tab.Screen
        name={tabs.PREMIUM}
        component={PremiumStack}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <DefaultTabBarIcon
              focused={focused}
              imageOnFocused={require('../assets/images/premium_roxo.png')}
              imageOnNotFocused={require('../assets/images/premium_cinza.png')}
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
