import {Image, TouchableOpacity} from 'react-native';

import React from 'react';
import {useUserContext} from '../../../contexts/UserContext';
import {PaymentServices} from '../../../services/PaymentServices';

function BannerPremium() {
  const paymentService = new PaymentServices();
  const {handlePremiumAccess} = useUserContext();

  async function subscribe() {
    await paymentService.makePurchase(handlePremiumAccess);
  }

  return (
    <TouchableOpacity onPress={subscribe} activeOpacity={0.7}>
      <Image
        source={require('../../../assets/images/premium_banner.png')}
        style={{width: '100%', height: 205}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export {BannerPremium};
