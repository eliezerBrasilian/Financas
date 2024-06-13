package com.ifinancas.services.impl

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.ifinancas.services.UserService
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject

class UserServiceImpl @Inject constructor(@ApplicationContext private val context: Context) : UserService {
    companion object {
        private val Context.dataStore: DataStore<Preferences> by preferencesDataStore("UserData")

        val USER_EMAIL_KEY = stringPreferencesKey("user_email")
        val USER_NAME_KEY = stringPreferencesKey("user_name")
        val USER_UID = stringPreferencesKey("user_uid")
        val USER_TOKEN = stringPreferencesKey("user_token")
        val USER_PHOTO = stringPreferencesKey("user_photo")
    }

    override suspend fun getEmail(): Flow<String?> {
        return context.dataStore.data.map { preferences->
            preferences[USER_EMAIL_KEY]
        }
    }

    override suspend fun getName(): Flow<String?> {
        return context.dataStore.data.map { preferences->
            preferences[USER_NAME_KEY]
        }
    }

    override suspend fun getUid(): Flow<String?> {
        return context.dataStore.data.map { preferences->
            preferences[USER_UID]
        }
    }

    override suspend fun getPhoto(): Flow<String?> {
        return context.dataStore.data.map { preferences->
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
}
