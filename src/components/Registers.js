import {FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {colors} from '../assets/colors/colors';
import {useFirebase} from '../contexts/AuthContext';
import {useRegister} from '../contexts/RegisterContext';
import {Utils} from '../utils/Utils';
import Item from './Item';
import {TextContent} from './TextContent';

export default function Registers({date}) {
  const {user} = useFirebase();
  const {updated} = useRegister();
  const [registers, setRegisters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [registersEmpty, setRegisterEmpty] = React.useState(false);
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
        if (data.empty) {
          setRegisterEmpty(true);
        } else setRegisterEmpty(false);
        setRegisters(listOfRegisters);
      });
  }
  return registersEmpty ? (
    <TextContent>Você ainda não fez nenhum registro</TextContent>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.purple_background,
        padding: 5,
        borderRadius: 15,
      }}>
      <FlatList
        data={registers}
        renderItem={({item}) => <Item data={item} />}
        contentContainerStyle={{rowGap: 10}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
