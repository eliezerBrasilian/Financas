import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

class Firestore {
  private collections = {
    USERS: 'users',
    BACKUPS: 'backups',
    DOCUMENTS: 'documents',
    STORAGE: 'storage',
  };

  private documentReference!: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;

  async updateData(collection: string, document: string, fields: any) {
    try {
      await firestore().collection(collection).doc(document).update(fields);
      return true;
    } catch (error) {
      return new Error(
        'error on update collection' + collection + 'and document: ' + document,
      );
    }
  }

  getCollections() {
    return this.collections;
  }

  public setDocumentReference(
    collection = this.collections.USERS,
    documentId: string,
  ) {
    this.documentReference = firestore().collection(collection).doc(documentId);
  }

  public getDocumentReference(): FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> {
    return this.documentReference;
  }

  public async sendErrorOnTryngLoginIn(errorMessage: any) {
    var errorsRef = firestore().collection('Errors');
    try {
      const response = await errorsRef.add({
        message: errorMessage,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      await errorsRef.doc(response.id).update({uid: response.id});
    } catch (error) {
      throw new Error('Error on sending error to firebase');
    }
  }
}

export {Firestore};
