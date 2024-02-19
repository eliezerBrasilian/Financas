import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {BannerPremium} from './widgets/BannerPremium';
import {GeneralGraphicText} from './widgets/GeneralGraphicText';
import {GoogleAds} from '../../classes/GoogleAds';
import Header from './widgets/Header';
import {HomeOverView} from './widgets/HomeOverView';
import {Menu} from './widgets/Menu';
import {MonthList} from './widgets/MonthList';
import ProfileImage from '../../components/ProfileImage';
import React from 'react';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import {colors} from '../../assets/colors/colors';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {useUserContext} from '../../contexts/UserContext';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateVisible, setDateVisible] = React.useState(false);
  const {loadTotalBalance} = useBalanceContext();
  var googleAds = new GoogleAds();
  const {user} = useUserContext();
  const [menuIsOpen, setMenuOpen] = React.useState(false);
  const [monthListVisible, setMonthListVisible] = React.useState(false);
  const [monthSelected, setMonthSelected] = React.useState('Janeiro');

  function clickedOutside() {
    setMenuOpen(false);
    setMonthListVisible(false);
  }

  function changeMonthSelected(month) {
    setMonthSelected(month);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.main_purple, flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={clickedOutside}
        style={{flex: 1}}>
        <StatusBar
          backgroundColor={colors.main_purple}
          barStyle={'light-content'}
        />

        <Header
          uid={user?.uid}
          setMenuOpen={setMenuOpen}
          setMonthListVisible={setMonthListVisible}
          monthSelected={monthSelected}
        />
        {menuIsOpen && <Menu setMenuOpen={setMenuOpen} />}
        {monthListVisible && (
          <MonthList
            monthSelected={monthSelected}
            changeMonthSelected={changeMonthSelected}
          />
        )}
        <MainContent>
          <HomeOverView uid={user?.uid} />
          <Spacer marginTop={180} />
          <BannerPremium />

          <GeneralGraphicText />

          <Registers />
        </MainContent>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MainContent({children}) {
  return (
    <View style={{flex: 1, backgroundColor: colors.background_home}}>
      {children}
    </View>
  );
}

function Registers() {
  return (
    <View style={{rowGap: 5}}>
      <Register
        imageIcon={require('../../assets/images/grafo_receita.png')}
        title={'Receita do período'}
      />
      <Register
        imageIcon={require('../../assets/images/grafo_despesa.png')}
        title={'Despesas'}
      />
      <Register
        imageIcon={require('../../assets/images/grafo_reserva.png')}
        title={'Reservas'}
      />
    </View>
  );
}

function Register({imageIcon, title}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        height: 60,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
        <ProfileImage profilePhoto={imageIcon} />
        <TextContent>{title}</TextContent>
      </View>
      <View style={{flex: 1}} />

      <TouchableOpacity>
        <View
          style={{
            height: '100%',
            width: 120,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontWeight: 700,
              borderBottomWidth: 1,
              borderBottomColor: 'red',
              color: 'red',
            }}>
            detalhes
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
