package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R

@Composable
fun ProfileOverlayView(
    clearDataOnExit: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White, RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp))
    ) {
        ProfileOverlayViewItem(text = "Finanças extras", icon = R.drawable.crown_list)
        Line()
        ProfileOverlayViewItem(text = "Encerrar sessão", icon = R.drawable.logout) {
            clearDataOnExit()
        }
        Line()
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text(text = "Desenvolvido com ☕❤️", fontSize = 15.sp, fontWeight = FontWeight.Bold)
        }
    }
}