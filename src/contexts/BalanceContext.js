import React, {createContext, useContext, useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {DateTime} from '../classes/DateTime';
import {Collections} from '../enums/Collections';
import {sort} from '../enums/Sort';
import {tags} from '../enums/Tag';
import {Utils} from '../utils/Utils';
import {useUserContext} from './UserContext';

const BalanceContext = createContext();

export function useBalanceContext() {
  return useContext(BalanceContext);
}

export function BalanceContextProvider({children}) {
  const uid = auth().currentUser?.uid;
  const {user} = useUserContext();
  const [balance, setBalance] = useState(0);
  const [totalRevenues, setTotalRevenues] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [sortRegistersList, setSortRegistersList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loadingSortList, setLoadingSortList] = useState(false);
  const [sortTotal, setSortTotal] = React.useState(0);
  const [reload, setReload] = useState(false);
  const [givenMonthYear, setGivenMonthYear] = useState(
    new DateTime().getMonthName(),
  );

  useEffect(() => {
    loadTotalBalance();
  }, [user, reload, givenMonthYear]);

  function resetDate() {
    setDate(new Date());
  }

  function doReload() {
    setReload(v => !v);
  }

  function updateMonthYear(newMonthName) {
    setGivenMonthYear(newMonthName);
  }

  async function loadTotalBalance() {
    var myDateTime = new DateTime();
    if (user != null) {
      const uid = user?.uid;

      var receitas = 0;
      var reservas = 0;
      var despesas = 0;

      const revenueQuerySnapshot = await firestore()
        .collection(Collections.REGISTERS)
        .where('createdBy', '==', uid)
        .where('tag', '==', tags.REVENUE)
        .where(
          'monthYear',
          '==',
          myDateTime.getMonthAndYearFromGivenMonthWritten(givenMonthYear),
        )
        .where('deleted', '==', false)
        .get();

      revenueQuerySnapshot.forEach(i => {
        receitas += i.data().amount;
      });

      const reservationQuerySnapshot = await firestore()
        .collection(Collections.REGISTERS)
        .where('createdBy', '==', uid)
        .where('tag', '==', tags.RESERVATION)
        .where(
          'monthYear',
          '==',
          myDateTime.getMonthAndYearFromGivenMonthWritten(givenMonthYear),
        )
        .get();

      reservationQuerySnapshot.forEach(i => {
        reservas += i.data().amount;
      });

      const expenseQuerySnapshot = await firestore()
        .collection(Collections.REGISTERS)
        .where('createdBy', '==', uid)
        .where('tag', '==', tags.EXPENSE)
        .where(
          'monthYear',
          '==',
          myDateTime.getMonthAndYearFromGivenMonthWritten(givenMonthYear),
        )
        .get();

      expenseQuerySnapshot.forEach(i => {
        despesas += i.data().amount;
      });

      var total = receitas - (reservas + despesas);

      setBalance(total);
      setTotalReservations(reservas);
      setTotalRevenues(receitas);
      setTotalExpenses(despesas);
    }
  }

  function changeWayRegistersAreSort(sortType, tag) {
    if (sortType == sort.DESCRIPTION_ASC) {
      loadRegistersFromTitleAscendlyAtoZ(tag);
    } else if (sortType == sort.DESCRIPTION_DESC) {
      loadRegistersFromTitleDescendlyZtoA(tag);
    } else {
      loadRegistersFromDateDescendly(tag);
    }
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

  function loadRegistersFromDateDescendly(tag) {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('tag', '==', tag.toLocaleLowerCase())
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

  function loadRegistersFromTitleAscendlyAtoZ(tag) {
    setLoadingSortList(true);
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('tag', '==', tag.toLocaleLowerCase())
      .where('deleted', '==', false)
      .orderBy('description', 'asc')
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
      .orderBy('description', 'asc')
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
      .orderBy('description', 'desc')
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
      .orderBy('description', 'desc')
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

  return (
    <BalanceContext.Provider
      value={{
        loadTotalBalance,
        balance,
        totalRevenues,
        totalExpenses,
        totalReservations,
        doReload,
        loadRegistersFromTitleAscendlyAtoZ,
        sortRegistersList,
        loadingSortList,
        sortTotal,
        changeWayRegistersAreSort,
        loadRegistersFromDateDescendly,
        decrementMonth,
        incrementMonth,
        date,
        changeWayRegistersAreSortOnTransactionHistory,
        loadRegistersFromDateDescendlyOnTransactionHistory,
        updateMonthYear,
        givenMonthYear,
        resetDate,
      }}>
      {children}
    </BalanceContext.Provider>
  );
}
