import React, {useEffect} from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {colors} from '../../assets/colors/colors';
import {Spacer} from '../../components/Spacer';
import ModalSelectFinanceOption from '../../components/modals/ModalSelectFinanceOption';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {usePlusButtonContext} from '../../contexts/PlusButtonContext';
import {useTabBarContext} from '../../contexts/TabBarContext';
import {useUserContext} from '../../contexts/UserContext';
import {GoogleAdsService} from '../../services/GoogleAdsService';
import {BannerPremium} from './widgets/BannerPremium';
import Header from './widgets/Header';
import {Menu} from './widgets/Menu';
import {MonthList} from './widgets/MonthList';
import {RegistersOverview} from './widgets/RegistersOverview';
import {TopOverView} from './widgets/TopOverView';

export default function HomeScreen() {
  var googleAds = new GoogleAdsService();
  const {user} = useUserContext();
  const [menuIsOpen, setMenuOpen] = React.useState(false);
  const [monthListVisible, setMonthListVisible] = React.useState(false);
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
          monthSelected={givenMonthYear}
          balance={balance}
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
