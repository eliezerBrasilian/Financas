import {BalanceColors} from '../enums/BalanceColors';
import {tags} from '../enums/Tag';

class Balance {
  static getCurrentTitle(tag: string) {
    const tagToLowerCase = tag?.toLowerCase();
    if (tagToLowerCase == tags.REVENUE) return 'Receita';
    else if (tagToLowerCase === tags.RESERVATION) return 'Reserva';
    return 'Despesa';
  }

  static getCurrentColor(tag: string) {
    const tagToLowerCase = tag?.toLowerCase();

    if (tagToLowerCase == tags.REVENUE) return BalanceColors.DARK_GREEN;
    else if (tagToLowerCase === tags.RESERVATION)
      return BalanceColors.LIGHT_PURPLE;
    else return BalanceColors.LIGHT_RED;
  }
}

export {Balance};
