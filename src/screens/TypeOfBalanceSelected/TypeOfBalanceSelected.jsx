import React from 'react';
import {View} from 'react-native';
import Header from '../../components/Header';
import {Utils} from '../../utils/Utils';
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
        backgroundColor: Utils.getUsefulInformationsAboutCurrentBalance(
          tag,
          true,
        ).backgroundColor,
        flex: 1,
      }}>
      <View style={{margin: 10}}>
        <Header
          title={Utils.getUsefulInformationsAboutCurrentBalance(tag).title}
          color="#fff"
        />
      </View>

      <Top
        tag={tag}
        amount={totalOfAmount}
        title={Utils.getUsefulInformationsAboutCurrentBalance(tag).title}
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
