import {TouchableOpacity, View} from 'react-native';

import {colors} from '../../../assets/colors/colors';
import {CustomIcon} from '../../../components/CustomIcon';
import {TextContent} from '../../../components/TextContent';
import {Dia} from '../../../enums/Dia';

function DateOfTransaction({daySelected, handleSelectDayChange}) {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#fff',
        rowGap: 20,
        borderRadius: 20,
      }}>
      <Top />
      <Line />
      <RoundItemsContainer
        daySelected={daySelected}
        handleSelectDayChange={handleSelectDayChange}
      />

      {/* <TouchableOpacity
            style={{
              backgroundColor: '#132E32',
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 17,
            }}>
            <TextContent color="#fff" fontSize={15} fontWeight="500">
              Outro dia...
            </TextContent>
          </TouchableOpacity> */}
    </View>
  );
}

function Top() {
  return (
    <View style={{flexDirection: 'row', columnGap: 20}}>
      <CustomIcon
        path={require('../../../assets/images/calendario.png')}
        height={30}
        width={30}
      />
      <TextContent fontWeight="bold">Data da Transação</TextContent>
    </View>
  );
}

function Line() {
  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: colors.almost_gray,
      }}
    />
  );
}

function RoundItemsContainer({daySelected, handleSelectDayChange}) {
  return (
    <View
      style={{
        backgroundColor: colors.almost_gray,
        flexDirection: 'row',
        columnGap: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
      }}>
      <RoundItem
        day={Dia.TODAY}
        handleSelectDayChange={handleSelectDayChange}
        daySelected={daySelected}
      />
      <RoundItem
        day={Dia.YESTARDAY}
        handleSelectDayChange={handleSelectDayChange}
        daySelected={daySelected}
      />
      {/* <RoundItem
        day={Dia.OTHERS}
        handleSelectDayChange={handleSelectDayChange}
        daySelected={daySelected}
      /> */}
    </View>
  );
}
function RoundItem({day, daySelected, handleSelectDayChange}) {
  return (
    <TouchableOpacity
      onPress={() => handleSelectDayChange(day)}
      style={{
        backgroundColor: daySelected == day ? '#0f9415e2' : '#b5cdd6',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextContent
        color={daySelected == day ? '#fff' : '#000'}
        fontSize={15}
        fontWeight="500">
        {day == Dia.OTHERS ? `${Dia.OTHERS}...` : day}
      </TextContent>
    </TouchableOpacity>
  );
}

export {DateOfTransaction};
