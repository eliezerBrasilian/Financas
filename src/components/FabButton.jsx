import * as Animatable from 'react-native-animatable';

import {TouchableOpacity, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRegister} from '../contexts/RegisterContext';
import {useUserContext} from '../contexts/UserContext';
import {Utils} from '../utils/Utils';

export default function FabButton({onClick}) {
  const {user} = useUserContext();
  const {updated} = useRegister();
  const [registers, setRegisters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [registersEmpty, setRegisterEmpty] = React.useState(false);
  const [buttonColor, setButtonColor] = React.useState('#0A2239');
  React.useEffect(() => {
    const unsubscribe = loadRegisters();
    return () => unsubscribe;
  }, [updated]);

  function loadRegisters() {
    firestore()
      .collection('Registers')
      .where('createdBy', '==', user.uid)
      .where('dayMonthYear', '==', Utils.getDateFormated(new Date()))
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
          console.log('sim');
          setButtonColor('#0A2239');
        } else {
          setRegisterEmpty(false);
          setButtonColor('#80FFEC');
        }
      });
  }
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        right: 20,
      }}>
      <Animatable.View animation={'bounce'} duration={1000}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClick}
          style={{
            height: 70,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="pluscircle" color={buttonColor} size={60} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
