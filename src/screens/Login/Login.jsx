import React, {useState} from 'react';
import {Alert, Image, ScrollView, StatusBar, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../assets/colors/colors';
import {strings} from '../../assets/strings/strings';
import {InternalStorage} from '../../classes/InternalStorage';
import {Navigation} from '../../classes/Navigation';
import {LeftTopIcon} from '../../components/LeftTopIcon';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import InputForPassword from '../../components/inputs/InputForPassword';
import {useUserContext} from '../../contexts/UserContext';
import {Utils} from '../../utils/Utils';

export default function Login() {
  const {setUser} = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [password, setPassword] = useState('');

  const internalStorage = new InternalStorage();

  async function handleLogin(email, password) {
    setInvalidEmail(false);
    setInvalidPassword(false);
    if (email.trim() !== '' && password.trim() !== '') {
      await login(email, password);
    } else {
      Alert.alert(strings.fill_all);
    }
  }

  async function login(email, password) {
    setLoading(true);

    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const userData = await retrieveUserDataFromFirestore(response.user.uid);
      setUser(userData);
      await internalStorage.writeDataOnDevice(userData);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  }

  async function retrieveUserDataFromFirestore(userUid) {
    try {
      const response = await firestore().collection('users').doc(userUid).get();
      return response.data();
    } catch (error) {
      throw new Error('error on retrieving user data from firestore: ' + error);
    }
  }

  function handleLoginError(error) {
    if (error.code == 'auth/invalid-email') {
      console.log('here');
      setInvalidEmail(true);
    } else if (error.code == 'auth/user-not-found')
      Utils.ShowToast('Conta não encontrada');
    else if (error.code == 'auth/wrong-password')
      Utils.ShowToast('Senha incorreta');
    else if (error.code == 'auth/too-many-requests') return 504;
    console.log(error.code);
  }

  const nav = new Navigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{
          flex: 1,
          padding: 15,
          alignItems: 'center',
          paddingHorizontal: 34,
        }}>
        <StatusBar backgroundColor={colors.background} />
        <View style={{alignSelf: 'flex-start'}}>
          <LeftTopIcon />
        </View>

        <Spacer marginTop={60} />
        <Image
          source={require('../../assets/images/foguete.png')}
          style={{height: 66, width: 66}}
        />
        <Spacer marginTop={20} />
        <TextContent fontSize={20} fontWeight="bold">
          Iniciar Sessão
        </TextContent>

        <Spacer marginTop={20} />

        <Input
          label={strings.email_label}
          placeholderColor="#A0A0A0"
          placeholderText={'EMAIL'}
          backgroundColor="#F6F6F6"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          allCaps="none"
        />
        {invalidEmail && (
          <TextContent color="red">Este email é inválido</TextContent>
        )}

        <Spacer marginTop={23} />
        <InputForPassword
          label={strings.digite_sua_senha}
          placeholderText={'SENHA'}
          backgroundColor="#F6F6F6"
          value={password}
          setValue={setPassword}
          isPassword={true}
          placeholderColor="#A0A0A0"
        />
        {invalidPassword && (
          <TextContent color="red">Esta senha é muito curta</TextContent>
        )}

        <Spacer marginTop={75} />
        <Button
          title={'ENTRAR'}
          fontWeight={'normal'}
          onClick={() => handleLogin(email, password)}
          backgroundColor={colors.main_purple}
          color="#fff"
          marginTop={30}
          isLoading={isLoading}
          fontSize={16}
          width={'100%'}
        />
        <Button
          title={'ESQUECEU A SENHA?'}
          fontWeight={'normal'}
          onClick={() => nav.navigateTo(nav.screens.FORGOT_PASSWORD)}
          color={colors.forgot_password}
          fontSize={14}
        />
      </View>
    </ScrollView>
  );
}
