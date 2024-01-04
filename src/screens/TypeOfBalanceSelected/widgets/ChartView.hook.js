import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {DateTime} from '../../../classes/DateTime';
import {useUserContext} from '../../../contexts/UserContext';

function useChartView(tag) {
  const {user} = useUserContext();
  const [totalOfAmountCurrentMonth, setTotalOfAmountCurrentMonth] =
    React.useState(0);
  const [totalOfAmountPastMonth, setTotalOfAmountPastMonth] = React.useState(0);
  const [totalOfAmountThreeMonthsAgo, setTotalOfAmountThreeMonthsAgo] =
    React.useState(0);
  const [totalOfAmountFourMonthsAgo, setTotalOfAmountFourMonthsAgo] =
    React.useState(0);

  const datetime = new DateTime();
  const months = datetime.monthsThatCanBeSelected;
  React.useEffect(() => {
    loadRegisterForTheFivePastMonths();
  }, []);

  async function loadRegisterForTheFivePastMonths() {
    await Promise.all(
      loadTotalOfAmountCurrentMonth(),
      loadTotalOfAmountPastMonth(),
      loadTotalOfAmountThreeMonthsAgo(),
      loadTotalOfAmountFourMonthsAgo(),
    );
  }

  async function loadTotalOfAmountCurrentMonth() {
    var myDate = new DateTime();
    console.log('current: ' + myDate.getMonthAndYear(months.CURRENT));
    await firestore()
      .collection('Registers')
      .where('createdBy', '==', user?.uid)
      .where('monthYear', '==', myDate.getMonthAndYear(months.CURRENT))
      .where('tag', '==', tag)
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        let amount = 0;

        data.docs.forEach(i => {
          let data = i.data();
          amount += data.amount;
        });
        console.log('amount: ' + amount);
        setTotalOfAmountCurrentMonth(amount);
      });
  }
  async function loadTotalOfAmountPastMonth() {
    var myDate = new DateTime();
    await firestore()
      .collection('Registers')
      .where('createdBy', '==', user?.uid)
      .where('monthYear', '==', myDate.getMonthAndYear(months.PAST_MONTH))
      .where('tag', '==', tag)
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        let amount = 0;

        data.docs.forEach(i => {
          let data = i.data();
          amount += data.amount;
        });
        console.log('amount: ' + amount);
        setTotalOfAmountPastMonth(amount);
      });
  }
  async function loadTotalOfAmountThreeMonthsAgo() {
    var myDate = new DateTime();
    await firestore()
      .collection('Registers')
      .where('createdBy', '==', user?.uid)
      .where('monthYear', '==', myDate.getMonthAndYear(months.THREE_MONTHS_AGO))
      .where('tag', '==', tag)
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        let amount = 0;

        data.docs.forEach(i => {
          let data = i.data();
          amount += data.amount;
        });
        console.log('amount: ' + amount);
        setTotalOfAmountThreeMonthsAgo(amount);
      });
  }
  async function loadTotalOfAmountFourMonthsAgo() {
    var myDate = new DateTime();
    await firestore()
      .collection('Registers')
      .where('createdBy', '==', user?.uid)
      .where('monthYear', '==', myDate.getMonthAndYear(months.FOUR_MONTHS_AGO))
      .where('tag', '==', tag)
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        let amount = 0;

        data.docs.forEach(i => {
          let data = i.data();
          amount += data.amount;
        });
        console.log('amount: ' + amount);
        setTotalOfAmountFourMonthsAgo(amount);
      });
  }

  return {
    totalOfAmountCurrentMonth,
    totalOfAmountPastMonth,
    totalOfAmountThreeMonthsAgo,
    totalOfAmountFourMonthsAgo,
  };
}

export {useChartView};
