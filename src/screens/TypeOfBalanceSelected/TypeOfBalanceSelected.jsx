import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {BackgroundColor} from '../../classes/BackgroundColor';
import {Title} from '../../classes/Title';
import {useUserContext} from '../../contexts/UserContext';
import {Utils} from '../../utils/Utils';
import {Header} from './widgets/Header';
import {ListViewBalances} from './widgets/ListViewBalances';
import {OverlayView} from './widgets/OverlayView';
import {Top} from './widgets/Top';

export default function TypeOfBalanceSelected({route}) {
  const [bgColor, setBgColor] = useState('#000');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(Utils.getMonth(new Date()));
  const [loading, setLoading] = useState(true);
  const [registers, setRegisters] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [listViewBalancesVisible, setListViewBalancesVisible] = useState(false);
  const {user} = useUserContext();
  const tag = route.params?.tag;

  useEffect(() => {
    setBgColor(BackgroundColor.getBackgrouncColor(tag));
    setTitle(Title.getTitle(tag));
  }, [route]);

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
        setTotal(amount);
        setLoading(false);
      });
  }

  function dropdownListOfBalance() {
    setListViewBalancesVisible(value => !value);
  }

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

  var hideListEvent = () => {
    setListViewBalancesVisible(false);
  };

  return (
    <View
      style={{
        backgroundColor: bgColor,
        flex: 1,
      }}>
      <StatusBar backgroundColor={bgColor} barStyle={'light-content'} />
      <View style={{margin: 10}}>
        <Header
          title={title}
          color="#fff"
          dropdownListOfBalance={dropdownListOfBalance}
        />
      </View>
      <Top
        tag={tag}
        //amount={totalOfAmount}
        amount={total}
        title={title}
      />

      <OverlayView
        registers={registers}
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
        loading={loading}
        color={bgColor}
      />
      {listViewBalancesVisible && (
        <ListViewBalances hideListEvent={hideListEvent} />
      )}
    </View>
  );
}
