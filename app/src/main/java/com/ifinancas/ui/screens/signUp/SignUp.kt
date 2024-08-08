package com.ifinancas.ui.screens.signUp

import android.os.Build
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
import com.ifinancas.navigation.ArrowBackTop
import com.ifinancas.ui.components.AuthButton
import com.ifinancas.ui.components.ErrorText
import com.ifinancas.ui.components.InputText
import com.ifinancas.ui.theme.MAINBLUE
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.UserViewModel

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun SignUp(
    nav: NavHostController = rememberNavController(),
    authViewModel: AuthViewModel,
    signUpViewModel: SignUpViewModel
) {

    val isLoading by authViewModel.loading.observeAsState(initial = false)

    val nameInput by signUpViewModel.nameInput
    val emailInput by signUpViewModel.emailInput
    val passwordInput by signUpViewModel.passwordInput

    val nameError by signUpViewModel.nameError
    val emailError by signUpViewModel.emailError
    val passwordError by signUpViewModel.passwordError

    val storeUserData: UserViewModel = hiltViewModel()

    fun handleSignUp() {
        signUpViewModel.signUp(authViewModel, nav, storeUserData)
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
            fontSize = 20.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(50.dp))

        if (nameError != NameInputError.IDLE) {
            ErrorText(text = nameError.value)
        }

        InputText(
            value = nameInput,
            placeHolderText = "NOME COMPLETO",
            onChangeText = signUpViewModel.onChangeName
        )
        Spacer(modifier = Modifier.height(20.dp))
        if (emailError != EmailInputError.IDLE) {
            ErrorText(text = emailError.value)
        }

        InputText(
            value = emailInput, placeHolderText = "EMAIL",
            keyboardType = KeyboardType.Email,
            onChangeText = signUpViewModel.onChangeLogin
        )
        Spacer(modifier = Modifier.height(20.dp))
        if (passwordError != PasswordInputError.IDLE) {
            ErrorText(text = passwordError.value)
        }
        InputText(
            value = passwordInput,
            placeHolderText = "SENHA",
            isPassword = true,
            keyboardType = KeyboardType.Password,
            onChangeText = signUpViewModel.onChangePassword
        )

        Spacer(modifier = Modifier.height(90.dp))

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

        Spacer(modifier = Modifier.height(40.dp))
        AuthButton(isLoading, "CADASTRAR", onClick = { handleSignUp() })
    }
}