package com.ifinancas.data.enums

import com.ifinancas.R
import com.ifinancas.navigation.BottomBarScreen
import com.ifinancas.navigation.NavigationScreens

sealed class MenuItem(val icon: Int, val title: String, val route: String = "") {
    data object Perfil : MenuItem(R.drawable.perfil, "Perfil", NavigationScreens.PROFILE)
    data object Extras : MenuItem(R.drawable.coroa_premiun, "Extras", BottomBarScreen.Extra.route)
    data object Avaliar : MenuItem(R.drawable.estrela, "Avaliar")
    data object Compartilhar : MenuItem(R.drawable.compartilhar_amigos, "Compartilhar")
}