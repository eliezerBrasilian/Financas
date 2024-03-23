import {adapty} from 'react-native-adapty';
import {Exception} from '../Exceptions/Exception';
import {User} from '../classes/User';
import {Utils} from '../utils/Utils';

class PaymentServices {
  private paywallProduct: any;

  constructor() {
    adapty.activate('public_live_KRzwYyE3.omuqIP4LwyWCwYecrXA3');
  }

  private async getPaywallProduct() {
    const id = 'i_financas_placement';
    const locale = 'en';

    try {
      var paywall = await adapty.getPaywall(id, locale);
      if (paywall !== undefined) return paywall;
      else return null;
    } catch (error) {
      new Exception('obtain paywall product', error);
    }
  }

  private async getProduct() {
    try {
      var paywall = await this.getPaywallProduct();

      const products = await adapty.getPaywallProducts(paywall);
      this.paywallProduct = products[0];
    } catch (error) {
      // handle the error
      new Exception('obtain paywall products list', error);
    }
  }

  public async makePurchase(callback: () => void) {
    var user = new User();
    try {
      await this.getProduct();
      await adapty.makePurchase(this.paywallProduct);
      await user.becomePremium();
      callback();
      Utils.ShowToast('Você agora é Premium');
    } catch (error) {
      new Exception('process payment', error);
    }
  }

  public async getSubscriptionStatus() {
    try {
      const profile = await adapty.getProfile();
      if (profile.accessLevels != undefined) {
        var isActive = profile?.accessLevels['premium']?.isActive;
        if (isActive == undefined) return false;
        else {
          return isActive;
        }
      } else return false;
    } catch (error) {
      return false;
    }
  }
}

export {PaymentServices};
