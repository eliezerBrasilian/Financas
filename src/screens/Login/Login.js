import {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {strings} from '../../assets/strings/strings';
import {style} from '../SignUp/style';
import {TextContent} from '../../components/TextContent';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputForPassword from '../../components/InputForPassword';
import {colors} from '../../assets/colors/colors';
import {useFirebase} from '../../contexts/AuthContext';
export default function Login() {
  const {login, isLoadingAuth} = useFirebase();
  const nav = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (email.trim() !== '' && password.trim() !== '') {
      const response = await login(email, password);
      console.log('RESPONSE: ' + response);
      let erro = 'Erro';
      if (response === 400) Alert.alert(erro, strings.err_invalid_email);
      else if (response == 404) Alert.alert(erro, strings.user_not_found);
      else if (response == 406) Alert.alert(erro, strings.err_invalid_password);
      else if (response == 504) Alert.alert(erro, strings.too_many_requests);
    } else {
      Alert.alert(strings.fill_all);
    }
  }
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={style.main_view}>
        <TextContent
          textAlign="left"
          fontSize={32}
          color={'#000'}
          fontWeight={'bold'}>
          {strings.do_your_login}
        </TextContent>

        <View style={{width: '60%', marginBottom: 30}}>
          <TextContent
            textAlign="left"
            fontSize={22}
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
          onClick={handleLogin}
          backgroundColor={colors.main_blue}
          color="#fff"
          marginTop={30}
          isLoading={isLoadingAuth}
        />
        <Button
          title={strings.forgot_password}
          fontWeight={'bold'}
          onClick={() => nav.navigate('ForgotPassword')}
          color={colors.forgot_password}
          marginTop={10}
        />
      </View>
    </ScrollView>
  );
}
