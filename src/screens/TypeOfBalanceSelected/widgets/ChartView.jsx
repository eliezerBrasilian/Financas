import {Dimensions, View} from 'react-native';

import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {DateTime} from '../../../classes/DateTime';
import {ChartConfig} from '../domain/ChartConfig';
import {useChartView} from './ChartView.hook';

function ChartView({tag}) {
  const {
    totalOfAmountCurrentMonth,
    totalOfAmountPastMonth,
    totalOfAmountThreeMonthsAgo,
    totalOfAmountFourMonthsAgo,
    totalOfAmountFiveMonthsAgo,
  } = useChartView(tag);

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = new ChartConfig();

  return (
    <View style={{}}>
      <LineChart
        data={{
          labels: DateTime.getPastFourMonths(),
          datasets: [
            {
              data: [
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
        yAxisLabel="$"
        chartConfig={chartConfig.getChartConfig(tag)}
        bezier
        style={{
          borderRadius: 16,
          width: '100%',
          marginLeft: 2,
        }}
      />
    </View>
  );
}

export {ChartView};
