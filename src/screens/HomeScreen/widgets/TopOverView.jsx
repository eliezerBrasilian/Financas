import {TouchableOpacity, View} from 'react-native';

import {Navigation} from '../../../classes/Navigation';
import ProfileImage from '../../../components/ProfileImage';
import React from 'react';
import {TextContent} from '../../../components/TextContent';
import {Utils} from '../../../utils/Utils';
import {colors} from '../../../assets/colors/colors';
import {tags} from '../../../enums/Tag';

function TopOverView({uid, totalRevenues, totalExpenses, totalReservations}) {
  return (
    <MainContent>
      <Cards
        uid={uid}
        totalRevenues={totalRevenues}
        totalExpenses={totalExpenses}
        totalReservations={totalReservations}
      />
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

function Cards({uid, totalRevenues, totalExpenses, totalReservations}) {
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

export {TopOverView};
