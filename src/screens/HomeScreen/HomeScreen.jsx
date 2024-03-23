import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';

import {BannerPremium} from './widgets/BannerPremium';
import Header from './widgets/Header';
import {Menu} from './widgets/Menu';
import ModalSelectFinanceOption from '../../components/modals/ModalSelectFinanceOption';
import {MonthList} from './widgets/MonthList';
import {RegistersOverview} from './widgets/RegistersOverview';
import {Spacer} from '../../components/Spacer';
import {TopOverView} from './widgets/TopOverView';
import {colors} from '../../assets/colors/colors';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {useIsFocused} from '@react-navigation/native';
import {usePlusButtonContext} from '../../contexts/PlusButtonContext';
import {useTabBarContext} from '../../contexts/TabBarContext';
import {useUserContext} from '../../contexts/UserContext';

export default function HomeScreen() {
  const {user} = useUserContext();
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [monthListVisible, setMonthListVisible] = useState(false);
  const [balanceIsHidden, setBalanceHidden] = useState(false);
  const {plusButtonClicked} = usePlusButtonContext();
  const {
    totalRevenues,
    totalExpenses,
    totalReservations,
    balance,
    doReload,
    updateMonthYear,
    givenMonthYear,
  } = useBalanceContext();

  useEffect(() => {
    const x = doReload();

    return () => x;
  }, []);

  function clickedOutside() {
    setMenuOpen(false);
    setMonthListVisible(false);
  }

  function changeMonthSelected(monthName) {
    updateMonthYear(monthName);
    setMonthListVisible(false);
  }

  const {showTabBar} = useTabBarContext();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      showTabBar();
    }
  }, [isFocused]);

  function handleMenuVisibility() {
    setMenuOpen(v => !v);
  }

  var toogleBalanceHidden = () => {
    setBalanceHidden(v => !v);
  };

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
          setMenuOpen={handleMenuVisibility}
          setMonthListVisible={setMonthListVisible}
          monthSelected={givenMonthYear}
          balance={balance}
          toogleBalanceHidden={toogleBalanceHidden}
          balanceIsHidden={balanceIsHidden}
        />
        {menuIsOpen && <Menu setMenuOpen={setMenuOpen} />}
        {monthListVisible && (
          <MonthList
            monthSelected={givenMonthYear}
            changeMonthSelected={changeMonthSelected}
          />
        )}
        {plusButtonClicked && <ModalSelectFinanceOption visible={true} />}

        <MainContent>
          <TopOverView
            uid={user?.uid}
            totalRevenues={totalRevenues}
            totalExpenses={totalExpenses}
            totalReservations={totalReservations}
            balanceIsHidden={balanceIsHidden}
          />
          <Spacer marginTop={185} />
          <BannerPremium />
          <RegistersOverview />
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
