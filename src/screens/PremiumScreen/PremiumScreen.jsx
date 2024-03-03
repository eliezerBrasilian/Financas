import {useMemo, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../../assets/colors/colors';
import {CustomIcon} from '../../components/CustomIcon';
import {TextContent} from '../../components/TextContent';
import {useUserContext} from '../../contexts/UserContext';
import {PaymentServices} from '../../services/PaymentServices';
import {Utils} from '../../utils/Utils';
import {ListItem} from './widgets/ListItem';

export default function PremiumScreen() {
  const {isPremium, handlePremiumAccess, removePremiumAccess} =
    useUserContext();
  const [isPremium_, setIsPremium_] = useState(isPremium);

  useMemo(() => {
    setIsPremium_(isPremium);
  }, [isPremium]);

  return (
    <View style={{flex: 1, backgroundColor: colors.main_purple}}>
      <StatusBar
        backgroundColor={colors.main_purple}
        barStyle={'light-content'}
      />
      <Top isPremium={isPremium_} />
      <OverView isPremium={isPremium_} />
      <SubscriptionButtonContainer
        isPremium={isPremium_}
        handlePremiumAccess={handlePremiumAccess}
        removePremiumAccess={removePremiumAccess}
      />
    </View>
  );
}

function Top({isPremium}) {
  return (
    <View
      style={{alignItems: 'center', rowGap: 15, padding: 15, marginTop: 30}}>
      {isPremium ? (
        <Image
          source={require('../../assets/images/img_premium.png')}
          style={{
            height: 110,
            width: 150,
          }}
        />
      ) : (
        <CustomIcon
          path={require('../../assets/images/caixa_premi.png')}
          height={100}
          width={220}
        />
      )}

      {isPremium ? (
        <TextContent fontSize={19} fontWeight="bold" color="#fff">
          Você possui o acesso Premium
        </TextContent>
      ) : (
        <TextContent fontSize={19} fontWeight="bold" color="#fff">
          IFinanças Premium
        </TextContent>
      )}

      {isPremium ? (
        <TextContent
          fontSize={17}
          fontWeight="400"
          textAlign="center"
          color="#fff">
          Sua conta possui diversos recursos exclusivos que só quem possui o
          iFinanças Premium conhece
        </TextContent>
      ) : (
        <TextContent
          fontSize={17}
          fontWeight="400"
          textAlign="center"
          color="#fff">
          Vá além dos limites e desbloqueia dezenas de recursos exclusivos
          assinando iFinanças Premium
        </TextContent>
      )}

      {!isPremium && <SubscriptionPriceView />}
    </View>
  );
}

function SubscriptionPriceView() {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        borderRadius: 13,
      }}>
      <SubscriptionPriceViewLeft />
      <TextContent color={colors.main_purple} fontSize={19} fontWeight="800">
        {Utils.getBrazilianCurrency(22.99)}/mês
      </TextContent>
    </View>
  );
}

function SubscriptionPriceViewLeft() {
  return (
    <View>
      <TextContent fontSize={19} fontWeight="800">
        Mensal
      </TextContent>
      <TextContent fontSize={16} color="#131313ea" fontWeight="400">
        *Cobrado mensalmente
      </TextContent>
    </View>
  );
}

function OverView() {
  return (
    <View
      style={{
        backgroundColor: colors.background_home,
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        position: 'absolute',
        top: 380,
        bottom: 0,
        zIndex: 1,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            rowGap: 10,
            marginBottom: 100,
          }}>
          <ListItem
            image={require('../../assets/images/graf_premi.png')}
            title={'Gráficos'}
            label={
              'Veja suas transações detalhadas com a sua porcentagem de consumo mensal'
            }
          />
          <ListItem
            image={require('../../assets/images/atualizar_premi.png')}
            title={'Atualizações Frequentes'}
            label={
              'Ao possuir o acesso Premium, você sempre recebe as atualizações fresquinhas.'
            }
          />
          <ListItem
            image={require('../../assets/images/calendar_premi.png')}
            title={'Sem anúncios'}
            label={'Você mais focado e sem interrupções'}
          />
          <TextContent>
            Detalhes da assinatura: sua assinatura será cobrada em sua conta na
            Google Play Store. Sua assinatura está configurada para que ocorra a
            renovação automática. Você pode alterar o seu plano de assinatura ou
            desativar a renovação automática até 24 horas antes da data da
            renovação nas configurações da sua conta da Play Store. Planos de
            assinatura. Há um período de teste, que ocorre por 3 dias para novos
            usuários, após esse prazo, sua assinatura mensal entrará em vigor e
            você será cobrado mensalmente. Você pode cancelar a sua assinatura a
            qualquer momento, através do aplicativo iFinanças ou diretamente na
            Google Play Store
          </TextContent>
        </View>
      </ScrollView>
    </View>
  );
}

function SubscriptionButtonContainer({
  isPremium,
  handlePremiumAccess,
  removePremiumAccess,
}) {
  return (
    <View
      style={{
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background_home,
        height: 90,
        paddingTop: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        paddingHorizontal: 30,
        elevation: 20, // Para dispositivos Android
      }}>
      <Button
        isPremium={isPremium}
        handlePremiumAccess={handlePremiumAccess}
        removePremiumAccess={removePremiumAccess}
      />
    </View>
  );
}

function Button({isPremium, handlePremiumAccess, removePremiumAccess}) {
  var payment = new PaymentServices();

  async function handleSubscription() {
    if (isPremium) {
      await Linking.openURL(
        'https://play.google.com/store/account/subscriptions',
      );
    } else {
      await payment.makePurchase();
      handlePremiumAccess();
    }
  }

  return (
    <TouchableOpacity onPress={handleSubscription}>
      <View
        style={{
          backgroundColor: '#E2306C',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderRadius: 7,
        }}>
        <TextContent color="#fff">
          {isPremium ? 'Cancelar Assinatura' : ' Assinar Premium'}
        </TextContent>
      </View>
    </TouchableOpacity>
  );
}
