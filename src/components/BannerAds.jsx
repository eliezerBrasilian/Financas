import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

import {UnitAds} from '../enums/UnitAds';

function BannerAds() {
  return (
    <BannerAd
      unitId={UnitAds.bannerAd}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
}

export {BannerAds};
