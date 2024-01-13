import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Firestore} from '../../../classes/Firestore';
import {InternalStorage} from '../../../classes/InternalStorage';
import {User} from '../../../classes/User';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useUserContext} from '../../../contexts/UserContext';

export function SigninWithGoogle() {
  const {setUser} = useUserContext();
  const internalStorage = new InternalStorage();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '80275054021-ds2pdpkki041lum3c6l1mrc3htpcv8sp.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      var userUid = user.id;
      var myUser = new User(userUid, user.email, null, user.name, user.photo);

      var userExists = await myUser.userExistsInFirestoreDatabase(userUid);

      if (!userExists) {
        const userData = myUser.userData;

        await saveUserOnFirestore(userData);
        await createCollectionBalancesRelatedToTheUser(userUid);
        await internalStorage.writeDataOnDevice(userData);
        setUser(userData);
      } else {
        const userData = await myUser.getUserFirestoreData(userUid);

        await internalStorage.writeDataOnDevice(userData);
        setUser(userData);
      }

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      var myFirestore = new Firestore();
      await myFirestore.sendErrorOnTryngLoginIn(error);
      throw new Error('error on signin: ' + error);
    }
  }

  async function saveUserOnFirestore(userData) {
    const docRef = firestore().collection('users').doc(userData.uid);
    try {
      await docRef.set(userData);
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
