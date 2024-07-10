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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.utils.showInterstitial

@Composable
fun BaixaEGanhaCard(
    title: String,
    subtitle: String,
    description: String,
    buttonText: String,
    googlePlayAppLink: String,
    bonusLink: String,
    imageResource: Int
) {

    val uriHandler = LocalUriHandler.current

    val context = LocalContext.current

    Card(
        modifier = Modifier, colors = CardDefaults.cardColors(
            containerColor = Color.White
        ),
        elevation = CardDefaults.cardElevation(9.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.padding(10.dp)
        ) {
            Image(
                painter = painterResource(id = imageResource),
                contentDescription = null,
                modifier = Modifier
                    .size(50.dp)
                    .clip(RoundedCornerShape(15.dp))
            )
            Column {
                Text(
                    text = title, fontSize = 15.sp,
                    color = Color.Black, fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = subtitle,
                    fontSize = 11.sp,
                    color = Color.Blue, fontWeight = FontWeight.SemiBold
                )
                Button(
                    onClick = {
                        showInterstitial(context)
                        uriHandler.openUri(googlePlayAppLink)
                    },
                    colors = ButtonDefaults.buttonColors(Color(0xff5D2A42))
                ) {
                    Text(
                        text = "Baixar aplicativo", fontSize = 12.sp,
                        color = Color.White, fontWeight = FontWeight.SemiBold
                    )
                }
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = description,
                    fontSize = 12.sp,
                    color = Color.Black,
                    fontWeight = FontWeight.SemiBold
                )
                Button(
                    onClick = {
                        uriHandler.openUri(bonusLink)
                    },
                    colors = ButtonDefaults.buttonColors(Color(0xff210124))
                ) {
                    Text(
                        text = buttonText, fontSize = 13.sp,
                        color = Color.White, fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}