package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R
import com.ifinancas.data.gitignore.hostingerReferralLink
import com.ifinancas.ui.theme.BACKGROUNDCARDSOBREPOSTO

@Preview
@Composable
fun RendaExtraColumn() {

    Text(
        text = "Obtenha descontos ✨", fontSize = 15.sp,
        color = Color.Black, fontWeight = FontWeight.SemiBold
    )

    Spacer(modifier = Modifier.height(15.dp))
    PatrocinadoCard(
        imageResource = R.drawable.hostinger,
        title = "Contratar plano na Hostinger",
        description = "Ganhe 25% de desconto na sua primeira compra",
        buttonText = "Contratar",
        link = hostingerReferralLink,
        isVerified = true,
        backgroundColor = BACKGROUNDCARDSOBREPOSTO
    )

    /*Spacer(modifier = Modifier.height(15.dp))
    MercadoPagoCard(uriHandler, clickMPago)*/
    /* Spacer(modifier = Modifier.height(15.dp))*/
}