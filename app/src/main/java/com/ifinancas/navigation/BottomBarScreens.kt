package com.ifinancas.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Menu
import androidx.compose.ui.graphics.vector.ImageVector
import com.ifinancas.R

sealed class BottomBarScreen(
    val route: String,
    val title: String,
    val icon: ImageVector,
    val imageIcon: Int,
    val imageIconSelected: Int
) {
    data object Home : BottomBarScreen(
        route = "HOME",
        title = "Inicio",
        icon = Icons.Default.Home,
        imageIcon = R.drawable.casa_barra_cinza,
        imageIconSelected = R.drawable.casa_barra
    )

    data object Historico : BottomBarScreen(
        route = "HISTORICO",
        title = "Histórico",
        icon = Icons.Default.CheckCircle,
        imageIcon = R.drawable.transacoes_cinza,
        imageIconSelected = R.drawable.transacoes_roxo
    )

    data object Grafico : BottomBarScreen(
        route = "GRAFICO",
        title = "Grafico",
        icon = Icons.Default.CheckCircle,
        imageIcon = R.drawable.grafico_cinza,
        imageIconSelected = R.drawable.grafico_roxo
    )

    data object Extra : BottomBarScreen(
        route = "EXTRA",
        title = "Extras",
        icon = Icons.Default.Menu,
        imageIcon = R.drawable.premium_cinza,
        imageIconSelected = R.drawable.premium_roxo
    )

}
