import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {Alert} from 'react-native';
import {strings} from '../../assets/strings/strings';
import {InternalStorage} from '../../classes/InternalStorage';
import {useUserContext} from '../../contexts/UserContext';
import {Utils} from '../../utils/Utils';

function useSignUp() {
  const internalStorage = new InternalStorage();
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setUser} = useUserContext();

  async function handleSignUp(name, email, phone, password) {
    if (
      name.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      password.trim() !== ''
    ) {
      await signUp(name, email, phone, password);
    } else {
      Alert.alert(strings.fill_all);
    }
  }

  async function signUp(name, email, phone, password) {
    setLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const userData = {
        uid: response.user.uid,
        email: email,
        phone: phone,
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
    const docRef = firestore().collection('users').doc(uid);
    try {
      docRef.set(userData);
    } catch (error) {
      console.log('error on creating user - saveUserOnFirestore: ' + error);
      return false;
    }
  }

  async function createCollectionBalancesRelatedToTheUser(userUid) {
    await firestore().collection('Balances').doc(userUid).set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      createdBy: userUid,
      expenses: 0,
      registrations: 0,
      reservations: 0,
      revenues: 0,
      total: 0,
    });
  }
  return {
    handleSignUp,
    isLoading,
    name,
    phone,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setPhone,
  };
}

function handleSIgnupErrors(error) {
  if (error.code == 'auth/invalid-email') Utils.ShowToast('Email inválido');
  else if (error.code == 'auth/weak-password')
    Utils.ShowToast('Senha muito curta');
  else if (error.code === 'auth/email-already-in-use')
    Utils.ShowToast('Email já está em uso');
}

export {useSignUp};
