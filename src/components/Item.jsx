import {TouchableOpacity, View} from 'react-native';

import React from 'react';
import {useRegister} from '../contexts/RegisterContext';
import {useUserContext} from '../contexts/UserContext';
import {Utils} from '../utils/Utils';
import ProfileImage from './ProfileImage';
import {TextContent} from './TextContent';

export default function Item({data}) {
  const {tag, amount, description, key, createdAt} = data;
  const {user} = useUserContext();
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
        // padding: 15,
        // paddingVertical: 20,
        //backgroundColor: CurrentBalanceInfo.backgroundColor,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Left
        description={description}
        tag={tag}
        icon={CurrentBalanceInfo.icon}
        createdAt={Utils.dateFromFirestoreToBrasilianFormat(createdAt)}
      />
      <TextContent color="#fff" fontWeight="bold">
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </TouchableOpacity>
  );
}

function Left({description, icon, createdAt}) {
  return (
    <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
      <ProfileImage size={25} profilePhoto={icon} />
      <View style={{width: '70%'}}>
        <TextContent color="#fff" fontSize={17} numberOfLines={1}>
          {description}
        </TextContent>
        <TextContent color="#fff" fontSize={11}>
          {createdAt}
        </TextContent>
      </View>
    </View>
  );
}
