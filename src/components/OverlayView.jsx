import React, {useMemo, useState} from 'react';

import {BannerAds} from './BannerAds';
import {FlashList} from '@shopify/flash-list';
import {GoogleAdsService} from '../services/GoogleAdsService';
import {HeaderOfOverlayView} from './HeaderOfOverlayView';
import {Loading} from './Loading';
import Register from './Register';
import {TextContent} from './TextContent';
import {View} from 'react-native';
import {useRegister} from '../contexts/RegisterContext';
import {useUserContext} from '../contexts/UserContext';

export const OverlayView = ({
  registers,
  date,
  incrementMonth,
  decrementMonth,
  loading,
  color,
  closeAllPopUps,
  isFromTransactionHistory,
}) => {
  const [isFromTransactionHistory_, setIsFromTransactionHistory_] = useState(
    isFromTransactionHistory,
  );

  const {user} = useUserContext();
  const userUid = user?.uid;

  const [googleAdsService] = useState(new GoogleAdsService());

  const {deleteRegister} = useRegister();

  useMemo(() => {
    setIsFromTransactionHistory_(isFromTransactionHistory);
  }, [isFromTransactionHistory]);
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
          <FlashList
            estimatedItemSize={44}
            data={registers}
            renderItem={({item}) => (
              <Register
                data={item}
                userUid={userUid}
                googleAdsService={googleAdsService}
                deleteRegister={deleteRegister}
                color={color}
                closeAllPopUps={closeAllPopUps}
                isFromTransactionHistory={isFromTransactionHistory_}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<BannerAds />}
            ListEmptyComponent={
              <View>
                <TextContent textAlign="center">Nenhum registro</TextContent>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};
