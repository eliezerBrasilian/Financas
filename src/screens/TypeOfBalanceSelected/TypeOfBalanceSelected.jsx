import React, {useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';

import {BackgroundColor} from '../../classes/BackgroundColor';
import {HeaderBalanceSelected} from '../../components/HeaderBalanceSelected';
import {ListViewBalances} from '../../components/ListViewBalances';
import {Navigation} from '../../classes/Navigation';
import {OverlayView} from '../../components/OverlayView';
import {SortBy} from '../../components/SortBy';
import {Title} from '../../classes/Title';
import {Top} from '../../components/Top';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {useIsFocused} from '@react-navigation/native';
import {useTabBarContext} from '../../contexts/TabBarContext';

export default function TypeOfBalanceSelected({route}) {
  const [bgColor, setBgColor] = useState('#fff');
  const [title, setTitle] = useState('');

  const [menuIsOpen, setMenuOpen] = React.useState(false);
  const [listViewBalancesVisible, setListViewBalancesVisible] = useState(false);
  const tag = route.params?.tag;
  const nav = new Navigation();

  const {
    loadRegistersFromDateDescendly,
    sortRegistersList,
    loadingSortList,
    sortTotal,
    decrementMonth,
    incrementMonth,
    date,
    resetDate,
  } = useBalanceContext();

  useEffect(() => {
    setBgColor(BackgroundColor.getBackgrouncColor(tag));
    setTitle(Title.getTitle(tag));
  }, [route]);

  useEffect(() => {
    const unsubscribe = loadRegistersFromDateDescendly(tag);
    return () => unsubscribe;
  }, [date, tag]);

  const {hideTabBar} = useTabBarContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      resetDate();
      hideTabBar();
    }
  }, [isFocused]);

  function dropdownListOfBalance() {
    setListViewBalancesVisible(value => !value);
  }

  var handleClickOnListBalances = tag => {
    setListViewBalancesVisible(false);
    nav.navigateToDestinationScreenUsingParams(
      nav.screens.TYPE_OF_BALANCE_SELECTED,
      {
        tag: tag,
      },
    );
  };

  function activateSortMenu() {
    setMenuOpen(v => !v);
  }

  function closeAllPopUps() {
    setMenuOpen(false);
    setListViewBalancesVisible(false);
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        flex: 1,
      }}
      activeOpacity={1.0}
      onPress={closeAllPopUps}>
      <StatusBar backgroundColor={bgColor} barStyle={'light-content'} />
      <View style={{margin: 10}}>
        <HeaderBalanceSelected
          title={title}
          color="#fff"
          dropdownListOfBalance={dropdownListOfBalance}
          activateSortMenu={activateSortMenu}
        />
      </View>
      <Top
        tag={tag}
        //amount={totalOfAmount}
        amount={sortTotal}
        title={'Total de ' + title}
      />

      <OverlayView
        registers={sortRegistersList}
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
        loading={loadingSortList}
        color={bgColor}
        closeAllPopUps={closeAllPopUps}
      />
      {listViewBalancesVisible && (
        <ListViewBalances onClick={handleClickOnListBalances} />
      )}

      {menuIsOpen && <SortBy setMenuOpen={setMenuOpen} tag={tag} />}
    </TouchableOpacity>
  );
}
