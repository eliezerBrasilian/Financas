package com.ifinancas.data.sealedClass

import androidx.compose.ui.graphics.Color
import com.ifinancas.data.enums.Tags

sealed class MenuItems(val tag: Tags, val circleColor: Color) {
    data object Revenue : MenuItems(Tags.REVENUE, Color(0xff35C761))
    data object Expense : MenuItems(Tags.EXPENSE, Color(0xffEC1515))
    data object Reservation : MenuItems(Tags.RESERVATION, Color(0xff8B68DF))
}
