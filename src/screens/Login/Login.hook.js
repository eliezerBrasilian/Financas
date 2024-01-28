// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import React from 'react';
// import {Alert} from 'react-native';
// import {strings} from '../../assets/strings/strings';
// import {InternalStorage} from '../../classes/InternalStorage';
// import {useUserContext} from '../../contexts/UserContext';
// import {Utils} from '../../utils/Utils';

// function useLogin() {
//   const {setUser} = useUserContext();
//   const [isLoading, setLoading] = React.useState(false);

//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const internalStorage = new InternalStorage();

//   async function handleLogin(email, password) {
//     if (email.trim() !== '' && password.trim() !== '') {
//       await login(email, password);
//     } else {
//       Alert.alert(strings.fill_all);
//     }
//   }

//   async function login(email, password) {
//     setLoading(true);

//     try {
//       const response = await auth().signInWithEmailAndPassword(email, password);
//       const userData = await retrieveUserDataFromFirestore(response.user.uid);
//       setUser(userData);
//       await internalStorage.writeDataOnDevice(userData);
//     } catch (error) {
//       handleLoginError(error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   return {
//     login,
//     isLoading,
//     handleLogin,
//     email,
//     password,
//     setEmail,
//     setPassword,
//   };
// }

// async function retrieveUserDataFromFirestore(userUid) {
//   try {
//     const response = await firestore().collection('users').doc(userUid).get();
//     return response.data();
//   } catch (error) {
//     throw new Error('error on retrieving user data from firestore: ' + error);
//   }
// }

// function handleLoginError(error) {
//   if (error.code == 'auth/invalid-login') Utils.ShowToast('Email inválido');
//   else if (error.code == 'auth/user-not-found')
//     Utils.ShowToast('Conta não encontrada');
//   else if (error.code == 'auth/wrong-password')
//     Utils.ShowToast('Senha incorreta');
//   else if (error.code == 'auth/too-many-requests') return 504;
//   console.log(error.code);
// }

// export {useLogin};
