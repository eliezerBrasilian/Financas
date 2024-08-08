package com.ifinancas.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.ifinancas.R
import com.ifinancas.data.enums.Tags
import com.ifinancas.ui.theme.BACKGROUNDCARDSOBREPOSTO
import com.ifinancas.ui.viewModel.ShopTheme

@Composable
fun HomeCardsList(
    totalRevenues: Double,
    nav: NavHostController,
    balanceIsVisible: Boolean,
    totalExpenses: Double,
    totalReservations: Double,
    appTheme: ShopTheme?
) {
    ViewSobreposta {
        Card(
            modifier = Modifier.fillMaxWidth(0.95f),
            shape = RoundedCornerShape(12.dp),
            elevation = 10.dp,
            backgroundColor = BACKGROUNDCARDSOBREPOSTO
        ) {
            Box(modifier = Modifier.padding(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceAround
                ) {
                    CardFinanceItem(
                        iconeImage = R.drawable.receita,
                        text = "Receitas",
                        valor = totalRevenues,
                        tag = Tags.REVENUE.tag,
                        nav = nav,
                        balanceIsVisible,
                        appTheme
                    )
                    CardFinanceItem(
                        iconeImage = R.drawable.despesa,
                        text = "Despesas",
                        valor = totalExpenses,
                        tag = Tags.EXPENSE.tag,
                        nav = nav,
                        balanceIsVisible,
                        appTheme
                    )
                    CardFinanceItem(
                        iconeImage = R.drawable.reserva,
                        text = "Reservas",
                        valor = totalReservations,
                        tag = Tags.RESERVATION.tag,
                        nav = nav,
                        balanceIsVisible,
                        appTheme
                    )
                }
            }
        }
    }
}