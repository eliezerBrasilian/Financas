import React, {createContext, useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Utils} from '../utils/Utils';

const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({children}) => {
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingApp, setLoadingApp] = useState(true);
  const [isSendingResetLink, setSendingLink] = useState(false);

  useEffect(() => {
    loadData();
    // signOut();
  }, []);

  async function forgotPassword(email) {
    setSendingLink(true);
    try {
      await auth().sendPasswordResetEmail(email);
      setSendingLink(false);
      return 'success';
    } catch (error) {
      setSendingLink(false);
      return error.code;
    }
  }
  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async function loadData() {
    setLoadingApp(true);
    try {
      const ud = await AsyncStorage.getItem('@userData');

      if (ud) {
        const userData = JSON.parse(ud);
        console.log(userData);
        setUser(userData);
      }
    } catch (error) {
      throw new Error(`error - AuthContext - loadData(): ${error}`);
    } finally {
      setLoadingApp(false);
    }
  }

  async function login(email, password, name) {
    setLoadingAuth(true);

    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      const userData = await retrieveUserDataFromFirestore(response.user.uid);
      console.log('------userData-----');
      console.log(userData);
      writeUserData(userData);
    } catch (error) {
      if (error.code == 'auth/invalid-login') Utils.ShowToast('Email inválido');
      else if (error.code == 'auth/user-not-found')
        Utils.ShowToast('Conta não encontrada');
      else if (error.code == 'auth/wrong-password')
        Utils.ShowToast('Senha incorreta');
      else if (error.code == 'auth/too-many-requests') return 504;
      console.log(error.code);
    } finally {
      setLoadingAuth(false);
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
  async function signUp(name, email, phone, password) {
    setLoadingAuth(true);
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
      await writeUserData(userData);
    } catch (error) {
      if (error.code == 'auth/invalid-email') Utils.ShowToast('Email inválido');
      else if (error.code == 'auth/weak-password')
        Utils.ShowToast('Senha muito curta');
      else if (error.code === 'auth/email-already-in-use')
        Utils.ShowToast('Email já está em uso');
      else console.log(error.code);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function saveUserOnFirestore(userData) {
    const {uid} = userData;
    const docRef = firestore().collection('users').doc(uid);
    try {
      docRef.set(userData);

      await createCollectionBalancesRelatedToTheUser(uid);
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

  async function writeUserData(data) {
    console.log('-------data-------');
    console.log(data);
    AsyncStorage.setItem('@userData', JSON.stringify(data));
    setUser(data);
  }
  return (
    <FirebaseContext.Provider
      value={{
        signUp,
        login,
        isLoadingAuth,
        isLoadingApp,
        signed: !!user,
        user,
        setLoadingAuth,
        forgotPassword,
        isSendingResetLink,
        signOut,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};
