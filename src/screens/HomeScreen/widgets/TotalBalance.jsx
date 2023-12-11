import {firebase} from '@react-native-firebase/firestore';
import React from 'react';
import {View} from 'react-native';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';
import {Utils} from '../../../utils/Utils';

export function TotalBalance() {
  const {user} = useFirebase();
  const [totalBalance, setTotalBalance] = React.useState(0);
  React.useEffect(() => {
    const unsubscribe = loadTotalBalance();
    return () => unsubscribe;
  }, []);

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
      <ProfileImage
        size={70}
        borderRadius={20}
        profilePhoto={require('../../../assets/images/will-smith.webp')}
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
