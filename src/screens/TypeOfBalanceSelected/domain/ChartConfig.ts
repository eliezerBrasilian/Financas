import {Balance} from '../../../classes/Balance';

class ChartConfig {
  getChartConfig(tag: string) {
    return {
      backgroundGradientFrom: Balance.getCurrentColor(tag),
      backgroundGradientTo: Balance.getCurrentColor(tag),
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
      },
    };
  }
}

export {ChartConfig};
