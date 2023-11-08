import {View, FlatList} from 'react-native';
import {TextContent} from '../../components/TextContent';
import ProfileImage from '../../components/ProfileImage';
export default function HomeCards() {
  const financasData = [
    {title: 'Receita', saldo: 0.0, key: '1'},
    {title: 'Despesas', saldo: 20.0, key: '2'},
    {title: 'Reserva', saldo: 0.0, key: '3'},
  ];
  return (
    <View style={{rowGap: 15}}>
      <Saldo />
      <FlatList
        data={financasData}
        renderItem={({item}) => <Card data={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{columnGap: 20}}
        //keyExtractor={item => item.title}
      />
    </View>
  );
}

function Saldo() {
  return (
    <View>
      <TextContent fontSize={26}>Saldo</TextContent>
      <TextContent fontSize={28}>R$ 10,00</TextContent>
    </View>
  );
}

function Card({data}) {
  console.log(data);
  if (data !== undefined) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#fff',
          width: 150,
          height: 100,
          padding: 15,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#000',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            columnGap: 15,
          }}>
          <ProfileImage size={20} />
          <TextContent fontSize={18}>{data?.title}</TextContent>
        </View>
        <TextContent fontSize={22}>R$ {data?.saldo}</TextContent>
      </View>
    );
  } else return null;
}
