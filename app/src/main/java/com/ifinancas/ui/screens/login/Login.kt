package com.ifinancas.ui.screens.login

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.data.dataclass.FirebaseUserResponse
import com.ifinancas.data.enums.FirebaseErrorCode
import com.ifinancas.ui.components.LoginForm
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppTag
import kotlinx.coroutines.launch

@Composable
fun Login(
    nav: NavHostController = rememberNavController(),
    authViewModel: AuthViewModel,
    userViewModel: UserViewModel,
) {
    val isLoading by authViewModel.loading.observeAsState()

    var emailInput by remember {
        mutableStateOf("")
    }
    var passwordInput by remember {
        mutableStateOf("")
    }

    val onChangeLogin = { it: String ->
        emailInput = it
    }
    val onChangePassword = { it: String ->
        passwordInput = it
    }

    var loginError by remember {
        mutableStateOf("")
    }
    var loginIsEmpty by remember {
        mutableStateOf(false)
    }
    var passwordIsEmpty by remember {
        mutableStateOf(false)
    }

    val scope = rememberCoroutineScope()

    val resetInputStates: () -> Unit = {
        loginError = ""
        loginIsEmpty = false
        passwordIsEmpty = false
    }

    val onSuccess: (user: FirebaseUserResponse) -> Unit = { user ->
        resetInputStates()
        scope.launch {
            Log.d(AppTag, "useruid: ${user.uid}")
            userViewModel.saveEmail(emailInput)
            userViewModel.saveUid(user.uid)
            userViewModel.saveName(user.name)
            user.profilePicture?.let { userViewModel.savePhoto(it) }

            nav.navigate("appNavigation") {
                popUpTo("authNavigation") {
                    inclusive = true
                }
            }
        }
    }


    val onError: (error: String) -> Unit = {
        if (it == FirebaseErrorCode.USER_NOT_FOUND.error) {
            loginError = "Este email não está cadastrado!"
        } else if (it == FirebaseErrorCode.ERROR_WRONG_PASSWORD.error) {
            loginError = "A senha está incorreta!"
        } else if (it == FirebaseErrorCode.TOO_MANY_REQUESTS.error) {
            loginError = "O acesso a conta foi temporiariamente bloqueado!"
        }
    }

    val onClick: () -> Unit = {
        resetInputStates()

        if (!emailInput.isNullOrEmpty() && !passwordInput.isNullOrEmpty()) {
            scope.launch {
                authViewModel.login(emailInput, passwordInput, onSuccess, onError)
            }
        } else {
            if (emailInput.isNullOrEmpty()) {
                loginIsEmpty = true
            }
            if (passwordInput.isNullOrEmpty()) {
                passwordIsEmpty = true
            }
        }
    }


    LoginForm(
        nav,
        onClick,
        loginIsEmpty,
        loginError,
        emailInput,
        onChangeLogin,
        passwordIsEmpty,
        passwordInput,
        onChangePassword,
        isLoading,
    )
}

