package com.ifinancas.ui.viewModel

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.lifecycle.ViewModel
import com.ifinancas.R
import com.ifinancas.ui.theme.dancingFamily
import kotlinx.coroutines.flow.MutableStateFlow

/*
1 - POR PADRÃO, O SHOPTHEME É NULL, O QUE INDICA QUE O USUÁRIO AINDA NÃO POSSUI UM TEMA COMPRADO
- background do card
- font do aplicativo
- cores
 */

data class ShopTheme(
    val homeTopBackgroundResource: Int? = null,
    val homeTopBackgroundColor: Color? = null,
    val cardBackgroundGradient: List<Color> = listOf(Color(0xff232526), Color(0xff414345)),
    val fontFamily: FontFamily = dancingFamily,
    val fontColor: Color = Color.White,
    val cardFontColor: Color = Color.Black,
    val homeBackgroundResource: Int = R.drawable.forest_2,
    val homeBackgroundColor: Color? = null,
)
//
//val defaultShopTheme =
//    ShopTheme(R.drawable.forest_2, fontColor = Color.Black, fontFamily = FontFamily.Default)

val minimalismTheme = ShopTheme(
    homeBackgroundResource = R.drawable.minimalismo,
    homeTopBackgroundColor = Color(0xff38504F)
)

class ShopThemeViewModel : ViewModel() {
    private val _appTheme = MutableStateFlow<ShopTheme?>(minimalismTheme)
    val appTheme: MutableStateFlow<ShopTheme?> = _appTheme


}