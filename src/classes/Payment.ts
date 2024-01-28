import {adapty} from 'react-native-adapty';
import {Exception} from '../Exceptions/Exception';
import {Utils} from '../utils/Utils';
import {User} from './User';

class Payment {
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

  public async makePurchase() {
    var user = new User();
    try {
      await this.getProduct();
      await adapty.makePurchase(this.paywallProduct);
      await user.becomePremium();
      Utils.ShowToast('Você agora é Premium');
    } catch (error) {
      new Exception('process payment', error);
    }
  }
}

export {Payment};
