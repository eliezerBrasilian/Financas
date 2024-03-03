import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {colors} from '../../../assets/colors/colors';
import {Navigation} from '../../../classes/Navigation';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {tags} from '../../../enums/Tag';
import {Utils} from '../../../utils/Utils';

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
        columnGap: 9,
        justifyContent: 'center',
        paddingTop: 20,
      }}>
      <Card
        iconImage={require('../../../assets/images/receita.png')}
        title={'Receitas'}
        value={Utils.getBrazilianCurrency(totalRevenues)}
        originalValue={totalRevenues}
        destinationScreen={tags.REVENUE}
      />
      <Card
        iconImage={require('../../../assets/images/despesa.png')}
        title={'Despesas'}
        value={Utils.getBrazilianCurrency(totalExpenses)}
        originalValue={totalExpenses}
        destinationScreen={tags.EXPENSE}
      />
      <Card
        iconImage={require('../../../assets/images/reserva.png')}
        title={'Reservas'}
        value={Utils.getBrazilianCurrency(totalReservations)}
        originalValue={totalReservations}
        destinationScreen={tags.RESERVATION}
      />
    </View>
  );
}

function Card({iconImage, title, value, destinationScreen, originalValue}) {
  const nav = new Navigation();

  const [formatedValue, setFormatedValue] = useState(originalValue);
  const [originalValue_, setOriginalValue_] = useState(originalValue);

  useMemo(() => {
    setOriginalValue_(originalValue);
    if (originalValue >= 10000 && originalValue < 100000) {
      const stringfied = originalValue.toString();

      const formaatedValue =
        'R$ ' +
        stringfied[0] +
        stringfied[1] +
        ',' +
        stringfied[2] +
        stringfied[3] +
        stringfied[4] +
        '...';

      console.log(formaatedValue);

      setFormatedValue(formaatedValue);
    }
    if (originalValue >= 100000 && originalValue < 999000) {
      const stringfied = originalValue.toString();

      const formaatedValue =
        'R$ ' +
        stringfied[0] +
        stringfied[1] +
        stringfied[2] +
        '.' +
        stringfied[3] +
        stringfied[4] +
        '...';

      console.log(formaatedValue);

      setFormatedValue(formaatedValue);
    }
  }, [originalValue]);

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
          width: 112,
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
            {originalValue_ >= 10000 ? formatedValue : value}
          </TextContent>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {TopOverView};
