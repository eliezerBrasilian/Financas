import {Image, View} from 'react-native';

import {firebase} from '@react-native-firebase/firestore';
import React from 'react';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';
import {useProfilePicture} from '../../../contexts/ProfilePictureContext';
import {Ifinancas} from '../../../utils/Ifinancas.utils';
import {Utils} from '../../../utils/Utils';

export function TotalBalance() {
  const {user} = useFirebase();
  const [totalBalance, setTotalBalance] = React.useState(0);
  const {profilePicture} = useProfilePicture();
  const [profileImage, setProfileImage] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = loadTotalBalance();
    return () => unsubscribe;
  }, []);

  React.useEffect(() => {
    const unsubscribe = loadProfilePictureFromDevice();
    return () => unsubscribe;
  }, [profilePicture]);

  async function loadProfilePictureFromDevice() {
    var profilePictureFromDevice = await Ifinancas.getImageFromDevice();
    setProfileImage(profilePictureFromDevice);
  }
  function loadTotalBalance() {
    firebase
      .firestore()
      .collection('Balances')
      .doc(user?.uid)
      .onSnapshot(querySnap => {
        setTotalBalance(querySnap.data().total);
      });
  }
  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <Image
        style={{height: 70, width: 70, borderRadius: 15}}
        source={
          profileImage == null
            ? require('../../../assets/images/user_profile.png')
            : {uri: profileImage}
        }
      />

      <View style={{marginTop: 30}} />
      <TextContent fontSize={26} fontWeight="bold">
        Meu saldo
      </TextContent>
      <TextContent fontSize={38} fontWeight="bold">
        {Utils.getBrazilianCurrency(totalBalance)}
      </TextContent>
    </View>
  );
}
