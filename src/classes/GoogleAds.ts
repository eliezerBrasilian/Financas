import {InterstitialAd} from 'react-native-google-mobile-ads';
import {UnitAds} from '../enums/UnitAds';

class GoogleAds {
  private interstitialAd: InterstitialAd;

  constructor() {
    const adUnitId = __DEV__
      ? UnitAds.interstitialAdTests
      : UnitAds.interstitialAd;

    this.interstitialAd = InterstitialAd.createForAdRequest(adUnitId);
    this.loadAds();
  }

  public loadAds() {
    this.interstitialAd.load();
  }

  public showAds() {
    if (this.interstitialAd.loaded) this.interstitialAd.show();
    else this.loadAds();
  }
}

export {GoogleAds};
