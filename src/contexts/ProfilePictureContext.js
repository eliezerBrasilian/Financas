import React, {createContext, useContext, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Utils} from '../utils/Utils';

const ProfilePictureContext = createContext();

export const useProfilePicture = () => {
  return useContext(ProfilePictureContext);
};

export const ProfilePictureProvider = ({children}) => {
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingApp, setLoadingApp] = useState(true);
  const [isSendingResetLink, setSendingLink] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  async function savePhoto(path, userUid) {
    setSavingPhoto(true);
    const docRef = firestore().collection('users').doc(userUid);

    const storagePath = await getPhotoUrl(path);
    console.log('STORAGEPATH: ' + storage);
    if (storagePath == '') {
      console.log('não foi possivel salvar a foto no storage');
      Utils.ShowToast('Erro ao atualizar foto de perfil');
    } else {
      try {
        await docRef.set({
          profilePicture: path,
        });
        console.log('imagem salva no banco de dados');
        await updatePhotoOnAsyncStorage(path);
        return 200;
      } catch (error) {
        console.log('erro ao salvar imagem no banco de dados: ' + error);
        return 401;
      }
    }
  }

  async function getPhotoUrl(path) {
    const miliseconds = String(Date.now());

    try {
      const storageRef = storage().ref('users/photos').child(miliseconds);
      console.log('STORAGEREF: ' + storageRef);
      await storageRef.putFile(path);
      const caminho = await storageRef.getDownloadURL();
      console.log(caminho);
      return caminho;
    } catch (error) {
      throw new Error('error on get photo url from storage: ' + error);
    }
  }
  async function updatePhotoOnAsyncStorage(profilePhoto) {
    try {
      const userData = await AsyncStorage.getItem('@userData');
      if (userData !== null) {
        const data = JSON.parse(userData);
        data.profilePicture = profilePhoto;
        setProfilePicture(data.profilePicture);
        //Salvando o objeto atualizado no AsyncStorage
        await AsyncStorage.setItem('@userData', JSON.stringify(data));

        console.log('Atributo do objeto atualizado com sucesso!');
        setSavingPhoto(false);
      } else {
        console.log('Chave não encontrada no AsyncStorage.');
        setSavingPhoto(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar o atributo do objeto:', error);
      setSavingPhoto(false);
    }
  }

  return (
    <ProfilePictureContext.Provider
      value={{
        savePhoto,
        savingPhoto,
        profilePicture,
      }}>
      {children}
    </ProfilePictureContext.Provider>
  );
};
