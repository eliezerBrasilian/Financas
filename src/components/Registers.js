import {FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {useFirebase} from '../contexts/AuthContext';
import {useRegister} from '../contexts/RegisterContext';
import {Utils} from '../utils/Utils';
import Item from './Item';

export default function Registers({date}) {
  const {user} = useFirebase();
  const {updated} = useRegister();
  const [registers, setRegisters] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = loadRegisters();
    return () => unsubscribe;
  }, [date, updated]);

  function loadRegisters() {
    firestore()
      .collection('Registers')
      .where('createdBy', '==', user.uid)
      .where('dayMonthYear', '==', Utils.getDateFormated(date))
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .onSnapshot(data => {
        let listOfRegisters = [];
        setRegisters([]);
        data.docs.forEach(i => {
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
