import {Dimensions, View} from 'react-native';

import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Chart} from '../../../classes/Chart';
import {DateTime} from '../../../classes/DateTime';
import {useChartView} from './ChartView.hook';

function ChartView({tag}) {
  const {
    totalOfAmountCurrentMonth,
    totalOfAmountPastMonth,
    totalOfAmountThreeMonthsAgo,
    totalOfAmountFourMonthsAgo,
    totalOfAmountFiveMonthsAgo,
  } = useChartView(tag);

  const MyChart = new Chart();

  const backgroundGradientFrom = React.useMemo(() => {
    return MyChart.getChartColor(tag);
  }, [tag]);

  const backgroundGradientTo = React.useMemo(() => {
    return MyChart.getBackgroundGradientTo(tag);
  }, [tag]);

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: backgroundGradientFrom,
    backgroundGradientTo: backgroundGradientTo,
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

  return (
    <View style={{}}>
      <LineChart
        data={{
          labels: DateTime.getPastFiveMonths(),
          datasets: [
            {
              data: [
                totalOfAmountFiveMonthsAgo,
                totalOfAmountFourMonthsAgo,
                totalOfAmountThreeMonthsAgo,
                totalOfAmountPastMonth,
                totalOfAmountCurrentMonth,
              ],
            },
          ],
        }}
        width={screenWidth - 15}
        height={200}
        yAxisLabel="R$"
        //yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export {ChartView};
