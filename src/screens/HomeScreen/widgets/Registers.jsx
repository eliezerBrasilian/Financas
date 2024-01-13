import {FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {colors} from '../../../assets/colors/colors';
import {BannerAds} from '../../../components/BannerAds';
import Item from '../../../components/Item';
import {Loading} from '../../../components/Loading';
import {TextContent} from '../../../components/TextContent';
import {useRegister} from '../../../contexts/RegisterContext';
import {useUserContext} from '../../../contexts/UserContext';
import {Utils} from '../../../utils/Utils';

export default function Registers({date}) {
  const {user} = useUserContext();
  const {updated} = useRegister();
  const [registers, setRegisters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
        setLoading(false);
      });
  }

  return loading ? <Loading /> : <RegisterView registers={registers} />;
}

function RegisterView({registers}) {
  if (registers.length == 0)
    return (
      <View>
        <TextContent textAlign="center">
          Você ainda não fez nenhum registro
        </TextContent>
        <BannerAds />
      </View>
    );
  else
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.purple_background,
          padding: 10,
          borderRadius: 15,
        }}>
        <FlatList
          data={registers}
          renderItem={({item}) => <Item data={item} />}
          contentContainerStyle={{rowGap: 10}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<BannerAds />}
        />
      </View>
    );
}
