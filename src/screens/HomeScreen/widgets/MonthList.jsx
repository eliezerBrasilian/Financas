import {TouchableOpacity, View} from 'react-native';

import React from 'react';
import {colors} from '../../../assets/colors/colors';
import {DateTime} from '../../../classes/DateTime';
import {TextContent} from '../../../components/TextContent';

function MonthList({monthSelected, changeMonthSelected}) {
  var months = new DateTime();
  return (
    <View
      style={{
        backgroundColor: '#fff',
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
        zIndex: 2,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 15, // Para dispositivos Android
      }}>
      <MonthItem
        month={months.getMonths()[0]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[1]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[2]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[3]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[4]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[5]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[6]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[7]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[8]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[9]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[10]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
      <MonthItem
        month={months.getMonths()[11]}
        monthSelected={monthSelected}
        changeMonthSelected={changeMonthSelected}
      />
    </View>
  );
}

function MonthItem({month, monthSelected, changeMonthSelected}) {
  return (
    <TouchableOpacity onPress={() => changeMonthSelected(month)}>
      <View
        style={{
          borderBottomWidth: month !== 'Dezembro' ? 1 : undefined,
          borderBottomColor: month !== 'Dezembro' ? '#e1cfcf' : undefined,
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
        }}>
        {monthSelected == month ? (
          <View
            style={{
              borderRadius: 19,
              backgroundColor: '#c6bbbb',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 25,
              paddingVertical: 2,
            }}>
            <TextContent color={colors.main_purple}>{month}</TextContent>
          </View>
        ) : (
          <TextContent>{month}</TextContent>
        )}
      </View>
    </TouchableOpacity>
  );
}

export {MonthList};
