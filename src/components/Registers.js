import {FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {useFirebase} from '../contexts/AuthContext';
import {Utils} from '../utils/Utils';
import Item from './Item';

export default function Registers({date}) {
  const {user} = useFirebase();

  const [registers, setRegisters] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = loadRegisters();
    return () => unsubscribe;
  }, [date]);

  function loadRegisters() {
    firestore()
      .collection('Registers')
      .where('createdBy', '==', user.uid)
      .where('dayMonthYear', '==', Utils.getDateFormated(date))
      .orderBy('createdAt', 'desc')
      .onSnapshot(data => {
        let listOfRegisters = [];
        setRegisters([]);
        data.docs.forEach(i => {
          Utils.print(i.data());
          let data = i.data();
          listOfRegisters.push({
            key: i.id,
            ...data,
          });
        });
        setRegisters(listOfRegisters);
      });
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={registers}
        renderItem={({item}) => <Item data={item} />}
        contentContainerStyle={{rowGap: 10}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
