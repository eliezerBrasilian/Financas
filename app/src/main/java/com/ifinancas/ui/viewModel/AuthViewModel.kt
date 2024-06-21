package com.ifinancas.ui.viewModel

import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import com.ifinancas.data.dataclass.FirebaseUserResponse
import com.ifinancas.data.dataclass.UserAuthSignUpData
import com.ifinancas.services.AuthService
import com.ifinancas.utils.AppUtils
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(private val authService: AuthService) : ViewModel() {
    private var auth: FirebaseAuth = Firebase.auth;

    private val _loading = MutableLiveData(false);

    val loading: LiveData<Boolean> = _loading;

    fun loginWithGoogle(
        email: String,
        name: String,
        photo: Uri?,
        userUid: String,
        onSuccess: (user: FirebaseUserResponse) -> Unit,
        onError: (errorCode: String) -> Unit
    ) = viewModelScope.launch {
        _loading.value = true;

        Log.i(AppUtils.AppTag, "clicked --1")
        authService.loginWithGoogle(email, name, photo.toString(), userUid, onSuccess, onError)
        _loading.value = false;
    }

    fun login(
        email: String, password: String,
        onSuccess: (user: FirebaseUserResponse) -> Unit,
        onError: (errorCode: String) -> Unit
    ) = viewModelScope.launch {
        _loading.value = true;

        authService.login(email, password, onSuccess, onError)
        _loading.value = false;
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun createUserWithEmailAndPassword(
        email: String,
        password: String,
        name: String,
        onSuccess: (user: UserAuthSignUpData) -> Unit,
        onError: (errorCode: String) -> Unit
    ) = viewModelScope.launch {
        _loading.value = true;
        authService.signUp(
            email, password, name,
            onSuccess, onError
        )

        _loading.value = false;
    }


    fun getUserUid(): String? {
        return auth.currentUser?.uid;
    }

    fun signOut() {
        auth.signOut()
    }

}

