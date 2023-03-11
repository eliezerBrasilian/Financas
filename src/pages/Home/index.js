import {useContext, useEffect, useState} from 'react';
import {
  Image,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {format, parseISO} from 'date-fns';
import {Background} from '../../components/Background';
import {colors} from '../../assets/colors';
import {Header, Titulo, HistoricoText, BtnRegristrar} from './style';
import {strings} from '../../assets/strings';
import Card from '../../components/Card';
import {AuthContext} from '../../contexts/auth';
import ListarRegistros from '../../components/ListarRegistros';
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default function Home() {
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const {
    user,
    setSaldo_atual,
    setGasto_atual,
    setEntrada_atual,
    carregaSaldo,
    setCarregaSaldo,
  } = useContext(AuthContext);
  const [nome] = useState(user.primeiro_nome);
  const [foto] = useState(user.foto);
  const [data_atual] = useState(new Date());
  const [dataHojeFormatada, setdataHojeFormatada] = useState(
    format(data_atual, 'dd/MM/yyyy'),
  );
  const [copia_de_dataHojeFormatada] = useState(
    format(data_atual, 'dd/MM/yyyy'),
  );

  const [valores, setValores] = useState({});
  const [balancoZerado, setbalancoZerado] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [loadingRegistros, setLoadingRegistros] = useState(true);
  const [loadingBalanco, setLoadingBalanco] = useState(true);
  const [calendarioModalAtivo, setcalendarioModalAtivo] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());
  const [markeddates, setMarkedDates] = useState({});
  const [mudouData, setmudouData] = useState(false);
  LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro de',
      'Fevereiro de',
      'Março de',
      'Abril de',
      'Maio de',
      'Junho de',
      'Julho de',
      'Agosto de',
      'Setembro de',
      'Outubro de',
      'Novembro de',
      'Dezembro de',
    ],
    monthNamesShort: [
      'Jan.',
      'Fev.',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul.',
      'Ago',
      'Set.',
      'Out.',
      'Nov.',
      'Dez.',
    ],
    dayNames: [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-Feira',
      'Sexta-feira',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'br';

  useEffect(() => {
    function verificaSeBalancoEstaZerado(saldo, gasto, entrada) {
      if (saldo === 0 && gasto === 0 && entrada === 0) {
        setbalancoZerado(true);
      } else {
        setbalancoZerado(false);
      }
    }
    function redefinirVariavelMudoudata() {
      setmudouData(false);
    }
    function redefinirVariavelCarregaSaldo() {
      setCarregaSaldo(false);
    }
    async function buscaRegistros() {
      await firestore()
        .collection('Registros_' + user.user_id)
        .where('created_at', '==', dataHojeFormatada)
        .get()
        .then(q => {
          let aux = [];

          q.forEach(i => {
            aux.push({
              ...i.data(),
              key: i.id,
            });
          });
          setRegistros(aux);
          setLoadingRegistros(false);
        })
        .catch(() => {
          console.log('Caiu no catch');
        });
    }

    async function fetchData() {
      await firestore()
        .collection('Balancos')
        .doc(user.user_id)
        .get()
        .then(querySnap => {
          let aux = {};
          if (querySnap.exists) {
            aux = {
              gasto: querySnap.data().gasto,
              saldo: querySnap.data().saldo,
              reserva: querySnap.data().reserva,
              entrada: querySnap.data().entrada,
            };
            console.log('Saldo: ' + querySnap.data().saldo);
            setValores(aux);

            //alimentando as variaveis globais do auth context
            setSaldo_atual(querySnap.data().saldo);
            setGasto_atual(querySnap.data().gasto);
            setEntrada_atual(querySnap.data().entrada);

            //checando valores

            verificaSeBalancoEstaZerado(
              querySnap.data().saldo,
              querySnap.data().gasto,
              querySnap.data().reserva,
              querySnap.data().entrada,
            );
          } else {
            console.log('Ainda não existe o balanço');
            let aux = {
              gasto: 0,
              saldo: 0,
              reserva: 0,
              entrada: 0,
            };

            setValores(aux);
            setbalancoZerado(true);
          }
          setLoadingBalanco(false);
        })
        .catch(e => {
          console.log('Caiu no catch');
          setLoadingBalanco(false);
        });
    }
    fetchData();
    buscaRegistros();
    redefinirVariavelCarregaSaldo();
    redefinirVariavelMudoudata();
  }, [carregaSaldo, mudouData, isFocused]);

  function handleOnDayPress(date) {
    //console.log(date.dateString);
    setDateNow(new Date(date.dateString));

    let markedDay = {};

    markedDay[date.dateString] = {
      selected: true,
      selectedColor: '#3b3dbf',
      textColor: '#FFF',
    };

    setMarkedDates(markedDay);
    setdataHojeFormatada(format(parseISO(date.dateString), 'dd/MM/yyyy'));
    // console.log(dataHojeFormatada);
    setmudouData(true);
    setcalendarioModalAtivo(false);
  }

  function SemCadastroComponente() {
    if (balancoZerado) {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/empty-folder.png')}
            style={{width: '80%', height: 300}}
          />
          <Titulo>{strings.sem_cadastro}</Titulo>
        </View>
      );
    } else {
      return null;
    }
  }

  return (
    <Background
      colors={[colors.gradiente_1, colors.gradiente_2]}
      style={{flex: 1, alignItems: 'center'}}>
      <Header onPress={() => nav.navigate('Perfil')}>
        <Titulo style={{marginRight: '20%'}}>
          {strings.eu_sou} {nome}
        </Titulo>
        <Image
          source={{uri: foto}}
          style={{height: 40, width: 40, borderRadius: 20}}
        />
      </Header>

      <View style={{height: 130}}>
        <ScrollView horizontal={true}>
          <Card
            valor={valores.saldo}
            descricao="Saldo"
            loadingBalanco={loadingBalanco}
          />
          <Card
            valor={valores.gasto}
            descricao="Gasto"
            loadingBalanco={loadingBalanco}
          />
          <Card
            valor={valores.entrada}
            descricao="Entrada"
            loadingBalanco={loadingBalanco}
          />
        </ScrollView>
      </View>
      {/* HISTORICO TEXTO */}
      <TouchableOpacity
        onPress={() => setcalendarioModalAtivo(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 10,
        }}>
        <FontAwesome
          name="calendar"
          color="black"
          size={40}
          style={{marginRight: 5}}
        />
        {copia_de_dataHojeFormatada != dataHojeFormatada ? (
          <HistoricoText>Histórico de {dataHojeFormatada}</HistoricoText>
        ) : (
          <HistoricoText>{strings.historico_hoje}</HistoricoText>
        )}
      </TouchableOpacity>
      <SemCadastroComponente />
      {loadingRegistros ? (
        <ActivityIndicator size={30} color="#fff" />
      ) : (
        <FlatList
          data={registros}
          keyExtractor={item => item.key}
          renderItem={({item}) => <ListarRegistros dados={item} />}
        />
      )}
      <Modal
        transparent={true}
        visible={calendarioModalAtivo}
        onRequestClose={() => setcalendarioModalAtivo(false)}>
        <View style={{flex: 1}} />
        <View style={{bottom: 0}}>
          <Calendar
            onDayPress={handleOnDayPress}
            markedDates={markeddates}
            enableSwipeMonths={true}
            style={{
              borderWidth: 2,
            }}
          />
        </View>
      </Modal>

      <BtnRegristrar onPress={() => nav.navigate('Registro')}>
        <AntDesign name="plus" color="#fff" size={40} />
      </BtnRegristrar>
    </Background>
  );
}
