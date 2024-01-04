import AsyncStorage from '@react-native-async-storage/async-storage';
import {keys} from '../enums/InternalStorageEnums';

class InternalStorage {
  public async getLoadedData() {
    try {
      const ud = await AsyncStorage.getItem(keys.USER_KEY);

      if (ud != null) {
        const retrievedData = JSON.parse(ud);
        return retrievedData;
      } else return null;
    } catch (error) {
      throw new Error(`error - class InternalStorage - loadData(): ${error}`);
    }
  }

  public async writeDataOnDevice(data: any) {
    try {
      await AsyncStorage.setItem(keys.USER_KEY, JSON.stringify(data));
    } catch (error) {
      throw new Error(
        `error - class InternalStorage - writeDataOnDevice(): ${error}`,
      );
    }
  }

  public async clearDataFromDevice() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      throw new Error(
        `error - class InternalStorage - clearDataFromDevice(): ${error}`,
      );
    }
  }
}

export {InternalStorage};
