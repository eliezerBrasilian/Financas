import {Image, ScrollView, View} from 'react-native';

import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';
import {ListItem} from './widgets/ListItem';

export default function PremiumScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 15}}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            // padding: 15,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/logo_header_premium.png')}
            style={{height: 100, width: 220}}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/gift_box.png')}
            style={{height: 100, width: 220}}
            resizeMode="contain"
          />
          <Spacer />
          <TextContent fontSize={19} fontWeight="800">
            Tenha seu iFinanças Premium agora
          </TextContent>
          <Spacer />
          <TextContent fontSize={17} fontWeight="500" textAlign="center">
            Ao adquirir seu acesso Premium, você conta com a maior praticidade
            do mundo para controlar melhor o seu dinheiro.
          </TextContent>
          <Spacer marginTop={17} />
          <TextContent fontSize={18} fontWeight="800" textAlign="center">
            Vantagens de ser Premium
          </TextContent>
          <Spacer />

          <ListItem
            image={require('../../assets/images/graph.png')}
            title={'Ver registros em gráficos'}
            label={'Você consegue ver seus registros em gráficos.'}
          />
          <Spacer />
          <ListItem
            image={require('../../assets/images/edit_eraser.png')}
            title={'Editar o seu Saldo'}
            label={
              'Sentiu a necessidade de editar o seu saldo? Você pode, é rápido.'
            }
          />
          <Spacer />
          {/* <ListItem
            image={require('../../assets/images/customize.png')}
            title={'Personalizar o aplicativo'}
            label={
              'Você pode editar e customizar o layout do aplicativo, como você desejar.'
            }
          /> */}
          <Spacer />
          <ListItem
            image={require('../../assets/images/update.png')}
            title={'Sempre atualizado'}
            label={
              'Ao possuir o acesso Premium, você sempre recebe as atualizações fresquinhas.'
            }
          />
          <Spacer />
          <ListItem
            image={require('../../assets/images/calendar_premium.png')}
            title={'Lançamento em outra data'}
            label={
              'No momento de salvar o seu registro, você pode selecionar uma outra data.'
            }
          />
        </View>
      </ScrollView>
      <Spacer />
      <Button
        title={'Comprar acesso Premium'}
        fontSize={17}
        backgroundColor="#4453DF"
        paddingVertical={9}
      />
    </View>
  );
}
