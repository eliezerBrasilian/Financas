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
import com.ifinancas.data.gitignore.instagramInviteLink
import com.ifinancas.ui.theme.BACKGROUNDCARDSOBREPOSTO

@Preview
@Composable
fun OutrosExtraColumn() {
    Spacer(modifier = Modifier.height(30.dp))
    Text(
        text = "Outros extras ✨", fontSize = 15.sp,
        color = Color.Black, fontWeight = FontWeight.SemiBold
    )

    Spacer(modifier = Modifier.height(15.dp))
    DiscordGroupInviteCard()
    Spacer(modifier = Modifier.height(15.dp))
    PatrocinadoCard(
        imageResource = R.drawable.instagram,
        title = "Ofertas do Finanças",
        description = "Receba ofertas exclusivas do Finanças",
        buttonText = "Seguir canal no Instagram",
        link = instagramInviteLink,
        hasPadding = false,
        backgroundColor = BACKGROUNDCARDSOBREPOSTO
    )
    Spacer(modifier = Modifier.height(15.dp))

}