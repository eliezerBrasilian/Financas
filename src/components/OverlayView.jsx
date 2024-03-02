import React from 'react';
import {FlatList, View} from 'react-native';

import {BannerAds} from './BannerAds';
import {HeaderOfOverlayView} from './HeaderOfOverlayView';
import {Loading} from './Loading';
import Register from './Register';
import {TextContent} from './TextContent';

export const OverlayView = ({
  registers,
  date,
  incrementMonth,
  decrementMonth,
  loading,
  color,
  closeAllPopUps,
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
            renderItem={({item}) => (
              <Register
                data={item}
                color={color}
                closeAllPopUps={closeAllPopUps}
              />
            )}
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
