import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export class Ifinancas {
  constructor() {
    this.cardColor = {};
  }

  static async getImageFromDevice() {
    const imagePath = await this.getInformationsAboutCurrentUser();
    return imagePath !== null ? imagePath.profilePicture : null;
  }

  static async getInformationsAboutCurrentUser() {
    try {
      const ud = await AsyncStorage.getItem('@userData');

      if (ud) {
        const userData = JSON.parse(ud);
        return userData;
      }
    } catch (error) {
      return null;
    }
  }

  static async LaunchSelectorOfImageAndRetriveImageSelected() {
    const options = {
      title: 'Selecionar imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
      const response = await launchImageLibrary(options);
      const ra = response.assets;
      imagePath = ra[0].uri;
      return imagePath;
    } catch (error) {
      throw new Error('Erro on launchImageLibrary: ' + error);
    }
  }
}
