import React, {createContext, useContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useFirebase} from './AuthContext';
import {ShowToast} from '../components/Toast';
const FileContext = createContext();

export const useFile = () => {
  return useContext(FileContext);
};

export const FileProvider = ({children}) => {
  const [storageUsed, setStorageUsed] = useState(0);
  const {user} = useFirebase();
  const [updated, setUpdate] = useState(false);

  /*
   (path = pickerResult.fileCopyUri),
            (name = pickerResult.name),
            (size = pickerResult.size),
            (type = pickerResult.type.split('/')[0]),
            (extension = pickerResult.name.split('.').pop()),
            user?.uid,
            */

  async function sendFile(
    userId,
    files,
    customFolder = false,
    folderKey = null,
  ) {
    console.log('sendFile');
    console.log(userId, files, customFolder, folderKey);

    files.forEach(async i => {
      //console.log(i.name);
      const urlFromFirebase = await getFileUrl(i.fileCopyUri);

      console.log(
        `name: ${i.name} - size:   ${i.size} - type: ${
          i.type.split('/')[0]
        } - extension: ${i.name.split('.').pop()} - path: ${i.fileCopyUri}`,
      );

      if (urlFromFirebase !== '') {
        let newDocument = {
          name: i.name,
          path: urlFromFirebase,
          size: i.size,
          type: i.type.split('/')[0],
          extension: i.name.split('.').pop(),
        };

        if (customFolder) createFileOnSubfolder(newDocument, folderKey);
        else createFile(newDocument, userId);
      }
    });

    // console.log(path, name, size, type, extension);

    /*
    const urlFromFirebase = await getFileUrl(path);

    if (urlFromFirebase !== '') {
      let newDocument = {
        name: name,
        path: urlFromFirebase,
        size: size,
        type: type,
        extension: extension,
      };
      console.log('customFolder: ' + customFolder);
      if (customFolder) createFileOnSubfolder(newDocument, folderKey);
      else createFile(newDocument, userId);
    }
    */
  }

  async function editFile(currentFileId, newName) {
    console.log('currentFileId: ' + currentFileId);
    try {
      const response = await firestore()
        .collection('documents')
        .doc(currentFileId)
        .update({
          name: newName,
        });
      console.log('file was updated');
      setUpdate(!updated);
      return 200;
    } catch (error) {
      console.log('file was not updated: ' + error);
      return 500;
    }
  }
  async function getFileUrl(file_on_memory) {
    const miliseconds = String(Date.now());

    try {
      const storageRef = await storage()
        .ref(`users/${user?.uid}/files`)
        .child(miliseconds);
      await storageRef.putFile(file_on_memory);
      const caminho = await storageRef.getDownloadURL();
      return caminho;
    } catch (error) {
      console.log('erro: ' + error);
      return '';
    }
  }

  async function deleteFile(file_id, size, type, userId) {
    const fileRef = firestore().collection('documents').doc(file_id);
    const fileAlreadyExists = await fileRef.get();
    try {
      if (fileAlreadyExists.exists) {
        firestore()
          .collection('documents')
          .doc(file_id)
          .update({
            deleted: true,
            //size: firestore.FieldValue.increment(-size),
          })
          .then(async () => {
            console.log('vai atualizar arquivo');

            firestore()
              .collection('storage')
              .doc(userId)
              .update({
                trash_storage_used: firestore.FieldValue.increment(size),
              })
              .then(() => {
                setUpdate(!updated);
              });
            /*
            await updateDocumentsTotalSize(
              (newSize = size),
              (type = type),
              userId,
              (amount = -1),
            );
            */
          });
      }
      return 200;
    } catch {
      return 400;
    }
  }

  async function createFileOnSubfolder(newDocument, folderKey) {
    const docRef = firestore().collection('documents');

    const {name, path, size, type, extension} = newDocument;

    await docRef
      .add({
        name: name,
        nameInLowerCase: name.toLowerCase(),
        path: path,
        size: size,
        type: type,
        extension: extension,
        parent: folderKey,
        deleted: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
        createdBy: user.uid,
      })
      .then(async document => {
        console.log('adicionado');
        docRef
          .doc(document.id)
          .update({uid: document.id})
          .catch(e => console.log('erro ao addd uid: ' + e));
        await updateDocumentsTotalSize(newDocument.size, type, user.uid);
      })
      .catch(e => {
        console.log('erro: ' + e);
      });
  }

  async function createFile(newDocument, userId) {
    const docRef = firestore().collection('documents');
    const {name, path, size, type, extension} = newDocument;
    await docRef
      .add({
        name: name,
        nameInLowerCase: name.toLowerCase(),
        path: path,
        size: size,
        type: type,
        extension: extension,
        //isInsideFolder: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
        createdBy: userId,
        //folder: '',
        parent: null,
        deleted: false,
        uid: '',
      })
      .then(async document => {
        ShowToast('enviando arquivo');
        console.log('adicionado');
        docRef
          .doc(document.id)
          .update({uid: document.id})
          .catch(e => console.log('erro ao addd uid: ' + e))
          .then(() => console.log('adicionou uid - vai atualizar arquivo'));
        await updateDocumentsTotalSize(size, type, userId);
      })
      .catch(e => {
        console.log('erro: ' + e);
      });
  }

  async function recoveryFile(file_id, size, type, userId) {
    const fileRef = firestore().collection('documents').doc(file_id);
    const fileAlreadyExists = await fileRef.get();
    try {
      if (fileAlreadyExists.exists) {
        console.log('file já existe');
        firestore()
          .collection('documents')
          .doc(file_id)
          .update({
            deleted: false,
          })
          .then(async () => {
            firestore()
              .collection('storage')
              .doc(userId)
              .update({
                trash_storage_used: firestore.FieldValue.increment(-size),
              })
              .then(() => {
                setUpdate(!updated);
              });
          });
      }
      return 200;
    } catch {
      return 400;
    }
  }

  async function updateDocumentsTotalSize(newSize, type, userId, amount = 1) {
    let docRef = firestore().collection('storage').doc(userId);

    console.log(newSize, type, userId);
    docRef
      .update({
        total_storage_used: firestore.FieldValue.increment(newSize),
      })
      .then(async () => {
        if (type == 'image') {
          docRef.update({images: firestore.FieldValue.increment(amount)});
          docRef
            .update({
              images_storage_used: firestore.FieldValue.increment(newSize),
            })
            .then(() => {
              setUpdate(!updated);
              console.log('added image and updated size');
            })
            .catch(e => {
              console.log('ERRO BRUTO: ' + e);
            });
        }

        if (type == 'video') {
          docRef.update({videos: firestore.FieldValue.increment(amount)});
          docRef
            .update({
              videos_storage_used: firestore.FieldValue.increment(newSize),
            })
            .then(() => {
              setUpdate(!updated);
            });
        }

        if (type == 'application') {
          console.log('FILES');
          docRef.update({
            files: firestore.FieldValue.increment(amount),
          });
          docRef
            .update({
              files_storage_used: firestore.FieldValue.increment(newSize),
            })
            .then(() => {
              setUpdate(!updated);
            });
        }
      });
  }

  return (
    <FileContext.Provider
      value={{
        sendFile,
        storageUsed,
        setStorageUsed,
        deleteFile,
        updated,
        setUpdate,
        editFile,
        recoveryFile,
      }}>
      {children}
    </FileContext.Provider>
  );
};
