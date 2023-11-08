import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {strings} from '../../assets/strings/strings';
import {style} from './style';
import DriveIcon from '../../components/DriveIcon';
import {TextContent} from '../../components/TextContent';
import Button from '../../components/Button';
import {colors} from '../../assets/colors/colors';
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
      <DriveIcon resizeMode="contain" width={300} size={310} />

      <TextContent fontSize={18} color={'#000'}>
        Utilize já, o melhor aplicativo para organizar suas finanças
      </TextContent>

      <Button
        title={strings.fazer_cadastro}
        color="#fff"
        backgroundColor={colors.main_blue}
        onClick={goToSignUp}
      />
      <Button
        title={strings.fazer_login}
        fontWeight={'bold'}
        onClick={goToLogin}
        color="#000"
      />
    </View>
  );
}
