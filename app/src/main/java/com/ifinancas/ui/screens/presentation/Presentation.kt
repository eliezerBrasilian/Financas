package com.ifinancas.ui.screens.presentation

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Text
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
import com.ifinancas.ui.theme.MAINBLUE

@Preview
@Composable
fun Presentation(nav:NavHostController = rememberNavController()){
    Column(modifier = Modifier
        .fillMaxSize()
        .background(Color.White)
        .padding(15.dp),
horizontalAlignment = Alignment.CenterHorizontally
        ) {
        Image(painter = painterResource(id = R.drawable.logo_iniciar),
            contentDescription = null,
            modifier = Modifier
                .height(100.dp)
                .width(150.dp))

        Image(painter = painterResource(id = R.drawable.mulher_tela1),
            contentDescription = null,
            modifier = Modifier
                .height(300.dp)
                .width(240.dp))
        Text(
            text = "Entre ou cadastre-se",
            color = Color.Black,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )
        Text(
            text = "Gerencie seus gastos de forma rápida e prática",
            color = Color.DarkGray,
            fontWeight = FontWeight.Medium,
            fontSize = 13.sp,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )

        Spacer(modifier = Modifier.height(50.dp))
        Button(onClick = { nav.navigate(NavigationScreens.SIGN_UP) } , modifier = Modifier
            .fillMaxWidth()
            .height(50.dp)
            .border(width = 1.dp, color = MAINBLUE, shape = RoundedCornerShape(9.dp))
            ) {
            Text(
                text = "CADASTRAR",
                color = Color.White,
                fontWeight = FontWeight.Medium,
                fontSize = 13.sp
            )
        }
        Spacer(modifier = Modifier.height(15.dp))
        Button(
            onClick = { nav.navigate(NavigationScreens.LOGIN) },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
                .border(width = 1.dp, color = MAINBLUE, shape = RoundedCornerShape(9.dp)),
            colors = ButtonDefaults.buttonColors(backgroundColor = Color.White),

            ) {
            Text(
                text = "JA SOU CADASTRADO",
                color = Color.Blue,
                fontWeight = FontWeight.Medium,
                fontSize = 13.sp
            )
        }
    }
}
