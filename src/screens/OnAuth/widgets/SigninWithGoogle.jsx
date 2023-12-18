import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';

export function SigninWithGoogle() {
  const [isLoadingAuth, setLoadingAuth] = React.useState(false);
  const {setUser} = useFirebase();
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '80275054021-ds2pdpkki041lum3c6l1mrc3htpcv8sp.apps.googleusercontent.com',
    });
  }, []);
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken, user} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    console.log(user);
    const userData = {
      uid: user.id,
      email: user.email,
      phone: null,
      name: user.name,
      profilePicture: user.photo,
      isPremium: false,
      isAdmin: false,
      createdAt: Date.now(),
    };
    await saveUserOnFirestore(userData);
    await writeUserDataOnDevice(userData);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function saveUserOnFirestore(userData) {
    const {uid} = userData;
    const docRef = firestore().collection('users').doc(userData.uid);
    try {
      await docRef.set(userData);
      await createCollectionBalancesRelatedToTheUser(uid);
    } catch (error) {
      throw new Error('error on creating user - saveUserOnFirestore: ' + error);
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

  async function writeUserDataOnDevice(data) {
    console.log(data);
    AsyncStorage.setItem('@userData', JSON.stringify(data));

    setUser(data);
  }
  return (
    <TouchableOpacity
      onPress={onGoogleButtonPress}
      style={{
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: '#2A3D45',
        borderWidth: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 13,
        width: '100%',
      }}>
      <ProfileImage
        profilePhoto={require('../../../assets/images/google.png')}
        size={16}
      />
      <TextContent fontSize={16}>Continuar com Google</TextContent>
    </TouchableOpacity>
  );
}
