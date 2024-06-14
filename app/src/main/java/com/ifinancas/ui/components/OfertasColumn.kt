package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun OfertasColumn() {
    Column {
        Spacer(modifier = Modifier.height(20.dp))
        Text(
            text = "Economizar em suas compras com cupons de desconto", fontSize = 16.sp,
            color = Color.Black, fontWeight = FontWeight.SemiBold
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(
            text = "Em breve...", fontSize = 14.sp,
            color = Color.Black, fontWeight = FontWeight.Normal
        )

    }
}