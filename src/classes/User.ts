import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {Exception} from '../Exceptions/Exception';
import {Collections} from '../enums/Collections';
import {UserProperties} from '../enums/UserProperties';
import {Firestore} from './Firestore';
import {InternalStorage} from './InternalStorage';

class User extends Firestore {
  private userData;
  private internalStorage = new InternalStorage();
  private userRef = firestore().collection(Collections.USERS);

  constructor(
    uid: string = '',
    email: string = '',
    phone: string = '',
    name: string = '',
    profilePicture: string | null = null,
  ) {
    super();
    this.userData = {
      uid: uid,
      email: email,
      phone: phone,
      name: name,
      profilePicture: profilePicture,
      isPremium: false,
      isAdmin: false,
      isBackupActive: false,
      createdAt: Date.now(),
    };
  }

  getUserdata() {
    return this.userData;
  }

  public async userExistsInFirestoreDatabase(
    userUid: string,
  ): Promise<boolean> {
    const response = await this.userRef.doc(userUid).get();
    return response.exists;
  }

  public async getUserFirestoreData(
    userUid: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData | undefined> {
    var userData = await this.userRef.doc(userUid).get();
    return userData.data();
  }

  public async removeUser(stateUserModifier: any) {
    stateUserModifier(null);
    await this.internalStorage.clearDataFromDevice();
  }

  async saveUserOnFirestore(userData: any) {
    try {
      await this.userRef.doc(userData.uid).set(userData);
    } catch (error) {
      throw new Error('error on creating user - saveUserOnFirestore: ' + error);
    }
  }

  public async getStoredUserUid() {
    var internalStorage = new InternalStorage();
    try {
      var storedData = await internalStorage.getLoadedData();
      return storedData.uid;
    } catch (error) {
      new Exception('get user uid', error);
    }
  }

  public async becomePremium() {
    try {
      var userUid = await this.getStoredUserUid();
      await this.userRef.doc(userUid).update({isPremium: true});
      await this.internalStorage.updateDataOnDevice(
        UserProperties.IS_PREMIUM,
        true,
      );
    } catch (error) {
      new Exception('unlock premium access', error);
    }
  }

  public async removeAccessPremium() {
    try {
      var userUid = await this.getStoredUserUid();
      await this.userRef.doc(userUid).update({isPremium: false});
      await this.internalStorage.updateDataOnDevice(
        UserProperties.IS_PREMIUM,
        false,
      );
    } catch (error) {
      new Exception('cancel premium access', error);
    }
  }
}

export {User};
