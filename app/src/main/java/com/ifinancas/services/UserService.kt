package com.ifinancas.services

import kotlinx.coroutines.flow.Flow

interface UserService{
    suspend fun getEmail():Flow<String?>
    suspend fun getName(): Flow<String?>
    suspend fun getUid(): Flow<String?>
    suspend fun getPhoto(): Flow<String?>
    suspend fun saveEmail(email: String)
    suspend fun saveName(name: String)
    suspend fun saveUid(uid: String)
    suspend fun savePhoto(photo: String)
    suspend fun clearAllData()
}





