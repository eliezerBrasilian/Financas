import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';

function GeneralGraphicText() {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      }}>
      <ProfileImage
        size={15}
        profilePhoto={require('../../../assets/images/grafico.png')}
      />
      <TextContent color={colors.main_purple} fontSize={18} fontWeight="bold">
        Gráfico Geral
      </TextContent>
    </View>
  );
}

export {GeneralGraphicText};
