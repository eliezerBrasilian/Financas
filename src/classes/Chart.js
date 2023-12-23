import {colors} from '../assets/colors/colors';

class Chart {
  constructor() {
    this.colors = {
      RED: colors.card_orange,
      GREEN: colors.card_green,
      PURPLE: colors.card_purple,
    };
    this.backgroundGradientToColors = {
      RED: colors.card_orange,
      GREEN: colors.card_green,
      PURPLE: colors.card_purple,
      // GREEN: '#169873',
      // PURPLE: '#fff',
    };
  }

  getChartColor(tag) {
    if (tag == 'receita') return this.colors.GREEN;
    else if (tag == 'despesa') return this.colors.RED;
    else if (tag == 'reserva') return this.colors.PURPLE;
  }
  getBackgroundGradientTo(tag) {
    if (tag == 'receita') return this.backgroundGradientToColors.GREEN;
    else if (tag == 'despesa') return this.backgroundGradientToColors.RED;
    else if (tag == 'reserva') return this.backgroundGradientToColors.PURPLE;
  }
}

export {Chart};
