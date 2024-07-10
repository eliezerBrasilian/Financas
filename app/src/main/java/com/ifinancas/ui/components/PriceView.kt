package com.ifinancas.ui.components

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.ifinancas.data.dataclass.Register
import com.ifinancas.utils.toDefaultCurrency

@Composable
fun PriceView(register: Register) {
    Text(
        text = toDefaultCurrency(register.amount),
        fontSize = 14.sp,
        color = Color.Black,
        fontWeight = FontWeight.Bold,
    )
}