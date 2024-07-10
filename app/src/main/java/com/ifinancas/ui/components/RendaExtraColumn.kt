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
import com.ifinancas.data.gitignore.tikTokGooglePlayLink
import com.ifinancas.data.gitignore.tiktokInviteLink
import com.ifinancas.ui.theme.BACKGROUNDCARDSOBREPOSTO

@Preview
@Composable
fun RendaExtraColumn() {

    Text(
        text = "Que tal fazer uma renda extra ✨", fontSize = 15.sp,
        color = Color.Black, fontWeight = FontWeight.SemiBold
    )

    Spacer(modifier = Modifier.height(15.dp))
    BaixaEGanhaCard(
        imageResource = R.drawable.tiktok,
        title = "Baixar TikTok",
        subtitle = "O TikTok te dá dinheiro por assistir Shorts",
        description = "Após baixar o aplicativo, clique no botão abaixo e cumpra algumas tarefas para ganhar dinheiro de verdade",
        buttonText = "Resgatar prêmio",
        googlePlayAppLink = tikTokGooglePlayLink,
        bonusLink = tiktokInviteLink
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

//    Spacer(modifier = Modifier.height(15.dp))
//    BaixaEGanhaCard(
//        imageResource = R.drawable.givyy_shorts,
//        title = "Baixar e usar o Givvy Shorts",
//        subtitle = "O givvy shorts te dá dinheiro por assistir Shorts",
//        description = "Após baixar o aplicativo, clique no botão abaixo para ganhar 5000 moedas",
//        buttonText = "Ganhar 5000 moedas",
//        googlePlayAppLink = givvyShortsGooglePlayLink,
//        bonusLink = givvyShortsInvite
//    )

    /*    Spacer(modifier = Modifier.height(15.dp))
        BaixaEGanhaCard(
            title = "Baixar e usar o Givvy Shorts",
            subtitle = "O givvy shorts te dá dinheiro por assistir Shorts",
            description = "Após baixar o aplicativo, clique no botão abaixo para ganhar 5000 moedas",
            buttonText = "Ganhar 5000 moedas",
            googlePlayAppLink = givvyShortsGooglePlayLink,
            bonusLink = givvyShortsInvite
        )*/

    /*Spacer(modifier = Modifier.height(15.dp))
    MercadoPagoCard(uriHandler, clickMPago)*/
    /* Spacer(modifier = Modifier.height(15.dp))*/
}