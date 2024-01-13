import Button from '../../components/Button';
import DriveIcon from '../../components/DriveIcon';
import {Navigation} from '../../classes/Navigation';
import {SeparationItem} from './widgets/SeparationItem';
import {SigninWithGoogle} from './widgets/SigninWithGoogle';
import {TextContent} from '../../components/TextContent';
import {View} from 'react-native';
import {strings} from '../../assets/strings/strings';
import {style} from './style';

export default function OnAuth() {
  const nav = new Navigation();

  function goToSignUp() {
    nav.navigateTo('SignUp');
  }
  function goToLogin() {
    nav.navigateTo('Login');
  }

  return (
    <View style={style.main_view}>
      <DriveIcon resizeMode="contain" width={500} size={310} />

      <TextContent fontSize={18} color={'#000'}>
        {strings.best_driver_app_description}
      </TextContent>

      <Button
        title={'Continuar'}
        color="#fff"
        backgroundColor={'#2A3D45'}
        fontSize={16}
        width={'100%'}
        onClick={goToLogin}
        hasIconLeft={true}
        icon={'sss'}
      />

      <SeparationItem />
      {/* <Button
        title={strings.fazer_cadastro}
        color="#fff"
        backgroundColor={colors.main_blue}
        fontSize={16}
        width={'100%'}
        onClick={goToSignUp}
      /> */}
      {/* <SigninWithGoogle /> */}
      <TextContent
        fontWeight="bold"
        onClick={goToSignUp}
        clickable={true}
        color="#2A3D45">
        Fazer cadastro com email
      </TextContent>
    </View>
  );
}
