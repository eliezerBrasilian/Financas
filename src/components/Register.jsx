import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {colors} from '../assets/colors/colors';
import {useRegister} from '../contexts/RegisterContext';
import {useUserContext} from '../contexts/UserContext';
import {tags} from '../enums/Tag';
import {Utils} from '../utils/Utils';
import {CustomIcon} from './CustomIcon';
import {TextContent} from './TextContent';

export default function Item({
  data,
  color,
  closeAllPopUps = () => {},
  isFromTransactionHistory = false,
}) {
  const {tag, amount, description, key, createdAt, dayMonthYear} = data;
  const {user} = useUserContext();
  const {deleteRegister} = useRegister();
  const userUid = user.uid;

  const icon = useMemo(() => {
    if (tag == tags.REVENUE)
      return require('../assets/images/receita_menu.png');
    else if (tag == tags.RESERVATION)
      return require('../assets/images/reserva_menu.png');
    else return require('../assets/images/despesa_menu.png');
  }, [tag]);

  var onLongPress = () => {
    if (!isFromTransactionHistory) {
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
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={isFromTransactionHistory ? 1.0 : 0.6}
      onPress={closeAllPopUps}
      onLongPress={onLongPress}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.almost_gray,
        }}>
        <Left
          description={description}
          tag={tag}
          icon={icon}
          createdAt={dayMonthYear}
        />
        <TextContent fontWeight="600" color={color} fontSize={15}>
          {Utils.getBrazilianCurrency(amount)}
        </TextContent>
      </View>
    </TouchableOpacity>
  );
}

function Left({description, icon, createdAt}) {
  return (
    <View
      style={{
        width: '60%',
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
      }}>
      <Circle icon={icon} />
      <View>
        <TextContent fontSize={17} numberOfLines={1} fontWeight="500">
          {description}
        </TextContent>
        <TextContent fontSize={11} fontWeight="400">
          {createdAt}
        </TextContent>
      </View>
    </View>
  );
}

function Circle({icon}) {
  return <CustomIcon path={icon} height={30} width={30} />;
}
