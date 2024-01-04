import React from 'react';
import {View} from 'react-native';
import {Balance} from '../../classes/Balance';
import Header from '../../components/Header';
import {OverlayView} from './OverlayView/OverlayView';
import {useTypeOfBalanceSelectedHook} from './TypeOfBalanceSelected.hook';
import {Top} from './widgets/Top';

export default function TypeOfBalanceSelected({route}) {
  const {
    loading,
    registers,
    tag,
    totalOfAmount,
    date,
    incrementMonth,
    decrementMonth,
  } = useTypeOfBalanceSelectedHook(route);

  return (
    <View
      style={{
        backgroundColor: Balance.getCurrentColor(tag),
        flex: 1,
      }}>
      <View style={{margin: 10}}>
        <Header title={Balance.getCurrentTitle(tag)} color="#fff" />
      </View>

      <Top
        tag={tag}
        amount={totalOfAmount}
        title={Balance.getCurrentTitle(tag)}
      />

      <OverlayView
        registers={registers}
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
        loading={loading}
      />
    </View>
  );
}
