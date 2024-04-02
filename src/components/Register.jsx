import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {colors} from '../assets/colors/colors';
import {tags} from '../enums/Tag';
import {Utils} from '../utils/Utils';
import {CustomIcon} from './CustomIcon';
import {TextContent} from './TextContent';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Category } from '../classes/Category';
import { IconPack } from '../enums/IconPack';

export default function Item({
  data,
  userUid,
  googleAdsService,
  deleteRegister,
  color,
  closeAllPopUps = () => {},
  isFromTransactionHistory = false,
}) {

  const {tag, amount, description, key, category, dayMonthYear} = data;

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
            onPress: () => googleAdsService.showAds(),
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
          paddingVertical: 10,
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
          category={category}
        />
        <TextContent fontWeight="600" color={color} fontSize={15}>
          {Utils.getBrazilianCurrency(amount)}
        </TextContent>
      </View>
    </TouchableOpacity>
  );
}

function Left({description, icon, createdAt, category}) {
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
        <TextContent
          maxCharacters={11}
          fontSize={17}
          numberOfLines={1}
          fontWeight="500">
          {description}
        </TextContent>
        <TextContent fontSize={11} fontWeight="400">
          {createdAt}
        </TextContent>
        {category !== null && (
        <TouchableOpacity>
        <View style={{flexDirection:'row', alignItems:'center', columnGap:5}}>
           <Icon categoryName={category}  /> 
           <TextContent fontSize={11} fontWeight="400" color='#000'>
        {category}
      </TextContent>
        </View>
      </TouchableOpacity>

        )}
      </View>
    </View>
  );
}

function Circle({icon}) {
  return <CustomIcon path={icon} height={30} width={30} />;
}


function Icon({categoryName}){

  const icone = useMemo(()=>{
    var encontrado = Category.getCategories().find(v=>v.value == categoryName)
    return encontrado;
  },[categoryName])

  if(icone.iconPack == IconPack.MATERIAL_ICONS)
  return(
    <MaterialIcons name = {icone.iconName} size={20} color ={"#000"} />
  )
  return (
    <AntDesign name = {icone.iconName} size={icone.iconName == "smileo"? 17: 20} color ={"#000"} />
  )
}