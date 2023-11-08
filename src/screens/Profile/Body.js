import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useState, useEffect} from 'react';
import {strings} from '../../assets/strings/strings';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFirebase} from '../../contexts/AuthContext';
import {s} from './style';
import Item from './Item';
import {TextContent} from '../../components/TextContent';
export default function Body() {
  const {savePhoto, user, isLoadingPhoto, signOut, signed} = useFirebase();
  //const [profilePhoto, setProfilePhoto] = useState(user.profile_photo);

  async function handleSignOut() {
    await signOut();
  }

  // useEffect(() => {
  //   console.log(profilePhoto);
  // }, []);

  async function launchLibrary() {
    const options = {
      title: strings.select_image,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (response.error) {
        console.log('Erro: ', response.error);
      } else {
        // Caminho do arquivo selecionado
        const ra = response.assets;
        const imagePath = ra[0].uri;
        setProfilePhoto(imagePath);
        console.log(imagePath);
        await savePhoto(imagePath);
      }
    });
  }

  return (
    <View style={s.container}>
      <View style={s.onTop}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/user_profile.png')}
            style={s.iconLogin}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <TextContent>{user?.email}</TextContent>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: '#153B60',
          fontSize: 17,
          fontWeight: 'bold',
          marginTop: 35,
          marginBottom: 25,
        }}>
        {strings.informacoes}
      </Text>
      <View style={{rowGap: 10}}>
        <Item
          image={require('../../assets/images/config.png')}
          title="Dados Pessoais"
          goTo={'DadosPessoais'}
        />
        <Item
          image={require('../../assets/images/lixeira.png')}
          title="Minha Lixeira"
          goTo={'Lixeira'}
        />
        <Item
          image={require('../../assets/images/suporte.png')}
          title="Suporte"
          goTo={'Suporte'}
        />
        <Item
          image={require('../../assets/images/sobre_nos.png')}
          title="Sobre-nós"
        />

        <TouchableOpacity
          onPress={handleSignOut}
          style={{alignItems: 'flex-start', paddingHorizontal: 10}}>
          <TextContent color="#153B60" textAlign="left">
            Sair
          </TextContent>
        </TouchableOpacity>
      </View>
    </View>
  );
}
