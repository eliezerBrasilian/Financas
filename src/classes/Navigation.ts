import {useNavigation} from '@react-navigation/native';

class Navigation {
  private nav = useNavigation();

  public screens = {
    CHART_SCREEN: 'Gráficos',
    PREMIUM: 'PremiumScreen',
    TYPE_OF_BALANCE_SELECTED: 'TypeOfBalanceSelected',
    REGISTER: 'Register',
    PERSONAL_DATA: 'DadosPessoais',
    PROFILE: 'Profile',
    HOME: 'HomeScreen',
    ON_AUTH: 'OnAuth',
    SIGN_UP: 'SignUp',
    FORGOT_PASSWORD: 'ForgotPassword',
    LOGIN: 'Login',
    INICIATE_SESSION: 'IniciateSession',
  };

  public tabs = {
    MAIN_TAB: 'HomeStack',
    TRANSACTION: 'Transactions',
    CHART: 'ChartStack',
    PREMIUM: 'PremiumStack',
  };

  public navigateTo(destination: never): void {
    this.nav.navigate(destination);
  }

  public navigateToDestinationScreenUsingParams(
    destination: never,
    data: any,
  ): void {
    this.nav.navigate(destination, data);
  }
  public goBack() {
    this.nav.goBack();
  }
}

export {Navigation};
