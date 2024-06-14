package com.ifinancas.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.UriHandler
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R
import com.ifinancas.data.gitignore.givvyShortsGooglePlayLink

@Composable
fun GivvyShortsCard(
    uriHandler: UriHandler,
    clickgivyShorts: () -> Unit
) {
    Card(
        modifier = Modifier, colors = CardDefaults.cardColors(
            containerColor = Color(0xffCCD7E4)
        ),
        elevation = CardDefaults.cardElevation(9.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.padding(10.dp)
        ) {
            Image(
                painter = painterResource(id = R.drawable.givyy_shorts),
                contentDescription = null,
                modifier = Modifier.size(90.dp).clip(RoundedCornerShape(15.dp))
            )
            Column {
                Text(
                    text = "Baixar e usar o Givvy Shorts", fontSize = 15.sp,
                    color = Color.Black, fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "O givvy shorts te dá dinheiro por assistir Shorts",
                    fontSize = 12.sp,
                    color = Color.Blue, fontWeight = FontWeight.SemiBold
                )
                Button(
                    onClick = { uriHandler.openUri(givvyShortsGooglePlayLink) },
                    colors = ButtonDefaults.buttonColors(Color(0xff5D2A42))
                ) {
                    Text(
                        text = "Baixar aplicativo", fontSize = 12.sp,
                        color = Color.White, fontWeight = FontWeight.SemiBold
                    )
                }
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "Após baixar o aplicativo, clique no botão abaixo para ganhar 5000 moedas",
                    fontSize = 13.sp,
                    color = Color.Black,
                    fontWeight = FontWeight.SemiBold
                )
                Button(
                    onClick = clickgivyShorts,
                    colors = ButtonDefaults.buttonColors(Color(0xff210124))
                ) {
                    Text(
                        text = "Ganhar 5000 moedas", fontSize = 13.sp,
                        color = Color.White, fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}