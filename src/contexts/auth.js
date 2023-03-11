import {createContext, useState, useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {format} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [saldo_atual, setSaldo_atual] = useState(0);
  const [gasto_atual, setGasto_atual] = useState(0);
  const [entrada_atual, setEntrada_atual] = useState(0);
  const [reserva_atual, setReserva_atual] = useState(0);
  const [carregaSaldo, setCarregaSaldo] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function acessarAplicativo() {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      if (jsonValue != null) {
        setUser(JSON.parse(jsonValue));
        setLoadingAuth(false);
      }
      setLoadingAuth(false);
    }
    async function GoogleSignInConfigure() {
      GoogleSignin.configure({
        webClientId:
          '80275054021-2ebrkt9e9mu9fq8d2r59l747rmn7hnvs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      });
    }
    GoogleSignInConfigure();
    acessarAplicativo();
  }, []);

  async function salvandoDadosLocalmente(dados_usuario) {
    await AsyncStorage.setItem('@storage_Key', JSON.stringify(dados_usuario))
      .then(() => {
        console.log('dados salvos na memoria');
      })
      .catch(e => {
        console.log('nao deu pra salvar');
      });
  }

  async function signOutFromGoogle() {
    await GoogleSignin.signOut()
      .then(() => {
        setUser(null);
      })
      .catch(e => {
        console.log('Nao deu pra sair');
      });
    AsyncStorage.clear().then(() => {
      console.log('Dados excluidos do celular');
    });
  }

  async function signInWithGoogle() {
    await GoogleSignin.signIn()
      .then(u => {
        console.log('User logado');

        let data = {
          nome: u.user.name,
          foto: u.user.photo,
          primeiro_nome: u.user.givenName,
          user_id: u.user.id,
        };

        setUser(data);
        salvandoDadosLocalmente(data);
        //cadastrar o usuario no firestore se ele não existe
        criaUsuarioNoFirestore(u.user.id, u.user.name, u.user.email);
      })
      .catch(e => {
        console.log('erro: ' + e);
      });
  }

  async function criaUsuarioNoFirestore(user_id, nome, email) {
    const data_atual = new Date();

    await firestore()
      .collection('Usuarios')
      .doc(user_id)
      .get()
      .then(q => {
        if (!q.exists) {
          firestore()
            .collection('Usuarios')
            .doc(user_id)
            .set({
              created_at: format(data_atual, 'dd/MM/yyyy'),
              nome: nome,
              email: email,
            })
            .then(() => {
              console.log('Usuario cadastrado ou Logado no firestore');

              //criando documento contendo as informacoes de saldo, entrada e etc
              criaBalancosDoUsuario(user_id, format(data_atual, 'dd-MM-yyyy'));
            });
        }
      });
  }
  async function criaBalancosDoUsuario(user_id, data_atual) {
    await firestore()
      .collection('Balancos')
      .doc(user_id)
      .get()
      .then(q => {
        if (!q.exists) {
          console.log('Não existe');
          firestore()
            .collection('Balancos')
            .doc(user_id)
            .set({
              saldo: 0,
              gasto: 0,
              entrada: 0,
              reserva: 0,
              created_at: data_atual,
            })
            .then(() => {
              console.log('Informacoes criadas com sucesso');
            });
        } else console.log('Usuario ja existe');
      })
      .catch(e => {
        console.log('Erro' + e);
      });
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signInWithGoogle,
        saldo_atual,
        setSaldo_atual,
        gasto_atual,
        setGasto_atual,
        entrada_atual,
        setEntrada_atual,
        reserva_atual,
        setReserva_atual,
        carregaSaldo,
        setCarregaSaldo,
        signOutFromGoogle,
        loadingAuth,
        setLoadingAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
