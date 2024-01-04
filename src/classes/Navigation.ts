import {useNavigation} from '@react-navigation/native';

class Navigation {
  private nav = useNavigation();

  public screens = {
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
  };

  public navigateTo(destination: never): void {
    this.nav.navigate(destination);
  }
}

export {Navigation};
