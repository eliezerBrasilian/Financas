package com.ifinancas.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.Blue
import androidx.compose.ui.graphics.Color.Companion.Cyan
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.ifinancas.R
import com.ifinancas.navigation.NavigationScreens
import com.ifinancas.ui.theme.Purple40
import com.ifinancas.ui.viewModel.ShopTheme
import com.ifinancas.utils.toDefaultCurrency

@Composable
fun CardFinanceItem(
    iconeImage: Int,
    text: String,
    valor: Double,
    tag: String,
    nav: NavHostController,
    balanceIsVisible: Boolean,
    appTheme: ShopTheme?
) {

    val gradientColors = listOf(Cyan, Blue, Purple40 /*...*/)

    Card(
        modifier = Modifier
            .width(110.dp)
            .height(140.dp)
            .clickable { nav.navigate(NavigationScreens.FINANCIAL_BALANCE_SELECTED + "/$tag") },
        shape = RoundedCornerShape(10.dp),
        elevation = 7.dp
    ) {
        if (appTheme != null) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.White), contentAlignment = Alignment.Center
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceAround
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.despesa),
                        contentDescription = null,
                        modifier = Modifier.size(25.dp)
                    )
                    Column {
                        Text(text = "Despesas", fontSize = 14.sp, color = appTheme.cardFontColor)
                        Text(
                            text = toDefaultCurrency(valor),
                            fontSize = 16.sp,
                            color = appTheme.cardFontColor,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
            }
        }
    }
}
