import {TouchableOpacity, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {colors} from '../../../assets/colors/colors';
import {Navigation} from '../../../classes/Navigation';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {Collections} from '../../../enums/Collections';
import {tags} from '../../../enums/Tag';
import {Utils} from '../../../utils/Utils';

function HomeOverView({uid}) {
  return (
    <MainContent>
      <Cards uid={uid} />
    </MainContent>
  );
}

function MainContent({children}) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        position: 'absolute',
        bottom: 10,
        height: 200,
        top: -20,
        left: 10,
        right: 10,
        borderRadius: 26,
        zIndex: 1,
      }}>
      {children}
    </View>
  );
}

function Cards({uid}) {
  const [totalRevenues, setTotalRevenues] = React.useState(0);
  const [totalExpenses, setTotalExpenses] = React.useState(0);
  const [totalReservations, setTotalReservations] = React.useState(0);

  React.useEffect(() => {
    loadRevenues(tags.REVENUE, setTotalRevenues);
    loadRevenues(tags.EXPENSE, setTotalExpenses);
    loadRevenues(tags.RESERVATION, setTotalReservations);
  }, []);

  function loadRevenues(tag, setter) {
    firestore()
      .collection(Collections.REGISTERS)
      .where('createdBy', '==', uid)
      .where('monthYear', '==', Utils.getMonthAndYear())
      .where('tag', '==', tag)
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        let listOfRegisters = [];
        let amount = 0;
        data.docs.forEach(i => {
          let data = i.data();
          amount += data.amount;
          listOfRegisters.push({
            key: i.id,
            ...data,
          });
        });

        setter(amount);
      });
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        paddingTop: 20,
      }}>
      <Card
        iconImage={require('../../../assets/images/receita.png')}
        title={'Receitas'}
        value={Utils.getBrazilianCurrency(totalRevenues)}
        destinationScreen={tags.REVENUE}
      />
      <Card
        iconImage={require('../../../assets/images/despesa.png')}
        title={'Despesas'}
        value={Utils.getBrazilianCurrency(totalExpenses)}
        destinationScreen={tags.EXPENSE}
      />
      <Card
        iconImage={require('../../../assets/images/reserva.png')}
        title={'Reservas'}
        value={Utils.getBrazilianCurrency(totalReservations)}
        destinationScreen={tags.RESERVATION}
      />
    </View>
  );
}

function Card({iconImage, title, value, destinationScreen}) {
  const nav = new Navigation();
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigateToDestinationScreenUsingParams(
          nav.screens.TYPE_OF_BALANCE_SELECTED,
          {tag: String(destinationScreen).toLowerCase()},
        );
      }}>
      <View
        style={{
          height: 160,
          width: 110,
          backgroundColor: 'white',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 25,
        }}>
        <ProfileImage profilePhoto={iconImage} size={35} resizeMode="contain" />
        <View>
          <TextContent>{title}</TextContent>
          <TextContent
            fontSize={19}
            fontWeight="500"
            color={colors.almost_black}>
            {value}
          </TextContent>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {HomeOverView};
