package com.ifinancas.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material.Icon
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.utils.toBrazilianCurrency
import compose.icons.FeatherIcons
import compose.icons.feathericons.Eye
import compose.icons.feathericons.EyeOff

@Composable
fun SaldoComponent(
    financialOperationsViewModel: FinancialOperationsViewModel,
    balanceIsVisible: Boolean,
    toogleBalanceVisibility: () -> Unit
) {

    val total by financialOperationsViewModel.totalInBalance.collectAsState(0.00)

    Column {
        Text(text = "Saldo em contas", color = Color.White, fontSize = 16.sp)
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Text(
                text = if (balanceIsVisible) toBrazilianCurrency(total) else "****",
                color = Color.White,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
            Icon(
                imageVector = if (balanceIsVisible) FeatherIcons.EyeOff else FeatherIcons.Eye,
                contentDescription = null,
                tint = Color.White,
                modifier = Modifier
                    .size(20.dp)
                    .clickable { toogleBalanceVisibility() }
            )
        }
    }
}