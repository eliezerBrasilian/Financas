import {TouchableOpacity, View} from 'react-native';

import ProfileImage from './ProfileImage';
import React from 'react';
import {TextContent} from './TextContent';
import {Utils} from '../utils/Utils';
import {useFirebase} from '../contexts/AuthContext';
import {useRegister} from '../contexts/RegisterContext';

export default function Item({data}) {
  const {tag, amount, description, key} = data;
  const {user} = useFirebase();
  const {deleteRegister} = useRegister();
  const userUid = user.uid;

  const CurrentBalanceInfo = React.useMemo(
    () => Utils.getUsefulInformationsAboutCurrentBalance(tag),
    [data.tag],
  );

  var onLongPress = () => {
    const isNotPremium = true;
    const registerItem = {
      amount: amount,
      key: key,
      tag: tag,
      createdBy: userUid,
    };
    if (isNotPremium) {
      const alertButtons = [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'SIM', onPress: () => deleteRegister(registerItem)},
      ];
      Utils.showAlert('Deseja excluir esse registro?', null, alertButtons);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={onLongPress}
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
    </TouchableOpacity>
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
