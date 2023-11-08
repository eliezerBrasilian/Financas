import {View} from 'react-native';
import {TextContent} from './TextContent';
import ProfileImage from './ProfileImage';
import React from 'react';
export default function Item({data}) {
  const {tag} = data;
  const backgroundColor = React.useMemo(() => {
    if (tag === 'reserva') return '#DEE5E5';
    else if (tag === 'receita') return '#C5E6A6';
    else return '#FFE3E0';
  }, [data.tag]);
  return (
    <View
      style={{
        padding: 15,
        paddingVertical: 20,
        backgroundColor: backgroundColor,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Left />
      <TextContent fontWeight="bold">R$ 9.00</TextContent>
    </View>
  );
}

function Left() {
  return (
    <View style={{flexDirection: 'row', columnGap: 15, alignItems: 'center'}}>
      <ProfileImage size={15} />
      <TextContent fontSize={17}>Descricao do item</TextContent>
    </View>
  );
}
