import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {strings} from '../../assets/strings/strings';
import DriveIcon from '../../components/DriveIcon';
import {TextContent} from '../../components/TextContent';
import Button from '../../components/buttons/Button';
import {style} from './style';
import {SigninWithGoogle} from './widgets/SigninWithGoogle';

export default function OnAuth() {
  const nav = useNavigation();

  function goToSignUp() {
    nav.navigate('SignUp');
  }
  function goToLogin() {
    nav.navigate('Login');
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
      <SigninWithGoogle />
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

const SeparationItem = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 3}}>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#BCAC9B',
          borderStyle: 'solid',
          flex: 1,
          marginTop: 3,
        }}
      />
      <TextContent>ou</TextContent>

      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#BCAC9B',
          borderStyle: 'solid',
          flex: 1,
          marginTop: 3,
        }}
      />
    </View>
  );
};
