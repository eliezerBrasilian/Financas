package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.data.enums.Tags
import com.ifinancas.utils.toDefaultCurrency

@Composable
fun FinancialBalanceSelectedTop(
    movimentacaoTotalEfetuada: Double,
    tagSelected: String
) {
    val titulo = when (tagSelected) {
        Tags.REVENUE.tag -> "Receita total"
        Tags.EXPENSE.tag -> "Despesa total"
        Tags.RESERVATION.tag -> "Reserva total"
        else -> ""
    }
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(15.dp),
        verticalArrangement = Arrangement.spacedBy(5.dp)
    ) {

        Text(
            text = titulo,
            fontSize = 16.sp,
            color = Color.White,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
        Text(
            text = toDefaultCurrency(movimentacaoTotalEfetuada),
            fontSize = 18.sp,
            color = Color.White,
            fontWeight = FontWeight.Normal,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(20.dp))
        BannerAdd()
    }

    Spacer(modifier = Modifier.height(20.dp))
}