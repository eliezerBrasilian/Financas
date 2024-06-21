package com.ifinancas.services

import com.ifinancas.data.dataclass.FirebaseUserResponse
import com.ifinancas.data.dataclass.UserAuthSignUpData

interface AuthService {
    suspend fun login(
        email: String, password: String,
        onSuccess: (user: FirebaseUserResponse) -> Unit,
        onError: (errorCode: String) -> Unit
    ): Unit

    suspend fun signUp(
        email: String,
        password: String,
        name: String,
        onSuccess: (user: UserAuthSignUpData) -> Unit,
        onError: (errorCode: String) -> Unit
    ): Unit

    suspend fun loginWithGoogle(
        email: String,
        name: String,
        photo: String?,
        userUid: String,
        onSuccess: (user: FirebaseUserResponse) -> Unit,
        onError: (errorCode: String) -> Unit
    ): Unit
}
