import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {Navigation} from '../../../classes/Navigation';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useProfilePicture} from '../../../contexts/ProfilePictureContext';
import {Utils} from '../../../utils/Utils';

export default function Header({
  uid,
  setMenuOpen,
  setMonthListVisible,
  monthSelected,
  balance,
}) {
  return (
    <View style={{height: 210, paddingTop: 30}}>
      <Top
        setMenuOpen={setMenuOpen}
        setMonthListVisible={setMonthListVisible}
        monthSelected={monthSelected}
      />
      <Total uid={uid} balance={balance} />
    </View>
  );
}

function Top({setMenuOpen, setMonthListVisible, monthSelected}) {
  const nav = new Navigation();
  const {profilePicture} = useProfilePicture();

  const [profilePicture_, setProfilePicture] = useState(profilePicture);

  useMemo(() => {
    setProfilePicture(profilePicture);
  }, [profilePicture]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-start',
      }}>
      <View style={{height: 45, marginTop: -10}}>
        <TouchableOpacity onPress={() => nav.navigateTo(nav.screens.PROFILE)}>
          <ProfileImage
            profilePhoto={profilePicture_}
            isAsynchronous={true}
            size={40}
            hasBorderRadius={true}
          />
        </TouchableOpacity>
      </View>
      <Month
        setMonthListVisible={setMonthListVisible}
        monthSelected={monthSelected}
      />
      <Right setMenuOpen={setMenuOpen} />
    </View>
  );
}

function Total({balance}) {
  const [balanceIsHidden, setBalanceHidden] = useState(false);

  var toogleBalanceHidden = () => {
    setBalanceHidden(v => !v);
  };

  return (
    <View style={{marginLeft: 20, marginTop: 28}}>
      <TextContent color="#fff" fontWeight="400">
        Saldo em contas
      </TextContent>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          alignItems: 'center',
        }}>
        {balanceIsHidden ? (
          <TextContent color="#fff" fontWeight="bold" fontSize={32}>
            R$ ****
          </TextContent>
        ) : (
          <TextContent color="#fff" fontWeight="bold" fontSize={32}>
            {Utils.getBrazilianCurrency(balance)}
          </TextContent>
        )}

        {/* <ProfileImage
        profilePhoto={require('../../../assets/images/olho.png')}
      /> */}
        <TouchableOpacity onPress={toogleBalanceHidden}>
          <View
            style={{
              height: 33,
              width: 33,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="eye" color="#fff" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Month({setMonthListVisible, monthSelected}) {
  return (
    <TouchableOpacity onPress={() => setMonthListVisible(old => !old)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 5,
          marginTop: 25,
        }}>
        <TextContent fontWeight="bold" fontSize={22} color="#fff">
          {monthSelected}
        </TextContent>
        <ProfileImage
          size={15}
          profilePhoto={require('../../../assets/images/seta_baixo_branco.png')}
        />
      </View>
    </TouchableOpacity>
  );
}

function Right({setMenuOpen}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 35}}>
      <TouchableOpacity onPress={() => setMenuOpen(true)}>
        <ProfileImage
          size={20}
          profilePhoto={require('../../../assets/images/menu.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
