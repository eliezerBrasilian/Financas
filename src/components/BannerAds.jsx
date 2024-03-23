import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

import {useState} from 'react';
import {View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {UnitAds} from '../enums/UnitAds';

function BannerAds() {
  const [errorOnLoadAd, setErrorOnLoad] = useState(false);
  const {isPremium} = useUserContext();

  var handleError = error => {
    setErrorOnLoad(true);
  };

  var handleSuccess = success => {
    setErrorOnLoad(false);
  };

  if (errorOnLoadAd == true || isPremium) return null;
  else
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <BannerAd
          onAdFailedToLoad={handleError}
          onAdLoaded={handleSuccess}
          unitId={UnitAds.bannerAd}
          size={BannerAdSize.BANNER}
        />
      </View>
    );
}

export {BannerAds};
