import {Image, TouchableOpacity} from 'react-native';

import React from 'react';

function BannerPremium() {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={require('../../../assets/images/premium_banner.png')}
        style={{width: '100%', height: 205}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export {BannerPremium};
