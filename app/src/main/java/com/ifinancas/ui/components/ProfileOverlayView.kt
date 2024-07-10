package com.ifinancas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R
import com.ifinancas.data.gitignore.instagramInviteLink
import com.ifinancas.ui.theme.BACKGROUNDCARDSOBREPOSTO

@Composable
fun ProfileOverlayView(
    clearDataOnExit: () -> Unit,
    navigateToExtrasScreen: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White, RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp))
            .verticalScroll(rememberScrollState())
    ) {
        ProfileOverlayViewItem(
            text = "Finanças extras",
            icon = R.drawable.crown_list,
            onClick = navigateToExtrasScreen
        )
        Line()
        ProfileOverlayViewItem(
            text = "Encerrar sessão", icon = R.drawable.logout, onClick = clearDataOnExit
        )
        Line()
        PatrocinadoCard(
            imageResource = R.drawable.instagram,
            title = "Ofertas do Finanças",
            description = "Receba ofertas exclusivas do Finanças",
            buttonText = "Seguir canal no Instagram",
            link = instagramInviteLink,
            backgroundColor = BACKGROUNDCARDSOBREPOSTO
        )
        Line()
        PatrocinadoCard(backgroundColor = BACKGROUNDCARDSOBREPOSTO)
        Line()

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(50.dp),
            contentAlignment = Alignment.Center
        ) {
            Text(text = "Desenvolvido com ☕❤️", fontSize = 15.sp, fontWeight = FontWeight.Bold)
        }
    }
}

