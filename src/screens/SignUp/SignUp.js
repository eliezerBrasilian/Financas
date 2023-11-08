import {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {strings} from '../../assets/strings/strings';
import {style} from './style';
import {TextContent} from '../../components/TextContent';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Masks} from 'react-native-mask-input';
import {colors} from '../../assets/colors/colors';
import {useFirebase} from '../../contexts/AuthContext';
import InputForPassword from '../../components/InputForPassword';
export default function SignUp() {
  const {signUp, isLoadingAuth} = useFirebase();
  const nav = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function goToLogin() {
    nav.navigate('Login');
  }
  async function handleSignUp() {
    if (
      name.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      password.trim() !== ''
    ) {
      const response = await signUp(name, email, phone, password);
      if (response == 400) {
        Alert.alert(strings.err_invalid_email);
      } else if (response == 406) {
        Alert.alert(strings.email_already_in_use);
      } else if (response == 411) {
        Alert.alert(strings.weak_password);
      } else if (response == 500) {
        Alert.alert(strings.intern_error);
      } else if (response == 200) {
        Alert.alert(strings.game_state_title, strings.account_created, [
          {text: strings.thats_it, onPress: () => goToLogin()},
        ]);
      }
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
          {strings.create_account_description}
        </TextContent>

        <View style={{width: '60%', marginBottom: 30}}>
          <TextContent
            textAlign="left"
            fontSize={22}
            color={'#000'}
            fontWeight={'700'}>
            {strings.hi_user}
          </TextContent>
        </View>

        <Input
          label={strings.nome_completo_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.nome_completo_placeholder}
          backgroundColor="#F6F6F6"
          value={name}
          setValue={setName}
        />
        <Input
          label={strings.celular_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.celular_placeholder}
          backgroundColor="#F6F6F6"
          value={phone}
          setValue={setPhone}
          isMaskInput={true}
          mask={Masks.BRL_PHONE}
          keyboardType="numeric"
        />
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
          title={strings.create_account}
          fontWeight={'bold'}
          onClick={handleSignUp}
          backgroundColor={colors.main_blue}
          color="#fff"
          isLoading={isLoadingAuth}
        />
      </View>
    </ScrollView>
  );
}
