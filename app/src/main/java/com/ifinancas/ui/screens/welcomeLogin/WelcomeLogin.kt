package com.ifinancas.ui.screens.welcomeLogin

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.Icon
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.R
import com.ifinancas.navigation.NavigationScreens
import com.ifinancas.navigation.ArrowBackTop
import com.ifinancas.ui.theme.MAINBLUE

@Preview
@Composable
fun WelcomeLogin(nav: NavHostController = rememberNavController()){

    Column(modifier = Modifier
        .fillMaxSize()
        .background(Color.White)
        .padding(15.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        ArrowBackTop(nav = nav)
        
        Spacer(modifier = Modifier.height(40.dp))
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
            ){
            Image(painter = painterResource(id = R.drawable.mao),
                contentDescription = null,
                modifier = Modifier
                    .height(30.dp)
                    .width(30.dp))
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = "Bem vindo(a) de volta!",
                color = Color.Black,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,

            )

        }


        Image(painter = painterResource(id = R.drawable.pessoas_login),
            contentDescription = null,
            modifier = Modifier
                .height(300.dp)
                .width(240.dp))

        Text(
            text = "É bom vê-lo novamente, continue alcançando seu sucesso",
            color = Color.DarkGray,
            fontWeight = FontWeight.Medium,
            fontSize = 15.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )

        Spacer(modifier = Modifier.height(50.dp))
        Button(onClick = { nav.navigate(NavigationScreens.LOGIN) } , modifier = Modifier
            .fillMaxWidth()
            .height(50.dp)
            .border(width = 1.dp, color = MAINBLUE, shape = RoundedCornerShape(9.dp))
        ) {
            Icon(imageVector = Icons.Default.Email, contentDescription = null)
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = "Continuar com email",
                color = Color.White,
                fontWeight = FontWeight.Medium,
                fontSize = 13.sp
            )
        }
        Spacer(modifier = Modifier.height(15.dp))
            Text(
                text = "Não consigo fazer login",
                color = MAINBLUE,
                fontWeight = FontWeight.Medium,
                fontSize = 13.sp
            )
    }
}
