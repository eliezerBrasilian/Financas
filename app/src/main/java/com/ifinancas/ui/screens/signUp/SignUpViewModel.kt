package com.ifinancas.ui.screens.signUp

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavHostController
import com.ifinancas.data.dataclass.UserAuthSignUpData
import com.ifinancas.data.enums.FirebaseErrorCode
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils.Companion.AppTag
import kotlinx.coroutines.launch

enum class NameInputError(val value: String) {
    IDLE(""),
    EMPTY("Nome não pode ser vazio"),
    INVALID("Nome inválido")
}

enum class EmailInputError(val value: String) {
    IDLE(""),
    EMPTY("Email não pode ser vazio"),
    INVALID("Email inválido"),
    ALREADY_EXISTS("Este email já está em uso")
}

enum class PasswordInputError(val value: String) {
    IDLE(""),
    EMPTY("Senha não pode ser vazia"),
    INVALID("Sua senha está muito curta")
}

class SignUpViewModel : ViewModel() {

    var nameInput = mutableStateOf("")
    var emailInput = mutableStateOf("")
    var passwordInput = mutableStateOf("")
    var nameError = mutableStateOf(NameInputError.IDLE)
    var emailError = mutableStateOf(EmailInputError.IDLE)
    var passwordError = mutableStateOf(PasswordInputError.IDLE)

    @RequiresApi(Build.VERSION_CODES.O)
    fun signUp(authViewModel: AuthViewModel, nav: NavHostController, storeUserData: UserViewModel) {
        resetInputStates()

        val nameValue = nameInput.value
        val emailValue = emailInput.value
        val passwordValue = passwordInput.value

        if (nameValue.length > 10 && emailValue.length > 10 && passwordValue.length > 7) {
            authViewModel.createUserWithEmailAndPassword(
                emailValue.trim(),
                passwordValue.trim(),
                nameValue.trim(),
                onSuccess = { user ->
                    onSuccess(user, nav, storeUserData)
                }
            ) { errorCode ->
                if (errorCode == FirebaseErrorCode.ERROR_EMAIL_ALREADY_IN_USE.error) emailError.value =
                    EmailInputError.ALREADY_EXISTS
            }
        }

        if (nameValue.isEmpty()) {
            nameError.value = NameInputError.EMPTY
        } else if (nameValue.length in 1..10) {
            nameError.value = NameInputError.INVALID
        }

        if (emailValue.isEmpty()) {
            emailError.value = EmailInputError.EMPTY
        } else if (emailValue.length in 1..8 || !validEmail(emailValue)) {
            emailError.value = EmailInputError.INVALID
        }

        if (passwordValue.isEmpty()) {
            passwordError.value = PasswordInputError.EMPTY
        } else if (passwordValue.length in 1..7) {
            passwordError.value = PasswordInputError.INVALID
        }
    }

    val onChangeName = { it: String ->
        nameInput.value = it
    }
    val onChangeLogin = { it: String ->
        emailInput.value = it
    }
    val onChangePassword = { it: String ->
        passwordInput.value = it
    }

    val resetInputStates: () -> Unit = {
        nameError.value = NameInputError.IDLE
        emailError.value = EmailInputError.IDLE
        passwordError.value = PasswordInputError.IDLE
    }


    fun onSuccess(user: UserAuthSignUpData, nav: NavHostController, storeUserData: UserViewModel) =
        viewModelScope.launch {
            resetInputStates()

            launch {
                Log.d(AppTag, "useruid: ${user.uid}")
                storeUserData.saveEmail(emailInput.value)
                storeUserData.saveName(user.name)
                storeUserData.savePhoto(user.profilePicture ?: "")
                storeUserData.saveUid(user.uid)

                nav.navigate("appNavigation") {
                    popUpTo("authNavigation") {
                        inclusive = true
                    }
                }
            }
        }

}

fun validEmail(emailInput: String): Boolean {
    return emailInput.contains("@gmail.com") ||
            emailInput.contains("@hotmail.com") ||
            emailInput.contains("@outlook.com") ||
            emailInput.contains("@yahoo.com") ||
            emailInput.contains("@live.com")
}
