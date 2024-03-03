import React, {useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {BackgroundColor} from '../../classes/BackgroundColor';
import {DateTime} from '../../classes/DateTime';
import {Navigation} from '../../classes/Navigation';
import {Title} from '../../classes/Title';
import {HeaderBalanceSelected} from '../../components/HeaderBalanceSelected';
import {ListViewBalances} from '../../components/ListViewBalances';
import {OverlayView} from '../../components/OverlayView';
import {SortBy} from '../../components/SortBy';
import {Top} from '../../components/Top';
import {useTabBarContext} from '../../contexts/TabBarContext';
import {Collections} from '../../enums/Collections';
import {sort} from '../../enums/Sort';
import {Utils} from '../../utils/Utils';

export default function TypeOfBalanceSelected({route}) {
  const uid = auth().currentUser?.uid;
  const [bgColor, setBgColor] = useState('#fff');
  const [title, setTitle] = useState('');
  const [sortRegistersList, setSortRegistersList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [menuIsOpen, setMenuOpen] = React.useState(false);
  const [listViewBalancesVisible, setListViewBalancesVisible] = useState(false);
  const tag = route.params?.tag;
  const nav = new Navigation();

  const [loadingSortList, setLoadingSortList] = useState(false);
  const [sortTotal, setSortTotal] = React.useState(0);

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
      hideTabBar();
    }
  }, [isFocused]);

  function loadRegistersFromDateDescendly(tag) {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('tag', '==', tag.toLocaleLowerCase())
      .where('deleted', '==', false)
      .orderBy('dayMonthYear', 'desc')
      .onSnapshot(
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

  function changeWayRegistersAreSort(sortType, tag) {
    if (sortType == sort.DESCRIPTION_ASC) {
      loadRegistersFromTitleAscendlyAtoZ(tag);
    } else if (sortType == sort.DESCRIPTION_DESC) {
      loadRegistersFromTitleDescendlyZtoA(tag);
    } else {
      loadRegistersFromDateDescendly(tag);
    }
  }

  function loadRegistersFromTitleAscendlyAtoZ(tag) {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('tag', '==', tag.toLocaleLowerCase())
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

  function loadRegistersFromTitleDescendlyZtoA(tag) {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('tag', '==', tag.toLocaleLowerCase())
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

      {menuIsOpen && (
        <SortBy
          setMenuOpen={setMenuOpen}
          tag={tag}
          onClick={changeWayRegistersAreSort}
        />
      )}
    </TouchableOpacity>
  );
}
