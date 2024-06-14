package com.ifinancas.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R

@Composable
fun TigrinhoCard(clickTigrinho: () -> Unit) {
    Card(
        modifier = Modifier, colors = CardDefaults.cardColors(
            containerColor = Color(0xffFFFAE3)
        ),
        elevation = CardDefaults.cardElevation(9.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.padding(10.dp)
        ) {
            Image(
                painter = painterResource(id = R.drawable.fortune_tiger),
                contentDescription = null,
                modifier = Modifier.size(90.dp).clip(RoundedCornerShape(15.dp))
            )
            Column {
                Text(
                    text = "Abrir minha conta no Tigrinho", fontSize = 15.sp,
                    color = Color.Black, fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "Imperdível! Ao abrir sua conta você ganha 20 reais",
                    fontSize = 12.sp,
                    color = Color.Blue, fontWeight = FontWeight.Normal
                )
                Button(
                    onClick = clickTigrinho,
                    colors = ButtonDefaults.buttonColors(Color(0xff210124))
                ) {
                    Text(
                        text = "Pegar meu prêmio", fontSize = 13.sp,
                        color = Color.White, fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}