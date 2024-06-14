package com.ifinancas.utils

import androidx.compose.ui.graphics.Color
import com.ifinancas.data.enums.Category
import com.ifinancas.ui.theme.BACKGROUNDGREEN
import com.ifinancas.ui.theme.BACKGROUNDRED
import com.ifinancas.ui.theme.MAINPURPLE

class AppUtils {
    companion object {
        val AppTag = "App"
        fun getBackgroundColor(tag: String): Color {
            return when (tag) {
                "receita" -> BACKGROUNDGREEN
                "despesa" -> BACKGROUNDRED
                "reserva" -> MAINPURPLE
                else -> BACKGROUNDGREEN
            }
        }

        fun getBackgroundColor(category: Category): Color {
            return when (category.value) {
                Category.CASA.value -> BACKGROUNDGREEN
                Category.CASA.value -> BACKGROUNDRED
                Category.CASA.value -> MAINPURPLE
                else -> BACKGROUNDGREEN
            }
        }

        fun getTitleText(tag: String): String {
            return when (tag) {
                "receita" -> "Nova Receita"
                "despesa" -> "Nova Despesa"
                "reserva" -> "Nova Reserva"
                else -> "Nova Receita"
            }
        }

    }

}
