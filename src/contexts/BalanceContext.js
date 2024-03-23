import React, {createContext, useContext, useEffect, useState} from 'react';

import {Collections} from '../enums/Collections';
import {DateTime} from '../classes/DateTime';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {tags} from '../enums/Tag';
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
  const [date, setDate] = useState(new Date());
  const [loadingSortList, setLoadingSortList] = useState(false);

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

  return (
    <BalanceContext.Provider
      value={{
        loadTotalBalance,
        balance,
        totalRevenues,
        totalExpenses,
        totalReservations,
        doReload,
        reload,
        date,
        updateMonthYear,
        givenMonthYear,
        resetDate,
      }}>
      {children}
    </BalanceContext.Provider>
  );
}
