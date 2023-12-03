import Header from '../../components/Header';
import {Loading} from '../../components/Loading';
import {MainView} from './widgets/MainView';
import React from 'react';
import {Top} from './widgets/Top';
import {Utils} from '../../utils/Utils';
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useFirebase} from '../../contexts/AuthContext';

export default function TypeOfBalanceSelected({route}) {
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
  }, [date]);

  function loadRegisters() {
    setLoading(true);
    firestore()
      .collection('Registers')
      .where('createdBy', '==', user.uid)
      .where('monthYear', '==', Utils.getMonthAndYear(date))
      .where('tag', '==', tag.toLocaleLowerCase())
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        let listOfRegisters = [];
        let amount = 0;
        setRegisters([]);
        data.docs.forEach(i => {
          Utils.print(i.data());
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
  return (
    <View
      style={{
        backgroundColor: Utils.getUsefulInformationsAboutCurrentBalance(
          tag,
          true,
        ).backgroundColor,
        flex: 1,
      }}>
      <View style={{margin: 10}}>
        <Header
          title={Utils.getUsefulInformationsAboutCurrentBalance(tag).title}
          color="#fff"
        />
      </View>

      <Top
        amount={totalOfAmount}
        title={Utils.getUsefulInformationsAboutCurrentBalance(tag).title}
      />

      <MainView
        registers={registers}
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
        loading={loading}
      />
    </View>
  );
}
