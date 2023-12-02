import React from 'react';
import {View} from 'react-native';
import {Utils} from '../utils/Utils';
import ProfileImage from './ProfileImage';
import {TextContent} from './TextContent';

export default function Item({data}) {
  const {tag, amount, description} = data;

  const backgroundColor = React.useMemo(
    () => Utils.getAppropriateBackgroundColor(tag).backgroundColor,
    [data.tag],
  );
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
      <Left description={description} />
      <TextContent fontWeight="bold">
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </View>
  );
}

function Left({description}) {
  return (
    <View style={{flexDirection: 'row', columnGap: 15, alignItems: 'center'}}>
      <ProfileImage size={15} />
      <TextContent fontSize={17}>{description}</TextContent>
    </View>
  );
}
