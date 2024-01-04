import {ScrollView, View} from 'react-native';

import {colors} from '../../assets/colors/colors';
import {strings} from '../../assets/strings/strings';
import {Navigation} from '../../classes/Navigation';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import InputForPassword from '../../components/inputs/InputForPassword';
import {style} from '../SignUp/style';
import {useLogin} from './Login.hook';

export default function Login() {
  const {isLoading, handleLogin, email, password, setEmail, setPassword} =
    useLogin();

  const nav = new Navigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={style.main_view}>
        <TextContent
          textAlign="left"
          fontSize={28}
          color={'#000'}
          fontWeight={'bold'}>
          {strings.do_your_login}
        </TextContent>

        <View style={{width: '60%', marginBottom: 30}}>
          <TextContent
            textAlign="left"
            fontSize={21}
            color={'#000'}
            fontWeight={'700'}>
            {strings.welcome_again}
          </TextContent>
        </View>

        <Input
          label={strings.email_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.email_placeholder}
          backgroundColor="#F6F6F6"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          allCaps="none"
        />
        <InputForPassword
          label={strings.digite_sua_senha}
          placeholderText={strings.senha_placeholder}
          backgroundColor="#F6F6F6"
          value={password}
          setValue={setPassword}
          isPassword={true}
          placeholderColor="#A0A0A0"
        />

        <Button
          title={strings.login_in}
          fontWeight={'bold'}
          onClick={() => handleLogin(email, password)}
          backgroundColor="#2A3D45"
          color="#fff"
          marginTop={30}
          isLoading={isLoading}
          fontSize={16}
        />
        <Button
          title={strings.forgot_password}
          fontWeight={'bold'}
          onClick={() => nav.navigateTo(nav.screens.FORGOT_PASSWORD)}
          color={colors.forgot_password}
          marginTop={10}
          fontSize={16}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
