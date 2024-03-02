import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';

import {HeaderTransactionsHistory} from '../../components/HeaderTransactionsHistory';
import {OverlayView} from '../../components/OverlayView';
import {SortBy} from '../../components/SortBy';
import {Top} from '../../components/Top';
import {colors} from '../../assets/colors/colors';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {useIsFocused} from '@react-navigation/native';

function TransactionsHistory({route}) {
  const [bgColor, setBgColor] = useState('#000');
  const [menuIsOpen, setMenuOpen] = React.useState(false);
  const tag = route.params?.tag;
  const isFocused = useIsFocused();
  const {
    sortRegistersList,
    loadingSortList,
    loadRegistersFromDateDescendlyOnTransactionHistory,
    sortTotal,
    decrementMonth,
    incrementMonth,
    date,
    resetDate,
  } = useBalanceContext();

  useEffect(() => {
    const unsubscribe = loadRegistersFromDateDescendlyOnTransactionHistory();
    return () => unsubscribe;
  }, [date, tag]);

  function activateSortMenu() {
    setMenuOpen(v => !v);
  }

  function closeAllPopUps() {
    setMenuOpen(false);
    setListViewBalancesVisible(false);
  }

  useEffect(() => {
    resetDate();
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: colors.main_purple,
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={colors.main_purple}
        barStyle={'light-content'}
      />
      <View style={{margin: 10}}>
        <HeaderTransactionsHistory title={'Histórico'} color="#fff" />
      </View>
      <Top
        tag={tag}
        //amount={totalOfAmount}
        amount={sortTotal}
        title={'Movimentação total efetuada'}
      />

      <OverlayView
        registers={sortRegistersList}
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
        loading={loadingSortList}
        color={bgColor}
      />
      {menuIsOpen && (
        <SortBy setMenuOpen={setMenuOpen} isFromTransactionHistory={true} />
      )}
    </View>
  );
}

export {TransactionsHistory};
