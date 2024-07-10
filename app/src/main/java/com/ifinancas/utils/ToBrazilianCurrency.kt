package com.ifinancas.utils

import java.text.NumberFormat
import java.util.Locale

fun toBrazilianCurrency(valor: Double): String {
    val formatoMoeda = NumberFormat.getCurrencyInstance(Locale("pt", "BR"))
    return formatoMoeda.format(valor)
}

fun toDefaultCurrency(valor: Double): String {
    val formatoMoeda = NumberFormat.getCurrencyInstance(Locale.getDefault())

    return formatoMoeda.format(valor)
}