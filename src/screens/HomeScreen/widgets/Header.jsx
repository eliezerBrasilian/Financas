import {TouchableOpacity, View} from 'react-native';

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {CustomIcon} from '../../../components/CustomIcon';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
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
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-start',
      }}>
      <View style={{height: 45, marginTop: -10}}>
        <ProfileImage size={40} />
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
        <TextContent color="#fff" fontWeight="bold" fontSize={32}>
          {Utils.getBrazilianCurrency(balance)}
        </TextContent>
        {/* <ProfileImage
        profilePhoto={require('../../../assets/images/olho.png')}
      /> */}
        <Feather name="eye" color="#fff" size={20} />
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
          marginLeft: 27,
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
      {/* <ProfileImage
        size={20}
        profilePhoto={require('../../../assets/images/editar.png')}
      /> */}
      <CustomIcon
        height={25}
        width={25}
        path={require('../../../assets/images/pencil_premium.png')}
      />

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
