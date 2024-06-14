package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.data.gitignore.givvyShortsInvite
import com.ifinancas.data.gitignore.mercagoPagoInvite
import com.ifinancas.data.gitignore.tigrinhoInvite

@Composable
fun RendaExtraColumn() {

    val uriHandler = LocalUriHandler.current

    val clickTigrinho = {
        uriHandler.openUri(tigrinhoInvite)
    }

    val clickMPago = {
        uriHandler.openUri(mercagoPagoInvite)
    }

    val clickgivyShorts = {
        uriHandler.openUri(givvyShortsInvite)
    }

    Text(
        text = "Que tal fazer uma renda extra ✨", fontSize = 16.sp,
        color = Color.Black, fontWeight = FontWeight.SemiBold
    )

    Spacer(modifier = Modifier.height(15.dp))
    TigrinhoCard(clickTigrinho)

    Spacer(modifier = Modifier.height(15.dp))
    GivvyShortsCard(uriHandler, clickgivyShorts)

    Spacer(modifier = Modifier.height(15.dp))
    MercadoPagoCard(uriHandler, clickMPago)
}