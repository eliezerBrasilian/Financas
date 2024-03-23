import {Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {colors} from '../../../assets/colors/colors';
import {CustomIcon} from '../../../components/CustomIcon';
import {TextContent} from '../../../components/TextContent';
import {useChartScreenContext} from '../../../contexts/ChartScreenContext';
import {tags} from '../../../enums/Tag';
import {GeneralGraphicText} from './GeneralGraphicText';

function RegistersOverview() {
  return (
    <MainContent>
      <View
        style={{
          rowGap: 8,
          position: 'absolute',
          width: '100%',
        }}>
        <GeneralGraphicText />
        <Register
          tag={tags.REVENUE}
          imageIcon={require('../../../assets/images/grafo_receita.png')}
          title={'Receita do período'}
        />
        <Register
          tag={tags.EXPENSE}
          imageIcon={require('../../../assets/images/grafo_despesa.png')}
          title={'Despesas'}
        />
        <Register
          tag={tags.RESERVATION}
          imageIcon={require('../../../assets/images/grafo_reserva.png')}
          title={'Reservas'}
        />
      </View>
    </MainContent>
  );
}

function MainContent({children}) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: 260,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 10,
      }}>
      {children}
    </View>
  );
}

function Register({imageIcon, title, tag}) {
  const {handleSelectChartScreenTag} = useChartScreenContext();

  const handleSelectRegisterItem = () => {
    handleSelectChartScreenTag(tag);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        height: 60,
        borderRadius: 15,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
        <CustomIcon path={imageIcon} width={25} height={25} />
        <TextContent>{title}</TextContent>
      </View>
      <View style={{flex: 1}} />

      <TouchableOpacity onPress={handleSelectRegisterItem}>
        <View
          style={{
            height: '100%',
            width: 120,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontWeight: 700,
              borderBottomWidth: 1,
              borderBottomColor: 'red',
              color: 'red',
            }}>
            detalhes
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export {RegistersOverview};
