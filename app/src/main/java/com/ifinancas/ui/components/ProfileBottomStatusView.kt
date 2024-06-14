package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.ifinancas.R

@Composable
fun ProfileBottomStatusView() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xff0B032D), shape = RoundedCornerShape(10.dp))
            .padding(10.dp)
    ) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround) {
            ProfileBottomStatusViewItem(
                toptext = "Status",
                bottomText = "Conta gratuita",
                R.drawable.crown_status
            )
            ProfileBottomStatusViewItem(
                toptext = "Status do Finanças",
                bottomText = "Gratuito com anúncios",
                R.drawable.crown_status
            )
        }
    }
}