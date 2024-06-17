package com.ifinancas.ui.screens.signUp

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.R
import com.ifinancas.data.dataclass.UserAuthSignUpData
import com.ifinancas.data.enums.FirebaseErrorCode
import com.ifinancas.navigation.ArrowBackTop
import com.ifinancas.ui.components.AuthButton
import com.ifinancas.ui.components.ErrorText
import com.ifinancas.ui.components.InputText
import com.ifinancas.ui.theme.MAINBLUE
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils.Companion.AppTag
import kotlinx.coroutines.launch


@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun SignUp(
    nav: NavHostController = rememberNavController(),
    authViewModel: AuthViewModel,
    userViewModel: UserViewModel,
) {

    val uid by userViewModel.uid.observeAsState(initial = "")
    val isLoading by authViewModel.loading.observeAsState()

    var nameInput by remember {
        mutableStateOf("")
    }
    var emailInput by remember {
        mutableStateOf("")
    }
    var passwordInput by remember {
        mutableStateOf("")
    }

    var loginError by remember {
        mutableStateOf("")
    }
    var nameIsEmpty by remember {
        mutableStateOf(false)
    }
    var loginIsEmpty by remember {
        mutableStateOf(false)
    }
    var passwordIsEmpty by remember {
        mutableStateOf(false)
    }

    val resetInputStates: () -> Unit = {
        loginError = ""
        nameIsEmpty = false
        loginIsEmpty = false
        passwordIsEmpty = false
    }

    val onChangeName = { it: String ->
        nameInput = it
    }
    val onChangeLogin = { it: String ->
        emailInput = it
    }
    val onChangePassword = { it: String ->
        passwordInput = it
    }

    val storeUserData: UserViewModel = hiltViewModel()
    val scope = rememberCoroutineScope()

    val onSuccess: (user: UserAuthSignUpData) -> Unit = { user ->
        resetInputStates()

        scope.launch {
            Log.d(AppTag, "useruid: ${user.uid}")
            storeUserData.saveEmail(emailInput)
            storeUserData.saveName(user.name)
            storeUserData.savePhoto(if (user.profilePicture == null) "" else user.profilePicture)
            storeUserData.saveUid(user.uid)

            nav.navigate("appNavigation") {
                popUpTo("authNavigation") {
                    inclusive = true
                }
            }
        }
    }
    val onError: (errorCode: String) -> Unit = {
        if (it == FirebaseErrorCode.ERROR_INVALID_EMAIL.error) {
            loginError = "Este email é inválido!"
        } else if (it == FirebaseErrorCode.ERROR_WEAK_PASSWORD.error) {
            loginError = "A senha está muito curta!"
        } else if (it == FirebaseErrorCode.ERROR_EMAIL_ALREADY_IN_USE.error) {
            loginError = "Este email já está em uso!"
        }
    }

    val onClick: () -> Unit = {
        resetInputStates()

        if (nameInput.isNotEmpty() && emailInput.isNotEmpty() && passwordInput.isNotEmpty()) {
            authViewModel.createUserWithEmailAndPassword(
                emailInput.trim(),
                passwordInput.trim(),
                nameInput.trim(),
                onSuccess,
                onError
            )
        } else {
            if (nameInput.isEmpty()) {
                nameIsEmpty = true
            }
            if (emailInput.isEmpty()) {
                loginIsEmpty = true
            }
            if (passwordInput.isEmpty()) {
                passwordIsEmpty = true
            }
        }

    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(15.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        ArrowBackTop(nav = nav)

        Spacer(modifier = Modifier.height(40.dp))

        Image(
            painter = painterResource(id = R.drawable.mao),
            contentDescription = null,
            modifier = Modifier
                .height(40.dp)
                .width(40.dp)
        )
        Spacer(modifier = Modifier.height(40.dp))
        Text(
            text = "Bem vindo, vamos começar!",
            color = Color.Black,
            fontWeight = FontWeight.Normal,
            fontSize = 22.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )


        Spacer(modifier = Modifier.height(50.dp))


        if (nameIsEmpty) {
            ErrorText(text = "Informe o seu nome")
        }

        InputText(
            value = nameInput,
            placeHolderText = "NOME COMPLETO",
            onChangeText = onChangeName
        )
        Spacer(modifier = Modifier.height(20.dp))
        if (loginIsEmpty) {
            ErrorText(text = "Informe o email")
        }
        if (loginError.isNotEmpty()) {
            ErrorText(text = loginError)
        }
        InputText(
            value = emailInput, placeHolderText = "EMAIL",
            keyboardType = KeyboardType.Email,
            onChangeText = onChangeLogin
        )
        Spacer(modifier = Modifier.height(20.dp))
        if (passwordIsEmpty) {
            ErrorText(text = "Informe a senha")
        }
        InputText(
            value = passwordInput,
            placeHolderText = "SENHA",
            isPassword = true,
            keyboardType = KeyboardType.Password,
            onChangeText = onChangePassword
        )


        Spacer(modifier = Modifier.height(100.dp))

        Text(
            text = "Ao continuar, você declara estar ciente da nossa ",
            color = Color.Black,
            fontWeight = FontWeight.Normal,
            fontSize = 15.sp,
        )
        Text(
            text = "Política de Privacidade",
            color = MAINBLUE,
            fontWeight = FontWeight.Normal,
            fontSize = 15.sp,
        )

        Spacer(modifier = Modifier.height(50.dp))
        AuthButton(isLoading, "CADASTRAR", onClick = onClick)
    }
}