import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {TextContent} from '../../components/TextContent';
import {firebase} from '@react-native-firebase/firestore';
import {
  formatarCelular,
  dateFromFirestoreToBrasilianFormat,
} from '../../utils/Utils';
import Header from '../../components/Header';
import {useFirebase} from '../../contexts/AuthContext';
import {Loading} from '../../components/Loading';
function DadosPessoais() {
  const {SignOut, user} = useFirebase();
  const uid = user?.uid;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(snap => {
        console.log(snap.data());
        const data = snap.data();
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        const date = dateFromFirestoreToBrasilianFormat(data.createdAt);
        setCreatedAt(date);
        setLoading(false);
      });
  }, []);
  return (
    <View style={s.container}>
      <Header title={'Dados Pessoais'} />
      {loading ? (
        <Loading />
      ) : (
        <View style={{rowGap: 20, marginHorizontal: 20, marginTop: 40}}>
          <ListItem label={'Nome Completo'} textContent={name} />
          <ListItem label={'E-mail'} textContent={email} />
          <ListItem label={'Celular'} textContent={formatarCelular(phone)} />
          <ListItem label={'Conta criada em:'} textContent={createdAt} />
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export {s};

function ListItem({label, textContent}) {
  return (
    <View>
      <TextContent textAlign="left">{label}</TextContent>
      <View
        style={{
          borderRadius: 15,
          borderColor: '#f2f2f2',
          borderWidth: 1,
          padding: 15,
        }}>
        <TextContent fontWeight="bold" textAlign="left">
          {textContent}
        </TextContent>
      </View>
    </View>
  );
}

export default DadosPessoais;
