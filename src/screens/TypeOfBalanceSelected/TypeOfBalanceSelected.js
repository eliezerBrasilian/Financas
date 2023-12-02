import {FlatList, TouchableOpacity, View} from 'react-native';

import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Item from '../../components/Item';
import React from 'react';
import {TextContent} from '../../components/TextContent';
import {Utils} from '../../utils/Utils';
import firestore from '@react-native-firebase/firestore';
import {useFirebase} from '../../contexts/AuthContext';

export default function TypeOfBalanceSelected({route}) {
  const tag = route.params?.tag;
  const [date, setDate] = React.useState(new Date());
  const [month, setMonth] = React.useState(Utils.getMonth(new Date()));
  const [registers, setRegisters] = React.useState([]);
  const [totalOfAmount, setTotalOfAmount] = React.useState(0);
  const {user} = useFirebase();
  React.useEffect(() => {
    function loadRegisters() {
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
          Utils.print(amount);
        });
    }
    loadRegisters();
  }, [date]);
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
    <View style={{backgroundColor: 'green', flex: 1}}>
      <View style={{margin: 10}}>
        <Header title={'Receita'} color="#fff" />
      </View>

      <Top amount={totalOfAmount} />
      <MainView
        registers={registers}
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
      />
    </View>
  );
}
const Top = ({amount}) => {
  return (
    <View style={{alignItems: 'center', marginBottom: 20}}>
      <TextContent fontSize={19} color="#fff">
        Total de Receita
      </TextContent>
      <TextContent fontSize={25} color="#fff" fontWeight="bold">
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </View>
  );
};

const MainView = ({registers, date, incrementMonth, decrementMonth}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <HeaderOfMainView
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
      />
      <View
        style={{borderWidth: 1, borderColor: '#d9d9d9', marginHorizontal: 30}}
      />
      <View style={{flex: 1, marginHorizontal: 20, marginTop: 20}}>
        <FlatList
          data={registers}
          renderItem={({item}) => <Item data={item} />}
          contentContainerStyle={{rowGap: 10}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View>
              <TextContent>Nenhum registro</TextContent>
            </View>
          }
        />
      </View>
    </View>
  );
};

const HeaderOfMainView = ({date, incrementMonth, decrementMonth}) => {
  return (
    <View style={{alignItems: 'center', padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '70%',
        }}>
        <TouchableOpacity onPress={decrementMonth}>
          <Icon color="#000" size={20} />
        </TouchableOpacity>

        <TextContent fontSize={22}>{Utils.getMonth(date)}</TextContent>
        <TouchableOpacity onPress={incrementMonth}>
          <Icon color="#000" name="right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
