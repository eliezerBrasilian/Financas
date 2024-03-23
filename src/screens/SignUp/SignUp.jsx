import React, {useState} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../assets/colors/colors';
import {strings} from '../../assets/strings/strings';
import {InternalStorage} from '../../classes/InternalStorage';
import {LeftTopIcon} from '../../components/LeftTopIcon';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import InputForPassword from '../../components/inputs/InputForPassword';
import {useUserContext} from '../../contexts/UserContext';
import {Collections} from '../../enums/Collections';
import {Utils} from '../../utils/Utils';

export default function SignUp() {
  const internalStorage = new InternalStorage();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useUserContext();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  async function handleSignUp() {
    setInvalidEmail(false);
    setInvalidPassword(false);

    if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
      await signUp(name, email, password);
    } else {
      Alert.alert(strings.fill_all);
    }
  }

  async function signUp(name, email, password) {
    setLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const userData = {
        uid: response.user.uid,
        email: email,
        name: name,
        profilePicture: null,
        isPremium: false,
        isAdmin: false,
        createdAt: Date.now(),
      };
      await saveUserOnFirestore(userData);
      await createCollectionBalancesRelatedToTheUser(response.user.uid);
      await internalStorage.writeDataOnDevice(userData);
      setUser(userData);
    } catch (error) {
      handleSIgnupErrors(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveUserOnFirestore(userData) {
    const {uid} = userData;
    const docRef = firestore().collection(Collections.USERS).doc(uid);
    try {
      docRef.set(userData);
    } catch (error) {
      console.log('error on creating user - saveUserOnFirestore: ' + error);
      return false;
    }
  }

  async function createCollectionBalancesRelatedToTheUser(userUid) {
    await firestore().collection(Collections.BALANCES).doc(userUid).set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      createdBy: userUid,
      expenses: 0,
      registrations: 0,
      reservations: 0,
      revenues: 0,
      total: 0,
    });
  }

  function handleSIgnupErrors(error) {
    if (error.code == 'auth/invalid-email') setInvalidEmail(true);
    if (error.code == 'auth/weak-password') setInvalidPassword(true);
    else if (error.code === 'auth/email-already-in-use')
      Utils.ShowToast('Email já está em uso');
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 34,
        }}>
        <LeftTopIcon />

        <View style={{alignItems: 'center', marginTop: 20, rowGap: 20}}>
          <Image
            source={require('../../assets/images/mao_iniciar.png')}
            style={{height: 50, width: 50}}
            resizeMode="contain"
          />
          <TextContent
            textAlign="left"
            fontSize={20}
            color={'#000'}
            fontWeight={'500'}>
            Bem-vindo, vamos começar!
          </TextContent>

          <View style={{width: '100%', rowGap: 20}}>
            <Input
              placeholderText={'NOME COMPLETO'}
              value={name}
              setValue={setName}
            />

            <Input
              placeholderText={'EMAIL'}
              value={email}
              setValue={setEmail}
              keyboardType="email-address"
              allCaps="none"
            />
            {invalidEmail && (
              <TextContent color="red">Este email é inválido</TextContent>
            )}
            <InputForPassword
              placeholderText={'CRIE UMA SENHA'}
              backgroundColor="#F6F6F6"
              value={password}
              setValue={setPassword}
              isPassword={true}
              placeholderColor="#A0A0A0"
            />
            {invalidPassword && (
              <TextContent color="red">Esta senha é muito curta</TextContent>
            )}
          </View>
        </View>
        <Spacer marginTop={100} />
        <View style={{alignItems: 'center'}}>
          <TextContent fontSize={14}>
            Ao continuar você declara estar ciente da
          </TextContent>
          <TextContent>
            nossa{' '}
            <TextContent fontSize={14} color={colors.main_purple}>
              Política de Privacidade
            </TextContent>
          </TextContent>
        </View>

        <Spacer marginTop={80} />
        <Button
          title={'CADASTRAR'}
          fontWeight="normal"
          color="#fff"
          backgroundColor={colors.main_purple}
          fontSize={16}
          width={'100%'}
          onClick={handleSignUp}
          hasIconLeft={true}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
