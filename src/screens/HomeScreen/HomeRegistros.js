import {View, FlatList} from 'react-native';
import ProfileImage from '../../components/ProfileImage';
import {TextContent} from '../../components/TextContent';
import Item from '../../components/Item';
export default function HomeRegistros() {
  const data = [
    {tag: 'gasto', valor: 25.1, key: '1'},
    {tag: 'receita', valor: 15.0, key: '2'},
    {tag: 'reserva', valor: 33.75, key: '3'},
  ];

  return (
    <View>
      <Top />
      <FlatList
        data={data}
        renderItem={({item}) => <Item data={item} />}
        contentContainerStyle={{rowGap: 10}}
      />
    </View>
  );
}

function Top() {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        marginBottom: 20,
      }}>
      <ProfileImage size={20} />
      <TextContent>Selecionar Período</TextContent>
    </View>
  );
}
