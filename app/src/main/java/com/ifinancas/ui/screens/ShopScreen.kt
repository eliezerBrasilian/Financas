package com.ifinancas.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R
import com.ifinancas.data.FinanceCard
import com.ifinancas.data.FinanceCardCategory
import com.ifinancas.data.FinanceCardOrientation
import com.ifinancas.data.cardList
import com.ifinancas.data.montserratFamily
import com.ifinancas.ui.components.ShopScreenTitleRow
import com.ifinancas.ui.theme.dancingFamily
import com.ifinancas.ui.theme.robotoFamily


@Preview
@Composable
fun ShopScreen() {
    Surface(
        color = Color(0xff1c1d22), modifier = Modifier.fillMaxSize()
    ) {
        Column(
            modifier = Modifier
                .padding(10.dp)
                .verticalScroll(rememberScrollState())
        ) {
            ShopScreenTitleRow()

            Spacer(modifier = Modifier.height(30.dp))
            Text(
                text = "Shop", fontFamily = dancingFamily,
                fontSize = 24.sp, color = Color.White
            )
            Text(
                text = "Desbloqueie personalizações como um presente pra você por seguir firme em seu objetivo.",
                fontFamily = robotoFamily,
                fontSize = 16.sp, color = Color.White
            )

            Spacer(modifier = Modifier.height(30.dp))
            HorizontalCardList(cardList.filter { it.category == FinanceCardCategory.FOREST })
            Spacer(modifier = Modifier.height(30.dp))
            HorizontalCardList(cardList.filter { it.category == FinanceCardCategory.ANIME },
                title = "Decoração de Anime")


            Text(
                text = "Personalizar Card",
                fontFamily = dancingFamily,
                fontSize = 24.sp,
                color = Color.White
            )
            LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                items(cardList) {
                    CustomFinanceBackgroundVerticalCard()
                }
            }
        }
    }
}

@Composable
private fun HorizontalCardList(filter: List<FinanceCard>,
                               title: String = "Decoração de Florestas") {
    Text(
        text = title,
        fontFamily = dancingFamily,
        fontSize = 24.sp,
        color = Color.White
    )
    LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
        items(filter) {
            if (it.orientation == FinanceCardOrientation.VERTICAL) {
                CustomFinanceBackgroundVerticalCard(it)
            } else {
                CustomFinanceBackgroundHorizontalCard()
            }
        }
    }
}


@Preview
@Composable
fun CustomFinanceBackgroundHorizontalCard(
    imageResource: Int = R.drawable.florest_wallpaper_1,
    title: String = "Mars Forest",
    description: String = "Sol rejuvenescedor de fim de tarde"
) {
    Card(
        colors = CardDefaults.cardColors(Color(0xff232428)),
        modifier = Modifier
            .height(245.dp)
            .width(200.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(15.dp)
        ) {
            Image(
                painter = painterResource(id = imageResource),
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(90.dp),
                contentScale = ContentScale.Crop
            )

            Column(modifier = Modifier.padding(10.dp)) {
                Column(verticalArrangement = Arrangement.spacedBy(5.dp)) {
                    Text(
                        text = title,
                        fontFamily = montserratFamily,
                        color = Color.White,
                        fontSize = 17.sp
                    )
                    Text(
                        text = description,
                        fontFamily = montserratFamily,
                        color = Color.White,
                        fontSize = 14.sp
                    )
                }
                Spacer(modifier = Modifier.height(20.dp))
                Button(onClick = {}, modifier = Modifier.fillMaxWidth()) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(5.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.nitro_icon),
                            contentDescription = null,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.size(18.dp)
                        )
                        Text(
                            text = "Comprar",
                            fontFamily = montserratFamily,
                            color = Color.White,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }
}


@Composable
fun CustomFinanceBackgroundVerticalCard(
    card: FinanceCard = FinanceCard(
        title = "",
        description = "",
        imageResource = R.drawable.florest_wallpaper_1
    )
) {
    Card(
        colors = CardDefaults.cardColors(Color(0xff232428)),
        modifier = Modifier
            .height(280.dp)
            .width(150.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(15.dp)
        ) {
            Image(
                painter = painterResource(id = card.imageResource),
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(90.dp),
                contentScale = ContentScale.Crop
            )

            Column(modifier = Modifier.padding(10.dp)) {
                Column(verticalArrangement = Arrangement.spacedBy(5.dp)) {
                    Text(
                        text = card.title,
                        fontFamily = montserratFamily,
                        color = Color.White,
                        fontSize = 17.sp
                    )
                    Text(
                        text = card.description,
                        fontFamily = montserratFamily,
                        color = Color.White,
                        fontSize = 13.sp
                    )
                }
                Spacer(modifier = Modifier.height(20.dp))
                Button(onClick = {}, modifier = Modifier.fillMaxWidth()) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(5.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.nitro_icon),
                            contentDescription = null,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.size(18.dp)
                        )
                        Text(
                            text = "Visualizar",
                            fontFamily = montserratFamily,
                            color = Color.White,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }
}


