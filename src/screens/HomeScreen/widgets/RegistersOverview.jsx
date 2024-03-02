import {Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {colors} from '../../../assets/colors/colors';
import {Navigation} from '../../../classes/Navigation';
import {CustomIcon} from '../../../components/CustomIcon';
import {TextContent} from '../../../components/TextContent';
import {useChartScreenContext} from '../../../contexts/ChartScreenContext';
import {tags} from '../../../enums/Tag';
import {GeneralGraphicText} from './GeneralGraphicText';

function RegistersOverview() {
  return (
    <MainContent>
      <View
        style={{
          rowGap: 8,
          position: 'absolute',
          width: '100%',
        }}>
        <GeneralGraphicText />
        <Register
          tag={tags.REVENUE}
          imageIcon={require('../../../assets/images/grafo_receita.png')}
          title={'Receita do período'}
        />
        <Register
          tag={tags.EXPENSE}
          imageIcon={require('../../../assets/images/grafo_despesa.png')}
          title={'Despesas'}
        />
        <Register
          tag={tags.RESERVATION}
          imageIcon={require('../../../assets/images/grafo_reserva.png')}
          title={'Reservas'}
        />
      </View>
    </MainContent>
  );
}

function MainContent({children}) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: 260,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 10,
      }}>
      {children}
    </View>
  );
}

function Register({imageIcon, title, tag}) {
  const nav = new Navigation();
  const {handleSelectChartScreenTag} = useChartScreenContext();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        height: 60,
        borderRadius: 15,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
        <CustomIcon path={imageIcon} width={25} height={25} />
        <TextContent>{title}</TextContent>
      </View>
      <View style={{flex: 1}} />

      <TouchableOpacity
        onPress={() => {
          handleSelectChartScreenTag(tag);
        }}>
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

export {RegistersOverview};

// import {FlatList, View} from 'react-native';

// import firestore from '@react-native-firebase/firestore';
// import React from 'react';
// import {colors} from '../../../assets/colors/colors';
// import {BannerAds} from '../../../components/BannerAds';
// import Item from '../../../components/Item';
// import {Loading} from '../../../components/Loading';
// import {TextContent} from '../../../components/TextContent';
// import {useRegister} from '../../../contexts/RegisterContext';
// import {useUserContext} from '../../../contexts/UserContext';
// import {Utils} from '../../../utils/Utils';

// export default function Registers({date}) {
//   const {user} = useUserContext();
//   const {updated} = useRegister();
//   const [registers, setRegisters] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     const unsubscribe = loadRegisters();
//     return () => unsubscribe;
//   }, [date, updated]);

//   function loadRegisters() {
//     firestore()
//       .collection('Registers')
//       .where('createdBy', '==', user.uid)
//       .where('dayMonthYear', '==', Utils.getDateFormated(date))
//       .where('deleted', '==', false)
//       .orderBy('createdAt', 'desc')
//       .onSnapshot(data => {
//         let listOfRegisters = [];
//         setRegisters([]);

//         data.docs.forEach(i => {
//           let data = i.data();
//           listOfRegisters.push({
//             key: i.id,
//             ...data,
//           });
//         });
//         setRegisters(listOfRegisters);
//         setLoading(false);
//       });
//   }

//   return loading ? <Loading /> : <RegisterView registers={registers} />;
// }

// function RegisterView({registers}) {
//   if (registers.length == 0)
//     return (
//       <View>
//         <TextContent textAlign="center">
//           Você ainda não fez nenhum registro
//         </TextContent>
//         <BannerAds />
//       </View>
//     );
//   else
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: colors.purple_background,
//           padding: 10,
//           borderRadius: 15,
//         }}>
//         <FlatList
//           data={registers}
//           renderItem={({item}) => <Item data={item} />}
//           contentContainerStyle={{rowGap: 10}}
//           showsVerticalScrollIndicator={false}
//           ListFooterComponent={<BannerAds />}
//         />
//       </View>
//     );
// }
