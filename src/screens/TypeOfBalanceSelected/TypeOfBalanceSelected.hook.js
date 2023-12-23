import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {useFirebase} from '../../contexts/AuthContext';
import {useRegister} from '../../contexts/RegisterContext';
import {Utils} from '../../utils/Utils';

function useTypeOfBalanceSelectedHook(route) {
  const {updated} = useRegister();
  const tag = route.params?.tag;
  const [date, setDate] = React.useState(new Date());
  const [month, setMonth] = React.useState(Utils.getMonth(new Date()));
  const [registers, setRegisters] = React.useState([]);
  const [totalOfAmount, setTotalOfAmount] = React.useState(0);
  const {user} = useFirebase();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = loadRegisters();
    return () => unsubscribe;
  }, [date, updated]);

  function loadRegisters() {
    setLoading(true);
    firestore()
      .collection('Registers')
      .where('createdBy', '==', user.uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('tag', '==', tag.toLocaleLowerCase())
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        let listOfRegisters = [];
        let amount = 0;
        setRegisters([]);
        data.docs.forEach(i => {
          let data = i.data();
          amount += data.amount;
          listOfRegisters.push({
            key: i.id,
            ...data,
          });
        });

        setRegisters(listOfRegisters);
        setTotalOfAmount(amount);
        setLoading(false);
      });
  }

  var toogleCalendar = () => {
    setDateVisible(!dateVisible);
  };

  var decrementMonth = () => {
    const thisDate = date;
    const newDate = Utils.decreaseMonth(thisDate);
    setDate(newDate);
  };
  var incrementMonth = () => {
    const thisDate = date;
    const newDate = Utils.increaseMonth(thisDate);
    setDate(newDate);
  };

  return {
    updated,
    tag,
    month,
    registers,
    totalOfAmount,
    user,
    loading,
    date,
    incrementMonth,
    decrementMonth,
  };
}

export {useTypeOfBalanceSelectedHook};
