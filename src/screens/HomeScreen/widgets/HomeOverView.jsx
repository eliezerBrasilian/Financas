import {TouchableOpacity, View} from 'react-native';

import {colors} from '../../../assets/colors/colors';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';

function HomeOverView() {
  return (
    <MainContent>
      <Cards />
    </MainContent>
  );
}

function MainContent({children}) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        position: 'absolute',
        bottom: 10,
        height: 200,
        top: -20,
        left: 10,
        right: 10,
        borderRadius: 26,
      }}>
      {children}
    </View>
  );
}

function Cards() {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        paddingTop: 20,
      }}>
      <Card
        iconImage={require('../../../assets/images/receita.png')}
        title={'Receitas'}
        value={'R$ 0,00'}
      />
      <Card
        iconImage={require('../../../assets/images/despesa.png')}
        title={'Despesas'}
        value={'R$ 0,00'}
      />
      <Card
        iconImage={require('../../../assets/images/reserva.png')}
        title={'Reservas'}
        value={'R$ 0,00'}
      />
    </View>
  );
}

function Card({iconImage, title, value}) {
  return (
    <TouchableOpacity>
      <View
        style={{
          height: 160,
          width: 110,
          backgroundColor: 'white',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 25,
        }}>
        <ProfileImage profilePhoto={iconImage} size={35} resizeMode="contain" />
        <View>
          <TextContent>{title}</TextContent>
          <TextContent
            fontSize={19}
            fontWeight="500"
            color={colors.almost_black}>
            {value}
          </TextContent>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {HomeOverView};
