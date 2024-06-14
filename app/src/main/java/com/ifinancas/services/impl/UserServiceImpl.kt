package com.ifinancas.services.impl

import android.content.Context
import android.util.Log
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.foodfacil.enums.Collections.Companion.USERS
import com.google.firebase.firestore.FirebaseFirestore
import com.ifinancas.services.UploadFile
import com.ifinancas.services.UserService
import com.ifinancas.utils.AppUtils.Companion.AppTag
import com.ifinancas.utils.Toast
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

class UserServiceImpl @Inject constructor(
    @ApplicationContext private val context: Context,
    private val firestore: FirebaseFirestore
) :
    UserService {
    companion object {
        private val Context.dataStore: DataStore<Preferences> by preferencesDataStore("UserData")

        val USER_EMAIL_KEY = stringPreferencesKey("user_email")
        val USER_NAME_KEY = stringPreferencesKey("user_name")
        val USER_UID = stringPreferencesKey("user_uid")
        val USER_TOKEN = stringPreferencesKey("user_token")
        val USER_PHOTO = stringPreferencesKey("user_photo")
    }

    override suspend fun getEmail(): Flow<String?> {
        return context.dataStore.data.map { preferences ->
            preferences[USER_EMAIL_KEY]
        }
    }

    override suspend fun getName(): Flow<String?> {
        return context.dataStore.data.map { preferences ->
            preferences[USER_NAME_KEY]
        }
    }

    override suspend fun getUid(): Flow<String?> {
        return context.dataStore.data.map { preferences ->
            preferences[USER_UID]
        }
    }

    override suspend fun getPhoto(): Flow<String?> {
        return context.dataStore.data.map { preferences ->
            preferences[USER_PHOTO]
        }
    }

    override suspend fun saveEmail(email: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_EMAIL_KEY] = email
        }
    }

    override suspend fun saveName(name: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_NAME_KEY] = name
        }
    }

    override suspend fun saveUid(uid: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_UID] = uid
        }
    }

    override suspend fun savePhoto(photo: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_PHOTO] = photo
        }
    }

    override suspend fun clearAllData() {
        context.dataStore.edit { preferences ->
            preferences.clear()
        }
    }

    override suspend fun updateProfilePicture(
        oldProfilePictureReferenceUrl: String?,
        newProfilePicture: String, userUid: String
    ) {
        if (!oldProfilePictureReferenceUrl.isNullOrEmpty()) {
            UploadFile().deleteFile(oldProfilePictureReferenceUrl)
            val uploadFileData = UploadFile().uploadFileToFirebaseStorage(newProfilePicture)
            val imageUrl = uploadFileData?.imageUri

            Log.d(AppTag, "imageUrl: $imageUrl")

            try {
                val documentFounded = firestore.collection(USERS).whereEqualTo("uid", userUid)
                    .get().await()

                val documentFoundedId = documentFounded.documents[0].id
                Log.d(AppTag, "documentFoundedId: $documentFoundedId")


                firestore.collection(USERS).document(documentFoundedId)
                    .update("profilePicture", imageUrl).addOnSuccessListener { task ->

                        Log.d(AppTag, "savePhoto: ${task}")
                    }
                    .await()

                Toast(context).showToast("Foto de perfil atualizada")
                if (imageUrl != null)
                    savePhoto(imageUrl)
                //loadUser(userUid,context)
            } catch (e: Exception) {
                Log.e(AppTag, "erro ao salvar foto: ${e.message}")
            }
        }

    }
}
