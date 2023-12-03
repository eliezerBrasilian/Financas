import React from 'react';
import {View} from 'react-native';
import {Utils} from '../utils/Utils';
import ProfileImage from './ProfileImage';
import {TextContent} from './TextContent';

export default function Item({data}) {
  const {tag, amount, description} = data;

  const CurrentBalanceInfo = React.useMemo(
    () => Utils.getUsefulInformationsAboutCurrentBalance(tag),
    [data.tag],
  );
  return (
    <View
      style={{
        padding: 15,
        paddingVertical: 20,
        backgroundColor: CurrentBalanceInfo.backgroundColor,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Left
        description={description}
        tag={tag}
        icon={CurrentBalanceInfo.icon}
      />
      <TextContent fontWeight="bold">
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </View>
  );
}

function Left({description, icon}) {
  return (
    <View style={{flexDirection: 'row', columnGap: 15, alignItems: 'center'}}>
      <ProfileImage size={15} profilePhoto={icon} />
      <TextContent fontSize={17}>{description}</TextContent>
    </View>
  );
}
