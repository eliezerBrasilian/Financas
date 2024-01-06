import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {Firestore} from './Firestore';
import {InternalStorage} from './InternalStorage';

class User extends Firestore {
  private userData;
  private internalStorage = new InternalStorage();
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
    const response = await firestore()
      .collection(this.getCollections().USERS)
      .doc(userUid)
      .get();
    console.log(response.exists);
    return response.exists;
  }

  public async getUserFirestoreData(
    userUid: string,
  ): Promise<FirebaseFirestoreTypes.DocumentData | undefined> {
    var userData = await firestore().collection('users').doc(userUid).get();
    return userData.data();
  }

  public async removeUser(stateUserModifier: any) {
    stateUserModifier(null);
    await this.internalStorage.clearDataFromDevice();
  }
}

export {User};
