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
import com.ifinancas.utils.toBrazilianCurrency


@Composable
fun TransactionsHistoryTop(movimentacaoTotalEfetuada: Double) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(15.dp),
        verticalArrangement = Arrangement.spacedBy(5.dp)
    ) {
        /* Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.CenterEnd) {
             Image(
                 painter = painterResource(id = R.drawable.filtro),
                 contentDescription = null,
                 modifier = Modifier
                     .size(25.dp)
             )
         }*/
        BannerAdd()
        Text(
            text = "Movimentação total efetuada",
            fontSize = 14.sp,
            color = Color.White,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )
        Text(
            text = toBrazilianCurrency(movimentacaoTotalEfetuada),
            fontSize = 18.sp,
            color = Color.White,
            fontWeight = FontWeight.Normal,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )

    }

    Spacer(modifier = Modifier.height(20.dp))
}