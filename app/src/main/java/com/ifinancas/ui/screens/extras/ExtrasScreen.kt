package com.ifinancas.ui.screens.extras

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.R

//link de afiliado coolors :
// https://coolors.co/?ref=638fe9480076e5000ac71b9a

@Preview
@Composable
fun ExtrasScreen(
    pv: PaddingValues = PaddingValues(0.dp),
    navController: NavHostController = rememberNavController()
) {
    Surface(Modifier.padding(pv), color = Color.White) {
        Column(
            modifier = Modifier
                .padding(15.dp)
                .fillMaxSize()
                .background(Color.White)
                .verticalScroll(rememberScrollState())
        ) {

            Text(
                text = "Economizar em suas compras com cupons de desconto", fontSize = 16.sp,
                color = Color.Black, fontWeight = FontWeight.SemiBold
            )
            Spacer(modifier = Modifier.height(10.dp))


            //todo link para o telegram e para o kwai
            Spacer(modifier = Modifier.height(15.dp))

            Image(
                painter = painterResource(id = R.drawable.img_premium),
                contentDescription = null,
                modifier = Modifier.height(200.dp)
            )
            Text(
                text = "Que tal fazer uma renda extra", fontSize = 16.sp,
                color = Color.Black, fontWeight = FontWeight.SemiBold
            )

            Spacer(modifier = Modifier.height(15.dp))
            Card(
                modifier = Modifier, colors = CardDefaults.cardColors(
                    containerColor = Color(0xffFFFAE3)
                )
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = Modifier.padding(10.dp)
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.fortune_tiger),
                        contentDescription = null,
                        modifier = Modifier.size(90.dp)
                    )
                    Column {
                        Text(
                            text = "Abrir minha conta no Tigrinho", fontSize = 16.sp,
                            color = Color.Black, fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "Imperdível! Ao abrir sua conta você ganha 20 reais",
                            fontSize = 12.sp,
                            color = Color.Blue, fontWeight = FontWeight.SemiBold
                        )
                        Button(
                            onClick = { /*TODO*/ },
                            colors = ButtonDefaults.buttonColors(Color(0xff210124))
                        ) {
                            Text(
                                text = "Pegar meu prêmio", fontSize = 16.sp,
                                color = Color.White, fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(15.dp))
            Card(
                modifier = Modifier, colors = CardDefaults.cardColors(
                    containerColor = Color(0xffCCD7E4)
                )
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = Modifier.padding(10.dp)
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.givyy_shorts),
                        contentDescription = null,
                        modifier = Modifier.size(90.dp)
                    )
                    Column {
                        Text(
                            text = "Baixar e usar o Givvy Shorts", fontSize = 16.sp,
                            color = Color.Black, fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "O givvy shorts te dá dinheiro por assistir Shorts",
                            fontSize = 12.sp,
                            color = Color.Blue, fontWeight = FontWeight.SemiBold
                        )
                        Button(
                            onClick = { /*TODO*/ },
                            colors = ButtonDefaults.buttonColors(Color(0xff5D2A42))
                        ) {
                            Text(
                                text = "Baixar aplicativo", fontSize = 16.sp,
                                color = Color.White, fontWeight = FontWeight.SemiBold
                            )
                        }
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = "Após baixar o aplicativo, clique no botão abaixo para ganhar 5000 moedas",
                            fontSize = 16.sp,
                            color = Color.Black,
                            fontWeight = FontWeight.SemiBold
                        )
                        Button(
                            onClick = { /*TODO*/ },
                            colors = ButtonDefaults.buttonColors(Color(0xff210124))
                        ) {
                            Text(
                                text = "Ganhar 5000 moedas", fontSize = 16.sp,
                                color = Color.White, fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(15.dp))
            Card(
                modifier = Modifier, colors = CardDefaults.cardColors(
                    containerColor = Color(0xffAEC5EB)
                )
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = Modifier.padding(10.dp)
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.mercado_pago),
                        contentDescription = null,
                        modifier = Modifier.size(90.dp)
                    )
                    Column {
                        Text(
                            text = "Baixar Mercado Pago", fontSize = 16.sp,
                            color = Color.Black, fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "Você ganha desconto ao realizar alguma compra no app do Mercado Pago",
                            fontSize = 12.sp,
                            color = Color.Blue, fontWeight = FontWeight.SemiBold
                        )
                        Button(
                            onClick = { /*TODO*/ },
                            colors = ButtonDefaults.buttonColors(Color(0xff5D2A42))
                        ) {
                            Text(
                                text = "Baixar aplicativo", fontSize = 16.sp,
                                color = Color.White, fontWeight = FontWeight.SemiBold
                            )
                        }
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = "Após baixar o aplicativo, clique no botão abaixo para criar sua conta e comecar a ganhar descontos",
                            fontSize = 16.sp,
                            color = Color.Black,
                            fontWeight = FontWeight.SemiBold
                        )
                        Button(
                            onClick = { /*TODO*/ },
                            colors = ButtonDefaults.buttonColors(Color(0xff210124))
                        ) {
                            Text(
                                text = "Comprar com descontos", fontSize = 16.sp,
                                color = Color.White, fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }
            }
        }
    }


}