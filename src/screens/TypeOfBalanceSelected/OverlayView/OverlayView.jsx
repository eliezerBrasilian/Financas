import {FlatList, View} from 'react-native';

import React from 'react';
import {BannerAds} from '../../../components/BannerAds';
import {Loading} from '../../../components/Loading';
import {TextContent} from '../../../components/TextContent';
import Register from '../widgets/Register';
import {HeaderOfOverlayView} from './HeaderOfOverlayView';

export const OverlayView = ({
  registers,
  date,
  incrementMonth,
  decrementMonth,
  loading,
}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <HeaderOfOverlayView
        date={date}
        incrementMonth={incrementMonth}
        decrementMonth={decrementMonth}
      />

      <View
        style={{borderWidth: 1, borderColor: '#d9d9d9', marginHorizontal: 30}}
      />
      <View style={{flex: 1, marginHorizontal: 20, marginTop: 20}}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={registers}
            renderItem={({item}) => <Register data={item} />}
            contentContainerStyle={{rowGap: 10}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View>
                <TextContent textAlign="center">Nenhum registro</TextContent>
              </View>
            }
            ListFooterComponent={<BannerAds />}
          />
        )}
      </View>
    </View>
  );
};
