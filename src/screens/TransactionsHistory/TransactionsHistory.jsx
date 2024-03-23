import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';

import {Collections} from '../../enums/Collections';
import {DateTime} from '../../classes/DateTime';
import {FlashList} from '@shopify/flash-list';
import {HeaderTransactionsHistory} from '../../components/HeaderTransactionsHistory';
import {OverlayView} from '../../components/OverlayView';
import {SortBy} from '../../components/SortBy';
import {Top} from '../../components/Top';
import {Utils} from '../../utils/Utils';
import auth from '@react-native-firebase/auth';
import {colors} from '../../assets/colors/colors';
import firestore from '@react-native-firebase/firestore';
import {sort} from '../../enums/Sort';

function TransactionsHistory({route}) {
  const uid = auth().currentUser?.uid;
  const [bgColor] = useState('#000');
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [sortRegistersList, setSortRegistersList] = useState([]);
  const [loadingSortList, setLoadingSortList] = useState(false);
  const [sortTotal, setSortTotal] = useState(0);
  const [date, setDate] = useState(new Date());
  const tag = route.params?.tag;

  useEffect(() => {
    const unsubscribe = loadRegistersFromDateDescendlyOnTransactionHistory();
    return () => unsubscribe;
  }, [date, tag]);

  function activateSortMenu() {
    setMenuOpen(v => !v);
  }

  function changeWayRegistersAreSortOnTransactionHistory(sortType) {
    if (sortType == sort.DESCRIPTION_ASC) {
      loadRegistersFromTitleAscendlyAtoZOnTransactionHistory();
    } else if (sortType == sort.DESCRIPTION_DESC) {
      loadRegistersFromTitleDescendlyZtoAOnTransactionHistory();
    } else {
      loadRegistersFromDateDescendlyOnTransactionHistory();
    }
  }

  function loadRegistersFromDateDescendlyOnTransactionHistory() {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('deleted', '==', false)
      .orderBy('dayMonthYear', 'desc')
      .get()
      .then(
        data => {
          let listOfRegisters = [];
          let amount = 0;

          data.docs.forEach(i => {
            let data = i.data();
            amount += data.amount;
            listOfRegisters.push({
              key: i.id,
              ...data,
            });
          });

          setSortTotal(amount);
          setSortRegistersList(listOfRegisters);
          setLoadingSortList(false);
        },
        error => {
          console.log('error');
          console.log(error.message);
        },
      );
  }

  function loadRegistersFromTitleAscendlyAtoZOnTransactionHistory() {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('deleted', '==', false)
      .orderBy('descriptionInLowerCaseForSearching', 'asc')
      .get()
      .then(
        data => {
          let listOfRegisters = [];
          let amount = 0;

          data.docs.forEach(i => {
            let data = i.data();
            amount += data.amount;
            listOfRegisters.push({
              key: i.id,
              ...data,
            });
          });
          setSortTotal(amount);
          setSortRegistersList(listOfRegisters);
          setLoadingSortList(false);
        },
        error => {
          console.log('error');
          console.log(error.message);
        },
      );
  }

  function loadRegistersFromTitleDescendlyZtoAOnTransactionHistory() {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('deleted', '==', false)
      .orderBy('descriptionInLowerCaseForSearching', 'desc')
      .get()
      .then(
        data => {
          let listOfRegisters = [];
          let amount = 0;

          data.docs.forEach(i => {
            let data = i.data();
            amount += data.amount;
            listOfRegisters.push({
              key: i.id,
              ...data,
            });
          });
          setSortTotal(amount);
          setSortRegistersList(listOfRegisters);
          setLoadingSortList(false);
        },
        error => {
          console.log('error');
          console.log(error.message);
        },
      );
  }

  var decrementMonth = () => {
    const thisDate = date;
    const newDate = new DateTime().decreaseMonth(thisDate);
    setDate(newDate);
  };

  var incrementMonth = () => {
    const thisDate = date;
    const newDate = new DateTime().increaseMonth(thisDate);
    setDate(newDate);
  };

  const onClickedOnSort = sortType => {
    changeWayRegistersAreSortOnTransactionHistory(sortType);
    closeAllPopUps();
  };

  function closeAllPopUps() {
    setMenuOpen(false);
  }

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
        <HeaderTransactionsHistory
          title={'Histórico'}
          color="#fff"
          activateSortMenu={activateSortMenu}
        />
      </View>
      {menuIsOpen && (
        <SortBy
          setMenuOpen={setMenuOpen}
          isFromTransactionHistory={true}
          onClick={onClickedOnSort}
        />
      )}
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
        isFromTransactionHistory={true}
      />
    </View>
  );
}

export {TransactionsHistory};
