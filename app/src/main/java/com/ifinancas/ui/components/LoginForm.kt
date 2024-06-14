package com.ifinancas.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.ifinancas.R
import com.ifinancas.navigation.ArrowBackTop
import com.ifinancas.navigation.NavigationScreens

@Composable
fun LoginForm(
    nav: NavHostController,
    onClick: () -> Unit,
    loginIsEmpty: Boolean,
    loginError: String,
    emailInput: String,
    onChangeLogin: (String) -> Unit,
    passwordIsEmpty: Boolean,
    passwordInput: String,
    onChangePassword: (String) -> Unit,
    isLoading: Boolean?,
) {

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
            painter = painterResource(id = R.drawable.foguete),
            contentDescription = null,
            modifier = Modifier
                .height(90.dp)
                .width(90.dp)
        )
        Spacer(modifier = Modifier.height(40.dp))
        Text(
            text = "Iniciar Sessão",
            color = Color.Black,
            fontWeight = FontWeight.Bold,
            fontSize = 20.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center
        )


        Spacer(modifier = Modifier.height(50.dp))

        if (loginIsEmpty) {
            ErrorText(text = "Informe o email")
        }
        if (loginError.isNotEmpty()) {
            ErrorText(text = loginError)
        }
        InputText(value = emailInput, placeHolderText = "EMAIL", onChangeText = onChangeLogin)
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

        AuthButton(isLoading, "ENTRAR", onClick = onClick, disableClickIfLoading = true)
        Spacer(modifier = Modifier.height(15.dp))

        Text(text = "ESQUECEU A SENHA",
            color = Color.Blue,
            fontWeight = FontWeight.Medium,
            fontSize = 13.sp,
            modifier = Modifier.clickable {
                nav.navigate(NavigationScreens.LOGIN)
            })
    }
}

