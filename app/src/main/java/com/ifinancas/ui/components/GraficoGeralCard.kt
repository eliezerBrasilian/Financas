package com.ifinancas.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.ifinancas.R
import com.ifinancas.data.enums.Tags
import com.ifinancas.navigation.BottomBarScreen
import com.ifinancas.ui.theme.BACKGROUNDCARDSOBREPOSTO
import com.ifinancas.ui.theme.MAINPURPLE

@Composable
fun GraficoGeralCard(nav: NavHostController) {

    val onClickItem: (tag: Tags) -> Unit = {
        nav.navigate(BottomBarScreen.Grafico.route + "/${it.tag}")
    }

    Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
        Card(
            modifier = Modifier
                .fillMaxWidth(0.95f),
            shape = RoundedCornerShape(12.dp),
            elevation = 10.dp,
            backgroundColor = BACKGROUNDCARDSOBREPOSTO
        ) {
            Column(modifier = Modifier.padding(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.grafico),
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier
                            .clip(
                                CircleShape
                            )
                            .size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = "Gráfico Geral",
                        fontSize = 15.sp,
                        color = MAINPURPLE,
                        fontWeight = FontWeight.Bold
                    )
                }

                Spacer(modifier = Modifier.height(15.dp))
                Column(verticalArrangement = Arrangement.spacedBy(7.dp)) {
                    GraficoGeralItem(
                        iconeImage = R.drawable.grafo_receita, text = "Receita do período",
                        tag = Tags.REVENUE, onClick = onClickItem
                    )
                    GraficoGeralItem(
                        iconeImage = R.drawable.grafo_despesa, text = "Despesa do período",
                        tag = Tags.EXPENSE, onClick = onClickItem
                    )
                    GraficoGeralItem(
                        iconeImage = R.drawable.grafo_reserva, text = "Reserva do período",
                        tag = Tags.RESERVATION, onClick = onClickItem
                    )
                }
            }
        }
    }

}