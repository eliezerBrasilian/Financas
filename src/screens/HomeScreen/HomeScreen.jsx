import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';

import {BannerPremium} from './widgets/BannerPremium';
import {GeneralGraphicText} from './widgets/GeneralGraphicText';
import {GoogleAds} from '../../classes/GoogleAds';
import Header from './widgets/Header';
import {HomeOverView} from './widgets/HomeOverView';
import {Menu} from './widgets/Menu';
import ModalSelectFinanceOption from '../../components/modals/ModalSelectFinanceOption';
import {MonthList} from './widgets/MonthList';
import React from 'react';
import {Registers} from './widgets/Registers';
import {Spacer} from '../../components/Spacer';
import {colors} from '../../assets/colors/colors';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {usePlusButtonContext} from '../../contexts/PlusButtonContext';
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
  const {plusButtonClicked} = usePlusButtonContext();

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
        {plusButtonClicked && <ModalSelectFinanceOption visible={true} />}

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
