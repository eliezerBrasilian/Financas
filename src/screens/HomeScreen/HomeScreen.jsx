import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {colors} from '../../assets/colors/colors';
import {GoogleAds} from '../../classes/GoogleAds';
import ProfileImage from '../../components/ProfileImage';
import {TextContent} from '../../components/TextContent';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {useUserContext} from '../../contexts/UserContext';
import Header from './widgets/Header';
import {HomeOverView} from './widgets/HomeOverView';
import {Menu} from './widgets/Menu';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateVisible, setDateVisible] = React.useState(false);
  const {loadTotalBalance} = useBalanceContext();
  var googleAds = new GoogleAds();
  const {user} = useUserContext();
  const [menuIsOpen, setMenuOpen] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.main_purple,
      }}>
      <StatusBar
        backgroundColor={colors.main_purple}
        barStyle={'light-content'}
      />

      <Header uid={user?.uid} setMenuOpen={setMenuOpen} />
      {menuIsOpen && <Menu setMenuOpen={setMenuOpen} />}

      <View style={{flex: 1, backgroundColor: colors.background_home}}>
        <HomeOverView uid={user?.uid} />

        <ScrollView style={{marginTop: 189}}>
          <BannerPremium />
          <GeneralGraphicText />
          <Registers />
        </ScrollView>
      </View>
    </View>
  );
}

function BannerPremium() {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={require('../../assets/images/premium_banner.png')}
        style={{width: '100%', height: 205}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

function GeneralGraphicText() {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 23,
      }}>
      <ProfileImage
        size={15}
        profilePhoto={require('../../assets/images/grafico.png')}
      />
      <TextContent color={colors.main_purple} fontSize={18} fontWeight="bold">
        Gráfico Geral
      </TextContent>
    </View>
  );
}

function Registers() {
  // const registers = [
  //   {
  //     key: '1',
  //     imageIcon: require('../../assets/images/grafo_receita.png'),
  //     title: 'Receita do período',
  //   },
  //   {
  //     key: '2',
  //     imageIcon: require('../../assets/images/grafo_receita.png'),
  //     title: 'Receita do período',
  //   },
  //   {
  //     key: '3',
  //     imageIcon: require('../../assets/images/grafo_receita.png'),
  //     title: 'Receita do período',
  //   },
  // ];
  // return (
  //   <FlatList
  //     data={registers}
  //     renderItem={({item}) => (
  //       <Register imageIcon={item.imageIcon} title={item.title} />
  //     )}
  //   />
  // );

  return (
    <View style={{rowGap: 5}}>
      <Register
        imageIcon={require('../../assets/images/grafo_receita.png')}
        title={'Receita do período'}
      />
      <Register
        imageIcon={require('../../assets/images/grafo_despesa.png')}
        title={'Despesas'}
      />
      <Register
        imageIcon={require('../../assets/images/grafo_reserva.png')}
        title={'Reservas'}
      />
    </View>
  );
}

function Register({imageIcon, title}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        height: 60,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
        <ProfileImage profilePhoto={imageIcon} />
        <TextContent>{title}</TextContent>
      </View>
      <View style={{flex: 1}} />

      <TouchableOpacity>
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
