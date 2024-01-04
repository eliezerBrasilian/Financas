import {Image, TouchableOpacity, View} from 'react-native';

import {firebase} from '@react-native-firebase/firestore';
import React from 'react';
import CurrencyInput from 'react-native-currency-input';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Icon} from '../../../classes/Icon';
import {TextContent} from '../../../components/TextContent';
import {useProfilePicture} from '../../../contexts/ProfilePictureContext';
import {useUserContext} from '../../../contexts/UserContext';
import {Ifinancas} from '../../../utils/Ifinancas.utils';
import {Utils} from '../../../utils/Utils';

export function TotalBalance() {
  const {user} = useUserContext();
  const myIcon = new Icon();
  const [totalBalance, setTotalBalance] = React.useState(0);
  const {profilePicture} = useProfilePicture();
  const [profileImage, setProfileImage] = React.useState(null);
  const [currentIcon, setCurrentIcon] = React.useState(
    myIcon.antdesignIcons.EDIT,
  );
  const [value, setValue] = React.useState(0);
  const [focusedInput, setFocusedInput] = React.useState(false);
  const [isPremium, setPremium] = React.useState(false);
  React.useEffect(() => {
    const unsubscribe = loadTotalBalance();
    return () => unsubscribe;
  }, []);

  React.useEffect(() => {
    const unsubscribe = loadProfilePictureFromDevice();
    return () => unsubscribe;
  }, [profilePicture]);

  React.useEffect(() => {
    const unsubscribe = checkIfUserIsPremium();
    return () => unsubscribe;
  }, []);

  function checkIfUserIsPremium() {
    firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .get()
      .then(data => {
        console.log(data.data());
        setPremium(data.data().isPremium);
      });
  }

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
        setValue(querySnap.data().total);
      });
  }

  function toogleIcon() {
    var myIcon = new Icon();
    if (currentIcon == myIcon.antdesignIcons.EDIT) {
      setFocusedInput(true);
      setCurrentIcon(myIcon.antdesignIcons.OK);
    } else {
      updateTotalInBalance();
      setCurrentIcon(myIcon.antdesignIcons.EDIT);
    }
  }

  function updateTotalInBalance() {
    if (isPremium) {
      firebase
        .firestore()
        .collection('Balances')
        .doc(user?.uid)
        .update({total: value})
        .then(() => console.log('atualizado'));
    } else Utils.ShowToast('Você deve ativar o Premium para isso :)');
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
      <TextContent fontSize={26} fontWeight="bold" editable={true}>
        Meu saldo
      </TextContent>
      <View style={{flexDirection: 'row', columnGap: 5, alignItems: 'center'}}>
        {currentIcon == myIcon.antdesignIcons.OK ? (
          <CurrencyInput
            autoFocus={focusedInput}
            value={value}
            onChangeValue={value => setValue(value)}
            placeholder="R$ 0,00"
            placeholderTextColor={'#fff'}
            style={{fontSize: 37, fontWeight: 'bold', color: '#000'}}
            keyboardType="decimal-pad"
            prefix="R$"
          />
        ) : (
          <TextContent fontSize={38} fontWeight="bold">
            {Utils.getBrazilianCurrency(totalBalance)}
          </TextContent>
        )}

        <TouchableOpacity onPress={toogleIcon}>
          <AntDesignIcon name={currentIcon} size={20} color={'#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
